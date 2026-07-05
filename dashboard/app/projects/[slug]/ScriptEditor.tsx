"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScriptEditor({ slug, script }: { slug: string; script?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(script ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ script: value }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Script</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        rows={14}
        placeholder="Generate a script above, or paste/write one here..."
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
