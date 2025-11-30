// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Assurez-vous que l'alias @ fonctionne, sinon mettez "../../../auth"

export const GET = handlers.GET;
export const POST = handlers.POST;
