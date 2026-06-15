"use client";

import { Header } from "@/components/Header";
import { ArrowLeft, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export default function Preferencias() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/minha-conta" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Minha Conta
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-orange-500/20 rounded-xl">
            <Settings className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl font-bold">Preferências</h1>
        </div>
          <div className="flex flex-col gap-6">
            <div className="glass-card rounded-2xl flex flex-col divide-y divide-white/10">
              
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">Tema</h3>
                  <p className="text-muted-foreground text-sm">Escolha a aparência do site.</p>
                </div>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-secondary border border-border text-foreground text-sm rounded-lg px-4 py-2 hover:bg-secondary/80 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="system">Sistema</option>
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                </select>
              </div>

              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground">Limpar Cache</h3>
                  <p className="text-muted-foreground text-sm">Remove dados salvos no navegador e reinicia o carrinho de compras. Útil se o site estiver lento ou com erros.</p>
                </div>
                <button 
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    alert("Cache limpo com sucesso! A página será atualizada.");
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border text-foreground rounded-lg text-sm hover:bg-secondary/80 active:scale-95 transition-all"
                >
                  Limpar Cache
                </button>
              </div>

            </div>
          </div>
      </div>
    </main>
  );
}
