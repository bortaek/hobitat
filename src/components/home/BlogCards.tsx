"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface BlogCardsProps {
  blogs: Blog[];
}

export default function BlogCards({ blogs }: BlogCardsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid md:grid-cols-3 gap-8"
    >
      {blogs.map((blog) => (
        <motion.div
          key={blog.id}
          variants={itemVariants}
          whileHover={{ y: -8 }}
        >
          <Link
            href={`/blog/${blog.slug}`}
            className="group bg-[#F9F8F6] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 block h-full"
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
        </motion.div>
      ))}
    </motion.div>
  );
}

