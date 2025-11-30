// src/components/dashboard/sidebar.tsx
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "@/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Vue d'ensemble", href: "/dashboard" },
  { icon: Briefcase, label: "Dossiers", href: "/dashboard/dossiers" },
  { icon: Users, label: "Clients", href: "/dashboard/clients" },
  { icon: FileText, label: "Facturation", href: "/dashboard/finances" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r print:hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Avocat<span className="text-blue-400">Manager</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Gestion Cabinet Maroc</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
            M
          </div>
          <div>
            <p className="text-sm font-medium">Maître ALAMI</p>
            <p className="text-xs text-slate-400">Avocat Titulaire</p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex w-full items-center gap-2 rounded-md bg-slate-800 p-3 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </form>
      </div>
    </div>
  );
}
