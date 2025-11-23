"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Search, Calendar, User, Tag } from 'lucide-react';

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
  views: number;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedKeyword, setSelectedKeyword] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, selectedCategory, selectedKeyword]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Bloglar çekilirken hata:', error);
        setBlogs([]);
      } else {
        // Debug: Salatalık blogunu özellikle kontrol et
        const salatalikBlog = data?.find(b => 
          b.title?.toLowerCase().includes('salatalık') || 
          b.title?.toLowerCase().includes('salatalik') ||
          b.slug?.includes('salatalik')
        );
        if (salatalikBlog) {
          console.log('🥒 SALATALIK BLOG BULUNDU:');
          console.log('   Başlık:', salatalikBlog.title);
          console.log('   Resim URL:', salatalikBlog.featured_image);
          console.log('   Slug:', salatalikBlog.slug);
        }
        setBlogs(data || []);
        setFilteredBlogs(data || []);
      }
    } catch (err) {
      console.error('Beklenmeyen hata:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.keywords && blog.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Kategori filtresi
    if (selectedCategory !== "Tümü") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Anahtar kelime filtresi
    if (selectedKeyword) {
      filtered = filtered.filter(blog =>
        blog.keywords && blog.keywords.some(keyword =>
          keyword.toLowerCase().includes(selectedKeyword.toLowerCase())
        )
      );
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Tüm kategorileri ve anahtar kelimeleri topla
  const categories = ["Tümü", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];
  const allKeywords = Array.from(new Set(blogs.flatMap(b => b.keywords || [])));

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="text-center text-gray-500">Yükleniyor...</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Blog</h1>
          <p className="text-green-100 text-lg">Bahçecilik, fide bakımı ve doğal yaşam hakkında bilgi dolu yazılar</p>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        
        {/* Filtreler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Arama */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Blog ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Kategori Filtresi */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Anahtar Kelime Filtresi */}
            <select
              value={selectedKeyword}
              onChange={(e) => setSelectedKeyword(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Tüm Anahtar Kelimeler</option>
              {allKeywords.map((keyword) => (
                <option key={keyword} value={keyword}>{keyword}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Listesi */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Blog yazısı bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinize uygun blog yazısı bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {blog.featured_image ? (
                    <img
                      src={`${blog.featured_image}?v=${blog.id}`}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      key={`img-${blog.id}-${blog.featured_image}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Resim Yok</div>
                  )}
                </div>
                <div className="p-6">
                  {blog.category && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mb-3">
                      {blog.category}
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                  
                  {/* Anahtar Kelimeler */}
                  {blog.keywords && blog.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.keywords.slice(0, 3).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          <Tag size={12} />
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(blog.published_at)}
                    </div>
                    {blog.author && (
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {blog.author}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

