"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  stock?: number;
}

interface CrossSellProps {
  currentProductId: number;
  currentCategory: string;
}

export default function CrossSell({ currentProductId, currentCategory }: CrossSellProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCrossSellProducts() {
      try {
        // Aynı kategorideki diğer ürünleri getir (mevcut ürün hariç)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', currentCategory)
          .neq('id', currentProductId)
          .limit(4)
          .order('id', { ascending: false });

        if (error) {
          console.error('Çapraz satış ürünleri çekilirken hata:', error);
          // Hata durumunda popüler ürünleri göster
          const { data: popularData } = await supabase
            .from('products')
            .select('*')
            .neq('id', currentProductId)
            .limit(4)
            .order('id', { ascending: false });
          
          setProducts(popularData as Product[] || []);
        } else {
          // Eğer aynı kategoride yeterli ürün yoksa, popüler ürünlerle tamamla
          if (data && data.length < 4) {
            const { data: popularData } = await supabase
              .from('products')
              .select('*')
              .neq('id', currentProductId)
              .not('category', 'eq', currentCategory)
              .limit(4 - (data?.length || 0))
              .order('id', { ascending: false });
            
            setProducts([...(data || []), ...(popularData || [])].slice(0, 4));
          } else {
            setProducts(data || []);
          }
        }
      } catch (err) {
        console.error('Beklenmeyen hata:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCrossSellProducts();
  }, [currentProductId, currentCategory]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center text-stone-400">Yükleniyor...</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <Sparkles size={20} />
            <span className="text-sm font-bold">Önerilen Ürünler</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-900 mb-3">
            Bunları da Beğenebilirsiniz
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Bu ürünle birlikte alınanlar veya aynı kategorideki diğer ürünler
          </p>
        </motion.div>

        {/* Ürün Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
            >
              <ProductCard
                id={product.id}
                title={product.title}
                category={product.category}
                price={product.price.toString()}
                image={product.image_url}
                stock={product.stock}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

