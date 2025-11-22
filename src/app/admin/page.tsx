"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trash2, Plus, Edit, LogOut, Package, X, Save, Loader2, UploadCloud } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  description: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: ""
  });
  // Resim dosyası için yeni state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });

    if (error) console.error("Hata:", error);
    else setProducts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu ürünü silmek istediğine emin misin?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Silinirken hata oluştu.");
      }
    }
  };

  // --- YENİ: Resim Yükleme ve Ürün Kaydetme ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Lütfen bir resim seçin.");
      return;
    }
    setIsSaving(true);

    try {
      // 1. Resmi Storage'a yükle
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`; // Benzersiz isim
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // 2. Resmin herkese açık linkini al
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // 3. Ürünü veritabanına kaydet
      const newProduct = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        image_url: publicUrl, // Storage'dan gelen link
        description: formData.description
      };

      const { data, error: dbError } = await supabase
        .from('products')
        .insert([newProduct])
        .select();

      if (dbError) throw dbError;

      if (data) setProducts([data[0] as Product, ...products]);
      setIsFormOpen(false);
      // Formu temizle
      setFormData({ title: "", category: "", price: "", description: "" });
      setImageFile(null);
      setImagePreview(null);

    } catch (error: any) {
      alert("Hata: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Resim seçilince önizleme oluştur
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
          <div className="flex justify-center mb-6 text-green-700">
            <Package size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center text-stone-800 mb-6">Hobitat Yönetim Paneli</h1>
          <input 
            type="password" 
            placeholder="Admin Şifresi" 
            className="w-full p-4 border border-stone-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition">
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans relative">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Package className="text-green-600" />
          Ürün Yönetimi
        </h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-stone-500 hover:text-red-600 flex items-center gap-2 text-sm font-medium">
          <LogOut size={18} /> Çıkış
        </button>
      </header>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-stone-700">Mevcut Ürünler ({products.length})</h2>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-200"
          >
            <Plus size={20} /> Yeni Ürün Ekle
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
              <tr>
                <th className="p-4">Resim</th>
                <th className="p-4">Ürün Adı</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-stone-400">Yükleniyor...</td></tr>
              ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50 transition">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 relative border border-stone-200">
                      <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-stone-800">{product.title}</td>
                  <td className="p-4 text-sm">
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-stone-600">{product.price} ₺</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Sil">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- YENİ: Resim Yüklemeli Form --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50 sticky top-0 z-10">
              <h3 className="text-lg font-bold text-stone-800">Yeni Ürün Ekle</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-stone-200 rounded-full transition">
                <X size={20} className="text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* YENİ: Resim Yükleme Alanı */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">Ürün Resmi</label>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer bg-stone-50 hover:bg-stone-100 transition relative overflow-hidden">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Önizleme" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud size={32} className="text-stone-400 mb-2" />
                      <p className="text-sm text-stone-500 font-medium">Resim Yüklemek İçin Tıklayın</p>
                      <p className="text-xs text-stone-400">(PNG, JPG)</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Ürün Adı</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1">Kategori</label>
                  <select 
                    className="w-full p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Sebze">Sebze</option>
                    <option value="Meyve">Meyve</option>
                    <option value="Baharat">Baharat</option>
                    <option value="Toprak">Toprak & Gübre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1">Fiyat (₺)</label>
                  <input 
                    required
                    type="number" 
                    className="w-full p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Açıklama</label>
                <textarea 
                  rows={3}
                  className="w-full p-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? <><Loader2 size={20} className="animate-spin" /> Kaydediliyor...</> : <><Save size={20} /> Kaydet</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}