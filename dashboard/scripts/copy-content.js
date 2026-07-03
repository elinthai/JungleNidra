// Copies the source-of-truth markdown files from the repo root into
// dashboard/content/ so they're guaranteed to be inside the Vercel build
// output (fs reads outside the project root aren't reliably bundled).
const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..", "..");
const contentDir = path.join(__dirname, "..", "content");

const files = [
  { src: "content-calendar.md", dest: "content-calendar.md" },
  { src: "todo.md", dest: "todo.md" },
  { src: "SOP.md", dest: "sop.md" },
  { src: "PRODUCTION-SOP.md", dest: "production-sop.md" },
  { src: path.join("brand-assets", "brand-guide.md"), dest: "brand-guide.md" },
  {
    src: path.join("04-recording-assets", "location-library.md"),
    dest: "location-library.md",
  },
];

fs.mkdirSync(contentDir, { recursive: true });

for (const file of files) {
  const srcPath = path.join(repoRoot, file.src);
  const destPath = path.join(contentDir, file.dest);
  if (!fs.existsSync(srcPath)) {
    console.warn(`[copy-content] missing source file, skipping: ${file.src}`);
    continue;
  }
  fs.copyFileSync(srcPath, destPath);
  console.log(`[copy-content] copied ${file.src} -> content/${file.dest}`);
}
