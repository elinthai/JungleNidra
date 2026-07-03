import fs from "fs";
import path from "path";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function readContentFile(filename: string): string {
  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return `_File not found: ${filename}. Run the copy-content script or check the repo root._`;
  }
  return fs.readFileSync(filePath, "utf-8");
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { gfm: true, breaks: false }) as string;
}
