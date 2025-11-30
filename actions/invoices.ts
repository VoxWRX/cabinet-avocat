// src/app/actions/invoices.ts
"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const InvoiceSchema = z.object({
  dossierId: z.string().min(1, "Dossier obligatoire"),
  montantHT: z.coerce.number().min(1, "Le montant doit être positif"), // z.coerce transforme le string "1000" en nombre 1000
  tva: z.coerce.number(), // 10 ou 20
});

export async function createInvoice(formData: FormData) {
  const rawData = {
    dossierId: formData.get("dossierId"),
    montantHT: formData.get("montantHT"),
    tva: formData.get("tva"),
  };

  const validated = InvoiceSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error("Données invalides");
  }

  // Calculs financiers
  const ht = validated.data.montantHT;
  const tauxTva = validated.data.tva; // ex: 10
  const montantTTC = ht * (1 + tauxTva / 100);

  // Génération d'un numéro de facture (très simplifié ici)
  // Dans un vrai projet, on chercherait le dernier numéro + 1
  const count = await prisma.facture.count();
  const numeroFacture = `FAC-${new Date().getFullYear()}-${String(
    count + 1
  ).padStart(3, "0")}`;

  await prisma.facture.create({
    data: {
      numero: numeroFacture,
      montantHT: ht,
      tva: tauxTva,
      montantTTC: montantTTC,
      status: "ENVOYEE", // Par défaut
      dossierId: validated.data.dossierId,
    },
  });

  revalidatePath("/dashboard/finances");
  redirect("/dashboard/finances");
}
