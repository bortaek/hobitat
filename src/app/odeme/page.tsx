"use client";

import React, { useState, useEffect } from 'react'; // useEffect eklendi
import { useCart } from '@/components/context/CartContext';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/context/ToastContext';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { error: showError, success: showSuccess } = useToast();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: ""
  });

  // --- YENİ: PROFİL BİLGİLERİNİ ÇEKME ---
  useEffect(() => {
    const fetchProfile = async () => {
      // 1. Aktif kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // E-posta bilgisini hemen doldur
        setFormData(prev => ({ ...prev, email: user.email || "" }));

        // 2. Profil tablosundan diğer detayları (Adres, Şehir vb.) çek
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: profile.full_name || "",
            city: profile.city || "",
            address: profile.address || ""
          }));
        }
      }
    };
    fetchProfile();
  }, []);
  // ---------------------------------------

  // Sepet boşsa uyarı ver (Sipariş başarılı değilse)
  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center text-center">
           <div className="p-8">
             <h2 className="text-2xl font-bold text-stone-700 mb-2">Sepetiniz Boş 🛒</h2>
             <p className="text-stone-500 mb-6">Sepetinizde henüz ürün bulunmuyor.</p>
             <button 
               onClick={() => router.push('/magaza')} 
               className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
             >
               Alışverişe Dön
             </button>
           </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customer_name: formData.name,
      customer_email: formData.email,
      address: `${formData.address}, ${formData.city}`,
      total_price: totalPrice,
      items: items,
      status: 'Yeni Sipariş'
    };

    const { error } = await supabase.from('orders').insert([orderData]);

    if (error) {
      showError("Hata: " + error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      clearCart(); // Sipariş başarılıysa sepeti temizle
      setLoading(false);
      showSuccess("Siparişiniz başarıyla alındı!");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-green-100 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 mb-4">Sipariş Alındı! 🎉</h1>
            <p className="text-stone-500 mb-8">Teşekkürler {formData.name}. Siparişiniz başarıyla oluşturuldu ve hazırlanmaya başlandı.</p>
            <button 
              onClick={() => router.push('/')} 
              className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold hover:bg-black transition"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="container mx-auto px-6 py-10 flex-grow">
        <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8 text-center md:text-left">Ödeme & Teslimat</h1>
        
        <div className="grid md:grid-cols-2 gap-10">
          
          {/* SOL: FORM */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 h-fit">
            <h2 className="text-xl font-bold text-stone-700 mb-6">Teslimat Bilgileri</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-stone-500 mb-1">Ad Soyad</label>
                <input 
                  required 
                  type="text" 
                  className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-sm text-stone-500 mb-1">E-posta</label>
                <input 
                  required 
                  type="email" 
                  className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-500 cursor-not-allowed" 
                  value={formData.email} 
                  disabled // E-posta değiştirilemez (Hesap güvenliği için)
                />
              </div>
              
              <div>
                <label className="block text-sm text-stone-500 mb-1">Şehir</label>
                <input 
                  required 
                  type="text" 
                  className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" 
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-sm text-stone-500 mb-1">Açık Adres</label>
                <textarea 
                  required 
                  rows={3} 
                  className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 mt-4 shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Siparişi Tamamla"}
              </button>
            </form>
          </div>

          {/* SAĞ: ÖZET */}
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-stone-700 mb-6">Sipariş Özeti ({totalItems})</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden relative border border-stone-200">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-800 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-stone-500">Adet: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-stone-700">{item.price * item.quantity} ₺</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-stone-200 pt-4 space-y-2">
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Ara Toplam</span>
                <span>{totalPrice} ₺</span>
              </div>
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Kargo</span>
                <span className="text-green-600 font-bold">Ücretsiz</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-stone-800 pt-2 border-t border-stone-200 mt-2">
                <span>Toplam Tutar</span>
                <span>{totalPrice} ₺</span>
              </div>
              <p className="text-xs text-stone-400 mt-4 text-center bg-stone-100 p-2 rounded-lg">
                🔒 Ödeme güvenli altyapı ile kapıda veya havale yöntemiyle alınacaktır.
              </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}