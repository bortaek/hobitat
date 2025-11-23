"use client";

import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Sadece ilk ziyarette göster (localStorage kontrolü)
    const hasSeenSplash = typeof window !== 'undefined' && localStorage.getItem('hobitat-splash-seen');
    
    if (!hasSeenSplash) {
      setIsVisible(true);
      setIsMounted(true);
      
      // İlk görüntülemeyi kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('hobitat-splash-seen', 'true');
      }

      // 2.5 saniye sonra fade out başlasın
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2500);

      // 3 saniye sonra component'i tamamen kaldır
      const removeTimer = setTimeout(() => {
        setIsMounted(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center"
        >
          {/* Dekoratif Elementler */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 0.1
            }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            {/* Logo Icon */}
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-6 rounded-2xl shadow-2xl"
            >
              <Sprout size={64} strokeWidth={1.5} />
            </motion.div>

            {/* Logo Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0.5
              }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-green-900 tracking-tight">
                Hobitat
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-lg md:text-xl text-green-700 mt-2 font-medium"
              >
                Evinizdeki Doğal Yaşam
              </motion.p>
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                delay: 0.6
              }}
              className="mt-8 h-1 bg-green-200 rounded-full overflow-hidden w-48"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut",
                  delay: 0.6,
                  repeat: Infinity
                }}
                className="h-full w-1/3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

