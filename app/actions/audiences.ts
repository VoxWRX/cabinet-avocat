// src/app/actions/audiences.ts
"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const AudienceSchema = z.object({
  dossierId: z.string(),
  date: z.string().transform((str) => new Date(str)), // On convertit la string du formulaire en Date
  description: z.string().min(1, "La description est requise"),
  lieu: z.string().optional(),
});

export async function createAudience(formData: FormData) {
  const rawData = {
    dossierId: formData.get("dossierId"),
    date: formData.get("date"),
    description: formData.get("description"),
    lieu: formData.get("lieu"),
  };

  const validated = AudienceSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error("Données invalides");
  }

  await prisma.audience.create({
    data: {
      dossierId: validated.data.dossierId,
      date: validated.data.date,
      description: validated.data.description,
      lieu: validated.data.lieu || "Tribunal",
    },
  });

  // On rafraîchit la page du dossier pour voir la nouvelle audience apparaître
  revalidatePath(`/dashboard/dossiers/${validated.data.dossierId}`);
}
