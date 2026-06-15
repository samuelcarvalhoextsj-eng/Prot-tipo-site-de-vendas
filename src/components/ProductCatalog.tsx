"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProducts } from "@/app/actions/products";
import { useCartStore } from "@/store/useCartStore";
import { useFlyingCart } from "@/components/FlyingCartAnimation";

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const { triggerAnimation } = useFlyingCart();

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="catalogo" className="min-h-screen py-24 px-4 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Descubra</h2>
            <p className="text-muted-foreground max-w-xl">
              Nossa curadoria de produtos tecnológicos avançados, projetados para o amanhã.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-shadow"
              />
            </div>
            <button className="p-2.5 glass rounded-full hover:bg-foreground/10 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.85, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              whileHover={{ y: -5 }}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
                {/* Fallback image style since we're using external URLs that might need next/image config */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-4 right-4 glass px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-primary-400 text-primary-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold text-primary-400 tracking-wider uppercase mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-bold text-foreground">
                    R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <button 
                    onClick={(e) => {
                      addItem(product);
                      const rect = e.currentTarget.getBoundingClientRect();
                      triggerAnimation(product.image, rect.left, rect.top);
                    }}
                    className="text-sm font-medium glass px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
