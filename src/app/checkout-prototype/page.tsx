"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPrototypePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-8 rounded-3xl text-center flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mb-2">
          <AlertCircle className="w-8 h-8 text-primary-500" />
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Modo Protótipo</h1>
        
        <p className="text-muted-foreground">
          Este site é apenas uma demonstração do portfólio. Nenhuma transação real é processada e nenhum dado de pagamento foi armazenado.
        </p>

          <Link 
            href="/" 
            className="mt-4 flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors w-full justify-center"
          >
          <ArrowLeft className="w-5 h-5" />
          Voltar para o Início
        </Link>
      </motion.div>
    </div>
  );
}
