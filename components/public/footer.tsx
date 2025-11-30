// src/components/public/footer.tsx
import { Scale, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Colonne 1 : Identité */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <Scale size={24} />
            <span className="text-xl font-bold">Maître ALAMI</span>
          </div>
          <p className="text-sm text-slate-400 max-w-xs">
            Avocat au Barreau de Casablanca. Nous défendons vos droits avec
            rigueur, humanité et excellence depuis 15 ans.
          </p>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div>
          <h3 className="text-white font-bold mb-4">Expertises</h3>
          <ul className="space-y-2 text-sm">
            <li>Droit des Affaires & Sociétés</li>
            <li>Droit de la Famille</li>
            <li>Contentieux Immobilier</li>
            <li>Droit Pénal</li>
          </ul>
        </div>

        {/* Colonne 3 : Contact */}
        <div>
          <h3 className="text-white font-bold mb-4">Nous trouver</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-blue-500 shrink-0" size={18} />
              <span>
                123, Boulevard Zerktouni,
                <br />
                20000 Casablanca, Maroc
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-500 shrink-0" size={18} />
              <span>+212 5 22 00 00 00</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-500 shrink-0" size={18} />
              <span>contact@avocat-alami.ma</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Cabinet Maître ALAMI. Tous droits réservés.
      </div>
    </footer>
  );
}
