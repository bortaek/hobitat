import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Next.js'in süper hızlı resim bileşeni

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
}

export default function ProductCard({ id, title, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/urun/${id}`} className="block group h-full">
      {/* Kartın Kendisi */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
        
        {/* Resim Alanı */}
        <div className="h-72 bg-stone-100 relative overflow-hidden">
          
          {/* OPTİMİZE EDİLMİŞ RESİM */}
          <Image 
            src={image} 
            alt={title}
            fill // Resmi kutuya tam doldurur
            className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Kategori Etiketi (Glassmorphism Efekti) */}
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-green-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
            {category}
          </span>
        </div>

        {/* Bilgi Alanı */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Yıldızlar */}
          <div className="flex items-center gap-1 text-yellow-400 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
              <span className="text-stone-300 text-xs ml-1">(Yeni)</span>
          </div>

          {/* Başlık */}
          <h3 className="font-serif font-bold text-xl text-stone-800 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
            {title}
          </h3>
          
          {/* Alt Kısım: Fiyat ve Buton */}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-50">
            <div>
              <span className="block text-xs text-stone-400 font-medium">Fiyat</span>
              <span className="text-xl font-bold text-green-800">{price} ₺</span>
            </div>
            
            {/* Sepet İkonu */}
            <div className="bg-green-50 text-green-700 p-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
              <ShoppingBag size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}