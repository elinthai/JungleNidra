export interface ParsedTable {
  headers: string[];
  rows: string[][];
}

function parseLine(line: string): string[] {
  const trimmed = line.trim();
  const withoutEdges = trimmed.startsWith("|") ? trimmed.slice(1, -1) : trimmed;
  return withoutEdges.split("|").map((cell) => cell.trim());
}

export function parseMarkdownTable(md: string): ParsedTable {
  const tableLines = md.split("\n").filter((l) => l.trim().startsWith("|"));
  if (tableLines.length < 2) return { headers: [], rows: [] };
  const headers = parseLine(tableLines[0]);
  const rows = tableLines.slice(2).map(parseLine).filter((r) => r.some((c) => c.length > 0));
  return { headers, rows };
}

export interface Section {
  title: string;
  body: string;
}

export function splitBySections(md: string): Section[] {
  const lines = md.split("\n");
  const sections: Section[] = [];
  let current: { title: string; body: string[] } | null = null;

  for (const line of lines) {
    const match = line.match(/^##\s+(.*)/);
    if (match) {
      if (current) sections.push({ title: current.title, body: current.body.join("\n") });
      current = { title: match[1].trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push({ title: current.title, body: current.body.join("\n") });
  return sections;
}
