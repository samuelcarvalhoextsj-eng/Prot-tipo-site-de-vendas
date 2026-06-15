"use client";

import { Header } from "@/components/Header";
import { ArrowLeft, MapPin, CreditCard, Shield, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Configuracoes() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/minha-conta" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Minha Conta
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-secondary rounded-xl">
            <Settings className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold">Configurações</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/minha-conta/enderecos" className="glass-card p-6 rounded-3xl hover:bg-secondary/50 transition-colors cursor-pointer group block">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-1">Endereços</h3>
            <p className="text-muted-foreground text-sm">Gerencie seus endereços de entrega.</p>
          </Link>

          <Link href="/minha-conta/pagamento" className="glass-card p-6 rounded-3xl hover:bg-secondary/50 transition-colors cursor-pointer group block">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-1">Pagamento</h3>
            <p className="text-muted-foreground text-sm">Cartões e métodos de pagamento.</p>
          </Link>

          <Link href="/minha-conta/seguranca" className="glass-card p-6 rounded-3xl hover:bg-secondary/50 transition-colors cursor-pointer group block">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-1">Segurança</h3>
            <p className="text-muted-foreground text-sm">Senha e autenticação em duas etapas.</p>
          </Link>

          <Link href="/minha-conta/preferencias" className="glass-card p-6 rounded-3xl hover:bg-secondary/50 transition-colors cursor-pointer group block">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Settings className="w-6 h-6 text-orange-400" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-1">Preferências</h3>
            <p className="text-muted-foreground text-sm">Notificações e configurações gerais.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
