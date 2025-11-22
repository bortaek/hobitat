import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 h-full animate-pulse">
      {/* Resim Yerine Gri Kutu */}
      <div className="h-72 bg-stone-200" />
      
      <div className="p-6">
        {/* Başlık Yerine Gri Çizgi */}
        <div className="h-6 bg-stone-200 rounded w-3/4 mb-4" />
        {/* Fiyat Yerine Gri Çizgi */}
        <div className="h-4 bg-stone-200 rounded w-1/2 mb-8" />
        
        <div className="flex justify-between items-center pt-4 border-t border-stone-50">
           <div className="h-8 w-20 bg-stone-200 rounded" />
           <div className="h-10 w-10 bg-stone-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}