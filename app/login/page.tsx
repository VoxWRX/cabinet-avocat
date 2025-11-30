// src/app/login/page.tsx
import { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Connexion | AvocatManager",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="bg-blue-900 p-3 rounded-xl text-white mb-4">
            <Scale size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Cabinet Maître ALAMI
          </h1>
          <p className="text-slate-500">
            Connectez-vous à votre espace de gestion
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
