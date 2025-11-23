"use client";

import { useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  stock?: number;
}

export default function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    if (!product) return;

    try {
      // Mevcut listeyi al
      const stored = localStorage.getItem('recentlyViewed');
      let recentlyViewed: Product[] = stored ? JSON.parse(stored) : [];

      // Bu ürün zaten listede varsa çıkar (en başa eklemek için)
      recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);

      // Ürünü başa ekle
      recentlyViewed.unshift(product);

      // Maksimum 10 ürün tut
      if (recentlyViewed.length > 10) {
        recentlyViewed = recentlyViewed.slice(0, 10);
      }

      // Kaydet
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Son görüntülenenler kaydedilemedi:', error);
    }
  }, [product]);

  return null; // Bu bileşen görsel bir şey render etmez
}

