"use client";

import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from './FavoriteButton'; // <--- YENİ EKLEME
import { useCart } from '@/components/context/CartContext';

export interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  stock?: number;
}

export default function ProductCard({ id, title, price, image, category, stock }: ProductCardProps) {
  const { addToCart } = useCart();
  const isOutOfStock = stock !== undefined && stock <= 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Test için alert
    alert(`Sepete ekleniyor: ${title}`);
    
    console.log('Sepete ekle butonuna tıklandı:', { id, title, price, stock });
    
    if (isOutOfStock) {
      alert('Üzgünüz, bu ürün stokta bulunmamaktadır.');
      return;
    }

    try {
      addToCart({
        id,
        title,
        price: parseFloat(price),
        image,
        stock,
      });
      console.log('Ürün sepete eklendi');
    } catch (error) {
      console.error('Sepete ekleme hatası:', error);
      alert('Bir hata oluştu: ' + error);
    }
  };

  return (
    <div className="block group h-full relative">
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
        
        {/* Resim Alanı */}
        <Link href={`/urun/${id}`} className="block">
          <div className="h-72 bg-stone-100 relative overflow-hidden">
            <Image 
              src={image} 
              alt={title}
              fill 
              className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              key={image}
              unoptimized
            />

            {/* Kategori Etiketi */}
            <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-green-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
              {category}
            </span>

            {/* Stok Durumu Badge - Favori butonunun altında */}
            {(stock === 0 || stock === undefined) && (
              <span className="absolute top-12 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                Stokta Yok
              </span>
            )}
            {stock && stock > 0 && stock < 10 && (
              <span className="absolute top-12 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                Son {stock} Adet
              </span>
            )}

            {/* YENİ: Favori Butonu (Sağ Üst) */}
            <div className="absolute top-3 right-3 z-20">
              <FavoriteButton productId={id} />
            </div>
          </div>
        </Link>

        {/* Bilgi Alanı */}
        <div className="p-6 flex flex-col flex-grow">
          <Link href={`/urun/${id}`} className="block">
            <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                <span className="text-stone-300 text-xs ml-1">(Yeni)</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-stone-800 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-50 relative">
            <Link href={`/urun/${id}`} className="block pointer-events-auto">
              <div>
                <span className="block text-xs text-stone-600 font-medium">Fiyat</span>
                <span className="text-xl font-bold text-green-800">{price} ₺</span>
              </div>
            </Link>
            
            {/* Sepet Butonu - Link dışında, ayrı buton, pointer-events ile korunuyor */}
            <div 
              className="relative z-[100]" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <button
                type="button"
                onClick={handleAddToCart}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                disabled={isOutOfStock}
                className={`bg-green-50 text-green-700 p-3 rounded-xl transition-colors shadow-sm border-2 border-green-200 ${
                  isOutOfStock
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-green-600 hover:text-white hover:border-green-700 active:scale-95 cursor-pointer'
                }`}
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1000 }}
                aria-label={isOutOfStock ? 'Ürün stokta yok' : `${title} ürününü sepete ekle`}
              >
                <ShoppingBag size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}