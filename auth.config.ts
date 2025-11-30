// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // L'adresse de notre future page de connexion
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirige vers /login
      } else if (isLoggedIn && nextUrl.pathname === "/login") {
        // Si on est déjà connecté et qu'on va sur login, on va au dashboard
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // On configure les providers dans l'autre fichier
} satisfies NextAuthConfig;
