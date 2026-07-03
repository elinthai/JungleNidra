"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

export default function UploadForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<"raw-footage" | "still">("raw-footage");
  const [siteName, setSiteName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError(null);
    setProgress("Uploading...");
    try {
      await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        clientPayload: JSON.stringify({ slug, kind, siteName: siteName || undefined }),
      });
      setProgress("Done");
      setFile(null);
      setSiteName("");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleUpload}>
      <h3 style={{ marginTop: 0 }}>Upload footage or stills</h3>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="file"
          accept="video/*,image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as "raw-footage" | "still")}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        >
          <option value="raw-footage">Raw footage</option>
          <option value="still">Still</option>
        </select>
        <input
          type="text"
          placeholder="Site name (e.g. Na Muang 1)"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text)",
            flex: 1,
            minWidth: 160,
          }}
        />
        <button
          type="submit"
          disabled={uploading || !file}
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
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {progress && !error && <p style={{ color: "var(--text-dim)", marginTop: 10 }}>{progress}</p>}
      {error && <p className="login-error" style={{ marginTop: 10 }}>{error}</p>}
    </form>
  );
}
