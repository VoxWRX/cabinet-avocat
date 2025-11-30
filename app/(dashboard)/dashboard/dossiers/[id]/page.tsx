// src/app/(dashboard)/dashboard/dossiers/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Gavel,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddAudienceDialog } from "@/components/dashboard/add-audience-dialog";

const prisma = new PrismaClient();

export default async function DossierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. On attend que les paramètres soient disponibles (Spécifique Next.js 15)
  const { id } = await params;

  // 2. On récupère TOUT ce qui concerne ce dossier
  const dossier = await prisma.dossier.findUnique({
    where: { id },
    include: {
      client: true,
      audiences: {
        orderBy: { date: "desc" }, // Audiences récentes en premier
      },
    },
  });

  // Si l'ID est invalide
  if (!dossier) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* --- EN-TÊTE --- */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/dossiers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {dossier.titre}
            </h1>
            <Badge
              variant={dossier.status === "EN_COURS" ? "default" : "secondary"}
            >
              {dossier.status}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 flex gap-4 mt-1">
            <span className="flex items-center gap-1">
              <FileText size={14} /> Réf: {dossier.refCabinet}
            </span>
            <span className="flex items-center gap-1">
              <Gavel size={14} /> {dossier.tribunal || "Tribunal non spécifié"}
            </span>
          </p>
        </div>
        <Button className="bg-blue-900">Modifier</Button>
      </div>

      {/* --- CONTENU AVEC ONGLETS --- */}
      <Tabs defaultValue="infos" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="infos"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-4 py-3"
          >
            Informations
          </TabsTrigger>
          <TabsTrigger
            value="audiences"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-4 py-3"
          >
            Audiences ({dossier.audiences.length})
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-4 py-3"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        {/* --- ONGLET 1 : INFOS GÉNÉRALES --- */}
        <TabsContent value="infos" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-blue-500" /> Client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-medium">
                  {dossier.client.type === "MORALE"
                    ? dossier.client.lastName
                    : `${dossier.client.firstName} ${dossier.client.lastName}`}
                </div>
                <div className="text-sm text-slate-500">
                  <p>Email: {dossier.client.email || "-"}</p>
                  <p>Tél: {dossier.client.phone || "-"}</p>
                  <p>Ville: {dossier.client.city || "-"}</p>
                  {dossier.client.cin && <p>CIN: {dossier.client.cin}</p>}
                  {dossier.client.ice && <p>ICE: {dossier.client.ice}</p>}
                </div>
                <Link
                  href={`/dashboard/clients/${dossier.client.id}`}
                  className="text-sm text-blue-600 hover:underline block mt-2"
                >
                  Voir la fiche client complète
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-blue-500" /> Détails
                  Juridiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Numéro Tribunal
                    </p>
                    <p>{dossier.numTribunal || "Non attribué"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Date d'ouverture
                    </p>
                    <p>
                      {new Date(dossier.dateOuverture).toLocaleDateString(
                        "fr-MA"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- ONGLET 2 : AUDIENCES --- */}
        <TabsContent value="audiences" className="mt-6">
          <Card>
            {/* En-tête de la carte avec le bouton Dialogue intégré */}
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Historique des audiences</CardTitle>
              <AddAudienceDialog dossierId={dossier.id} />
            </CardHeader>

            <CardContent>
              {dossier.audiences.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">
                  Aucune audience programmée pour ce dossier.
                </p>
              ) : (
                <div className="space-y-4">
                  {dossier.audiences.map((audience) => (
                    <div
                      key={audience.id}
                      className="flex items-start gap-4 p-4 border rounded-lg bg-slate-50"
                    >
                      <div className="flex flex-col items-center justify-center bg-white border rounded p-2 min-w-[60px]">
                        <span className="text-xs font-bold text-red-500">
                          {new Date(audience.date)
                            .toLocaleDateString("fr-FR", { month: "short" })
                            .toUpperCase()}
                        </span>
                        <span className="text-xl font-bold text-slate-900">
                          {new Date(audience.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {audience.description || "Audience"}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />{" "}
                            {new Date(audience.date).toLocaleTimeString(
                              "fr-MA",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {audience.lieu || "Tribunal"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ONGLET 3 : DOCUMENTS (Placeholder) --- */}
        <TabsContent value="documents" className="mt-6">
          <div className="p-8 border-2 border-dashed rounded-lg text-center text-slate-400">
            Module de gestion documentaire (GED) à venir...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
