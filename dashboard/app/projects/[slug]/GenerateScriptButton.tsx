"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateScriptButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/projects/${slug}/generate-script`, { method: "POST" });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong");
      return;
    }
    router.refresh();
  }

  return (
    <div style={{ marginBottom: 16 }}>
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
        {loading ? "Generating..." : "Generate script"}
      </button>
      {error && <p className="login-error" style={{ marginTop: 10 }}>{error}</p>}
    </div>
  );
}
