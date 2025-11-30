// src/app/(dashboard)/dashboard/finances/page.tsx
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const prisma = new PrismaClient();

export default async function FinancesPage() {
  const factures = await prisma.facture.findMany({
    orderBy: { dateEmission: "desc" },
    include: {
      dossier: {
        include: { client: true },
      },
    },
  });

  // Calcul du chiffre d'affaires total (simple reduce)
  const caTotal = factures.reduce((acc, curr) => acc + curr.montantTTC, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Facturation</h1>
          <p className="text-slate-500">
            Chiffre d'affaires généré :{" "}
            <span className="font-bold text-green-600">
              {caTotal.toFixed(2)} MAD
            </span>
          </p>
        </div>
        <Link href="/dashboard/finances/nouveau">
          <Button className="bg-blue-900">
            <Plus className="mr-2 h-4 w-4" /> Nouvelle Facture
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client / Dossier</TableHead>
              <TableHead className="text-right">Montant HT</TableHead>
              <TableHead className="text-right">TVA</TableHead>
              <TableHead className="text-right font-bold">Total TTC</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {factures.map((fac) => (
              <TableRow key={fac.id}>
                <TableCell className="font-mono font-medium">
                  {fac.numero}
                </TableCell>
                <TableCell>
                  {new Date(fac.dateEmission).toLocaleDateString("fr-MA")}
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {fac.dossier.client.type === "MORALE"
                      ? fac.dossier.client.lastName
                      : `${fac.dossier.client.firstName ?? ""} ${
                          fac.dossier.client.lastName ?? ""
                        }`.trim()}
                  </div>
                  <div className="text-xs text-slate-500">
                    {fac.dossier.titre}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {fac.montantHT.toFixed(2)} DH
                </TableCell>
                <TableCell className="text-right">{fac.tva}%</TableCell>
                <TableCell className="text-right font-bold text-slate-900">
                  {fac.montantTTC.toFixed(2)} DH
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/dashboard/finances/${fac.id}`}>
                    <Button variant="ghost" size="icon" title="Voir / Imprimer">
                      <Printer className="h-4 w-4 text-slate-500" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
