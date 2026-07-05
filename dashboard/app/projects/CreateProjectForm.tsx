"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CHANNELS } from "../../lib/channels";

export default function CreateProjectForm({ activeChannel }: { activeChannel: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [targetDay, setTargetDay] = useState("");
  const [channel, setChannel] = useState(activeChannel);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, targetDay, channel }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong");
      return;
    }
    const project = await res.json();
    setTitle("");
    setTargetDay("");
    router.push(`/projects/${project.slug}`);
    router.refresh();
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>New project</h3>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Working title (e.g. Anxiety Relief Sleep Meditation)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            flex: 2,
            minWidth: 220,
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        />
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        >
          {CHANNELS.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Target day (optional, e.g. Tue)"
          value={targetDay}
          onChange={(e) => setTargetDay(e.target.value)}
          style={{
            flex: 1,
            minWidth: 140,
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        />
        <button
          type="submit"
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
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
      {error && <p className="login-error" style={{ marginTop: 10 }}>{error}</p>}
    </form>
  );
}
