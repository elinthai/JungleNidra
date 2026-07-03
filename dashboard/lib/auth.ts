import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { password: { label: "Password", type: "password" } },
      authorize: async (credentials) => {
        const encoded = process.env.AUTH_PASSWORD_HASH_B64;
        const password = credentials?.password as string | undefined;
        if (!encoded || !password) return null;
        const hash = Buffer.from(encoded, "base64").toString("utf-8");
        const valid = await bcrypt.compare(password, hash);
        if (!valid) return null;
        return { id: "eli", name: "Eli" };
      },
    }),
  ],
});
