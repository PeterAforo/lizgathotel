import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.adminUser.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            console.error("[Auth] No user found for email:", credentials.email);
            return null;
          }

          if (!user.isActive) {
            console.error("[Auth] Account deactivated:", credentials.email);
            return null;
          }

          const isValid = await compare(credentials.password as string, user.passwordHash);
          if (!isValid) {
            console.error("[Auth] Invalid password for:", credentials.email);
            return null;
          }

          // Update last login time
          await prisma.adminUser.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          }).catch(() => {});

          // Log login activity
          await prisma.activityLog.create({
            data: {
              userId: user.id,
              action: "LOGIN",
              target: `Admin login: ${user.email}`,
            },
          }).catch(() => {});

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("[Auth] authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
