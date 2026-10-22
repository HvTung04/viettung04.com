#!/bin/sh
# Container entrypoint: migrate, seed, then start the server.
# Every step is explicitly guarded: a failing seed must never take the
# container down.
set -u

log() {
  echo "[entrypoint] $1"
}

log "running database migrations..."
if node /tools/prisma/node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss 2>&1; then
  log "database ready."
else
  log "ERROR: migrations failed."
  exit 1
fi

run_seed() {
  label="$1"
  file="$2"
  for candidate in "/app/seed/$file" "/app/seed/prisma/$file"; do
    if [ -f "$candidate" ]; then
      log "$label"
      if node "$candidate" 2>&1; then
        log "$label done."
      else
        log "WARNING: $label failed, continuing."
      fi
      return 0
    fi
  done
  log "WARNING: $label skipped (seed file $file not found)."
  return 0
}

run_seed "seeding projects and testimonials" "seed.js"
run_seed "seeding public content" "seed-content.js"

log "starting server: $*"
exec "$@"
