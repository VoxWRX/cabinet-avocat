// src/components/dashboard/add-audience-dialog.tsx
"use client";

import { useState } from "react";
import { createAudience } from "@/app/actions/audiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddAudienceDialog({
  dossierId,
}: Readonly<{ dossierId: string }>) {
  const [open, setOpen] = useState(false);

  // Fonction pour gérer la soumission et fermer la fenêtre
  async function handleSubmit(formData: FormData) {
    await createAudience(formData);
    setOpen(false); // On ferme la modale une fois l'action terminée
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
          + Ajouter une audience
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Audience</DialogTitle>
          <DialogDescription>
            Ajoutez une date d'audience ou de procédure pour ce dossier.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="grid gap-4 py-4">
          {/* Champ caché pour l'ID du dossier */}
          <input type="hidden" name="dossierId" value={dossierId} />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="datetime-local" // Sélecteur de date natif
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Motif
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="ex: Plaidoirie, Enquête..."
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lieu" className="text-right">
              Lieu
            </Label>
            <Input
              id="lieu"
              name="lieu"
              placeholder="ex: Salle 4"
              className="col-span-3"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
