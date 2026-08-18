"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface StackProps {
  images: { id: number; src: string; title: string }[];
}

export default function Stack({ images }: StackProps) {
  const [cards, setCards] = useState(images);

  const handleDragEnd = (event: any, info: any) => {
    // If dragged far enough, remove the top card and put it at the back
    if (Math.abs(info.offset.x) > 100) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const topCard = newCards.shift();
        if (topCard) newCards.push(topCard);
        return newCards;
      });
    }
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <AnimatePresence>
        {cards.map((card, index) => {
          // Only render the top 3 cards to keep it lightweight
          if (index > 2) return null;

          const isTop = index === 0;

          return (
            <motion.div
              key={card.id}
              className="absolute w-[250px] md:w-[350px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black"
              style={{
                zIndex: cards.length - index,
              }}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 20,
                rotate: isTop ? 0 : index % 2 === 0 ? 5 : -5,
                opacity: 1 - index * 0.2,
              }}
              exit={{ x: 300, opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ scale: 1.05, rotate: 5, cursor: "grabbing" }}
              whileHover={isTop ? { scale: 1.02, cursor: "grab" } : {}}
            >
              <Image src={card.src} alt={card.title} fill className="object-cover pointer-events-none select-none" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-6">
                <span className="text-white font-outfit font-bold text-xl">{card.title}</span>
                <span className="text-white/60 font-mono text-xs uppercase tracking-widest mt-1">Swipe to next</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
