#!/bin/sh
set -e

echo "[+] Running database migrations..."
node /tools/prisma/node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss 2>&1
echo "[+] Database ready."

# Seed public content on a fresh database. Both seeds are no-ops when content
# already exists, so this never overwrites edits made in the admin panel.
run_seed() {
  label="$1"
  for candidate in /app/seed/"$2" /app/seed/prisma/"$2"; do
    if [ -f "$candidate" ]; then
      echo "[+] $label..."
      node "$candidate" 2>&1 || echo "[!] $label skipped (non-fatal)"
      return 0
    fi
  done
  echo "[!] $label: seed file not found (skipped)"
}

run_seed "Seeding projects and testimonials" "seed.js"
run_seed "Seeding public content" "seed-content.js"

exec "$@"
