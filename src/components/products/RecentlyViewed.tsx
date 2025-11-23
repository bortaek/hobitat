"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  stock?: number;
}

interface RecentlyViewedProps {
  currentProductId?: number; // Şu anki sayfadaki ürünü göstermemek için
}

export default function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        const allProducts: Product[] = JSON.parse(stored);
        
        // Şu anki ürünü filtrele ve en fazla 4 tane göster
        const filtered = currentProductId 
          ? allProducts.filter(p => p.id !== currentProductId)
          : allProducts;
          
        setProducts(filtered.slice(0, 4));
      }
    } catch (error) {
      console.error('Son görüntülenenler okunamadı:', error);
    } finally {
      setLoading(false);
    }
  }, [currentProductId]);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white p-2 rounded-full shadow-sm text-stone-600">
            <History size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800">
            Son Görüntülenenler
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                id={product.id}
                title={product.title}
                category={product.category}
                price={product.price.toString()}
                image={product.image_url}
                {...(product.stock !== undefined && { stock: product.stock })}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

