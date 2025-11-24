"use client";

import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '@/components/context/CartContext';
import Link from 'next/link';
import CartCrossSell from '@/components/products/CartCrossSell';
import { useToast } from '@/components/context/ToastContext';

export default function CartSidebar() {
  const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { warning } = useToast();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    try {
      updateQuantity(id, newQuantity);
    } catch (err: any) {
      const message = err.message.replace('Error: ', '');
      warning(message);
    }
  };

  // Sepet kapalıysa render etme
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* KARARTMA PERDESİ */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      ></div>

      {/* ÇEKMECE */}
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* BAŞLIK */}
        <div className="p-6 flex items-center justify-between border-b border-stone-100 dark:border-stone-800 bg-[#F9F8F6] dark:bg-stone-950">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-400 font-bold text-xl font-serif">
            <ShoppingBag size={24} />
            <span>Sepetim ({items.length})</span>
          </div>
          <button 
            onClick={toggleCart} 
            className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition"
            aria-label="Sepeti kapat"
          >
            <X size={24} className="text-stone-500 dark:text-stone-400" aria-hidden="true" />
          </button>
        </div>

        {/* ÜRÜN LİSTESİ */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag size={64} className="mb-4 text-stone-300 dark:text-stone-600" />
              <p className="text-lg font-medium text-stone-700 dark:text-stone-400">Sepetin şu an boş.</p>
              <button onClick={toggleCart} className="mt-4 text-green-600 dark:text-green-400 font-bold hover:underline">
                Alışverişe Dön
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Ürün Resmi */}
                <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-hidden flex-shrink-0 border border-stone-200 dark:border-stone-700 relative">
                  {/* Next/Image kullanmadık çünkü context'ten gelen veri yapısı basit img tagine daha uygun şu an */}
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Ürün Bilgisi */}
                <div className="flex-1">
                  <h4 className="font-bold text-stone-800 dark:text-stone-100 line-clamp-1 mb-2">{item.title}</h4>
                  
                  {/* Miktar Kontrolü */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">Adet:</span>
                    <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition active:scale-95"
                        aria-label="Miktarı azalt"
                      >
                        <Minus size={14} className="text-stone-700 dark:text-stone-300" aria-hidden="true" />
                      </button>
                      <span className="px-3 py-1.5 text-stone-800 dark:text-stone-100 font-bold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={item.stock !== undefined && item.quantity >= item.stock}
                        className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 rounded transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Miktarı artır"
                      >
                        <Plus size={14} className="text-stone-700 dark:text-stone-300" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-700 dark:text-green-400">{item.price * item.quantity} ₺</span>
                    
                    {/* Silme Butonu */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                      aria-label={`${item.title} ürününü sepetten çıkar`}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ÇAPRAZ SATIŞ (Sepette) */}
        {items.length > 0 && (
          <div className="px-6 pb-4">
            <CartCrossSell cartItemIds={items.map(item => item.id)} />
          </div>
        )}

        {/* ÇAPRAZ SATIŞ (Sepette) */}
        {items.length > 0 && (
          <div className="px-6 pb-4">
            <CartCrossSell cartItemIds={items.map(item => item.id)} />
          </div>
        )}

        {/* ALT KISIM (Toplam & Ödeme Butonu) */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 dark:border-stone-800 bg-[#F9F8F6] dark:bg-stone-950">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-stone-700 dark:text-stone-300 font-medium">Ara Toplam</span>
              <span className="font-bold text-2xl text-stone-800 dark:text-stone-100">{totalPrice} ₺</span>
            </div>
            
            {/* BURASI DEĞİŞTİ: Buton yerine Link kullandık */}
            <Link 
              href="/odeme" 
              onClick={toggleCart} // Sayfaya giderken sepeti kapat
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 dark:shadow-none transition flex items-center justify-center gap-2"
            >
              Siparişi Tamamla
              <ArrowRight size={20} />
            </Link>
            
            <p className="text-center text-xs text-stone-600 dark:text-stone-400 mt-3">
              Kargo ve vergiler ödeme adımında hesaplanır.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}