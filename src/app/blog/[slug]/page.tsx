import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, Calendar, User, Tag, Eye } from 'lucide-react';
import { Metadata } from 'next';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published_at: string;
  keywords: string[];
  category: string;
  views: number;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !data) {
      return null;
    }

    // Görüntülenme sayısını artır
    await supabase
      .from('blogs')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id);

    return data;
  } catch (err) {
    console.error('Blog çekilirken hata:', err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Bulunamadı | Hobitat',
    };
  }

  return {
    title: `${blog.title} | Hobitat Blog`,
    description: blog.excerpt,
    keywords: blog.keywords?.join(', '),
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Yazısı Bulunamadı 📝</h1>
            <Link href="/blog" className="text-green-600 hover:underline">Blog Listesine Dön</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-green-700 mb-8 transition">
          <ArrowLeft size={20} className="mr-2" />
          Blog Listesine Dön
        </Link>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Kapak Görseli */}
          {blog.featured_image && (
            <div className="relative h-96 w-full bg-gray-200">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Kategori ve Tarih */}
            <div className="flex items-center justify-between mb-6">
              {blog.category && (
                <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  {blog.category}
                </span>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(blog.published_at)}
                </div>
                {blog.views > 0 && (
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    {blog.views} görüntülenme
                  </div>
                )}
              </div>
            </div>

            {/* Başlık */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Yazar */}
            {blog.author && (
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <User size={18} />
                <span className="font-medium">{blog.author}</span>
              </div>
            )}

            {/* Anahtar Kelimeler */}
            {blog.keywords && blog.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
                {blog.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    <Tag size={14} />
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            {/* İçerik */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              style={{
                color: '#374151',
                lineHeight: '1.8'
              }}
            />
          </div>
        </article>

        {/* İlgili Blog Yazıları (İsteğe bağlı) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Diğer Blog Yazıları</h2>
          <Link 
            href="/blog" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            Tüm Blog Yazılarını Gör
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

