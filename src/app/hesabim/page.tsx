"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { LogOut, Package, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

// Sipariş Tipi
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
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null); // Hangi siparişin detayı açık?

  useEffect(() => {
    const checkUserAndOrders = async () => {
      // 1. Kullanıcıyı Al
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/giris');
        return;
      }
      setUser(user);

      // 2. Siparişleri Çek (E-posta eşleşmesine göre)
      if (user.email) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_email', user.email) // Sadece bu kullanıcının siparişleri
          .order('created_at', { ascending: false }); // En yeni en üstte

        if (!error) setOrders(data || []);
      }
      
      setLoading(false);
    };

    checkUserAndOrders();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const toggleOrder = (id: number) => {
    if (expandedOrder === id) setExpandedOrder(null);
    else setExpandedOrder(id);
  };

  if (loading) return <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">Yükleniyor...</div>;

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="container mx-auto px-6 py-10 flex-grow">
        <h1 className="text-3xl font-serif font-bold text-stone-800 mb-8">Hesabım</h1>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* SOL: Profil Kartı */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 h-fit sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                <User size={32} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm text-stone-500">Hoş Geldiniz</p>
                <p className="font-bold text-stone-800 break-all text-sm md:text-base">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="w-full border border-stone-200 text-stone-600 py-3 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Çıkış Yap
            </button>
          </div>

          {/* SAĞ: Sipariş Geçmişi */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 min-h-[300px]">
              <h2 className="text-xl font-bold text-stone-700 mb-6 flex items-center gap-2">
                <Package className="text-green-600" />
                Sipariş Geçmişim ({orders.length})
              </h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-10 text-stone-400 flex flex-col items-center">
                  <Package size={48} className="mb-4 opacity-20" />
                  <p>Henüz siparişiniz bulunmuyor.</p>
                  <button onClick={() => router.push('/magaza')} className="mt-4 text-green-600 font-bold hover:underline">
                    Alışverişe Başla
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-stone-100 rounded-2xl overflow-hidden">
                      
                      {/* Sipariş Başlığı (Tıklanabilir) */}
                      <div 
                        onClick={() => toggleOrder(order.id)}
                        className="bg-stone-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:bg-stone-100 transition gap-4"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="bg-white p-2 rounded-lg border border-stone-200">
                            <Calendar size={20} className="text-stone-400" />
                          </div>
                          <div>
                            <p className="font-bold text-stone-800">Sipariş #{order.id}</p>
                            <p className="text-xs text-stone-500">{new Date(order.created_at).toLocaleDateString('tr-TR')}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-700' :
                            order.status === 'İptal' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                          <span className="font-bold text-stone-700">{order.total_price} ₺</span>
                          {expandedOrder === order.id ? <ChevronUp size={18} className="text-stone-400"/> : <ChevronDown size={18} className="text-stone-400"/>}
                        </div>
                      </div>

                      {/* Sipariş Detayı (Açılır Kısım) */}
                      {expandedOrder === order.id && (
                        <div className="p-4 bg-white border-t border-stone-100 animate-in slide-in-from-top-2 duration-200">
                          <p className="text-xs font-bold text-stone-400 uppercase mb-3">Ürünler</p>
                          <div className="space-y-3">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-stone-100 rounded overflow-hidden relative">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-stone-700 font-medium">
                                    {item.title} <span className="text-stone-400">x{item.quantity}</span>
                                  </span>
                                </div>
                                <span className="font-bold text-stone-600">{item.price * item.quantity} ₺</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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