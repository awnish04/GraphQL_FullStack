// "use server";

// import { signIn,signOut } from "@/auth";

// export const login = async () => {
//     await signIn("github", { redirectTo:"/dashboard" });
// };
// export const logout = async () => {
//     await signOut({ redirectTo:"/" });
// };

// lib/actions/auth.ts
// "use server";

// import { redirect } from "next/navigation";
// import { auth, signIn, signOut } from "@/auth"; // ← from your auth.ts

// export const login = async () => {
//   await signIn("github", { redirectTo: "/dashboard" });
// };

// export const logout = async () => {
//   await signOut({ redirectTo: "/" });
// };

// lib/actions/auth.ts
"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};