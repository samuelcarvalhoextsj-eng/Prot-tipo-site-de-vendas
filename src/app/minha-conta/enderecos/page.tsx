"use client";

import { Header } from "@/components/Header";
import { ArrowLeft, MapPin, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function Enderecos() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    
    if (name === "zipCode") {
      value = value.replace(/\D/g, "");
      if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, "$1-$2");
      if (value.length > 9) value = value.substring(0, 9);
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "zipCode") {
      const cleanCep = value.replace(/\D/g, "");
      if (cleanCep.length === 8) {
        setIsLoadingCep(true);
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          const data = await res.json();
          if (!data.erro) {
            setFormData(prev => ({
              ...prev,
              street: data.logradouro || prev.street,
              neighborhood: data.bairro || prev.neighborhood,
              city: data.localidade || prev.city,
              state: data.uf || prev.state,
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar CEP", error);
        } finally {
          setIsLoadingCep(false);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Math.random().toString(36).substring(7),
      ...formData
    };
    setAddresses([...addresses, newAddress]);
    setIsAdding(false);
    setFormData({
      name: "", zipCode: "", street: "", number: "",
      complement: "", neighborhood: "", city: "", state: ""
    });
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/minha-conta" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Minha Conta
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <MapPin className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold">Endereços</h1>
          </div>
          {!isAdding && addresses.length > 0 && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Novo Endereço
            </button>
          )}
        </div>

        {isAdding ? (
          <div className="glass-card p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold mb-6">Adicionar Novo Endereço</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Identificação (ex: Casa, Trabalho)</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="Minha Casa" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-1">CEP</label>
                <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="00000-000" maxLength={9} />
                {isLoadingCep && (
                  <div className="absolute right-4 top-[38px] w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Rua / Logradouro</label>
                <input required name="street" value={formData.street} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="Rua das Flores" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Número</label>
                <input required name="number" value={formData.number} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="123" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Complemento</label>
                <input name="complement" value={formData.complement} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="Apto 42 (Opcional)" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Bairro</label>
                <input required name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="Centro" />
              </div>
              <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Cidade</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="São Paulo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Estado</label>
                  <input required name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary-500 transition-colors" placeholder="SP" />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 border border-border text-foreground font-medium rounded-full hover:bg-secondary/50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition-colors"
                >
                  Salvar Endereço
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.length === 0 ? (
              <div className="col-span-1 md:col-span-2 glass-card p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                <MapPin className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground text-lg mb-6">Você ainda não tem nenhum endereço cadastrado.</p>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Adicionar Novo Endereço
                </button>
              </div>
            ) : (
              addresses.map((address) => (
                <div key={address.id} className="glass-card p-6 rounded-3xl flex flex-col justify-between group hover:border-border transition-colors border border-transparent">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <h3 className="font-bold text-lg">{address.name}</h3>
                      </div>
                    </div>
                    <p className="text-foreground">
                      {address.street}, {address.number}
                      {address.complement && ` - ${address.complement}`}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {address.neighborhood} - {address.city}/{address.state}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">CEP: {address.zipCode}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex justify-end">
                    <button 
                      onClick={() => removeAddress(address.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
