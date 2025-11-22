"use client";

import React, { useState } from 'react';
import { ShoppingBag, Menu, Sprout } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-stone-200">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-green-700 text-white p-2 rounded-lg group-hover:bg-green-800 transition">
              <Sprout size={24} />
            </div>
            <span className="text-2xl font-serif font-bold text-green-900 tracking-tight">
              Hobitat
            </span>
          </Link>

          {/* MENÜ LİNKLERİ (Masaüstü) - Hepsi Mağaza'ya gider */}
          <nav className="hidden md:flex gap-8 text-stone-600 font-medium">
            <Link href="/magaza" className="hover:text-green-700 transition">Tüm Ürünler</Link>
            <Link href="/magaza" className="hover:text-green-700 transition">Meyve Fideleri</Link>
            <Link href="/magaza" className="hover:text-green-700 transition">Sebze Fideleri</Link>
            <Link href="/magaza" className="hover:text-green-700 transition">Toprak & Gübre</Link>
          </nav>

          {/* SAĞ TARAF (Sepet & Mobil Menü İkonu) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleCart} 
              className="p-2 hover:bg-stone-200 rounded-full transition relative"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              
              {/* Sepet Sayacı */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobil Menü Butonu */}
            <button 
              className="md:hidden p-2 hover:bg-stone-200 rounded-full transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
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