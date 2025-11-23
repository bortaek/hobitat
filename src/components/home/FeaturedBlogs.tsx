import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long'
    });
  };

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

        {/* Blog Kartları */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group bg-[#F9F8F6] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100"
            >
              {/* Resim */}
              <div className="relative h-48 bg-stone-200 overflow-hidden">
                {blog.featured_image ? (
                  <img
                    src={`${blog.featured_image}?v=${blog.id}`}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    key={`img-${blog.id}-${blog.featured_image}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-stone-100">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📝</div>
                      <div className="text-sm">Resim Yok</div>
                    </div>
                  </div>
                )}
                {/* Kategori Badge */}
                {blog.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>

              {/* İçerik */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-green-700 transition">
                  {blog.title}
                </h3>
                
                <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt || blog.title}
                </p>

                {/* Anahtar Kelimeler (İlk 2 tanesi) */}
                {blog.keywords && blog.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.keywords.slice(0, 2).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded"
                      >
                        <Tag size={10} />
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tarih ve Yazar */}
                <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-200">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(blog.published_at)}
                  </div>
                  {blog.author && (
                    <span className="text-stone-400">{blog.author}</span>
                  )}
                </div>
              </div>

              {/* Hover Efekti için Ok İkonu */}
              <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center text-green-700 font-medium text-sm">
                  Devamını Oku
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobil Görünüm için Tümünü Gör Linki */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline">
            Tüm Blog Yazılarını Gör
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}



