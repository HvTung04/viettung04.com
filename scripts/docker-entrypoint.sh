#!/bin/sh
set -e

echo "[+] Running database migrations..."
node /tools/prisma/node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss 2>&1
echo "[+] Database ready."

# Seed public content on a fresh database. Both seeds are no-ops when content
# already exists, so this never overwrites edits made in the admin panel.
if [ -f /app/seed/prisma/seed.js ]; then
  echo "[+] Seeding projects and testimonials..."
  node /app/seed/prisma/seed.js 2>&1 || echo "[!] Project seeding skipped (non-fatal)"
fi

if [ -f /app/seed/prisma/seed-content.js ]; then
  echo "[+] Seeding public content..."
  node /app/seed/prisma/seed-content.js 2>&1 || echo "[!] Content seeding skipped (non-fatal)"
fi

exec "$@"
