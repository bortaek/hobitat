"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function FavoriteButton({ productId }: { productId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sayfa açılınca: "Bu ürün favorilerde mi?" diye kontrol et
  useEffect(() => {
    const checkFavorite = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (data) setIsFavorite(true);
      setLoading(false);
    };
    checkFavorite();
  }, [productId]);

  // Tıklanınca: Ekle veya Çıkar
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link'e tıklamayı engelle (Ürün detayına gitmesin)
    e.stopPropagation();

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Giriş yapmamışsa giriş sayfasına at
      router.push('/giris');
      return;
    }

    // Optimistic Update (Hemen rengi değiştir, sonra işlemi yap)
    const newState = !isFavorite;
    setIsFavorite(newState);

    if (newState) {
      // Ekle
      await supabase.from('favorites').insert({ user_id: user.id, product_id: productId });
    } else {
      // Sil
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', productId);
    }
    
    router.refresh(); // Sayfayı tazeleyip verileri güncelle
  };

  if (loading) return <div className="w-8 h-8" />; // Yüklenirken boş dur

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition shadow-sm hover:scale-110 ${
        isFavorite 
          ? "bg-red-50 text-red-500" 
          : "bg-white/80 text-stone-400 hover:text-red-500 hover:bg-white"
      }`}
      title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
    >
      <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}