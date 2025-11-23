import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from '@/components/products/AddToCartButton';
import { supabase } from '@/lib/supabaseClient';
import { Metadata } from 'next';
import ReviewSection from '@/components/products/ReviewSection'; // <--- YORUM MODÜLÜ

// Veri Tipi Tanımı
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
}

// Supabase'den Tek Ürün Çeken Fonksiyon
async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Ürün çekme hatası:", error);
    return null;
  }
  return data as Product;
}

// --- SEO (METADATA) OLUŞTURAN KISIM ---
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  const { data: product } = await supabase
    .from('products')
    .select('title, description, image_url')
    .eq('id', id)
    .single();

  if (!product) {
    return {
      title: "Ürün Bulunamadı | Hobitat",
    };
  }

  return {
    title: product.title,
    description: product.description ? product.description.slice(0, 160) : "Bu harika ürünü inceleyin.",
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image_url],
    },
  };
}

// --- SAYFA İÇERİĞİ ---
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F8F6]">
        <h1 className="text-2xl font-bold text-stone-600 mb-4">Ürün Bulunamadı 🌱</h1>
        <Link href="/" className="text-green-600 hover:underline">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const defaultFeatures = ["Saksıya Uygun", "Aşılanmış Fide", "Yüksek Verim"];

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />

      <div className="container mx-auto px-6 py-10 flex-grow">
        
        <Link href="/" className="inline-flex items-center text-stone-500 hover:text-green-700 mb-8 transition">
          <ArrowLeft size={20} className="mr-2" />
          Ana Sayfaya Dön
        </Link>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-stone-100">
          
          {/* SOL: RESİM */}
          <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] bg-stone-100 group">
            <Image 
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              key={product.image_url}
              priority
            />
            <span className="absolute top-4 left-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              {product.category}
            </span>
          </div>

          {/* SAĞ: BİLGİ */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-1 text-yellow-400 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              <span className="text-stone-400 ml-2 text-sm">(Yeni Ürün)</span>
            </div>

            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {product.description || "Bu ürün için henüz açıklama girilmemiş."}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {defaultFeatures.map((feature, index) => (
                <span key={index} className="bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-sm font-medium">
                  ✨ {feature}
                </span>
              ))}
            </div>

            <div className="h-px bg-stone-200 w-full mb-8"></div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div>
                <p className="text-stone-400 text-sm font-medium">Satış Fiyatı</p>
                <p className="text-4xl font-bold text-green-800">{product.price} ₺</p>
              </div>

              <AddToCartButton product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image_url
              }} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-2 text-sm text-stone-500">
                 <Truck size={18} className="text-green-600"/> 
                 <span>24 Saatte Kargo</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-stone-500">
                 <ShieldCheck size={18} className="text-green-600"/> 
                 <span>Canlılık Garantisi</span>
               </div>
            </div>

          </div>
        </div>

        {/* --- YENİ: YORUM BÖLÜMÜ EKLENDİ --- */}
        <ReviewSection productId={product.id} />

      </div>

      <Footer />
    </main>
  );
}