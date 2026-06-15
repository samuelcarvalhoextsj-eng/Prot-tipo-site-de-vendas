import { Header } from "@/components/Header";

export default function PoliticaEnvios() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Política de Envios</h1>
        <div className="prose dark:prose-invert prose-zinc max-w-none">
          <p className="text-muted-foreground mb-6">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Prazos de Entrega</h2>
          <p className="text-foreground mb-4">O prazo de entrega varia de acordo com a sua localização. Para capitais, o prazo médio é de 3 a 5 dias úteis. Para regiões mais afastadas ou de difícil acesso, o prazo pode se estender até 15 dias úteis.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Rastreamento</h2>
          <p className="text-foreground mb-4">Assim que seu pedido for despachado, você receberá um código de rastreamento no email cadastrado para acompanhar a jornada do seu produto tecnológico.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Entregas Internacionais</h2>
          <p className="text-foreground mb-4">Atualmente, enviamos apenas para território nacional. Planejamos expandir nossas operações para entrega interplanetária em um futuro próximo.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Extravios</h2>
          <p className="text-foreground mb-4">Em caso de atraso excessivo ou suspeita de extravio, entre em contato através da nossa página de FAQ para que possamos iniciar a investigação junto à transportadora.</p>
        </div>
      </div>
    </main>
  );
}
