"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreatedIdea {
  slug: string;
  title: string;
}

export default function ResearchAgentButton() {
  const router = useRouter();
  const [angle, setAngle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedIdea[] | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setCreated(null);
    const res = await fetch("/api/research/generate-ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ angle }),
    });
    const body = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(body.error || "Something went wrong");
      return;
    }
    setCreated(body.created);
    router.refresh();
  }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <h3 style={{ marginTop: 0 }}>Research agent — batch idea generation</h3>
      <p style={{ fontSize: 13, marginTop: 0 }}>
        Runs a live-search demand check and drops 15-20 validated ideas straight into the
        calendar at &quot;Idea&quot; stage. Meant to run weekly to keep a standing backlog —
        not per video.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Optional angle/theme (e.g. waterfall, anxiety) — blank = broad scan"
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          style={{
            flex: 1,
            minWidth: 240,
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        />
        <button
          onClick={generate}
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            background: "var(--amber)",
            color: "#1a1206",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "Researching..." : "Generate ideas"}
        </button>
      </div>
      {error && <p className="login-error" style={{ marginTop: 10 }}>{error}</p>}
      {created && (
        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 13, margin: 0 }}>
            {created.length} idea{created.length === 1 ? "" : "s"} added to the calendar:
          </p>
          <ul style={{ marginTop: 6 }}>
            {created.map((c) => (
              <li key={c.slug} style={{ fontSize: 13 }}>
                <a href={`/projects/${c.slug}`}>{c.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
