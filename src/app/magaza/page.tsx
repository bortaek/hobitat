"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/products/ProductCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
}

const CATEGORIES = ["Tümü", "Sebze", "Meyve", "Baharat", "Toprak"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtreleme State'leri
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  // Verileri Çek
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // --- FİLTRELEME MANTIĞI ---
  const filteredProducts = products.filter(product => {
    // 1. Arama kelimesi eşleşiyor mu? (Küçük harfe çevirip bakıyoruz)
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Kategori eşleşiyor mu?
    const matchesCategory = selectedCategory === "Tümü" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />

      {/* Üst Başlık Alanı */}
      <div className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Tüm Ürünler</h1>
          <p className="text-green-100">Bahçeniz için ihtiyacınız olan her şey burada.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 flex-grow">
        
        {/* FİLTRE VE ARAMA ALANI */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
          
          {/* Kategori Butonları */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                   selectedCategory === cat 
                     ? "bg-green-600 text-white shadow-lg shadow-green-200" 
                     : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>

          {/* Arama Çubuğu */}
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-stone-400" size={20} />
          </div>
        </div>

        {/* ÜRÜN LİSTESİ */}
        {loading ? (
          <div className="text-center py-20 text-stone-400">Yükleniyor...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-100">
             <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-4">
               <Filter size={32} />
             </div>
             <h3 className="text-xl font-bold text-stone-600">Sonuç Bulunamadı</h3>
             <p className="text-stone-400 mt-2">Aradığınız kriterlere uygun ürün yok.</p>
             <button 
               onClick={() => {setSearchTerm(""); setSelectedCategory("Tümü")}}
               className="mt-4 text-green-600 font-bold hover:underline"
             >
               Filtreleri Temizle
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                price={product.price.toString()}
                image={product.image_url}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}