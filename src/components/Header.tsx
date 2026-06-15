"use client";

import { Sparkles, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CartDrawer } from "./CartDrawer";
import { motion } from "framer-motion";

export function Header() {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Only try to initialize if keys are present
    if (!supabaseUrl || !supabaseAnonKey) return;
    
    const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
    
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="relative z-50 flex items-center justify-between p-4 sm:p-6 lg:px-12">
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
        <span className="text-lg sm:text-xl font-bold tracking-tighter">NEXUS</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <Link href="/minha-conta" className="flex items-center gap-2 text-sm font-medium glass px-4 py-2 rounded-full hover:bg-foreground/10 transition-colors">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Minha Conta</span>
          </Link>
        ) : (
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Entrar
          </Link>
        )}
        <div id="cart-icon-target">
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
}
