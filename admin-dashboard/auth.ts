// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id?: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// export const { auth, handlers, signIn, signOut } = NextAuth({
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60, // 1 hour session expiration
//   },
//   pages: {
//     signIn: "/", // redirects unauthorized users to login page
//   },
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
//     },
//   },
// });


// auth.ts (in project root)
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      return url.startsWith("/") ? `${baseUrl}/dashboard` : url;
    },
  },
});