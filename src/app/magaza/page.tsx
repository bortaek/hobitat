"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/products/ProductCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Filter } from 'lucide-react';
import AdvancedFilters, { FilterState } from '@/components/shop/AdvancedFilters';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  stock?: number;
}

const CATEGORIES = ["Tümü", "Sebze", "Meyve", "Baharat", "Toprak"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Gelişmiş Filtreleme State'leri
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    inStock: null,
    category: '',
    searchTerm: '',
  });
  const [sortBy, setSortBy] = useState<string>('default');
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

  // Kategori butonları için eski filtreleme (geriye dönük uyumluluk)
  useEffect(() => {
    if (selectedCategory !== "Tümü") {
      setFilters(prev => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  // --- GELİŞMİŞ FİLTRELEME MANTIĞI ---
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // 1. Arama kelimesi
      const matchesSearch = filters.searchTerm === '' || 
        product.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // 2. Kategori (hem eski kategori butonları hem yeni filtre)
      const categoryFilter = filters.category || (selectedCategory !== "Tümü" ? selectedCategory : '');
      const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
      
      // 3. Fiyat aralığı
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];
      
      // 4. Stok durumu
      const matchesStock = filters.inStock === null || 
        (filters.inStock === true ? (product.stock !== undefined && product.stock > 0) : 
         (product.stock === undefined || product.stock === 0));

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });

    // --- SIRALAMA ---
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id); // ID'ye göre (yeni eklenenler daha yüksek ID)
        break;
      case 'oldest':
        filtered.sort((a, b) => a.id - b.id);
        break;
      case 'stock-high':
        filtered.sort((a, b) => (b.stock || 0) - (a.stock || 0));
        break;
      case 'stock-low':
        filtered.sort((a, b) => (a.stock || 0) - (b.stock || 0));
        break;
      default:
        // Varsayılan sıralama (değişiklik yok)
        break;
    }

    return filtered;
  }, [products, filters, selectedCategory, sortBy]);

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
        
        {/* Kategori Butonları (Hızlı Erişim) */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === "Tümü") {
                  setFilters(prev => ({ ...prev, category: '' }));
                }
              }}
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

        {/* Gelişmiş Filtreler ve Sıralama */}
        <AdvancedFilters 
          onFilterChange={setFilters}
          onSortChange={setSortBy}
          currentSort={sortBy}
        />

        {/* Sonuç Sayısı */}
        {!loading && (
          <div className="mb-6 text-stone-600 text-sm">
            <strong>{filteredProducts.length}</strong> ürün bulundu
          </div>
        )}

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
               onClick={() => {
                 setSelectedCategory("Tümü");
                 setFilters({
                   priceRange: [0, 1000],
                   inStock: null,
                   category: '',
                   searchTerm: '',
                 });
                 setSortBy('default');
               }}
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
                {...(product.stock !== undefined && { stock: product.stock })}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}