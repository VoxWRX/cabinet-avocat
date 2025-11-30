// src/app/(dashboard)/dashboard/dossiers/page.tsx
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Plus, FolderOpen, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const prisma = new PrismaClient();

// Fonction pour donner une couleur selon le statut du dossier
function getStatusBadge(status: string) {
  switch (status) {
    case "OUVERT":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          Nouveau
        </Badge>
      );
    case "EN_COURS":
      return <Badge className="bg-blue-600 hover:bg-blue-700">En cours</Badge>;
    case "JUGE":
      return <Badge className="bg-green-600 hover:bg-green-700">Jugé</Badge>;
    case "ARCHIVE":
      return <Badge variant="secondary">Archivé</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default async function DossiersPage() {
  // On récupère les dossiers en incluant les infos du Client
  const dossiers = await prisma.dossier.findMany({
    orderBy: {
      updatedAt: "desc", // Les dossiers modifiés récemment en premier
    },
    include: {
      client: true, // Indispensable pour afficher le nom du client
    },
  });

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Gestion des Dossiers
          </h1>
          <p className="text-sm text-slate-500">
            Suivez vos affaires en cours et archivées.
          </p>
        </div>
        <Link href="/dashboard/dossiers/nouveau">
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="mr-2 h-4 w-4" /> Nouveau Dossier
          </Button>
        </Link>
      </div>

      {/* Barre d'outils (Recherche) - Visuel pour l'instant */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm max-w-md">
        <Search className="h-4 w-4 text-slate-400 ml-2" />
        <Input
          placeholder="Rechercher par référence, client ou tribunal..."
          className="border-0 focus-visible:ring-0"
        />
      </div>

      {/* Le Tableau des données */}
      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[100px]">Référence</TableHead>
              <TableHead>Titre de l'affaire</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Tribunal</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Date d'ouverture</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dossiers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-slate-500"
                >
                  Aucun dossier trouvé. Créez-en un pour commencer.
                </TableCell>
              </TableRow>
            ) : (
              dossiers.map((dossier) => (
                <TableRow
                  key={dossier.id}
                  className="cursor-pointer hover:bg-slate-50"
                >
                  <TableCell>
                    {/* On ajoute le Link autour du titre */}
                    <Link
                      href={`/dashboard/dossiers/${dossier.id}`}
                      className="hover:underline text-blue-700"
                    >
                      <div className="font-medium">{dossier.titre}</div>
                    </Link>
                    {dossier.numTribunal && (
                      <div className="text-xs text-slate-400">
                        N° Trib: {dossier.numTribunal}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">
                      {dossier.titre}
                    </div>
                    {dossier.numTribunal && (
                      <div className="text-xs text-slate-400">
                        N° Trib: {dossier.numTribunal}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {dossier.client.type === "MORALE" ? (
                      <div className="flex items-center gap-1">
                        <FolderOpen size={14} className="text-blue-500" />{" "}
                        {dossier.client.lastName}
                      </div>
                    ) : (
                      <div className="font-medium">
                        {dossier.client.firstName} {dossier.client.lastName}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {dossier.tribunal || "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(dossier.status)}</TableCell>
                  <TableCell className="text-right text-sm text-slate-500">
                    {new Date(dossier.dateOuverture).toLocaleDateString(
                      "fr-MA"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
