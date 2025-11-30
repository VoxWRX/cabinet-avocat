// src/app/(dashboard)/dashboard/clients/page.tsx
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const prisma = new PrismaClient();

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { dossiers: true } } }, // On compte les dossiers
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Base Clients</h1>
        <Link href="/dashboard/clients/nouveau">
          <Button className="bg-blue-900">
            <Plus className="mr-2 h-4 w-4" /> Nouveau Client
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Nom / Raison Sociale</TableHead>
              <TableHead>Identifiant</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead className="text-center">Dossiers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  {client.type === "MORALE" ? (
                    <Building2 className="text-blue-500" size={20} />
                  ) : (
                    <User className="text-slate-500" size={20} />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {client.type === "MORALE"
                    ? client.lastName
                    : `${client.lastName} ${client.firstName || ""}`}
                  <div className="text-xs text-slate-400">{client.email}</div>
                </TableCell>
                <TableCell>
                  {client.type === "MORALE" ? (
                    <span className="text-xs font-mono bg-slate-100 p-1 rounded">
                      ICE: {client.ice || "-"}
                    </span>
                  ) : (
                    <span className="text-xs font-mono bg-slate-100 p-1 rounded">
                      CIN: {client.cin || "-"}
                    </span>
                  )}
                </TableCell>
                <TableCell>{client.city || "-"}</TableCell>
                <TableCell className="text-center">
                  {client._count.dossiers > 0 ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-blue-600 bg-blue-100 rounded-full">
                      {client._count.dossiers}
                    </span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
