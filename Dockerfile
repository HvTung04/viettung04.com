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
RUN npm run build

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

# Install Prisma CLI in isolated directory for runtime migrations
RUN mkdir -p /tools/prisma && cd /tools/prisma && npm init -y && npm install prisma@6.19.2 --prefer-offline --no-audit --no-fund

# SQLite data directory on a persistent volume
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Entrypoint to run DB migrations before starting the server
COPY --chown=nextjs:nodejs scripts/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

USER nextjs

EXPOSE 3333

ENV PORT=3333
ENV HOSTNAME="0.0.0.0"
# Resolved relative to prisma/schema.prisma → /app/data/dev.db on the volume
ENV DATABASE_URL="file:../data/dev.db"

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]
