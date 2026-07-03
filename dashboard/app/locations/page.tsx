import { getLocations } from "../../lib/store";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const categories = await getLocations();

  return (
    <div className="shell">
      <h1>Location Library</h1>
      <p>
        40 b-roll sites across Koh Samui — 10 per category. Live record (Blob-backed) —
        checking a site off here happens automatically when you upload footage/stills on{" "}
        <a href="/projects">a project</a> and label it with a matching site name.
        <code>04-recording-assets/location-library.md</code> in git is the original
        seed list, not read live anymore.
      </p>

      <div className="grid">
        {categories.map((category) => {
          const shot = category.sites.filter((s) => s.shot).length;
          const total = category.sites.length;
          const pct = total > 0 ? Math.round((shot / total) * 100) : 0;
          return (
            <div className="card" key={category.category}>
              <h3>{category.category}</h3>
              <div className="stat-value" style={{ fontSize: 20 }}>
                {shot}/{total}
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <ul style={{ paddingLeft: 18, marginTop: 14 }}>
                {category.sites.map((site) => (
                  <li key={site.name}>
                    {site.shot ? "✓ " : "· "}
                    {site.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
