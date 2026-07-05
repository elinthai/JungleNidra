import { getProjects, getOpenSteps } from "../../lib/store";

export const dynamic = "force-dynamic";

export default async function TodoPage() {
  const projects = await getProjects();
  const steps = getOpenSteps(projects);

  const grouped = new Map<string, typeof steps>();
  for (const step of steps) {
    const list = grouped.get(step.stage) || [];
    list.push(step);
    grouped.set(step.stage, list);
  }

  return (
    <div className="shell">
      <h1>Todo</h1>
      <p>
        Every unchecked step, across every active project, sorted by stage. This is a
        byproduct of project state — nothing to maintain here directly. Check items off on
        each project&apos;s page (<a href="/projects">/projects</a>) and they disappear from
        this list.
      </p>

      {steps.length === 0 ? (
        <p>Nothing open — every active project is fully checked off at its current stage.</p>
      ) : (
        Array.from(grouped.entries()).map(([stage, items]) => (
          <div key={stage} style={{ marginBottom: 24 }}>
            <h2>{stage}</h2>
            <div className="grid">
              {items.map((step, i) => (
                <div className="card" key={`${step.slug}-${i}`}>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--text-dim)" }}>
                    <a href={`/projects/${step.slug}`}>{step.title}</a>
                  </p>
                  <p style={{ margin: "6px 0 0", fontSize: 14 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <p style={{ marginTop: 32, fontSize: 13 }}>
        Looking for the system build log? See <a href="/changelog">/changelog</a>.
      </p>
    </div>
  );
}
