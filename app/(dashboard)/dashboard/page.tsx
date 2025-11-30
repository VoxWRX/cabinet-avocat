// src/app/(dashboard)/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

// On initialise Prisma
const prisma = new PrismaClient();

// Cette page devient "async" pour pouvoir charger les données
export default async function DashboardPage() {
  // 1. On récupère les compteurs réels depuis la base de données
  const totalDossiers = await prisma.dossier.count();

  const dossiersEnCours = await prisma.dossier.count({
    where: { status: "EN_COURS" },
  });

  const totalClients = await prisma.client.count();

  // On cherche la prochaine audience (la première dans le futur)
  const prochaineAudience = await prisma.audience.findFirst({
    where: {
      date: {
        gte: new Date(), // Date supérieure ou égale à maintenant
      },
    },
    orderBy: {
      date: "asc", // La plus proche en premier
    },
    include: {
      dossier: true, // On veut aussi les infos du dossier lié
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Tableau de bord
        </h2>
        <p className="text-sm text-slate-500">Bienvenue Maître.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Carte Dossiers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dossiers Totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDossiers}</div>
            <p className="text-xs text-muted-foreground">
              Dont {dossiersEnCours} actifs actuellement
            </p>
          </CardContent>
        </Card>

        {/* Carte Audiences */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prochaine Audience
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prochaineAudience ? (
              <>
                <div className="text-lg font-bold text-red-600">
                  {prochaineAudience.date.toLocaleDateString("fr-MA")}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {prochaineAudience.dossier.titre}
                </p>
                <p className="text-xs font-medium mt-1">
                  {prochaineAudience.lieu || "Tribunal"}
                </p>
              </>
            ) : (
              <div className="text-sm text-slate-500">
                Aucune audience prévue
              </div>
            )}
          </CardContent>
        </Card>

        {/* Carte Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Base Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">Clients enregistrés</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
