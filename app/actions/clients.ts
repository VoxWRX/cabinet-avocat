// src/app/actions/clients.ts
"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// CORRECTION : On utilise .nullish() partout pour accepter les champs cachés ou vides
const ClientSchema = z.object({
  type: z.enum(["PHYSIQUE", "MORALE"]),
  lastName: z.string().min(2, "Le nom ou raison sociale est requis"),

  // .nullish() permet d'accepter null (si le champ est caché) ou string
  firstName: z.string().nullish(),

  // Pour l'email, on accepte vide ('') ou null ou un email valide
  email: z.union([z.literal(""), z.email(), z.null(), z.undefined()]),

  phone: z.string().nullish(),
  address: z.string().nullish(),
  city: z.string().nullish(),

  // Champs Maroc
  cin: z.string().nullish(),
  ice: z.string().nullish(),
  rc: z.string().nullish(),
});

export async function createClient(formData: FormData) {
  const rawData = {
    type: formData.get("type"),
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    cin: formData.get("cin"),
    ice: formData.get("ice"),
    rc: formData.get("rc"),
  };

  const validated = ClientSchema.safeParse(rawData);

  if (!validated.success) {
    console.error("❌ ERREUR DE VALIDATION :", z.treeifyError(validated.error));
    throw new Error("Veuillez vérifier les champs obligatoires.");
  }

  // Insertion en base de données
  // L'opérateur "|| null" garantit qu'on envoie null à la DB si le champ est undefined
  await prisma.client.create({
    data: {
      type: validated.data.type,
      lastName: validated.data.lastName,
      firstName: validated.data.firstName || null,
      email: validated.data.email || null,
      phone: validated.data.phone || null,
      address: validated.data.address || null,
      city: validated.data.city || null,
      cin: validated.data.cin || null,
      ice: validated.data.ice || null,
      rc: validated.data.rc || null,
    },
  });

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}
