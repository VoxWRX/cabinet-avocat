// src/components/dashboard/print-button.tsx
"use client"; // <--- Cette ligne est magique : elle autorise l'interactivité

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <Button
      className="bg-blue-900 hover:bg-blue-800"
      onClick={() => globalThis.print?.()} // Maintenant on a le droit !
    >
      <Printer className="mr-2 h-4 w-4" /> Imprimer / PDF
    </Button>
  );
}
