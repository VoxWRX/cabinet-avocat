// src/components/auth/login-form.tsx
"use client";

import { useActionState } from "react";
import { authenticate } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  // Hook pour gérer l'état du formulaire (succès/erreur)
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="admin@cabinet.ma"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••"
          required
          minLength={6}
        />
      </div>

      {errorMessage && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded border border-red-200">
          ⚠️ {errorMessage}
        </div>
      )}

      <Button
        className="w-full bg-blue-900 hover:bg-blue-800"
        aria-disabled={isPending}
      >
        {isPending ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}
