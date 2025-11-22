"use client";

import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/components/context/CartContext';
import Link from 'next/link'; // <--- Link bileşenini çağırdık

export default function CartSidebar() {
  const { isCartOpen, toggleCart, items, removeFromCart, totalPrice } = useCart();

  // Sepet kapalıysa render etme
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* KARARTMA PERDESİ */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      ></div>

      {/* ÇEKMECE */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* BAŞLIK */}
        <div className="p-6 flex items-center justify-between border-b border-stone-100 bg-[#F9F8F6]">
          <div className="flex items-center gap-2 text-green-800 font-bold text-xl font-serif">
            <ShoppingBag size={24} />
            <span>Sepetim ({items.length})</span>
          </div>
          <button onClick={toggleCart} className="p-2 hover:bg-stone-200 rounded-full transition">
            <X size={24} className="text-stone-500" />
          </button>
        </div>

        {/* ÜRÜN LİSTESİ */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag size={64} className="mb-4 text-stone-300" />
              <p className="text-lg font-medium text-stone-500">Sepetin şu an boş.</p>
              <button onClick={toggleCart} className="mt-4 text-green-600 font-bold hover:underline">
                Alışverişe Dön
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Ürün Resmi */}
                <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0 border border-stone-200 relative">
                  {/* Next/Image kullanmadık çünkü context'ten gelen veri yapısı basit img tagine daha uygun şu an */}
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Ürün Bilgisi */}
                <div className="flex-1">
                  <h4 className="font-bold text-stone-800 line-clamp-1">{item.title}</h4>
                  <p className="text-sm text-stone-500 mb-2">Adet: {item.quantity}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-700">{item.price * item.quantity} ₺</span>
                    
                    {/* Silme Butonu */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition"
                      title="Sepetten Çıkar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ALT KISIM (Toplam & Ödeme Butonu) */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-[#F9F8F6]">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-stone-600">Ara Toplam</span>
              <span className="font-bold text-2xl text-stone-800">{totalPrice} ₺</span>
            </div>
            
            {/* BURASI DEĞİŞTİ: Buton yerine Link kullandık */}
            <Link 
              href="/odeme" 
              onClick={toggleCart} // Sayfaya giderken sepeti kapat
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition flex items-center justify-center gap-2"
            >
              Siparişi Tamamla
              <ArrowRight size={20} />
            </Link>
            
            <p className="text-center text-xs text-stone-400 mt-3">
              Kargo ve vergiler ödeme adımında hesaplanır.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}