// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seeding...");

  // 1. Créer un client Entreprise (Société)
  const socImmo = await prisma.client.create({
    data: {
      type: "MORALE",
      lastName: "Société Immobilière du Nord SARL",
      ice: "00156789000034",
      email: "contact@immo-nord.ma",
      city: "Tanger",
      dossiers: {
        create: {
          refCabinet: "D-2024-001",
          titre: "Litige Foncier Terrain Ain Diab",
          tribunal: "TPI Casablanca",
          status: "EN_COURS",
          audiences: {
            create: {
              date: new Date("2025-12-15T09:00:00"),
              description: "Retour d'expertise technique",
              lieu: "Salle 4",
            },
          },
        },
      },
    },
  });

  // 2. Créer un client Particulier
  const mrAlami = await prisma.client.create({
    data: {
      type: "PHYSIQUE",
      firstName: "Karim",
      lastName: "BENJELOUN",
      cin: "AB123456",
      city: "Casablanca",
      phone: "0661000000",
      dossiers: {
        create: {
          refCabinet: "D-2024-002",
          titre: "Divorce Benjeloun c/ Mme X",
          tribunal: "Tribunal de la Famille Casa",
          status: "OUVERT",
        },
      },
    },
  });

  console.log(`✅ Base de données peuplée avec succès !`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
