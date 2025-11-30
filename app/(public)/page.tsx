// src/app/(public)/page.tsx
import Link from "next/link";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Users,
  Gavel,
  Building2,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* --- SECTION HERO (Haut de page) --- */}
        <section className="relative bg-slate-900 py-20 lg:py-32 overflow-hidden">
          {/* Effet de fond (Cercle bleu flou) */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Votre partenaire juridique de{" "}
                <span className="text-blue-500">confiance</span> au Maroc.
              </h1>
              <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
                Une expertise reconnue en droit des affaires et contentieux.
                Nous accompagnons entreprises et particuliers avec une stratégie
                juridique sur mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-lg h-12 px-8"
                >
                  Prendre Rendez-vous
                </Button>
                <Link href="#expertises">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-slate-900 h-12 px-8"
                  >
                    Découvrir nos services
                  </Button>
                </Link>
              </div>
            </div>
            {/* Image Placeholder (Remplacer par une vraie photo plus tard) */}
            <div className="hidden lg:block relative">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-slate-700 to-slate-900 border border-slate-700 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <ScaleIconLarge />
                  <p className="text-slate-400">
                    Photo du cabinet ou de l'avocat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION EXPERTISES --- */}
        <section id="expertises" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">
                Nos Domaines d'Intervention
              </h2>
              <p className="text-slate-500 mt-4">
                Une approche pluridisciplinaire pour répondre à tous vos
                besoins.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ExpertiseCard
                icon={Building2}
                title="Droit des Affaires"
                desc="Création de société, fusion-acquisition, contrats commerciaux et litiges entre associés."
              />
              <ExpertiseCard
                icon={Users}
                title="Droit de la Famille"
                desc="Divorce, garde d'enfants, héritage et succession (Droit Marocain et Moudawana)."
              />
              <ExpertiseCard
                icon={Gavel}
                title="Contentieux & Pénal"
                desc="Représentation devant tous les tribunaux du Royaume. Défense pénale d'urgence."
              />
            </div>
          </div>
        </section>

        {/* --- SECTION POURQUOI NOUS CHOISIR --- */}
        <section id="cabinet" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Pourquoi choisir le Cabinet Alami ?
              </h2>
              <div className="space-y-6">
                <Feature text="Une réactivité garantie sous 24h pour toutes vos urgences." />
                <Feature text="Transparence totale sur les honoraires (Convention signée)." />
                <Feature text="Accès à un espace client en ligne pour suivre vos dossiers." />
                <Feature text="Bilingue Arabe / Français (et Anglais)." />
              </div>
              <Button className="mt-8" variant="ghost">
                En savoir plus sur l'équipe{" "}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center">
              <p className="text-slate-400">Photo de l'équipe</p>
            </div>
          </div>
        </section>

        {/* --- SECTION CTA FINAL --- */}
        <section className="py-20 bg-blue-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">
              Besoin d'un conseil juridique immédiat ?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              N'attendez pas qu'un litige s'aggrave. Prenez contact dès
              aujourd'hui pour une première consultation d'orientation.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-6 text-lg"
            >
              Appeler le Cabinet (+212 5 22 ...)
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// --- Petits composants utilitaires pour cette page ---

function ExpertiseCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
          <Icon size={24} />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20} />
      <span className="text-slate-700 text-lg">{text}</span>
    </div>
  );
}

function ScaleIconLarge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-slate-600 mx-auto opacity-50"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
