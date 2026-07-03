"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STAGES } from "../../../lib/store";

export default function StageSelector({ slug, stage }: { slug: string; stage: string }) {
  const router = useRouter();
  const [current, setCurrent] = useState(stage);
  const [saving, setSaving] = useState(false);

  async function updateStage(next: string) {
    setCurrent(next);
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: next }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      {STAGES.map((s) => (
        <button
          key={s}
          onClick={() => updateStage(s)}
          disabled={saving}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: s === current ? "1px solid var(--amber)" : "1px solid var(--border)",
            background: s === current ? "rgba(211, 161, 92, 0.18)" : "transparent",
            color: s === current ? "var(--amber)" : "var(--text-dim)",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
