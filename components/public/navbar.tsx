// src/components/public/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-900 p-2 rounded-lg text-white">
              <Scale size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Maître ALAMI
            </span>
          </Link>

          {/* Liens de navigation (Desktop) */}
          <div className="hidden md:flex gap-8">
            <Link
              href="#expertises"
              className="text-sm font-medium text-slate-600 hover:text-blue-900"
            >
              Expertises
            </Link>
            <Link
              href="#cabinet"
              className="text-sm font-medium text-slate-600 hover:text-blue-900"
            >
              Le Cabinet
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-slate-600 hover:text-blue-900"
            >
              Contact & RDV
            </Link>
          </div>

          {/* Bouton Accès Client / Dashboard */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="hidden sm:flex">
                Espace Client
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-blue-900 hover:bg-blue-800">
                Première Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
