"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/context/ToastContext';

export default function FavoriteButton({ productId }: { productId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { success, info, error: showError } = useToast();
  const supabase = createClientComponentClient();

  // Sayfa açılınca: "Bu ürün favorilerde mi?" diye kontrol et
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('product_id', productId)
          .single();

        if (data) setIsFavorite(true);
      } catch (error) {
        console.error("Favori kontrol hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    checkFavorite();
  }, [productId, supabase]);

  // Tıklanınca: Ekle veya Çıkar
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link'e tıklamayı engelle (Ürün detayına gitmesin)
    e.stopPropagation();

    // getUser yerine getSession daha güvenilir olabilir client-side için
    // Ancak getUser sunucu doğrulaması yapar, session ise local
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Giriş yapmamışsa giriş sayfasına at
      info("Favorilere eklemek için giriş yapmalısınız");
      router.push('/giris');
      return;
    }

    // Optimistic Update (Hemen rengi değiştir, sonra işlemi yap)
    const previousState = isFavorite;
    const newState = !isFavorite;
    setIsFavorite(newState);

    try {
      if (newState) {
        // Ekle
        const { error } = await supabase.from('favorites').insert({ user_id: user.id, product_id: productId });
        if (error) throw error;
        success("Ürün favorilere eklendi");
      } else {
        // Sil
        const { error } = await supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', productId);
        if (error) throw error;
        info("Ürün favorilerden çıkarıldı");
      }
      
      router.refresh(); // Sayfayı tazeleyip verileri güncelle
    } catch (err: any) {
      // Hata olursa eski haline döndür
      setIsFavorite(previousState);
      showError("Bir hata oluştu: " + err.message);
      console.error("Favori işlemi hatası:", err);
    }
  };

  if (loading) return <div className="w-8 h-8" />; // Yüklenirken boş dur

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition shadow-sm hover:scale-110 ${
        isFavorite 
          ? "bg-red-50 text-red-500" 
          : "bg-white/80 text-stone-600 hover:text-red-500 hover:bg-white"
      }`}
      aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
      aria-pressed={isFavorite}
    >
      <Heart size={20} fill={isFavorite ? "currentColor" : "none"} aria-hidden="true" />
      <span className="sr-only">{isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}</span>
    </button>
  );
}