"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublishForm({
  slug,
  publishUrl,
  publishedAt,
}: {
  slug: string;
  publishUrl?: string;
  publishedAt?: string;
}) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publishUrl: url }),
    });
    setSaving(false);
    router.refresh();
  }

  async function handleClear() {
    if (!confirm("Clear the published link? This won't change the stage back.")) return;
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publishUrl: "" }),
    });
    setSaving(false);
    router.refresh();
  }

  if (publishUrl) {
    return (
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Published</h3>
        <p style={{ margin: 0 }}>
          <a href={publishUrl} target="_blank" rel="noreferrer">
            {publishUrl}
          </a>
        </p>
        {publishedAt && (
          <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 6 }}>
            Recorded {new Date(publishedAt).toLocaleString()}
          </p>
        )}
        <button
          onClick={handleClear}
          disabled={saving}
          style={{
            marginTop: 10,
            padding: "5px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-dim)",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Clear (mistake)
        </button>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Publish</h3>
      <p style={{ fontSize: 13, marginTop: 0 }}>
        Once this video is live on YouTube, paste the link here — sets the stage to
        &quot;Uploaded&quot; automatically.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        />
        <button
          type="submit"
          disabled={saving}
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
          {saving ? "Saving..." : "Mark published"}
        </button>
      </div>
    </form>
  );
}
