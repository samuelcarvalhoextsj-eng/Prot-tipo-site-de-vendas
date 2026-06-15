"use client";

import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { LogOut, User as UserIcon, Package, MapPin, CreditCard, Shield, Settings, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MinhaConta() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("customer");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redireciona para login se não estiver logado
        router.push("/login");
      } else {
        setUser(session.user);
        // Fetch role
        const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        if (data) setRole(data.role);
      }
    };
    
    if (supabaseUrl && supabaseAnonKey) {
      fetchUser();
    }
  }, [router, supabase, supabaseUrl, supabaseAnonKey]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <main className="min-h-screen relative z-10">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative z-10">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Minha Conta</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors glass px-4 py-2 rounded-full"
          >
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-1 glass-card p-6 rounded-3xl flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mb-4">
              <UserIcon className="w-12 h-12 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-foreground">Perfil</h2>
            <p className="text-muted-foreground text-sm mb-2 break-all">{user.email}</p>
            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-foreground">
              {role}
            </span>
            
            {role === 'admin' && (
              <button 
                onClick={() => router.push('/admin')}
                className="mt-auto px-4 py-2 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors text-sm w-full"
              >
                Acessar Painel Admin
              </button>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
            {/* Meus Pedidos */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <Package className="w-6 h-6 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold">Meus Pedidos</h2>
              </div>
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground border border-dashed border-border rounded-2xl bg-secondary/50">
                <Package className="w-12 h-12 text-muted-foreground opacity-50 mb-3" />
                <p>Nenhum pedido realizado ainda.</p>
                <p className="text-sm mt-2">Os pedidos em modo protótipo não são salvos.</p>
              </div>
            </div>

            {/* Configurações */}
            <Link href="/minha-conta/configuracoes" className="glass-card p-6 rounded-3xl hover:bg-secondary/50 transition-colors cursor-pointer group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-xl group-hover:bg-secondary/80 transition-colors">
                  <Settings className="w-8 h-8 text-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
                  <p className="text-muted-foreground text-sm mt-1">Gerencie endereços, pagamentos e preferências.</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
