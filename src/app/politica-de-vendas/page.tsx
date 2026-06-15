import { Header } from "@/components/Header";

export default function PoliticaVendas() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Política de Vendas</h1>
        <div className="prose dark:prose-invert prose-zinc max-w-none">
          <p className="text-muted-foreground mb-6">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p className="text-foreground mb-4">Ao realizar uma compra na Nexus, você concorda com os termos e condições descritos nesta política. Leia atentamente antes de finalizar qualquer pedido.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Processamento de Pedidos</h2>
          <p className="text-foreground mb-4">Os pedidos são processados em até 2 dias úteis após a confirmação do pagamento. Note que este é um site protótipo e nenhuma venda real está sendo processada.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Cancelamentos e Reembolsos</h2>
          <p className="text-foreground mb-4">Você pode solicitar o cancelamento de uma compra em até 7 dias corridos após o recebimento do produto, de acordo com o Art. 49 do Código de Defesa do Consumidor.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Formas de Pagamento</h2>
          <p className="text-foreground mb-4">Aceitamos cartões de crédito, PIX e criptomoedas selecionadas (modo de demonstração).</p>
        </div>
      </div>
    </main>
  );
}
