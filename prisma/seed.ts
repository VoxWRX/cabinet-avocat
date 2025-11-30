// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seeding...");

  // 1. On crypte le mot de passe
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 2. On crée ou met à jour l'admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@cabinet.ma" },
    update: {
      password: hashedPassword, // Force la mise à jour du mot de passe
    },
    create: {
      email: "admin@cabinet.ma",
      name: "Maître ALAMI",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`👤 Admin mis à jour avec succès: ${admin.email}`);
}

// C'est cette partie qui posait problème. Voici la syntaxe correcte :
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
