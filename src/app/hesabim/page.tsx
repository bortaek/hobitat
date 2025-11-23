'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Hobitat veritabanı yapısına uygun tipler
interface OrderItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  created_at: string;
  status: string;
  total_price: number;
  address: string;
  customer_name: string;
  customer_email: string;
  items: OrderItem[]; // JSON array olarak saklanıyor
}

interface Favorite {
  id: number;
  product_id: number;
  products: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    title?: string;
  };
}

interface Profile {
  full_name: string;
  city: string;
  address: string;
  phone?: string;
}

type ActiveSection = 'dashboard' | 'orders' | 'favorites' | 'profile' | 'addresses';

export default function AccountPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    city: '',
    address: ''
  });
  const [saving, setSaving] = useState(false);

  // Favorileri çekme fonksiyonu
  const fetchFavorites = useCallback(async (userId: string) => {
    try {
      // Önce favorileri çek
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('favorites')
        .select('id, product_id')
        .eq('user_id', userId);

      if (favoritesError) {
        console.error('Favoriler çekilirken hata:', favoritesError);
        setFavorites([]);
        return;
      }

      if (!favoritesData || favoritesData.length === 0) {
        setFavorites([]);
        return;
      }

      // Product ID'leri topla
      const productIds = favoritesData.map((fav: any) => fav.product_id);

      // Products tablosundan bu ID'lere sahip ürünleri çek
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, title, price, image_url')
        .in('id', productIds);

      if (productsError) {
        console.error('Ürünler çekilirken hata:', productsError);
        setFavorites([]);
        return;
      }

      // Favoriler ve ürünleri eşleştir
      const formattedFavorites: Favorite[] = [];
      
      for (const fav of favoritesData) {
        const product = productsData?.find((p: any) => p.id === fav.product_id);
        if (product) {
          formattedFavorites.push({
            id: fav.id,
            product_id: fav.product_id,
            products: {
              id: product.id,
              name: product.title || 'Ürün',
              title: product.title,
              price: product.price,
              image_url: product.image_url
            }
          });
        }
      }
      
      setFavorites(formattedFavorites);
      console.log('Favoriler yüklendi:', formattedFavorites.length);
    } catch (err) {
      console.error('Favoriler çekilirken beklenmeyen hata:', err);
      setFavorites([]);
    }
  }, [supabase]);

  // Siparişleri çekme fonksiyonu
  const fetchOrders = useCallback(async (userEmail: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Siparişler çekilirken hata:', error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }
  }, [supabase]);

  // Profil bilgilerini çekme fonksiyonu
  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, city, address, phone')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.log('Profil bulunamadı');
    } else if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        city: data.city || '',
        address: data.address || ''
      });
    }
  }, [supabase]);

  useEffect(() => {
    let mounted = true;

    const checkAuthAndFetch = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        if (mounted) {
          router.push('/giris');
          setLoading(false);
        }
        return;
      }

      if (mounted) {
        setUser(currentUser);
        await Promise.all([
          fetchOrders(currentUser.email || ''),
          fetchFavorites(currentUser.id),
          fetchProfile(currentUser.id)
        ]);
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        if (session?.user) {
          setUser(session.user);
          Promise.all([
            fetchOrders(session.user.email || ''),
            fetchFavorites(session.user.id),
            fetchProfile(session.user.id)
          ]);
        } else if (event === 'SIGNED_OUT') {
          router.push('/giris');
          setLoading(false);
        }
      }
    });

    checkAuthAndFetch();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, fetchOrders, fetchFavorites, fetchProfile]);

  // Favoriler bölümüne geçildiğinde verileri yenile
  useEffect(() => {
    if (activeSection === 'favorites' && user && !loading) {
      fetchFavorites(user.id);
    }
  }, [activeSection, user, loading, fetchFavorites]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: formData.full_name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address
      }, {
        onConflict: 'id'
      });

    if (error) {
      alert('Kayıt sırasında hata oluştu: ' + error.message);
    } else {
      alert('Bilgileriniz kaydedildi!');
      setProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address
      });
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', favoriteId);

    if (!error) {
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Teslim Edildi': return 'text-green-700 bg-green-50 border-green-200';
      case 'İptal Edildi': return 'text-red-700 bg-red-50 border-red-200';
      case 'Kargoda': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="p-10 text-center text-gray-500">Yükleniyor...</div>
        </div>
        <Footer />
      </main>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total_price, 0);
  const recentOrders = orders.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Merhaba, {profile?.full_name || user?.email?.split('@')[0] || 'Kullanıcı'}!</h1>
              <p className="text-green-100">Hesabınızı yönetin ve siparişlerinizi takip edin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-24">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'dashboard'
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'orders'
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Siparişlerim
                    {orders.length > 0 && (
                      <span className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        {orders.length}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('favorites')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'favorites'
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Favorilerim
                    {favorites.length > 0 && (
                      <span className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'profile'
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profil Bilgileri
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('addresses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'addresses'
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Adreslerim
                  </button>
                </li>
                <li className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Çıkış Yap
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-9">
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
                    <p className="text-gray-600 text-sm mt-1">Toplam Sipariş</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{totalSpent.toFixed(2)} ₺</h3>
                    <p className="text-gray-600 text-sm mt-1">Toplam Harcama</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{favorites.length}</h3>
                    <p className="text-gray-600 text-sm mt-1">Favori Ürün</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Son Siparişler</h2>
                    {orders.length > 3 && (
                      <button
                        onClick={() => setActiveSection('orders')}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Tümünü Gör ({orders.length})
                      </button>
                    )}
                  </div>
                  {recentOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🌱</div>
                      <p className="text-gray-500">Henüz siparişiniz yok</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                          <div 
                            onClick={() => toggleOrderDetails(order.id)}
                            className="p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <span className="font-mono font-semibold text-gray-900">#{order.id}</span>
                                  <span className="text-sm text-gray-600">{formatDate(order.created_at)}</span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm">{order.items?.length || 0} ürün</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-xl font-bold text-gray-900">{order.total_price} ₺</p>
                                </div>
                                <svg 
                                  className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`}
                                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {expandedOrderId === order.id && (
                            <div className="border-t border-gray-200 bg-white p-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-4">Sipariş İçeriği</h4>
                                  <div className="space-y-3">
                                    {order.items && Array.isArray(order.items) && order.items.map((item: OrderItem, idx: number) => (
                                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                          {item.image ? (
                                            <Image 
                                              src={item.image} 
                                              alt={item.title || 'Ürün Resmi'} 
                                              fill 
                                              className="object-cover"
                                            />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Img</div>
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-gray-900 truncate">{item.title || 'Ürün'}</p>
                                          <p className="text-sm text-gray-500">{item.quantity} adet x {item.price} ₺</p>
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                          {item.quantity * item.price} ₺
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-4">Teslimat Bilgileri</h4>
                                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                                    <p className="text-sm text-gray-600">{order.address}</p>
                                    <p className="text-sm text-gray-600">{order.customer_email}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Siparişlerim</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🌱</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz siparişiniz yok</h3>
                    <p className="text-gray-500 mb-6">Bahçenizi şenlendirmek için hemen alışverişe başlayın.</p>
                    <Link href="/magaza" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">
                      Alışverişe Başla
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                        <div 
                          onClick={() => toggleOrderDetails(order.id)}
                          className="p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <span className="font-mono font-semibold text-gray-900">#{order.id}</span>
                                <span className="text-sm text-gray-600">{formatDate(order.created_at)}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm">{order.items?.length || 0} ürün</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xl font-bold text-gray-900">{order.total_price} ₺</p>
                              </div>
                              <svg 
                                className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {expandedOrderId === order.id && (
                          <div className="border-t border-gray-200 bg-white p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-4">Sipariş İçeriği</h4>
                                <div className="space-y-3">
                                  {order.items && Array.isArray(order.items) && order.items.map((item: OrderItem, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                      <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                          <Image 
                                            src={item.image} 
                                            alt={item.title || 'Ürün Resmi'} 
                                            fill 
                                            className="object-cover"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Img</div>
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{item.title || 'Ürün'}</p>
                                        <p className="text-sm text-gray-500">{item.quantity} adet x {item.price} ₺</p>
                                      </div>
                                      <div className="font-semibold text-gray-900">
                                        {item.quantity * item.price} ₺
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-4">Teslimat Bilgileri</h4>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                  <p className="font-medium text-gray-900">{order.customer_name}</p>
                                  <p className="text-sm text-gray-600">{order.address}</p>
                                  <p className="text-sm text-gray-600">{order.customer_email}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'favorites' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorilerim</h2>
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">❤️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz favoriniz yok</h3>
                    <p className="text-gray-500 mb-6">Beğendiğiniz ürünleri favorilerinize ekleyebilirsiniz.</p>
                    <Link href="/magaza" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">
                      Ürünlere Göz At
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map((favorite) => (
                      <div key={favorite.id} className="group relative">
                        <Link
                          href={`/urun/${favorite.product_id}`}
                          className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                          <div className="relative aspect-square bg-gray-100">
                            {favorite.products?.image_url ? (
                              <Image
                                src={favorite.products.image_url}
                                alt={favorite.products.name || favorite.products.title || 'Ürün Resmi'}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{favorite.products?.name || favorite.products?.title || 'Ürün'}</h3>
                            <p className="text-green-600 font-bold">{favorite.products?.price} ₺</p>
                          </div>
                        </Link>
                        <button
                          onClick={() => handleRemoveFavorite(favorite.id)}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-red-50"
                          title="Favorilerden çıkar"
                        >
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'addresses' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Teslimat Adresi</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="Şehir seçin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Açık Adres</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="Mahalle, sokak, cadde, bina no, daire no..."
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {saving ? 'Kaydediliyor...' : 'Adresi Kaydet'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
