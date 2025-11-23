"use client";

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/context/CartContext';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition flex items-center justify-center gap-3 active:scale-95"
      aria-label={`${product.title} ürününü sepete ekle`}
    >
      <ShoppingBag size={20} aria-hidden="true" />
      <span>Sepete Ekle</span>
    </button>
  );
}