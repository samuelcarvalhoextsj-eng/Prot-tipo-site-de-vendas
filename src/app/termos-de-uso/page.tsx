import { Header } from "@/components/Header";

export default function TermosUso() {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        <div className="prose dark:prose-invert prose-zinc max-w-none">
          <p className="text-muted-foreground mb-6">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Visão Geral</h2>
          <p className="text-foreground mb-4">
            Este site é operado pela Nexus Corporation. Os termos "nós", "nos" e "nosso" referem-se à Nexus. 
            Ao visitar nosso site e/ou comprar algo de nós, você se engaja em nosso "Serviço" e concorda em estar 
            vinculado aos seguintes termos e condições ("Termos de Uso").
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Natureza de Protótipo</h2>
          <p className="text-foreground mb-4">
            <strong>Aviso Legal Importante:</strong> O site atual é um projeto de demonstração e portfólio. 
            Nenhuma mercadoria real está sendo comercializada, processada ou entregue. Todos os produtos e valores 
            aqui listados são fictícios e utilizados apenas para fins de demonstração tecnológica.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Precisão, Integridade e Atualidade das Informações</h2>
          <p className="text-foreground mb-4">
            Não somos responsáveis se as informações disponibilizadas neste site não forem precisas, completas ou atuais. 
            O material deste site é fornecido apenas para fins de demonstração.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Condições Gerais</h2>
          <p className="text-foreground mb-4">
            Reservamo-nos o direito de recusar o serviço a qualquer pessoa, por qualquer motivo, a qualquer momento. 
            Você entende que seu conteúdo (não incluindo informações de cartão de crédito) pode ser transferido sem criptografia e 
            envolver transmissões por várias redes. Note que nós não coletamos informações financeiras reais nesta versão do site.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Propriedade Intelectual</h2>
          <p className="text-foreground mb-4">
            Todo o design, interface, identidade visual e código do site são protegidos por direitos autorais e 
            outras leis de propriedade intelectual. É estritamente proibida a cópia ou reprodução não autorizada do layout e funcionamento.
          </p>
        </div>
      </div>
    </main>
  );
}
