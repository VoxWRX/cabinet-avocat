// src/app/actions/dossiers.ts
"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// 1. Définition du schéma de validation
const DossierSchema = z.object({
  titre: z.string().min(3, "Le titre doit faire au moins 3 caractères"),
  refCabinet: z.string().min(1, "La référence est obligatoire"),
  tribunal: z.string().optional(),
  clientId: z.string().min(1, "Veuillez sélectionner un client"),
});

// 2. La fonction qui reçoit les données du formulaire
export async function createDossier(formData: FormData) {
  // On transforme le FormData en objet simple
  const rawData = {
    titre: formData.get("titre"),
    refCabinet: formData.get("refCabinet"),
    tribunal: formData.get("tribunal"),
    clientId: formData.get("clientId"),
  };

  // On valide les données
  const validatedData = DossierSchema.safeParse(rawData);

  if (!validatedData.success) {
    // En cas d'erreur, on pourrait renvoyer les erreurs (simplifié ici)
    throw new Error("Données invalides");
  }

  // On insère en base de données
  await prisma.dossier.create({
    data: {
      titre: validatedData.data.titre,
      refCabinet: validatedData.data.refCabinet,
      tribunal: validatedData.data.tribunal || null,
      clientId: validatedData.data.clientId,
      status: "OUVERT",
    },
  });

  // On rafraîchit la liste des dossiers pour voir le nouveau venu
  revalidatePath("/dashboard/dossiers");

  // On redirige l'utilisateur vers la liste
  redirect("/dashboard/dossiers");
}
