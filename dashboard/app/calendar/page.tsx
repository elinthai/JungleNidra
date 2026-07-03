import { getProjects } from "../../lib/store";

export const dynamic = "force-dynamic";

function stageBadgeClass(stage: string): string {
  const slug = stage.trim().toLowerCase().replace(/\s+/g, "-");
  return `badge stage-${slug}`;
}

export default async function CalendarPage() {
  const projects = await getProjects();
  const sorted = [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="shell">
      <h1>Content Calendar</h1>
      <p>
        Live view of every project&apos;s stage — same data as{" "}
        <a href="/projects">/projects</a>, table-formatted. This is the one real record;
        the git-tracked <code>content-calendar.md</code> is a point-in-time snapshot, not
        read live anymore.
      </p>

      {sorted.length === 0 ? (
        <p>No projects yet — create one on <a href="/projects">/projects</a>.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Slug</th>
              <th>Title</th>
              <th>Stage</th>
              <th>Target day</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.slug}>
                <td>
                  <a href={`/projects/${p.slug}`}>{p.slug}</a>
                </td>
                <td>{p.title}</td>
                <td>
                  <span className={stageBadgeClass(p.stage)}>{p.stage}</span>
                </td>
                <td>{p.targetDay || "—"}</td>
                <td style={{ maxWidth: 320 }}>{p.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
