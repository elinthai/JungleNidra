"use client";

import { useRouter } from "next/navigation";
import { CHANNELS } from "../lib/channels";

export default function ChannelSwitcher({ activeChannel }: { activeChannel: string }) {
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    document.cookie = `active_channel=${e.target.value}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <select
      value={activeChannel}
      onChange={onChange}
      style={{
        padding: "4px 8px",
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "var(--bg)",
        color: "var(--text)",
        fontSize: 13,
      }}
    >
      {CHANNELS.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
