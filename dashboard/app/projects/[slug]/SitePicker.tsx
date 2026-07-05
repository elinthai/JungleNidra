"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocationCategory } from "../../../lib/store";

export default function SitePicker({
  slug,
  categories,
  scoutedSites,
}: {
  slug: string;
  categories: LocationCategory[];
  scoutedSites: string[];
}) {
  const router = useRouter();
  const [picked, setPicked] = useState(new Set(scoutedSites));
  const [saving, setSaving] = useState(false);

  async function toggle(siteName: string) {
    const next = new Set(picked);
    if (next.has(siteName)) next.delete(siteName);
    else next.add(siteName);
    setPicked(next);
    setSaving(true);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scoutedSites: Array.from(next) }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="card">
      <p style={{ marginTop: 0, marginBottom: 12, fontSize: 13, color: "var(--text-dim)" }}>
        {picked.size} site{picked.size === 1 ? "" : "s"} picked{saving ? " · saving…" : ""}
      </p>
      {categories.map((category) => (
        <div key={category.category} style={{ marginBottom: 14 }}>
          <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 600 }}>{category.category}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {category.sites.map((site) => (
              <label key={site.name} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={picked.has(site.name)}
                  onChange={() => toggle(site.name)}
                />
                <span style={{ fontSize: 14 }}>
                  {site.name}
                  {site.shot ? " (already shot)" : ""}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
