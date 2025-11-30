// src/components/dashboard/new-client-form.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/app/actions/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

export function NewClientForm() {
  // Par défaut, on crée une personne physique
  const [type, setType] = useState<"PHYSIQUE" | "MORALE">("PHYSIQUE");

  return (
    <form action={createClient} className="space-y-8">
      {/* Sélecteur de Type */}
      <Card>
        <CardContent className="pt-6">
          <RadioGroup
            defaultValue="PHYSIQUE"
            name="type"
            className="flex gap-4"
            onValueChange={(val) => setType(val as "PHYSIQUE" | "MORALE")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PHYSIQUE" id="physique" />
              <Label htmlFor="physique" className="cursor-pointer">
                Personne Physique (Particulier)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MORALE" id="morale" />
              <Label htmlFor="morale" className="cursor-pointer">
                Personne Morale (Société)
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Champs d'identité */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lastName">
            {type === "PHYSIQUE"
              ? "Nom de famille"
              : "Raison Sociale (Nom de la société)"}{" "}
            *
          </Label>
          <Input
            id="lastName"
            name="lastName"
            required
            placeholder={type === "PHYSIQUE" ? "Benjeloun" : "Sarl Top Travaux"}
          />
        </div>

        {/* Le prénom ne s'affiche que pour les humains */}
        {type === "PHYSIQUE" && (
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" name="firstName" placeholder="Karim" />
          </div>
        )}
      </div>

      {/* Champs Spécifiques Maroc */}
      <div className="p-4 bg-slate-50 rounded-lg border grid md:grid-cols-2 gap-4">
        {type === "PHYSIQUE" ? (
          <div className="space-y-2">
            <Label htmlFor="cin">CIN (Carte Nationale)</Label>
            <Input id="cin" name="cin" placeholder="AB123456" />
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="ice">I.C.E</Label>
              <Input id="ice" name="ice" placeholder="000123456000088" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rc">Registre de Commerce (RC)</Label>
              <Input id="rc" name="rc" placeholder="12345" />
            </div>
          </>
        )}
      </div>

      {/* Coordonnées */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" placeholder="06..." />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="city">Ville</Label>
          <Input id="city" name="city" placeholder="Casablanca" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            name="address"
            placeholder="Ex: 123 Bd Zerktouni"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-blue-900 w-full md:w-auto">
          Enregistrer le client
        </Button>
      </div>
    </form>
  );
}
