import { readContentFile } from "../../lib/content";
import { parseMarkdownTable } from "../../lib/table";

function stageBadgeClass(stage: string): string {
  const slug = stage.trim().toLowerCase().replace(/\s+/g, "-");
  return `badge stage-${slug}`;
}

export default function CalendarPage() {
  const md = readContentFile("content-calendar.md");
  const { headers, rows } = parseMarkdownTable(md);

  return (
    <div className="shell">
      <h1>Content Calendar</h1>
      <p>Tracks every video&apos;s progress through the line. Edited by hand as videos move stages.</p>

      {rows.length === 0 ? (
        <p>No videos tracked yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    {j === 2 ? (
                      <span className={stageBadgeClass(cell)}>{cell || "—"}</span>
                    ) : (
                      cell || "—"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
