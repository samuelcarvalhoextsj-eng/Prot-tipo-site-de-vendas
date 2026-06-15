import { Header } from "@/components/Header";
import { Sparkles, Zap, Shield, Rocket } from "lucide-react";

export default function SobreNos() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-12 w-12 text-primary-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nossa Missão é o Futuro</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A Nexus nasceu com um único propósito: trazer a tecnologia de amanhã para as suas mãos hoje. 
            Não somos apenas um e-commerce, somos a ponte para o próximo salto evolutivo da humanidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8 rounded-3xl text-center">
            <Zap className="w-10 h-10 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Inovação</h3>
            <p className="text-muted-foreground text-sm">Curadoria rigorosa das tecnologias mais disruptivas do mercado global (e interplanetário).</p>
          </div>
          <div className="glass-card p-8 rounded-3xl text-center">
            <Shield className="w-10 h-10 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Segurança</h3>
            <p className="text-muted-foreground text-sm">Criptografia quântica em todas as transações. Seus dados protegidos pelas leis da física.</p>
          </div>
          <div className="glass-card p-8 rounded-3xl text-center">
            <Rocket className="w-10 h-10 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Velocidade</h3>
            <p className="text-muted-foreground text-sm">Logística otimizada com IA para garantir que o futuro chegue na sua porta antes do esperado.</p>
          </div>
        </div>

        <div className="prose dark:prose-invert prose-zinc max-w-none">
          <h2 className="text-2xl font-bold mb-4">A História da Nexus</h2>
          <p className="text-foreground mb-4">
            Fundada em 2024, a Nexus começou como um pequeno laboratório de prototipagem no Brasil. 
            Percebendo a lacuna entre as inovações laboratoriais e o acesso do consumidor final, decidimos 
            construir uma plataforma que eliminasse essas barreiras.
          </p>
          <p className="text-foreground">
            Hoje, somos referência (em nossa própria simulação) na venda de óculos de realidade mista, 
            chips neurais amigáveis e monitores holográficos de alta densidade. Bem-vindo à revolução.
          </p>
        </div>
      </div>
    </main>
  );
}
