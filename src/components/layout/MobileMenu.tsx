"use client";

import React from 'react';
import { X, Sprout, ChevronRight, Phone, Instagram } from 'lucide-react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Eğer kapalıysa hiçbir şey render etme
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* KARARTMA PERDESİ (Arka plana tıklayınca kapanır) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* MENÜ PANELİ (Soldan gelir) */}
      <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-xs bg-[#F9F8F6] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
        
        {/* ÜST KISIM: Logo ve Kapatma */}
        <div className="p-6 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="bg-green-700 text-white p-2 rounded-lg">
              <Sprout size={20} />
            </div>
            <span className="text-xl font-serif font-bold text-green-900">Hobitat</span>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm text-stone-500">
            <X size={20} />
          </button>
        </div>

        {/* LİNKLER */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-stone-700 hover:bg-white hover:text-green-700 transition font-medium">
                Ana Sayfa
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            </li>
            <li>
              <Link href="#" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-stone-700 hover:bg-white hover:text-green-700 transition font-medium">
                Meyve Fideleri
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            </li>
            <li>
              <Link href="#" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-stone-700 hover:bg-white hover:text-green-700 transition font-medium">
                Sebze Fideleri
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            </li>
            <li>
              <Link href="#" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-stone-700 hover:bg-white hover:text-green-700 transition font-medium">
                Toprak & Gübre
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-stone-700 hover:bg-white hover:text-green-700 transition font-medium">
                Blog
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            </li>
            <li>
              <Link href="#" onClick={onClose} className="flex items-center justify-between px-6 py-4 text-orange-600 hover:bg-white font-bold transition">
                Toptan Satış
                <ChevronRight size={16} className="opacity-50" />
              </Link>
            </li>
          </ul>
        </nav>

        {/* ALT KISIM: İletişim */}
        <div className="p-6 bg-white border-t border-stone-200">
          <a href="tel:+905551234567" className="flex items-center gap-3 text-stone-600 mb-4">
            <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
              <Phone size={18} />
            </div>
            <div className="text-sm">
              <div className="font-bold">Bizi Arayın</div>
              <div>0555 123 45 67</div>
            </div>
          </a>
          <button className="w-full bg-stone-100 text-stone-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
            <Instagram size={18} />
            Bizi Takip Edin
          </button>
        </div>

      </div>
    </div>
  );
}