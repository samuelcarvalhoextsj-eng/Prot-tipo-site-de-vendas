"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCatalog } from "@/components/ProductCatalog";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary-500/20 bg-primary-500/10 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">A revolução do e-commerce chegou</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-tight"
        >
          O futuro do <span className="bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">varejo digital</span> está em suas mãos.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground text-balance"
        >
          Descubra produtos incríveis com uma experiência de compra imersiva, rápida e totalmente segura.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto"
        >
          <Link 
            href="#catalogo" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 hover:scale-105 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            <ShoppingBag className="w-5 h-5" />
            Explorar Catálogo
          </Link>
        </motion.div>
      </div>



      {/* Product Catalog with Scroll Animation */}
      <ProductCatalog />
    </main>
  );
}
