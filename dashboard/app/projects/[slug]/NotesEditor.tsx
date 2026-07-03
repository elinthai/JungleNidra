"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotesEditor({ slug, notes }: { slug: string; notes?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(notes ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: value }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Notes</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        rows={4}
        placeholder="Anything worth remembering about this video's production..."
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid var(--border)",
          background: "var(--bg)",
          color: "var(--text)",
          fontFamily: "inherit",
          resize: "vertical",
        }}
      />
      {saving && <p style={{ color: "var(--text-dim)", fontSize: 12, marginTop: 6 }}>Saving...</p>}
    </div>
  );
}
