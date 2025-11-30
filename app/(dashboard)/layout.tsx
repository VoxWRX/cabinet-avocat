// src/app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 print:bg-white print:h-auto print:min-h-0">
      {/* Sidebar Fixe */}
      <Sidebar />

      {/* Contenu Principal (décalé de 64 unités vers la droite pour laisser place à la sidebar) */}
      <main className="ml-64 p-8 print:ml-0 print:p-0">{children}</main>
    </div>
  );
}
