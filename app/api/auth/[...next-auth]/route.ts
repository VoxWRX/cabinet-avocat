// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // On importe les handlers qu'on vient d'exporter

export const { GET, POST } = handlers;
