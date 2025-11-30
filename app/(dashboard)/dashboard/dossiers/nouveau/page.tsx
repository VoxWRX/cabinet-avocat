// src/app/(dashboard)/dashboard/dossiers/nouveau/page.tsx
import { PrismaClient } from "@prisma/client";
import { createDossier } from "@/app/actions/dossiers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Si on utilisait le Select Shadcn, mais pour simplifier le Server Action natif on va utiliser un select natif stylisé au début, ou ruser.

const prisma = new PrismaClient();

export default async function NouveauDossierPage() {
  // On charge les clients pour la liste déroulante
  const clients = await prisma.client.findMany({
    orderBy: { lastName: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau Dossier</CardTitle>
          <CardDescription>
            Créez une nouvelle affaire et associez-la à un client existant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* L'attribut action appelle notre Server Action */}
          <form action={createDossier} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="refCabinet">Référence Cabinet</Label>
                <Input
                  id="refCabinet"
                  name="refCabinet"
                  placeholder="ex: 2024-056"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tribunal">Tribunal Compétent</Label>
                <Input
                  id="tribunal"
                  name="tribunal"
                  placeholder="ex: TPI Marrakech"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titre">Intitulé de l'affaire</Label>
              <Input
                id="titre"
                name="titre"
                placeholder="ex: Litige commercial Société X vs Y"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientId">Client</Label>
              {/* Utilisation d'un select natif avec le style Tailwind pour compatibilité immédiate avec FormData */}
              <select
                id="clientId"
                name="clientId"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Sélectionner un client...
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.type === "MORALE"
                      ? client.lastName
                      : `${client.lastName} ${client.firstName || ""}`}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">
                Le client n'est pas dans la liste ?{" "}
                <a
                  href="/dashboard/clients/nouveau"
                  className="text-blue-600 underline"
                >
                  Créer un client
                </a>
              </p>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" type="button">
                Annuler
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
                Créer le dossier
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
