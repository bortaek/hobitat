import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import BlogCards from './BlogCards';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author: string;
  published_at: string;
  keywords: string[];
  category: string;
}

async function getFeaturedBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Bloglar çekilirken hata:', error);
      return [];
    }

    // Debug: Tüm blogların resimlerini logla
    if (data && data.length > 0) {
      console.log('🔍 Featured Blogs Çekildi:');
      data.forEach((blog, index) => {
        console.log(`${index + 1}. ${blog.title}`);
        console.log(`   🖼️ Resim: ${blog.featured_image}`);
        console.log(`   📝 Slug: ${blog.slug}`);
      });
    }

    return data as Blog[];
  } catch (err) {
    console.error('Beklenmeyen hata:', err);
    return [];
  }
}

// Cache'i devre dışı bırak - her zaman güncel veri çek
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function FeaturedBlogs() {
  const blogs = await getFeaturedBlogs();

  // Eğer blog yoksa hiçbir şey gösterme
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Başlık Kısmı */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-900">Blog & Rehberler</h2>
            <p className="text-stone-500 mt-2">Bahçecilik ipuçları ve bilgilendirici yazılar</p>
          </div>
          <Link href="/blog" className="text-green-700 font-semibold hover:underline hidden md:flex items-center gap-2">
            Tümünü Gör
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Blog Kartları - Client Component ile animasyonlu */}
        <BlogCards blogs={blogs} />
      </div>
    </section>
  );
}
