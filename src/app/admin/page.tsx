"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/app/actions/products";
import { addProduct, deleteProduct, updateProductStock, seedProducts } from "@/app/actions/admin";
import { Package, Plus, Trash2, Edit2, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSeed = async () => {
    if (confirm("Isso adicionará produtos mockados ao banco. Tem certeza?")) {
      await seedProducts();
      await loadProducts();
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);
    
    await addProduct(formData);
    setShowAddForm(false);
    
    // Reset
    setName(""); setDescription(""); setPrice(""); setStock(""); setImage("");
    await loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      await deleteProduct(id);
      await loadProducts();
    }
  };

  const handleUpdateStock = async (id: string, currentStock: number) => {
    const newStockStr = prompt("Novo valor de estoque:", currentStock.toString());
    if (newStockStr !== null) {
      const newStock = parseInt(newStockStr, 10);
      if (!isNaN(newStock)) {
        await updateProductStock(id, newStock);
        await loadProducts();
      }
    }
  };

  if (loading) {
    return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-secondary rounded w-3/4"></div></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-primary-500" />
            Painel de Administração
          </h1>
          <p className="text-muted-foreground mt-2">Gerencie seu catálogo de produtos e estoque.</p>
        </div>
        
        <div className="flex gap-4">
          {products.length === 0 && (
            <button 
              onClick={handleSeed}
              className="px-4 py-2 glass font-semibold rounded-full hover:bg-secondary/50 transition-colors"
            >
              Popular Produtos Iniciais
            </button>
          )}
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddProduct} className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Nome do Produto" value={name} onChange={e => setName(e.target.value)} className="w-full bg-secondary border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary-500" />
            <input required type="number" step="0.01" placeholder="Preço" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-secondary border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary-500" />
            <input required placeholder="URL da Imagem" value={image} onChange={e => setImage(e.target.value)} className="w-full bg-secondary border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary-500 md:col-span-2" />
            <textarea required placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-secondary border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary-500 md:col-span-2" rows={3} />
            <input required type="number" placeholder="Estoque Inicial" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-secondary border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary-500" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
            <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors">Salvar Produto</button>
          </div>
        </form>
      )}

      <div className="glass-card rounded-2xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="p-4 text-sm font-medium text-muted-foreground">Produto</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Preço</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Estoque</th>
                <th className="p-4 text-sm font-medium text-muted-foreground text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {product.stock} em estoque
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleUpdateStock(product.id, product.stock)} className="p-2 glass rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground" title="Editar Estoque">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 glass rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors text-muted-foreground" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    Nenhum produto cadastrado no catálogo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
