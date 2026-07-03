import type { NextAuthConfig } from "next-auth";

// Edge-safe config used by middleware — no providers/bcrypt here, those need
// the Node.js runtime and live in auth.ts instead.
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [],
};
