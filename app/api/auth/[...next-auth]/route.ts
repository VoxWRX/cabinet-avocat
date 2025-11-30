import { handlers } from "@/auth";

export const { GET, POST } = handlers;
export const runtime = "nodejs"; // <--- AJOUTEZ CECI pour forcer Node.js (évite les erreurs Edge/Prisma)
