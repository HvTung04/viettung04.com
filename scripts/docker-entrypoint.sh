#!/bin/sh
set -e

echo "[+] Running database migrations..."
node /tools/prisma/node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss 2>&1
echo "[+] Database ready."

exec "$@"
