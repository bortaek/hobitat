"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // <--- IMPORT ET

export default function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden bg-green-900">
      
      {/* OPTİMİZE EDİLMİŞ HAREKETLİ ARKAPLAN */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 opacity-60"
      >
        <Image
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070"
          alt="Bahçe Arkaplan"
          fill
          priority
          fetchPriority="high"
          quality={85}
          className="object-cover"
        />
      </motion.div>

      {/* ... (İçerik div'i ve yazılar AYNEN kalacak, oraya dokunma) */}
      <div className="container mx-auto px-6 relative z-10 text-white">
         {/* ... eski kodlar ... */}
      </div>
    </section>
  );
}