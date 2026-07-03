"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: "/login" });
      }}
    >
      Sign out
    </a>
  );
}
