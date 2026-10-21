// Usage: node scripts/hash-password.js <password>
//
// Emits the bcrypt hash plus safe transports for .env files.
//
// IMPORTANT: a bcrypt hash starts with "$2b$10$...". Next.js (dotenv-expand)
// and Docker Compose both treat "$name" as a variable reference and will
// silently strip it, corrupting the hash. Use the base64 form in .env.

async function main() {
  const bcrypt = (await import('bcryptjs')).default;

  const password = process.argv[2];

  if (!password) {
    console.error('Usage: node scripts/hash-password.js <password>');
    process.exit(1);
  }

  const hash = bcrypt.hashSync(password, 10);
  const b64 = Buffer.from(hash, 'utf8').toString('base64');

  console.log('Raw hash (do NOT paste into .env):');
  console.log(hash);
  console.log('');
  console.log('Base64 (safe for .env and docker env_file):');
  console.log(b64);
  console.log('');
  console.log('Verify:', bcrypt.compareSync(password, hash));
  console.log('');
  console.log('Put this in .env:');
  console.log('ADMIN_PASSWORD_B64="' + b64 + '"');
  console.log('');
  console.log('If you must use the raw form in a Next.js .env file, escape every $:');
  console.log('ADMIN_PASSWORD="' + hash.replace(/\$/g, '\\$') + '"');
}

main();
