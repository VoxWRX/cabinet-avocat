// src/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Cette regex permet d'éviter de protéger les fichiers statiques (images, css...)
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
