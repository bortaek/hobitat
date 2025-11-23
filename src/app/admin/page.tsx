"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trash2, Plus, Edit, LogOut, Package, X, Save, Loader2, UploadCloud, ShoppingBag, ChevronDown, ChevronUp, MapPin, Mail, User } from 'lucide-react';
import Image from 'next/image';

// TİPLER
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  description: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_email: string; // Yeni eklendi
  address: string;        // Yeni eklendi
  total_price: number;
  status: string;
  created_at: string;
  items: any[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Sipariş Detayını Açıp Kapatmak İçin
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  // Form State'leri
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Giriş Yap
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { 
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      alert("Hatalı Şifre!");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "products") fetchProducts();
    if (tab === "orders") fetchOrders();
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Silmek istediğine emin misin?")) {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateOrderStatus = async (id: number, newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    // Yerel state'i güncelle (tekrar fetch yapmaya gerek yok)
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const toggleOrder = (id: number) => {
    if (expandedOrder === id) setExpandedOrder(null);
    else setExpandedOrder(id);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Resim seçiniz!");
    setIsSaving(true);

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      await supabase.storage.from('product-images').upload(fileName, imageFile);
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);

      const newProduct = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        image_url: publicUrl,
        description: formData.description
      };

      await supabase.from('products').insert([newProduct]);
      setIsFormOpen(false);
      fetchProducts();
      
      setFormData({ title: "", category: "", price: "", description: "" });
      setImageFile(null);
      setImagePreview(null);

    } catch (error: any) {
      alert("Hata: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-stone-800 mb-6">Admin Girişi</h1>
          <input type="password" placeholder="Şifre" className="w-full p-4 border border-stone-200 rounded-xl mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">Giriş Yap</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-stone-800">Hobitat Admin</h1>
          <div className="flex bg-stone-100 p-1 rounded-lg">
            <button onClick={() => handleTabChange("products")} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === "products" ? "bg-white shadow text-stone-800" : "text-stone-500"}`}>Ürünler</button>
            <button onClick={() => handleTabChange("orders")} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === "orders" ? "bg-white shadow text-stone-800" : "text-stone-500"}`}>Siparişler</button>
          </div>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-stone-500 hover:text-red-600 text-sm font-medium"><LogOut size={18} /></button>
      </header>

      <div className="container mx-auto p-6">
        
        {/* --- ÜRÜNLER TABLOSU --- */}
        {activeTab === "products" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-stone-700">Ürün Listesi</h2>
              <button onClick={() => setIsFormOpen(true)} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700">
                <Plus size={20} /> Yeni Ürün
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
                  <tr><th className="p-4">Resim</th><th className="p-4">Ad</th><th className="p-4">Fiyat</th><th className="p-4 text-right">İşlem</th></tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map(p => (
                    <tr key={p.id}>
                      <td className="p-4"><div className="w-10 h-10 bg-stone-100 rounded overflow-hidden relative"><Image src={p.image_url} alt={p.title} fill className="object-cover"/></div></td>
                      <td className="p-4 font-medium">{p.title}</td>
                      <td className="p-4">{p.price} ₺</td>
                      <td className="p-4 text-right"><button onClick={() => handleDeleteProduct(p.id)} className="text-red-500"><Trash2 size={18} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- SİPARİŞLER LİSTESİ (GÜNCELLENDİ) --- */}
        {activeTab === "orders" && (
          <>
            <h2 className="text-2xl font-bold text-stone-700 mb-6">Gelen Siparişler</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition">
                  
                  {/* Sipariş Başlığı (Özet) */}
                  <div 
                    onClick={() => toggleOrder(order.id)}
                    className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer bg-white"
                  >
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className={`p-3 rounded-full ${order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <Package size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-stone-800">{order.customer_name}</h3>
                        <p className="text-sm text-stone-500">Sipariş #{order.id} • {new Date(order.created_at).toLocaleString('tr-TR')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-sm text-stone-400 font-medium">Tutar</p>
                        <p className="text-xl font-bold text-green-700">{order.total_price} ₺</p>
                      </div>
                      
                      {/* Durum Değiştirme (Propagation engellemek için onClick durdurulur) */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <select 
                          value={order.status} 
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-sm font-bold py-2 px-4 rounded-lg outline-none cursor-pointer border ${
                            order.status === 'Teslim Edildi' ? 'bg-green-50 text-green-700 border-green-200' : 
                            order.status === 'İptal' ? 'bg-red-50 text-red-700 border-red-200' : 
                            'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }`}
                        >
                          <option>Hazırlanıyor</option>
                          <option>Kargolandı</option>
                          <option>Teslim Edildi</option>
                          <option>İptal</option>
                        </select>
                      </div>

                      {expandedOrder === order.id ? <ChevronUp className="text-stone-400"/> : <ChevronDown className="text-stone-400"/>}
                    </div>
                  </div>

                  {/* Sipariş Detayları (Açılır Kısım) */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-stone-100 bg-stone-50 p-6 animate-in slide-in-from-top-2 duration-200">
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Sol: Müşteri Bilgileri */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider">Teslimat Bilgileri</h4>
                          <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                            <div className="flex items-center gap-3 text-stone-700">
                              <User size={18} className="text-stone-400" />
                              <span className="font-medium">{order.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-stone-700">
                              <Mail size={18} className="text-stone-400" />
                              <span>{order.customer_email}</span>
                            </div>
                            <div className="flex items-start gap-3 text-stone-700">
                              <MapPin size={18} className="text-stone-400 mt-1" />
                              <span className="leading-relaxed">{order.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Sağ: Sepet İçeriği */}
                        <div>
                          <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4">Sipariş İçeriği</h4>
                          <div className="space-y-2">
                            {order.items && Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-200">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden relative">
                                     {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
                                  </div>
                                  <span className="font-medium text-stone-700">
                                    {item.title} <span className="text-stone-400 text-sm">x{item.quantity}</span>
                                  </span>
                                </div>
                                <span className="font-bold text-stone-600">{item.price * item.quantity} ₺</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))}
              {orders.length === 0 && <p className="text-center text-stone-400 py-10">Henüz sipariş yok.</p>}
            </div>
          </>
        )}

      </div>

      {/* FORM MODALI */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50 sticky top-0 z-10">
              <h3 className="text-lg font-bold text-stone-800">Yeni Ürün Ekle</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-stone-200 rounded-full transition"><X size={20} className="text-stone-500" /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              {/* Resim Yükleme */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">Ürün Resmi</label>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer bg-stone-50 hover:bg-stone-100 transition relative overflow-hidden">
                  {imagePreview ? <Image src={imagePreview} alt="Önizleme" fill className="object-cover" /> : <div className="flex flex-col items-center"><UploadCloud size={32} className="text-stone-400 mb-2" /><p className="text-sm text-stone-500">Resim Yükle</p></div>}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
              {/* Diğer Alanlar */}
              <input required type="text" className="w-full p-3 border border-stone-200 rounded-xl" placeholder="Ürün Adı" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full p-3 border border-stone-200 rounded-xl bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">Kategori</option><option>Sebze</option><option>Meyve</option><option>Baharat</option><option>Toprak</option>
                </select>
                <input required type="number" className="w-full p-3 border border-stone-200 rounded-xl" placeholder="Fiyat" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <textarea rows={3} className="w-full p-3 border border-stone-200 rounded-xl" placeholder="Açıklama" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              <button type="submit" disabled={isSaving} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2">{isSaving ? <Loader2 className="animate-spin"/> : <><Save size={20}/> Kaydet</>}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}