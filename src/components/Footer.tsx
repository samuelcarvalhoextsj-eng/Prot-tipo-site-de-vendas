"use client";

import Link from "next/link";
import { Sparkles, Mail, MessageCircle, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary-500" />
              <span className="text-xl font-bold tracking-tighter">NEXUS</span>
            </Link>
            <p className="text-muted-foreground max-w-xs mb-6">
              O futuro do varejo digital está aqui. Descubra tecnologia de ponta com a melhor experiência de compra do universo.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="mailto:suporte@nexus.com" className="hover:text-foreground transition-colors" title="Enviar E-mail">
                <Mail className="w-5 h-5" />
              </a>
              <button 
                onClick={() => alert("Aviso de Protótipo: Esta empresa é fictícia e não possui atendimento via WhatsApp no momento.")} 
                className="hover:text-foreground transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <Link href="/" className="hover:text-foreground transition-colors" title="Ir para a Página Inicial">
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Suporte</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ & Contato</Link></li>
              <li><Link href="/politica-de-envios" className="hover:text-foreground transition-colors">Política de Envios</Link></li>
              <li><Link href="/politica-de-vendas" className="hover:text-foreground transition-colors">Política de Vendas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/sobre" className="hover:text-foreground transition-colors">Sobre Nós</Link></li>
              <li><Link href="/carreiras" className="hover:text-foreground transition-colors">Carreiras</Link></li>
              <li><Link href="/termos-de-uso" className="hover:text-foreground transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nexus Corporation. Todos os direitos reservados.</p>
          <p>Feito com tecnologias avançadas da Terra.</p>
        </div>
      </div>
    </footer>
  );
}
