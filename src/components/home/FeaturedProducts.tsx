import React from 'react';
import Link from 'next/link';
import ProductCard from '../products/ProductCard';
import { supabase } from '@/lib/supabaseClient'; // <--- Az önce oluşturduğumuz bağlantı

// Veritabanından gelecek verinin şekli
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string; // Supabase'de sütun adını böyle koymuştuk
}

// Verileri çeken fonksiyon
async function getProducts() {
    console.log("--- Supabase Verisi Çekiliyor ---"); // Casus 1
  
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(4);
  
    if (error) {
      console.error("🚨 SUPABASE HATASI:", error.message); // Casus 2: Hata varsa bağıracak
      return [];
    }
    
    console.log("✅ Gelen Veri:", data); // Casus 3: Veri geldiyse gösterecek
    return data as Product[];
  }

export default async function FeaturedProducts() {
  // Verileri çekiyoruz (Server Side Fetching)
  const products = await getProducts();

  return (
    <section className="py-20 bg-[#F9F8F6]">
      <div className="container mx-auto px-6">
        {/* Başlık Kısmı */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-900">Çok Satanlar</h2>
            <p className="text-stone-500 mt-2">Bu ay balkonlarda en çok bunlar büyüyor.</p>
          </div>
          <Link href="/magaza" className="text-green-700 font-semibold hover:underline hidden md:block">Tümünü Gör →</Link>
        </div>

        {/* Ürün Listesi */}
        {products.length === 0 ? (
          <div className="text-center py-10 text-stone-400">Henüz ürün eklenmemiş veya yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                // Veritabanında sayı (float) tutuyoruz ama kart string istiyor olabilir, dönüşüm yapalım:
                price={product.price.toString()} 
                // Veritabanında 'image_url', kartta 'image'
                image={product.image_url} 
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
             <Link href="/magaza" className="text-green-700 font-semibold hover:underline">Tümünü Gör →</Link>
        </div>
      </div>
    </section>
  );
}