"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Announcement {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link?: string;
  badge?: string;
  gradient: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "İlkbahar Kampanyası",
    subtitle: "Özel Fırsat",
    description: "Tüm fidelerde %20 indirim. Aşılı domates ve biber fidelerinde özel fiyatlar!",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    link: "/magaza",
    badge: "%20 İndirim",
    gradient: "from-green-500 via-emerald-500 to-teal-500"
  },
  {
    id: 2,
    title: "Ücretsiz Kargo",
    subtitle: "Kampanya",
    description: "150 TL ve üzeri alışverişlerde ücretsiz kargo. Hemen alışverişe başla!",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
    link: "/magaza",
    badge: "Ücretsiz",
    gradient: "from-blue-500 via-cyan-500 to-sky-500"
  },
  {
    id: 3,
    title: "Yeni Ürünler",
    subtitle: "Yeni Gelenler",
    description: "27 yeni fide çeşidi eklendi. Kıvırcık marul, cherry domates ve daha fazlası!",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80",
    link: "/magaza",
    badge: "Yeni",
    gradient: "from-orange-500 via-amber-500 to-yellow-500"
  },
  {
    id: 4,
    title: "Organik Sertifikalı",
    subtitle: "Kalite Garantisi",
    description: "Tüm fidelerimiz organik sertifikalı ve garantili. Doğal yaşam için doğru tercih!",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    link: "/magaza",
    badge: "Sertifikalı",
    gradient: "from-emerald-500 via-green-500 to-lime-500"
  }
];

export default function Announcements() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Otomatik kaydırma
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, announcements.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const currentAnnouncement = announcements[currentIndex];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="relative group">
          
          {/* Ana Banner Container */}
          <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${currentAnnouncement.gradient} shadow-2xl transition-all duration-500`}>
            
            {/* Dekoratif Elementler */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* İçerik */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="grid md:grid-cols-5 gap-0 items-center min-h-[280px] md:min-h-[320px]">
                  
                  {/* Sol: Metin Kısmı (3 kolon) */}
                  <div className="md:col-span-3 p-8 md:p-12 text-white relative z-10">
                    
                    {/* Badge */}
                    {currentAnnouncement.badge && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/30"
                      >
                        <Sparkles size={16} className="text-yellow-300" />
                        <span className="text-sm font-bold">{currentAnnouncement.badge}</span>
                      </motion.div>
                    )}

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm md:text-base font-medium text-white/80 mb-2 uppercase tracking-wider"
                    >
                      {currentAnnouncement.subtitle}
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight"
                    >
                      {currentAnnouncement.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-lg"
                    >
                      {currentAnnouncement.description}
                    </motion.p>

                    {/* CTA Button */}
                    {currentAnnouncement.link && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          href={currentAnnouncement.link}
                          className="group inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3.5 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                          Hemen Keşfet
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    )}

                  </div>

                  {/* Sağ: Görsel Kısmı (2 kolon) */}
                  <div className="md:col-span-2 relative h-64 md:h-full min-h-[280px] md:min-h-[320px]">
                    <motion.div
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={currentAnnouncement.image}
                        alt={currentAnnouncement.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40"></div>
                    </motion.div>
                    
                    {/* Dekoratif Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-white border border-white/20 hover:scale-110 shadow-lg"
              aria-label="Önceki duyuru"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-white border border-white/20 hover:scale-110 shadow-lg"
              aria-label="Sonraki duyuru"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                key={currentIndex}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-10 h-2'
                      : 'w-2 h-2 hover:w-6'
                  }`}
                  aria-label={`Duyuru ${index + 1} - ${announcements[index].title}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                >
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white shadow-lg'
                      : 'bg-white/40 hover:bg-white/60'
                  }`} />
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
