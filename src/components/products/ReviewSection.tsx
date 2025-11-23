"use client";

import React, { useState, useEffect } from 'react';
import { Star, User, Send, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Review {
  id: number;
  rating: number;
  comment: string;
  user_email: string;
  created_at: string;
  user_id: string;
}

export default function ReviewSection({ productId }: { productId: number }) {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form State
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
    checkUser();
  }, [productId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    
    setReviews(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push('/giris');
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from('reviews').insert({
      product_id: productId,
      user_id: currentUser.id,
      user_email: currentUser.email,
      rating: newRating,
      comment: newComment
    });

    if (error) {
      alert("Yorum gönderilemedi: " + error.message);
    } else {
      setNewComment("");
      setNewRating(5);
      fetchReviews(); // Listeyi yenile
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yorumunu silmek istiyor musun?")) {
      await supabase.from('reviews').delete().eq('id', id);
      fetchReviews();
    }
  };

  // Ortalama Puan Hesapla
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm mt-12">
      <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
        Müşteri Yorumları 
        <span className="text-sm font-normal text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
          {reviews.length} Değerlendirme
        </span>
      </h2>

      {/* ÖZET KUTUSU */}
      <div className="flex items-center gap-4 mb-10 bg-green-50 p-6 rounded-2xl border border-green-100">
        <div className="text-4xl font-bold text-green-700">{averageRating}</div>
        <div>
          <div className="flex text-yellow-400 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} fill={star <= Math.round(Number(averageRating)) ? "currentColor" : "none"} />
            ))}
          </div>
          <p className="text-green-800 text-sm font-medium">Genel Memnuniyet</p>
        </div>
      </div>

      {/* YORUM YAZMA FORMU */}
      <div className="mb-10 border-b border-stone-100 pb-10">
        <h3 className="text-lg font-bold text-stone-700 mb-4">Sen de değerlendir</h3>
        {currentUser ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Yıldız Seçimi */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className={`transition ${star <= newRating ? "text-yellow-400 scale-110" : "text-stone-300"}`}
                >
                  <Star size={28} fill={star <= newRating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>

            <textarea
              required
              rows={3}
              placeholder="Ürün hakkında ne düşünüyorsun?"
              className="w-full p-4 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button 
              type="submit" 
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={18} /> Yorumu Gönder
            </button>
          </form>
        ) : (
          <div className="bg-stone-50 p-4 rounded-xl text-stone-500 text-center">
            Yorum yapmak için <button onClick={() => router.push('/giris')} className="text-green-600 font-bold hover:underline">Giriş Yapmalısın</button>
          </div>
        )}
      </div>

      {/* YORUM LİSTESİ */}
      <div className="space-y-6">
        {loading ? <p className="text-stone-400">Yükleniyor...</p> : reviews.length === 0 ? (
          <p className="text-stone-400 text-center py-4">Henüz yorum yapılmamış. İlk yorumu sen yap! 🚀</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-stone-100 pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-500">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-800 text-sm">{review.user_email ? review.user_email.split('@')[0] + '***' : 'Anonim'}</p>
                    <div className="flex text-yellow-400 text-xs">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={12} fill={star <= review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-stone-400">{new Date(review.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              
              <p className="text-stone-600 pl-14 leading-relaxed">{review.comment}</p>

              {/* Kendi yorumunu silme butonu */}
              {currentUser && currentUser.id === review.user_id && (
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="text-red-400 text-xs font-bold hover:text-red-600 mt-2 ml-14 flex items-center gap-1 transition"
                >
                  <Trash2 size={12} /> Sil
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}