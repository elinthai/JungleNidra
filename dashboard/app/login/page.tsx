"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const result = await signIn("credentials", {
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError(true);
      return;
    }
    window.location.href = from;
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Jungle Nidra</h1>
        <p className="login-sub">Production workbench</p>
        <input
          type="password"
          placeholder="Password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="login-error">Wrong password — try again.</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
