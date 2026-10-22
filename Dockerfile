# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Step 1: Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm config set fetch-retries 5 && npm config set fetch-timeout 120000 && npm ci --prefer-offline --no-audit --no-fund

# Step 2: Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1

# Safety net for build-time database access. The builder stage has no real
# database, so any route that is accidentally prerendered would fail the
# whole build. Point Prisma at a throwaway SQLite file created here: queries
# return empty instead of crashing, and the real DATABASE_URL is injected at
# runtime by docker compose.
ENV DATABASE_URL="file:/tmp/build.db"
RUN npx prisma db push --skip-generate --accept-data-loss

RUN npm run build

# Compile the content seeds to plain JS so the runtime image can run them with
# plain node (no ts-node / devDependencies in the production image).
RUN npx tsc prisma/seed.ts prisma/seed-content.ts --rootDir prisma --module commonjs --target es2020 --esModuleInterop --resolveJsonModule --skipLibCheck --outDir /app/seed

# Step 3: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir -p .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Prisma client + engine: the standalone tracer does not always include the
# generated client, and the runtime seed needs a working client.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/seed ./seed

# Install Prisma CLI in isolated directory for runtime migrations
RUN mkdir -p /tools/prisma && cd /tools/prisma && npm init -y && npm install prisma@6.19.2 --prefer-offline --no-audit --no-fund

# SQLite data directory on a persistent volume
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Entrypoint: run migrations, seed fresh content, then start the server.
COPY --chown=nextjs:nodejs scripts/docker-entrypoint.sh /app/docker-entrypoint.sh
# Strip CRLF: a CRLF shebang ("#!/bin/sh\r") makes the kernel fail with
# "exec format error" and the container exits with code 255. The .gitattributes
# file keeps the checkout LF; this is the belt-and-braces pass. BusyBox sed
# and tr do not understand "\r", so the octal escape is used.
RUN tr -d '\015' < /app/docker-entrypoint.sh > /tmp/entrypoint.sh \
    && mv /tmp/entrypoint.sh /app/docker-entrypoint.sh \
    && chmod +x /app/docker-entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Resolved relative to prisma/schema.prisma → /app/data/dev.db on the volume
ENV DATABASE_URL="file:../data/dev.db"

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]
