"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StageChecklistItem } from "../../../lib/store";

export default function StageChecklist({
  slug,
  stage,
  items,
  completed,
  previousStage,
}: {
  slug: string;
  stage: string;
  items: StageChecklistItem[];
  completed: string[];
  previousStage: string | null;
}) {
  const router = useRouter();
  const [done, setDone] = useState(new Set(completed));
  const [saving, setSaving] = useState(false);

  async function toggle(itemId: string) {
    const checked = !done.has(itemId);
    const next = new Set(done);
    if (checked) next.add(itemId);
    else next.delete(itemId);
    setDone(next);
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toggleStep: { stage, itemId, checked } }),
    });
    setSaving(false);
    router.refresh();
  }

  async function goBack() {
    if (!previousStage) return;
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: previousStage }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="card">
      {items.length > 0 && (
        <>
          <p style={{ marginTop: 0, marginBottom: 12, fontSize: 13, color: "var(--text-dim)" }}>
            {done.size}/{items.length} done
            {saving ? " · saving…" : ""}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item) => (
              <label key={item.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={done.has(item.id)}
                  onChange={() => toggle(item.id)}
                  style={{ marginTop: 3 }}
                />
                <span style={{ fontSize: 14, textDecoration: done.has(item.id) ? "line-through" : "none", opacity: done.has(item.id) ? 0.6 : 1 }}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
      {previousStage && (
        <button
          onClick={goBack}
          disabled={saving}
          style={{
            marginTop: 16,
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-dim)",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          ◀ Back to {previousStage}
        </button>
      )}
    </div>
  );
}
