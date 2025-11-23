"use client";

import React, { useState } from 'react';
import { ShoppingBag, Menu, Sprout, User } from 'lucide-react'; // <--- User ikonunu ekledik
import Link from 'next/link';
import { useCart } from '@/components/context/CartContext';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F9F8F6]/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-green-700 text-white p-2 rounded-lg group-hover:bg-green-800 transition">
              <Sprout size={24} />
            </div>
            <span className="text-2xl font-serif font-bold text-green-900 dark:text-green-400 tracking-tight">
              Hobitat
            </span>
          </Link>

          {/* MENÜ LİNKLERİ (Masaüstü) */}
          <nav className="hidden md:flex gap-8 text-stone-700 dark:text-stone-300 font-medium" aria-label="Ana navigasyon">
            <Link href="/magaza" className="hover:text-green-700 dark:hover:text-green-400 transition">Tüm Ürünler</Link>
            <Link href="/magaza?kategori=Meyve" className="hover:text-green-700 dark:hover:text-green-400 transition">Meyve Fideleri</Link>
            <Link href="/magaza?kategori=Sebze" className="hover:text-green-700 dark:hover:text-green-400 transition">Sebze Fideleri</Link>
            <Link href="/magaza?kategori=Toprak" className="hover:text-green-700 dark:hover:text-green-400 transition">Toprak & Gübre</Link>
            <Link href="/blog" className="hover:text-green-700 dark:hover:text-green-400 transition">Blog</Link>
          </nav>

          {/* SAĞ TARAF (İkonlar) */}
          <div className="flex items-center gap-4">
            
            <ThemeToggle />

            {/* YENİ EKLENEN: Profil İkonu */}
            <Link 
              href="/hesabim" 
              className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition hidden md:block dark:text-stone-300" 
              aria-label="Hesabım sayfasına git"
            >
              <User size={24} strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">Hesabım</span>
            </Link>

            {/* Sepet Butonu */}
            <button 
              onClick={toggleCart} 
              className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition relative dark:text-stone-300"
              aria-label={`Sepetim${totalItems > 0 ? ` (${totalItems} ürün)` : ' (boş)'}`}
              aria-expanded={false}
            >
              <ShoppingBag size={24} strokeWidth={1.5} aria-hidden="true" />
              
              {/* Sepet Sayacı */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-pulse" aria-label={`${totalItems} ürün`}>
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobil Menü Butonu */}
            <button 
              className="md:hidden p-2 hover:bg-stone-200 rounded-full transition"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil Menü Bileşeni */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}