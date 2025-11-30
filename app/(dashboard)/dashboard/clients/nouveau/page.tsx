// src/app/(dashboard)/dashboard/clients/nouveau/page.tsx
import { NewClientForm } from "@/components/dashboard/new-client-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NouveauClientPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Ajouter un Client
          </h1>
          <p className="text-sm text-slate-500">
            Créez une fiche client avant d'ouvrir un dossier.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <NewClientForm />
      </div>
    </div>
  );
}
