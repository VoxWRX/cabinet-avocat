// src/app/(dashboard)/dashboard/finances/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { PrintButton } from "@/components/dashboard/print-button";

const prisma = new PrismaClient();

export default async function FactureViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const facture = await prisma.facture.findUnique({
    where: { id },
    include: {
      dossier: {
        include: { client: true },
      },
    },
  });

  if (!facture) notFound();

  const client = facture.dossier.client;

  return (
    <div className="max-w-4xl mx-auto my-8 print:my-0 print:w-full print:max-w-none">
      {/* Barre d'actions (Cachée à l'impression) */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <Link href="/dashboard/finances">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
        </Link>

        {/* On utilise notre composant Client ici */}
        <PrintButton />
      </div>

      {/* LA FEUILLE A4 (Visualisation) */}
      <div className="bg-white p-12 border shadow-lg print:shadow-none print:border-0 min-h-[297mm] print:m-0 print:p-8 print:min-h-0">
        {/* En-tête Cabinet */}
        <div className="flex justify-between items-start border-b pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">MAÎTRE ALAMI</h1>
            <p className="text-slate-500 font-medium">
              Avocat au Barreau de Casablanca
            </p>
            <p className="text-sm text-slate-400 mt-2">
              123, Boulevard Zerktouni
              <br />
              20000 Casablanca, Maroc
              <br />
              contact@avocat-alami.ma
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-light text-slate-300">FACTURE</h2>
            <p className="text-lg font-bold text-slate-700 mt-2">
              {facture.numero}
            </p>
            <p className="text-sm text-slate-500">
              Date: {new Date(facture.dateEmission).toLocaleDateString("fr-MA")}
            </p>
          </div>
        </div>

        {/* Infos Client */}
        <div className="mb-12">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Facturer à :
          </h3>
          <div className="text-lg font-bold text-slate-900">
            {client.type === "MORALE"
              ? client.lastName
              : `${client.firstName} ${client.lastName}`}
          </div>
          <p className="text-slate-600">
            {client.address || "Adresse non renseignée"}
          </p>
          <p className="text-slate-600">{client.city}</p>
          <div className="mt-4 text-sm text-slate-500">
            {client.ice && <p>ICE : {client.ice}</p>}
            {client.cin && <p>CIN : {client.cin}</p>}
          </div>
        </div>

        {/* Tableau des prestations */}
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-slate-100">
              <th className="text-left py-3 font-bold text-slate-600">
                Description
              </th>
              <th className="text-right py-3 font-bold text-slate-600">
                Montant
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50">
              <td className="py-4">
                <p className="font-bold text-slate-800">
                  Honoraires Dossier : {facture.dossier.titre}
                </p>
                <p className="text-sm text-slate-500">
                  Réf: {facture.dossier.refCabinet}
                </p>
              </td>
              <td className="text-right py-4 font-mono text-slate-700">
                {facture.montantHT.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totaux */}
        <div className="flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-slate-600">
              <span>Total HT</span>
              <span className="font-mono">
                {facture.montantHT.toFixed(2)} DH
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>TVA ({facture.tva}%)</span>
              <span className="font-mono">
                {(facture.montantTTC - facture.montantHT).toFixed(2)} DH
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-900 border-t pt-3">
              <span>Total TTC</span>
              <span>{facture.montantTTC.toFixed(2)} DH</span>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-24 pt-8 border-t text-center text-xs text-slate-400">
          <p>Patente: 12345678 - IF: 12345678 - ICE: 000123456000088</p>
          <p>
            Arrêté des comptes à la somme de : {facture.montantTTC} Dirhams.
          </p>
        </div>
      </div>
    </div>
  );
}
