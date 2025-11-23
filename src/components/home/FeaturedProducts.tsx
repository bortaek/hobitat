"use client";

import React from 'react';
import Link from 'next/link';
import ProductCard from '../products/ProductCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Veritabanından gelecek verinin şekli
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  stock?: number;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(12)
        .order('id', { ascending: false });
    
      if (error) {
        console.error("🚨 SUPABASE HATASI:", error.message);
        setLoading(false);
        return;
      }
      
      setProducts(data as Product[]);
      setLoading(false);
    }

    getProducts();
  }, []);

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
    <section className="py-20 bg-[#F9F8F6]">
      <div className="container mx-auto px-6">
        {/* Başlık Kısmı */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-900">Çok Satanlar</h2>
            <p className="text-stone-600 mt-2">Bu ay balkonlarda en çok bunlar büyüyor.</p>
          </div>
          <Link href="/magaza" className="text-green-700 font-semibold hover:underline hidden md:block">Tümünü Gör →</Link>
        </motion.div>

        {/* Ürün Listesi */}
        {loading ? (
          <div className="text-center py-10 text-stone-600">Yükleniyor...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-stone-600">Henüz ürün eklenmemiş veya yükleniyor...</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
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
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center md:hidden"
        >
          <Link href="/magaza" className="text-green-700 font-semibold hover:underline">Tümünü Gör →</Link>
        </motion.div>
      </div>
    </section>
  );
}
