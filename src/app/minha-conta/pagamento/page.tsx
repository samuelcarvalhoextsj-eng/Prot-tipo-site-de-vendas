"use client";

import { Header } from "@/components/Header";
import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";

export default function Pagamento() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/minha-conta" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Minha Conta
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <CreditCard className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold">Pagamento</h1>
        </div>
        <div className="glass-card p-12 rounded-3xl flex flex-col items-center justify-center text-center border border-dashed border-border bg-secondary/50">
          <CreditCard className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
          <p className="text-muted-foreground text-lg mb-2">Nenhum cartão ou método de pagamento cadastrado.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">Este site é um protótipo, portanto não é possível adicionar formas de pagamento reais.</p>
          <button disabled className="px-6 py-3 bg-secondary text-muted-foreground font-bold rounded-full cursor-not-allowed">
            Adicionar Forma de Pagamento
          </button>
        </div>
      </div>
    </main>
  );
}
