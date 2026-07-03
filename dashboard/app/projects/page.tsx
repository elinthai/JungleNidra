import { getProjects } from "../../lib/store";
import CreateProjectForm from "./CreateProjectForm";

export const dynamic = "force-dynamic";

function stageBadgeClass(stage: string): string {
  const slug = stage.trim().toLowerCase().replace(/\s+/g, "-");
  return `badge stage-${slug}`;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const sorted = [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="shell">
      <h1>Projects</h1>
      <p>
        Your workbench. Create a project per video, then upload raw footage/stills here
        as they come back from the shoot. Slug matches what <code>/jn-production-line</code>{" "}
        uses for the script/package files in the repo.
      </p>

      <CreateProjectForm />

      <h2>All projects</h2>
      {sorted.length === 0 ? (
        <p>No projects yet — create one above.</p>
      ) : (
        <div className="grid">
          {sorted.map((p) => (
            <a
              className="card"
              href={`/projects/${p.slug}`}
              key={p.slug}
              style={{ display: "block" }}
            >
              <h3 style={{ marginTop: 0 }}>{p.title}</h3>
              <span className={stageBadgeClass(p.stage)}>{p.stage}</span>
              <p style={{ marginTop: 10, fontSize: 13 }}>
                {p.assets.length} asset{p.assets.length === 1 ? "" : "s"}
                {p.targetDay ? ` · Target: ${p.targetDay}` : ""}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
