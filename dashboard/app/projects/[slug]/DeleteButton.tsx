"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete project "${slug}"? This can't be undone.`)) return;
    await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    router.push("/projects");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--text-dim)",
        cursor: "pointer",
        fontSize: 13,
      }}
    >
      Delete project
    </button>
  );
}
