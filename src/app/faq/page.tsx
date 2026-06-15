"use client";

import { Header } from "@/components/Header";
import { useState } from "react";
import { ChevronDown, ChevronUp, Mail } from "lucide-react";

const faqs = [
  {
    question: "Como funciona a entrega dos produtos?",
    answer: "Nossas entregas são feitas via transportadoras parcerias para todo o Brasil. Você pode acompanhar o status da entrega pelo código de rastreamento enviado por e-mail."
  },
  {
    question: "O que significa 'modo protótipo'?",
    answer: "Atualmente, o site da Nexus está em fase de testes e portfólio. As compras não são reais e nenhum valor será cobrado do seu cartão."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitaremos PIX, Cartões de Crédito e Criptomoedas selecionadas assim que a loja sair da versão beta."
  },
  {
    question: "Posso devolver um produto?",
    answer: "Sim, de acordo com o código de defesa do consumidor, você tem até 7 dias após o recebimento para solicitar a devolução sem custos."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen relative z-10">
      <Header />
      
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-4">Central de Ajuda</h1>
        <p className="text-muted-foreground mb-12">Encontre respostas para as perguntas mais comuns ou entre em contato com nossa equipe.</p>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-border rounded-2xl overflow-hidden glass-card"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-secondary/50 transition-colors"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2 text-muted-foreground text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-3xl text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-primary-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ainda tem dúvidas?</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Mande uma mensagem para nós! Será um prazer ajudar com qualquer questão.
          </p>
          
          <a 
            href="mailto:suporte@nexus.com" 
            className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Enviar E-mail
          </a>
        </div>
      </div>
    </main>
  );
}
