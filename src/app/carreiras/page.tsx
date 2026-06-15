import { Header } from "@/components/Header";
import { Briefcase, Code, Cpu, Palette } from "lucide-react";

export default function Carreiras() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Junte-se à Revolução</h1>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Estamos sempre em busca de mentes brilhantes que não têm medo de desafiar o status quo.
          Se você respira inovação, a Nexus é o seu lugar.
        </p>

        <h2 className="text-2xl font-bold mb-8">Vagas Abertas (Simuladas)</h2>

        <div className="space-y-4">
          <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-secondary/50 transition-colors cursor-pointer">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <Code className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Engenheiro(a) de Realidade Mista Sênior</h3>
                <p className="text-muted-foreground text-sm">Remoto • Tempo Integral • E-commerce</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors w-full md:w-auto">
              Candidatar-se
            </button>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-secondary/50 transition-colors cursor-pointer">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <Cpu className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Especialista em Logística Quântica</h3>
                <p className="text-muted-foreground text-sm">São Paulo, SP • Híbrido • Operações</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors w-full md:w-auto">
              Candidatar-se
            </button>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-secondary/50 transition-colors cursor-pointer">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <Palette className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Designer de Interfaces Holográficas</h3>
                <p className="text-muted-foreground text-sm">Remoto • Tempo Integral • Design</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors w-full md:w-auto">
              Candidatar-se
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Briefcase className="w-12 h-12 text-muted-foreground opacity-50 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Não encontrou a vaga ideal? Envie seu currículo para <a href="mailto:talentos@nexus.com" className="text-primary-400 hover:underline">talentos@nexus.com</a> e entraremos em contato.
          </p>
        </div>
      </div>
    </main>
  );
}
