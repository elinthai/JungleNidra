// Generates the two secrets needed for login: run this locally, then paste
// the output into Vercel's Environment Variables.
//
// Usage: node scripts/generate-secrets.js "your-chosen-password"
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-secrets.js "your-chosen-password"');
  process.exit(1);
}

const authSecret = crypto.randomBytes(32).toString("hex");
const passwordHash = bcrypt.hashSync(password, 10);
// Base64-encoded because the raw hash is full of "$" characters, which both
// Vercel's env var UI and Next.js's dotenv-expand can misinterpret as shell
// variable references and silently mangle. Base64 sidesteps that entirely.
const passwordHashB64 = Buffer.from(passwordHash, "utf-8").toString("base64");

console.log("\nAdd these two environment variables in Vercel (Settings -> Environments):\n");
console.log(`AUTH_SECRET=${authSecret}`);
console.log(`AUTH_PASSWORD_HASH_B64=${passwordHashB64}`);
console.log("\n(Also add BLOB_READ_WRITE_TOKEN — see README.md for how to get it.)\n");
