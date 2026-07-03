export default function LoginPage({
  searchParams,
}: {
  searchParams: { from?: string; error?: string };
}) {
  const from = searchParams.from ?? "/";
  const hasError = searchParams.error === "1";

  return (
    <div className="login-wrap">
      <form className="login-card" action="/api/login" method="POST">
        <h1>Jungle Nidra</h1>
        <p className="login-sub">Production dashboard</p>
        <input type="hidden" name="from" value={from} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
        />
        {hasError && <p className="login-error">Wrong password — try again.</p>}
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
