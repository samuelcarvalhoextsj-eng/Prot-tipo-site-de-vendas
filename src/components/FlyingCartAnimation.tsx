"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlyingElement {
  id: string;
  image: string;
  startX: number;
  startY: number;
}

interface FlyingCartContextType {
  triggerAnimation: (image: string, startX: number, startY: number) => void;
}

const FlyingCartContext = createContext<FlyingCartContextType | null>(null);

export function useFlyingCart() {
  const context = useContext(FlyingCartContext);
  if (!context) {
    throw new Error("useFlyingCart must be used within a FlyingCartProvider");
  }
  return context;
}

export function FlyingCartProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FlyingElement[]>([]);

  const triggerAnimation = (image: string, startX: number, startY: number) => {
    const id = Math.random().toString(36).substring(7);
    setElements((prev) => [...prev, { id, image, startX, startY }]);

    // Remove element after animation completes
    setTimeout(() => {
      setElements((prev) => prev.filter((el) => el.id !== id));
    }, 1000);
  };

  return (
    <FlyingCartContext.Provider value={{ triggerAnimation }}>
      {children}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <AnimatePresence>
          {elements.map((el) => {
            const target = document.getElementById("cart-icon-target");
            const targetRect = target?.getBoundingClientRect();
            
            // Fallback coordinates if target isn't found (top right corner roughly)
            const endX = targetRect ? targetRect.left + targetRect.width / 2 : window.innerWidth - 50;
            const endY = targetRect ? targetRect.top + targetRect.height / 2 : 50;

            return (
              <motion.img
                key={el.id}
                src={el.image}
                alt="Voando para o carrinho"
                className="absolute w-20 h-20 object-cover rounded-xl shadow-2xl border-2 border-primary-500/50"
                initial={{ 
                  x: el.startX - 40, 
                  y: el.startY - 40, 
                  scale: 1, 
                  opacity: 1 
                }}
                animate={{ 
                  x: endX - 10, 
                  y: endY - 10, 
                  scale: 0.1, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 1, 0.5, 1], // Custom cubic bezier for a nice swoop
                }}
                exit={{ opacity: 0 }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </FlyingCartContext.Provider>
  );
}
