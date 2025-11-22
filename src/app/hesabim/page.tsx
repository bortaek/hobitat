"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { LogOut, Package, User, MapPin, Save, Loader2 } from 'lucide-react';

interface Order {
  id: number;
  created_at: string;
  total_price: number;
  status: string;
  items: any[];
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profil Bilgileri State'i
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    city: "",
    address: ""
  });

  useEffect(() => {
    const getData = async () => {
      // 1. Kullanıcıyı Al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/giris');
        return;
      }
      setUser(user);

      // 2. Profil Bilgilerini Çek (Varsa)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile({
          full_name: profileData.full_name || "",
          phone: profileData.phone || "",
          city: profileData.city || "",
          address: profileData.address || ""
        });
      }

      // 3. Siparişleri Çek
      if (user.email) {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_email', user.email)
          .order('created_at', { ascending: false });
        setOrders(data || []);
      }
      
      setLoading(false);
    };

    getData();
  }, [router]);

  // Profil Kaydetme Fonksiyonu
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({ // Upsert: Varsa güncelle, yoksa ekle
        id: user.id,
        ...profile,
        updated_at: new Date()
      });

    if (error) alert("Hata: " + error.message);
    else alert("Profil güncellendi! ✅");
    
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) return <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">Yükleniyor...</div>;

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="container mx-auto px-6 py-10 flex-grow">
        <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8">Hesabım</h1>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* SOL: Profil ve Adres Formu */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 h-fit">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                <User size={28} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-stone-500 uppercase font-bold">Giriş Yapılan Hesap</p>
                <p className="font-bold text-stone-800 truncate text-sm" title={user?.email}>{user?.email}</p>
              </div>
            </div>

            {/* ADRES FORMU */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h3 className="font-bold text-stone-700 flex items-center gap-2">
                <MapPin size={18} className="text-green-600"/> Teslimat Bilgileri
              </h3>
              
              <div>
                <label className="text-xs text-stone-500">Ad Soyad</label>
                <input required type="text" className="w-full p-2 border border-stone-200 rounded-lg text-sm" 
                  value={profile.full_name} onChange={e => setProfile({...profile, full_name: e.target.value})} />
              </div>
              
              <div>
                <label className="text-xs text-stone-500">Telefon</label>
                <input required type="tel" className="w-full p-2 border border-stone-200 rounded-lg text-sm" 
                  value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
              </div>

              <div>
                <label className="text-xs text-stone-500">Şehir</label>
                <input required type="text" className="w-full p-2 border border-stone-200 rounded-lg text-sm" 
                  value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} />
              </div>

              <div>
                <label className="text-xs text-stone-500">Açık Adres</label>
                <textarea required rows={2} className="w-full p-2 border border-stone-200 rounded-lg text-sm" 
                  value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} />
              </div>

              <button type="submit" disabled={saving} className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin"/> : <><Save size={16}/> Bilgileri Kaydet</>}
              </button>
            </form>

            <button onClick={handleLogout} className="w-full mt-6 border-t border-stone-100 pt-4 text-stone-500 hover:text-red-600 text-sm font-bold flex items-center justify-center gap-2 transition">
              <LogOut size={16} /> Çıkış Yap
            </button>
          </div>

          {/* SAĞ: Sipariş Geçmişi */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 min-h-[400px]">
              <h2 className="text-xl font-bold text-stone-700 mb-6 flex items-center gap-2">
                <Package className="text-green-600" />
                Sipariş Geçmişim ({orders.length})
              </h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-10 text-stone-400">Henüz siparişiniz yok.</div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-stone-100 rounded-2xl p-4 hover:bg-stone-50 transition">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="font-bold text-stone-800">#{order.id}</span>
                          <span className="text-xs text-stone-400 ml-2">{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">{order.status}</span>
                      </div>
                      <p className="text-sm text-stone-500">Toplam: <span className="font-bold text-green-700">{order.total_price} ₺</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}