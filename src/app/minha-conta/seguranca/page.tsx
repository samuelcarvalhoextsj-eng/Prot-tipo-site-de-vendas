"use client";

import { Header } from "@/components/Header";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function Seguranca() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/minha-conta" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Minha Conta
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Shield className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold">Segurança</h1>
        </div>
        <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">Autenticação em Duas Etapas (2FA)</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Como o seu acesso à Nexus é feito exclusivamente através da sua conta Google, 
                a segurança e a autenticação em duas etapas são gerenciadas diretamente por eles. 
                Recomendamos ativar o 2FA na sua conta Google para máxima segurança.
              </p>
            </div>
            <a 
              href="https://myaccount.google.com/security" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap text-center"
            >
              Gerenciar no Google
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
