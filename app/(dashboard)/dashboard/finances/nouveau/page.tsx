// src/app/(dashboard)/dashboard/finances/nouveau/page.tsx
import { PrismaClient } from "@prisma/client";
import { createInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function NouvelleFacturePage() {
  // On charge les dossiers ouverts pour les proposer dans la liste
  const dossiers = await prisma.dossier.findMany({
    where: { status: { not: "ARCHIVE" } },
    include: { client: true },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/finances">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Émettre une facture</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form action={createInvoice} className="space-y-6">
            <div className="space-y-2">
              <Label>Dossier à facturer</Label>
              <select
                name="dossierId"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                required
              >
                <option value="">Choisir un dossier...</option>
                {dossiers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.refCabinet} - {d.titre} ({d.client.lastName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Montant Honoraires (HT)</Label>
                <Input
                  name="montantHT"
                  type="number"
                  step="0.01"
                  placeholder="ex: 5000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Taux TVA</Label>
                <select
                  name="tva"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="10">10% (Prestation juridique)</option>
                  <option value="20">20% (Autre)</option>
                  <option value="0">0% (Exonéré)</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-900">
              Générer la facture
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
