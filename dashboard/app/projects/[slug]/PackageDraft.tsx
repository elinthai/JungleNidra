"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid var(--border)",
  background: "var(--bg)",
  color: "var(--text)",
  fontFamily: "inherit",
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: "var(--amber)",
  color: "#1a1206",
  fontWeight: 600,
  cursor: "pointer",
};

export default function PackageDraft({
  slug,
  titleOptions,
  thumbnailConcept,
  openingLines,
  packageStatus,
}: {
  slug: string;
  titleOptions?: string[];
  thumbnailConcept?: string;
  openingLines?: string;
  packageStatus?: "draft" | "approved";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chosenTitle, setChosenTitle] = useState(titleOptions?.[0] ?? "");
  const [thumbnail, setThumbnail] = useState(thumbnailConcept ?? "");
  const [opening, setOpening] = useState(openingLines ?? "");

  async function generatePackage() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/projects/${slug}/generate-package`, { method: "POST" });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong");
      return;
    }
    router.refresh();
  }

  async function approvePackage() {
    setLoading(true);
    setError(null);
    await fetch(`/api/projects/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: chosenTitle,
        thumbnailConcept: thumbnail,
        openingLines: opening,
        packageStatus: "approved",
      }),
    });
    const res = await fetch(`/api/projects/${slug}/generate-script`, { method: "POST" });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Package approved, but script generation failed");
      return;
    }
    router.refresh();
  }

  if (packageStatus === "approved") {
    return (
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Package (approved)</h3>
        <p style={{ margin: 0, fontSize: 13 }}>
          <strong>Thumbnail:</strong> {thumbnailConcept}
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 13 }}>
          <strong>Opening lines:</strong> {openingLines}
        </p>
      </div>
    );
  }

  if (!titleOptions || titleOptions.length === 0) {
    return (
      <div style={{ marginBottom: 16 }}>
        <button onClick={generatePackage} disabled={loading} style={buttonStyle}>
          {loading ? "Generating..." : "Generate package"}
        </button>
        {error && <p className="login-error" style={{ marginTop: 10 }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Package draft — review before scripting</h3>
      <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Title</label>
      <select
        value={chosenTitle}
        onChange={(e) => setChosenTitle(e.target.value)}
        style={{ ...inputStyle, marginBottom: 12 }}
      >
        {titleOptions.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Thumbnail concept</label>
      <textarea
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        rows={3}
        style={{ ...inputStyle, marginBottom: 12, resize: "vertical" }}
      />

      <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Opening lines</label>
      <textarea
        value={opening}
        onChange={(e) => setOpening(e.target.value)}
        rows={4}
        style={{ ...inputStyle, marginBottom: 12, resize: "vertical" }}
      />

      <button onClick={approvePackage} disabled={loading} style={buttonStyle}>
        {loading ? "Approving & scripting..." : "Approve package & write script"}
      </button>
      {error && <p className="login-error" style={{ marginTop: 10 }}>{error}</p>}
    </div>
  );
}
