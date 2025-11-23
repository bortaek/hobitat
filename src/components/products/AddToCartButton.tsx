"use client";

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/context/CartContext';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <button 
      onClick={() => addToCart(product)}
      disabled={isOutOfStock}
      className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg shadow-lg transition flex items-center justify-center gap-3 active:scale-95 ${
        isOutOfStock
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
      }`}
      aria-label={isOutOfStock ? 'Ürün stokta yok' : `${product.title} ürününü sepete ekle`}
    >
      <ShoppingBag size={20} aria-hidden="true" />
      <span>{isOutOfStock ? 'Stokta Yok' : 'Sepete Ekle'}</span>
    </button>
  );
}