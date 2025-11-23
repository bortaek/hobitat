"use client";

import React, { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trash2, Plus, Edit, LogOut, Package, X, Save, Loader2, UploadCloud, ShoppingBag, ChevronDown, ChevronUp, MapPin, Mail, User, Settings, FileText, Users, BarChart2, AlertTriangle, CheckSquare, Square, TrendingUp, DollarSign, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/components/context/ToastContext';

// TİPLER
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  description: string;
  stock?: number;
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

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published_at: string;
  is_published: boolean;
  keywords: string[];
  category: string;
  views: number;
}

export default function AdminPage() {
  const { success, error: showError, warning, info } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Toplu İşlem State'leri
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [bulkStockValue, setBulkStockValue] = useState("");
  const [isBulkStockModalOpen, setIsBulkStockModalOpen] = useState(false);

  // Filtreleme State'leri
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [productSearch, setProductSearch] = useState("");

  // Sipariş Detayını Açıp Kapatmak İçin
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  // Form State'leri
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "", price: "", description: "", stock: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Blog Form State'leri
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "",
    published_at: "",
    is_published: false,
    keywords: "",
    category: ""
  });
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Giriş Yap
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { 
      setIsAuthenticated(true);
      fetchProducts();
      fetchOrders(); // Analitik için gerekli
      success("Giriş başarılı");
    } else {
      showError("Hatalı Şifre!");
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

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    setBlogs(data || []);
    setLoading(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "products") fetchProducts();
    if (tab === "orders") fetchOrders();
    if (tab === "blogs") fetchBlogs();
    if (tab === "settings") fetchSiteSettings();
    if (tab === "analytics" || tab === "customers") {
      fetchOrders();
      fetchProducts();
    }
  };

  // Analitik Verileri
  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(orders.map(o => o.customer_email)).size;
    const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;
    
    const revenueByDay = orders.reduce((acc: any, order) => {
      const date = new Date(order.created_at).toLocaleDateString('tr-TR');
      acc[date] = (acc[date] || 0) + order.total_price;
      return acc;
    }, {});

    return { totalRevenue, totalOrders, uniqueCustomers, lowStockProducts, revenueByDay };
  }, [orders, products]);

  // Müşteri Listesi
  const customers = useMemo(() => {
    const customerMap = new Map();
    
    orders.forEach(order => {
      if (!customerMap.has(order.customer_email)) {
        customerMap.set(order.customer_email, {
          name: order.customer_name,
          email: order.customer_email,
          totalSpent: 0,
          orderCount: 0,
          lastOrderDate: order.created_at,
          address: order.address
        });
      }
      
      const customer = customerMap.get(order.customer_email);
      customer.totalSpent += order.total_price;
      customer.orderCount += 1;
      if (new Date(order.created_at) > new Date(customer.lastOrderDate)) {
        customer.lastOrderDate = order.created_at;
      }
    });

    return Array.from(customerMap.values());
  }, [orders]);

  // Toplu İşlemler
  const toggleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const selectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedProducts.length} ürünü silmek istediğinize emin misiniz?`)) return;
    
    const { error } = await supabase.from('products').delete().in('id', selectedProducts);
    if (error) {
      showError('Hata: ' + error.message);
    } else {
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
      success('Ürünler silindi.');
    }
  };

  const handleBulkStockUpdate = async () => {
    const newStock = parseInt(bulkStockValue);
    if (isNaN(newStock)) return warning('Geçerli bir sayı giriniz.');
    
    const { error } = await supabase.from('products').update({ stock: newStock }).in('id', selectedProducts);
    if (error) {
      showError('Hata: ' + error.message);
    } else {
      setProducts(products.map(p => selectedProducts.includes(p.id) ? { ...p, stock: newStock } : p));
      setIsBulkStockModalOpen(false);
      setSelectedProducts([]);
      setBulkStockValue("");
      success('Stoklar güncellendi.');
    }
  };

  // Site Ayarları State'leri
  const [siteSettings, setSiteSettings] = useState<any>({
    hero_section: null,
    value_props: null,
    footer: null,
    contact_page: null,
    about_page: null
  });
  const [activeSetting, setActiveSetting] = useState<string>("hero_section");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [showSetupWarning, setShowSetupWarning] = useState(false);

  // Site Ayarlarını Çek
  const fetchSiteSettings = async () => {
    setSettingsLoading(true);
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) {
        console.error('Site ayarları çekilirken hata:', error);
        // Tablo yoksa uyarı göster
        if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('relation') && error.message.includes('does not exist')) {
          setShowSetupWarning(true);
        } else {
          showError('Site ayarları çekilirken hata: ' + error.message);
        }
      } else if (data && data.length > 0) {
        // Tablo var ve veri var - uyarıyı gizle
        setShowSetupWarning(false);
        const settingsObj: any = {};
        data.forEach((item: any) => {
          settingsObj[item.key] = item.value;
        });
        setSiteSettings(settingsObj);
      } else {
        // Tablo var ama boş - uyarıyı göster
        setShowSetupWarning(true);
        console.log('Site ayarları tablosu boş. Varsayılan veriler eklenmeli.');
      }
    } catch (err) {
      console.error('Site ayarları çekilirken beklenmeyen hata:', err);
      setShowSetupWarning(true);
    } finally {
      setSettingsLoading(false);
    }
  };

  // Site Ayarları Tablosunu Otomatik Oluştur
  const createSiteSettingsTable = async () => {
    try {
      // Supabase RPC ile tablo oluşturma (eğer RPC fonksiyonu varsa)
      // Alternatif: Kullanıcıya SQL'i çalıştırmasını söyle
      info('Tablo oluşturma için lütfen Supabase Dashboard > SQL Editor\'de SITE_SETTINGS_SCHEMA.sql dosyasındaki komutları çalıştırın.');
    } catch (err: any) {
      showError('Tablo oluşturulamadı: ' + err.message);
    }
  };

  // Site Ayarını Kaydet
  const saveSiteSetting = async (key: string, value: any) => {
    setSettingsLoading(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      
      if (error) {
        showError('Kayıt hatası: ' + error.message);
      } else {
        setSiteSettings({ ...siteSettings, [key]: value });
        success('Ayarlar kaydedildi!');
      }
    } catch (err: any) {
      showError('Hata: ' + err.message);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Silmek istediğine emin misin?")) {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (confirm("Blog yazısını silmek istediğinize emin misiniz?")) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (!error) {
        setBlogs(blogs.filter(b => b.id !== id));
        success('Blog yazısı silindi!');
      } else {
        showError('Silme hatası: ' + error.message);
      }
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
    setIsSaving(true);

    try {
      let imageUrl = editingProduct?.image_url || "";

      // Eğer yeni resim seçildiyse yükle
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        await supabase.storage.from('product-images').upload(fileName, imageFile);
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);
        imageUrl = publicUrl;
      } else if (editingProduct && !imageFile) {
        // Düzenleme modunda ve resim değişmediyse mevcut resmi kullan
        imageUrl = editingProduct.image_url;
      } else {
        // Yeni ürün eklerken resim zorunlu
        return warning("Resim seçiniz!");
      }

      const productData = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        image_url: imageUrl,
        description: formData.description,
        stock: formData.stock ? parseInt(formData.stock) : 0
      };

      if (editingProduct) {
        // Güncelle
        await supabase.from('products').update(productData).eq('id', editingProduct.id);
        success("Ürün güncellendi!");
      } else {
        // Yeni ekle
        await supabase.from('products').insert([productData]);
        success("Ürün eklendi!");
      }

      setIsFormOpen(false);
      setEditingProduct(null);
      fetchProducts();
      
      setFormData({ title: "", category: "", price: "", description: "", stock: "" });
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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      description: product.description || "",
      stock: product.stock?.toString() || "0"
    });
    setImagePreview(product.image_url);
    setImageFile(null); // Yeni resim seçilmedi, mevcut resim kullanılacak
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData({ title: "", category: "", price: "", description: "", stock: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  // Blog Yönetimi Fonksiyonları
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Anahtar kelimeleri array'e çevir
      const keywordsArray = blogFormData.keywords
        .split(',')
        .map((k: string) => k.trim())
        .filter((k: string) => k.length > 0);

      // Slug oluştur (başlıktan otomatik)
      const slug = blogFormData.slug || blogFormData.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Yayın tarihi: Eğer boşsa bugünün tarihini kullan
      const publishedDate = blogFormData.published_at 
        ? new Date(blogFormData.published_at).toISOString()
        : new Date().toISOString();

      const blogData = {
        title: blogFormData.title,
        slug: slug,
        excerpt: blogFormData.excerpt,
        content: blogFormData.content,
        featured_image: blogFormData.featured_image,
        author: blogFormData.author || 'Hobitat Ekibi',
        published_at: blogFormData.is_published ? publishedDate : null,
        is_published: blogFormData.is_published,
        keywords: keywordsArray,
        category: blogFormData.category
      };

      if (editingBlog) {
        // Güncelle
        const { error } = await supabase
          .from('blogs')
          .update({ ...blogData, updated_at: new Date().toISOString() })
          .eq('id', editingBlog.id);
        
        if (error) throw error;
        success('Blog yazısı güncellendi!');
      } else {
        // Yeni ekle
        const { error } = await supabase.from('blogs').insert([blogData]);
        if (error) throw error;
        success('Blog yazısı eklendi!');
      }

      setIsBlogFormOpen(false);
      setEditingBlog(null);
      setBlogFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        author: "",
        published_at: "",
        is_published: false,
        keywords: "",
        category: ""
      });
      fetchBlogs();

    } catch (error: any) {
      alert("Hata: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      featured_image: blog.featured_image || '',
      author: blog.author || '',
      published_at: blog.published_at ? new Date(blog.published_at).toISOString().split('T')[0] : '',
      is_published: blog.is_published,
      keywords: blog.keywords?.join(', ') || '',
      category: blog.category || ''
    });
    setIsBlogFormOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
            <button onClick={() => handleTabChange("customers")} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === "customers" ? "bg-white shadow text-stone-800" : "text-stone-500"}`}><Users size={16} className="inline mr-1" />Müşteriler</button>
            <button onClick={() => handleTabChange("analytics")} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === "analytics" ? "bg-white shadow text-stone-800" : "text-stone-500"}`}><BarChart2 size={16} className="inline mr-1" />Raporlar</button>
            <button onClick={() => handleTabChange("blogs")} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === "blogs" ? "bg-white shadow text-stone-800" : "text-stone-500"}`}><FileText size={16} className="inline mr-1" />Bloglar</button>
            <button onClick={() => handleTabChange("settings")} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === "settings" ? "bg-white shadow text-stone-800" : "text-stone-500"}`}><Settings size={16} className="inline mr-1" />Site Ayarları</button>
          </div>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-stone-500 hover:text-red-600 text-sm font-medium"><LogOut size={18} /></button>
      </header>

      <div className="container mx-auto p-6">
        
        {/* --- ÜRÜNLER TABLOSU --- */}
        {activeTab === "products" && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-700">Ürün Listesi</h2>
                <p className="text-stone-500 text-sm">{products.length} ürün listeleniyor</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Ürün ara..." 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <button onClick={() => { setEditingProduct(null); setFormData({ title: "", category: "", price: "", description: "", stock: "" }); setImageFile(null); setImagePreview(null); setIsFormOpen(true); }} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 whitespace-nowrap">
                  <Plus size={20} /> <span className="hidden md:inline">Yeni Ürün</span>
                </button>
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-4 flex items-center justify-between animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                  <CheckSquare className="text-green-600" size={20} />
                  <span className="font-medium text-green-800">{selectedProducts.length} ürün seçildi</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsBulkStockModalOpen(true)}
                    className="bg-white text-green-700 border border-green-200 hover:bg-green-100 px-4 py-2 rounded-lg text-sm font-bold transition"
                  >
                    Stok Güncelle
                  </button>
                  <button 
                    onClick={handleBulkDelete}
                    className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition"
                  >
                    Seçilenleri Sil
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
                    <tr>
                      <th className="p-4 w-10">
                        <button onClick={selectAllProducts} className="text-stone-400 hover:text-stone-600">
                          {selectedProducts.length === products.length && products.length > 0 ? <CheckSquare size={20} /> : <Square size={20} />}
                        </button>
                      </th>
                      <th className="p-4">Resim</th>
                      <th className="p-4">Ad</th>
                      <th className="p-4">Fiyat</th>
                      <th className="p-4">Stok</th>
                      <th className="p-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.filter(p => p.title.toLowerCase().includes(productSearch.toLowerCase())).map(p => (
                      <tr key={p.id} className={selectedProducts.includes(p.id) ? "bg-green-50/30" : ""}>
                        <td className="p-4">
                          <button onClick={() => toggleSelectProduct(p.id)} className={`transition ${selectedProducts.includes(p.id) ? "text-green-600" : "text-stone-300 hover:text-stone-400"}`}>
                            {selectedProducts.includes(p.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                          </button>
                        </td>
                        <td className="p-4"><div className="w-10 h-10 bg-stone-100 rounded overflow-hidden relative"><Image src={p.image_url} alt={p.title} fill className="object-cover"/></div></td>
                        <td className="p-4 font-medium">{p.title}</td>
                        <td className="p-4">{p.price} ₺</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            (p.stock || 0) === 0 
                              ? 'bg-red-100 text-red-700' 
                              : (p.stock || 0) < 10 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {p.stock || 0} adet
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEditProduct(p)} className="text-blue-500 hover:text-blue-700" title="Düzenle">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-700" title="Sil">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* --- MÜŞTERİ YÖNETİMİ --- */}
        {activeTab === "customers" && (
          <>
            <h2 className="text-2xl font-bold text-stone-700 mb-6">Müşteri Yönetimi</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
                  <tr>
                    <th className="p-4">Müşteri</th>
                    <th className="p-4">İletişim</th>
                    <th className="p-4">Toplam Sipariş</th>
                    <th className="p-4">Toplam Harcama</th>
                    <th className="p-4">Son Sipariş</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {customers.map((customer: any, idx) => (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="p-4 font-medium text-stone-800">{customer.name}</td>
                      <td className="p-4 text-stone-600">
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-stone-400 mt-1">{customer.address?.substring(0, 30)}...</div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600">
                          {customer.orderCount} Sipariş
                        </span>
                      </td>
                      <td className="p-4 font-bold text-green-600">{customer.totalSpent} ₺</td>
                      <td className="p-4 text-sm text-stone-500">
                        {new Date(customer.lastOrderDate).toLocaleDateString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-stone-400">Henüz müşteri kaydı bulunmuyor.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- RAPORLAR VE ANALİTİK --- */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-700 mb-2">Raporlar ve Analitik</h2>
            
            {/* Özet Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-stone-500 font-medium text-sm">Toplam Ciro</h3>
                  <div className="p-2 bg-green-100 rounded-lg text-green-600"><DollarSign size={20} /></div>
                </div>
                <p className="text-3xl font-bold text-stone-800">{analytics.totalRevenue} ₺</p>
                <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp size={12} /> <span>Siparişlerden hesaplandı</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-stone-500 font-medium text-sm">Toplam Sipariş</h3>
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Package size={20} /></div>
                </div>
                <p className="text-3xl font-bold text-stone-800">{analytics.totalOrders}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-stone-500 font-medium text-sm">Müşteri Sayısı</h3>
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Users size={20} /></div>
                </div>
                <p className="text-3xl font-bold text-stone-800">{analytics.uniqueCustomers}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-stone-500 font-medium text-sm">Kritik Stok</h3>
                  <div className="p-2 bg-red-100 rounded-lg text-red-600"><AlertTriangle size={20} /></div>
                </div>
                <p className="text-3xl font-bold text-stone-800">{analytics.lowStockProducts}</p>
                <div className="mt-2 text-xs text-red-600">
                  10 adetten az kalan ürünler
                </div>
              </div>
            </div>

            {/* Stok Uyarıları Tablosu */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-200 flex items-center gap-2">
                <AlertTriangle className="text-red-500" />
                <h3 className="font-bold text-lg text-stone-800">Stok Uyarıları</h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                  <tr>
                    <th className="p-4">Ürün Adı</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Mevcut Stok</th>
                    <th className="p-4 text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.filter(p => (p.stock || 0) < 10).map(p => (
                    <tr key={p.id}>
                      <td className="p-4 font-medium">{p.title}</td>
                      <td className="p-4 text-stone-500">{p.category}</td>
                      <td className="p-4 font-bold text-red-600">{p.stock || 0} adet</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                          <AlertTriangle size={12} /> Kritik Seviye
                        </span>
                      </td>
                    </tr>
                  ))}
                  {products.filter(p => (p.stock || 0) < 10).length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-stone-400">
                        <div className="flex flex-col items-center gap-2">
                          <CheckSquare size={32} className="text-green-500" />
                          <p>Harika! Kritik stok seviyesinde ürün bulunmuyor.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- SİPARİŞLER LİSTESİ (GÜNCELLENDİ) --- */}
        {activeTab === "orders" && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-stone-700">Gelen Siparişler</h2>
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-stone-200">
                <Filter size={16} className="text-stone-400 ml-2" />
                <select 
                  className="p-2 text-sm outline-none bg-transparent text-stone-600 font-medium"
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                >
                  <option value="all">Tüm Siparişler</option>
                  <option value="Hazırlanıyor">Hazırlanıyor</option>
                  <option value="Kargolandı">Kargolandı</option>
                  <option value="Teslim Edildi">Teslim Edildi</option>
                  <option value="İptal">İptal Edildi</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {orders.filter(o => orderStatusFilter === 'all' || o.status === orderStatusFilter).map(order => (
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

        {/* --- BLOG YÖNETİMİ --- */}
        {activeTab === "blogs" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-stone-700">Blog Yazıları</h2>
              <button 
                onClick={() => {
                  setEditingBlog(null);
                  setBlogFormData({
                    title: "",
                    slug: "",
                    excerpt: "",
                    content: "",
                    featured_image: "",
                    author: "",
                    published_at: "",
                    is_published: false,
                    keywords: "",
                    category: ""
                  });
                  setIsBlogFormOpen(true);
                }} 
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700"
              >
                <Plus size={20} /> Yeni Blog
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-200">
                  <tr>
                    <th className="p-4">Resim</th>
                    <th className="p-4">Başlık</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Durum</th>
                    <th className="p-4">Anahtar Kelimeler</th>
                    <th className="p-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {blogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-stone-50">
                      <td className="p-4">
                        <div className="w-16 h-16 bg-stone-100 rounded overflow-hidden relative">
                          {blog.featured_image ? (
                            <img 
                              src={`${blog.featured_image}?v=${blog.id}`} 
                              alt={blog.title} 
                              className="w-full h-full object-cover"
                              key={`${blog.id}-${blog.featured_image}`}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">No Img</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-stone-800">{blog.title}</div>
                        <div className="text-xs text-stone-500 mt-1">{blog.excerpt?.substring(0, 50)}...</div>
                      </td>
                      <td className="p-4">{blog.category || '-'}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          blog.is_published 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {blog.is_published ? 'Yayında' : 'Taslak'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {blog.keywords && blog.keywords.slice(0, 2).map((keyword, idx) => (
                            <span key={idx} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                          {blog.keywords && blog.keywords.length > 2 && (
                            <span className="text-xs text-stone-400">+{blog.keywords.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditBlog(blog)} 
                            className="text-blue-500 hover:text-blue-700"
                            title="Düzenle"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(blog.id)} 
                            className="text-red-500 hover:text-red-700"
                            title="Sil"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {blogs.length === 0 && <p className="text-center text-stone-400 py-10">Henüz blog yazısı yok.</p>}
            </div>
          </>
        )}

        {/* --- SITE AYARLARI --- */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {showSetupWarning && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>⚠️ İlk Kurulum Gerekli:</strong> Site ayarları tablosu henüz oluşturulmamış veya boş. Devam etmek için:
                  </p>
                  <button 
                    onClick={() => setShowSetupWarning(false)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <X size={18} />
                  </button>
                </div>
                <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1 mb-3">
                  <li>Supabase Dashboard'a gidin (https://supabase.com/dashboard)</li>
                  <li>SQL Editor sekmesine tıklayın</li>
                  <li><code className="bg-yellow-100 px-2 py-1 rounded">SITE_SETTINGS_SCHEMA.sql</code> dosyasının içeriğini kopyalayın</li>
                  <li>SQL Editor'e yapıştırıp "Run" butonuna tıklayın</li>
                  <li>Bu sayfayı yenileyin</li>
                </ol>
                <button 
                  onClick={fetchSiteSettings}
                  className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition"
                >
                  Tekrar Kontrol Et
                </button>
              </div>
            )}

            <div className="grid md:grid-cols-4 gap-6">
              {/* Sol: Ayarlar Menüsü */}
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
                <h3 className="font-bold text-stone-800 mb-4">Düzenlenecek Bölümler</h3>
                <div className="space-y-2">
                  {[
                    { key: 'hero_section', label: 'Ana Sayfa (Hero)' },
                    { key: 'value_props', label: 'Değer Önerileri' },
                    { key: 'footer', label: 'Footer' },
                    { key: 'contact_page', label: 'İletişim Sayfası' },
                    { key: 'about_page', label: 'Hakkımızda' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveSetting(item.key)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                        activeSetting === item.key
                          ? 'bg-green-50 text-green-700 font-medium'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sağ: Düzenleme Alanı */}
              <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                {settingsLoading ? (
                  <div className="text-center py-12">
                    <Loader2 className="animate-spin mx-auto mb-4 text-stone-400" size={32} />
                    <p className="text-stone-500">Yükleniyor...</p>
                  </div>
                ) : (
                  <>
                    {/* Hero Section Düzenleme */}
                    {activeSetting === 'hero_section' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800 mb-4">Ana Sayfa Hero Bölümü</h3>
                        <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); saveSiteSetting('hero_section', {
                          background_image: formData.get('background_image'),
                          badge_text: formData.get('badge_text'),
                          title: formData.get('title'),
                          title_highlight: formData.get('title_highlight'),
                          button_text: formData.get('button_text'),
                          button_link: formData.get('button_link')
                        }); }}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Arkaplan Resmi URL</label>
                              <input type="text" name="background_image" defaultValue={siteSettings.hero_section?.background_image || ''} className="w-full p-3 border border-stone-200 rounded-xl" placeholder="https://..." />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Rozet Metni</label>
                              <input type="text" name="badge_text" defaultValue={siteSettings.hero_section?.badge_text || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-stone-600 mb-2">Ana Başlık</label>
                                <input type="text" name="title" defaultValue={siteSettings.hero_section?.title || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-stone-600 mb-2">Vurgulu Kısım</label>
                                <input type="text" name="title_highlight" defaultValue={siteSettings.hero_section?.title_highlight || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-stone-600 mb-2">Buton Metni</label>
                                <input type="text" name="button_text" defaultValue={siteSettings.hero_section?.button_text || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-stone-600 mb-2">Buton Linki</label>
                                <input type="text" name="button_link" defaultValue={siteSettings.hero_section?.button_link || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                              </div>
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                              <Save size={20} /> Kaydet
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Value Props Düzenleme */}
                    {activeSetting === 'value_props' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800 mb-4">Değer Önerileri (3 Kutu)</h3>
                        <form onSubmit={(e) => { 
                          e.preventDefault(); 
                          const formData = new FormData(e.currentTarget);
                          saveSiteSetting('value_props', {
                            items: [
                              {
                                icon: formData.get('icon1'),
                                icon_color: formData.get('icon_color1'),
                                title: formData.get('title1'),
                                description: formData.get('description1')
                              },
                              {
                                icon: formData.get('icon2'),
                                icon_color: formData.get('icon_color2'),
                                title: formData.get('title2'),
                                description: formData.get('description2')
                              },
                              {
                                icon: formData.get('icon3'),
                                icon_color: formData.get('icon_color3'),
                                title: formData.get('title3'),
                                description: formData.get('description3')
                              }
                            ]
                          });
                        }}>
                          {[1, 2, 3].map((num) => (
                            <div key={num} className="border border-stone-200 rounded-xl p-4 mb-4">
                              <h4 className="font-bold text-stone-700 mb-3">Kutu {num}</h4>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-stone-600 mb-1">İkon (ShieldCheck, Truck, Sun)</label>
                                    <input type="text" name={`icon${num}`} defaultValue={siteSettings.value_props?.items?.[num-1]?.icon || ''} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-stone-600 mb-1">İkon Rengi</label>
                                    <select name={`icon_color${num}`} defaultValue={siteSettings.value_props?.items?.[num-1]?.icon_color || 'green'} className="w-full p-2 border border-stone-200 rounded-lg text-sm">
                                      <option value="orange">Turuncu</option>
                                      <option value="green">Yeşil</option>
                                      <option value="blue">Mavi</option>
                                      <option value="red">Kırmızı</option>
                                    </select>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">Başlık</label>
                                  <input type="text" name={`title${num}`} defaultValue={siteSettings.value_props?.items?.[num-1]?.title || ''} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">Açıklama</label>
                                  <textarea name={`description${num}`} defaultValue={siteSettings.value_props?.items?.[num-1]?.description || ''} rows={2} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                              </div>
                            </div>
                          ))}
                          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Save size={20} /> Kaydet
                          </button>
                        </form>
                      </div>
                    )}

                    {/* Footer Düzenleme */}
                    {activeSetting === 'footer' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800 mb-4">Footer Ayarları</h3>
                        <form onSubmit={(e) => { 
                          e.preventDefault(); 
                          const formData = new FormData(e.currentTarget);
                          saveSiteSetting('footer', {
                            brand_description: formData.get('brand_description'),
                            social_media: {
                              instagram: formData.get('instagram'),
                              facebook: formData.get('facebook'),
                              twitter: formData.get('twitter')
                            },
                            contact: {
                              address: formData.get('address'),
                              phone: formData.get('phone'),
                              email: formData.get('email')
                            },
                            copyright: formData.get('copyright')
                          });
                        }}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Marka Açıklaması</label>
                              <textarea name="brand_description" defaultValue={siteSettings.footer?.brand_description || ''} rows={3} className="w-full p-3 border border-stone-200 rounded-xl" />
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">Sosyal Medya</h4>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">Instagram URL</label>
                                  <input type="text" name="instagram" defaultValue={siteSettings.footer?.social_media?.instagram || ''} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">Facebook URL</label>
                                  <input type="text" name="facebook" defaultValue={siteSettings.footer?.social_media?.facebook || ''} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">Twitter URL</label>
                                  <input type="text" name="twitter" defaultValue={siteSettings.footer?.social_media?.twitter || ''} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                              </div>
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">İletişim Bilgileri</h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">Adres</label>
                                  <textarea name="address" defaultValue={siteSettings.footer?.contact?.address || ''} rows={2} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-stone-600 mb-1">Telefon</label>
                                    <input type="text" name="phone" defaultValue={siteSettings.footer?.contact?.phone || ''} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-stone-600 mb-1">E-posta</label>
                                    <input type="email" name="email" defaultValue={siteSettings.footer?.contact?.email || ''} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Telif Hakkı Metni</label>
                              <input type="text" name="copyright" defaultValue={siteSettings.footer?.copyright || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                              <Save size={20} /> Kaydet
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Contact Page Düzenleme */}
                    {activeSetting === 'contact_page' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800 mb-4">İletişim Sayfası</h3>
                        <form onSubmit={(e) => { 
                          e.preventDefault(); 
                          const formData = new FormData(e.currentTarget);
                          saveSiteSetting('contact_page', {
                            title: formData.get('title'),
                            address: {
                              title: formData.get('address_title'),
                              value: formData.get('address_value')
                            },
                            phone: {
                              title: formData.get('phone_title'),
                              value: formData.get('phone_value'),
                              subtitle: formData.get('phone_subtitle')
                            },
                            email: {
                              title: formData.get('email_title'),
                              value: formData.get('email_value'),
                              subtitle: formData.get('email_subtitle')
                            },
                            map_url: formData.get('map_url')
                          });
                        }}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Sayfa Başlığı</label>
                              <input type="text" name="title" defaultValue={siteSettings.contact_page?.title || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">Adres Bilgisi</h4>
                              <div className="space-y-3">
                                <input type="text" name="address_title" defaultValue={siteSettings.contact_page?.address?.title || ''} placeholder="Başlık" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                <textarea name="address_value" defaultValue={siteSettings.contact_page?.address?.value || ''} rows={2} placeholder="Adres" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                              </div>
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">Telefon Bilgisi</h4>
                              <div className="space-y-3">
                                <input type="text" name="phone_title" defaultValue={siteSettings.contact_page?.phone?.title || ''} placeholder="Başlık" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                <input type="text" name="phone_value" defaultValue={siteSettings.contact_page?.phone?.value || ''} placeholder="Telefon" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                <input type="text" name="phone_subtitle" defaultValue={siteSettings.contact_page?.phone?.subtitle || ''} placeholder="Alt başlık" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                              </div>
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">E-posta Bilgisi</h4>
                              <div className="space-y-3">
                                <input type="text" name="email_title" defaultValue={siteSettings.contact_page?.email?.title || ''} placeholder="Başlık" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                <input type="email" name="email_value" defaultValue={siteSettings.contact_page?.email?.value || ''} placeholder="E-posta" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                <input type="text" name="email_subtitle" defaultValue={siteSettings.contact_page?.email?.subtitle || ''} placeholder="Alt başlık" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Harita Embed URL</label>
                              <input type="text" name="map_url" defaultValue={siteSettings.contact_page?.map_url || ''} className="w-full p-3 border border-stone-200 rounded-xl" placeholder="https://www.google.com/maps/embed?pb=..." />
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                              <Save size={20} /> Kaydet
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* About Page Düzenleme */}
                    {activeSetting === 'about_page' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-stone-800 mb-4">Hakkımızda Sayfası</h3>
                        <form onSubmit={(e) => { 
                          e.preventDefault(); 
                          const formData = new FormData(e.currentTarget);
                          saveSiteSetting('about_page', {
                            title: formData.get('title'),
                            image: formData.get('image'),
                            content: [
                              {
                                paragraph: formData.get('content1'),
                                bold_text: formData.get('bold_text1') || ''
                              },
                              {
                                paragraph: formData.get('content2')
                              }
                            ],
                            mission: {
                              title: formData.get('mission_title'),
                              text: formData.get('mission_text')
                            },
                            features: [
                              { icon: formData.get('feature1_icon'), title: formData.get('feature1_title') },
                              { icon: formData.get('feature2_icon'), title: formData.get('feature2_title') },
                              { icon: formData.get('feature3_icon'), title: formData.get('feature3_title') }
                            ]
                          });
                        }}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Sayfa Başlığı</label>
                              <input type="text" name="title" defaultValue={siteSettings.about_page?.title || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-stone-600 mb-2">Üst Görsel URL</label>
                              <input type="text" name="image" defaultValue={siteSettings.about_page?.image || ''} className="w-full p-3 border border-stone-200 rounded-xl" />
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">İçerik</h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">1. Paragraf</label>
                                  <textarea name="content1" defaultValue={siteSettings.about_page?.content?.[0]?.paragraph || ''} rows={2} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                  <input type="text" name="bold_text1" defaultValue={siteSettings.about_page?.content?.[0]?.bold_text || ''} placeholder="Kalın yapılacak kelime" className="w-full p-2 border border-stone-200 rounded-lg text-sm mt-2" />
                                </div>
                                <div>
                                  <label className="block text-xs text-stone-600 mb-1">2. Paragraf</label>
                                  <textarea name="content2" defaultValue={siteSettings.about_page?.content?.[1]?.paragraph || ''} rows={2} className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                              </div>
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">Misyon</h4>
                              <div className="space-y-3">
                                <input type="text" name="mission_title" defaultValue={siteSettings.about_page?.mission?.title || ''} placeholder="Başlık" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                                <textarea name="mission_text" defaultValue={siteSettings.about_page?.mission?.text || ''} rows={3} placeholder="Misyon metni" className="w-full p-2 border border-stone-200 rounded-lg text-sm" />
                              </div>
                            </div>
                            <div className="border-t border-stone-200 pt-4">
                              <h4 className="font-bold text-stone-700 mb-3">Özellikler (3 Kutu)</h4>
                              {[1, 2, 3].map((num) => (
                                <div key={num} className="grid grid-cols-2 gap-3 mb-3">
                                  <input type="text" name={`feature${num}_icon`} defaultValue={siteSettings.about_page?.features?.[num-1]?.icon || ''} placeholder="İkon (emoji)" className="p-2 border border-stone-200 rounded-lg text-sm" />
                                  <input type="text" name={`feature${num}_title`} defaultValue={siteSettings.about_page?.features?.[num-1]?.title || ''} placeholder="Başlık" className="p-2 border border-stone-200 rounded-lg text-sm" />
                                </div>
                              ))}
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                              <Save size={20} /> Kaydet
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* TOPLU STOK GÜNCELLEME MODALI */}
      {isBulkStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-stone-800 mb-4">Toplu Stok Güncelleme</h3>
            <p className="text-stone-600 mb-4">Seçilen {selectedProducts.length} ürünün stoğunu güncelle:</p>
            <input 
              type="number" 
              min="0" 
              className="w-full p-3 border border-stone-200 rounded-xl mb-4" 
              placeholder="Yeni Stok Miktarı" 
              value={bulkStockValue} 
              onChange={(e) => setBulkStockValue(e.target.value)} 
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsBulkStockModalOpen(false)} className="px-4 py-2 text-stone-500 hover:bg-stone-100 rounded-lg font-medium">İptal</button>
              <button onClick={handleBulkStockUpdate} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">Güncelle</button>
            </div>
          </div>
        </div>
      )}

      {/* BLOG FORM MODALI */}
      {isBlogFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50 sticky top-0 z-10">
              <h3 className="text-lg font-bold text-stone-800">{editingBlog ? 'Blog Düzenle' : 'Yeni Blog Ekle'}</h3>
              <button onClick={() => { setIsBlogFormOpen(false); setEditingBlog(null); }} className="p-2 hover:bg-stone-200 rounded-full transition">
                <X size={20} className="text-stone-500" />
              </button>
            </div>
            <form onSubmit={handleSaveBlog} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">Başlık *</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-3 border border-stone-200 rounded-xl" 
                    placeholder="Blog Başlığı"
                    value={blogFormData.title}
                    onChange={(e) => {
                      setBlogFormData({...blogFormData, title: e.target.value});
                      if (!editingBlog && !blogFormData.slug) {
                        setBlogFormData({...blogFormData, title: e.target.value, slug: generateSlug(e.target.value)});
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">Slug (URL) *</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-3 border border-stone-200 rounded-xl" 
                    placeholder="blog-yazi-url"
                    value={blogFormData.slug}
                    onChange={(e) => setBlogFormData({...blogFormData, slug: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">Özet</label>
                <textarea 
                  rows={2}
                  className="w-full p-3 border border-stone-200 rounded-xl" 
                  placeholder="Kısa açıklama (liste sayfasında görünecek)"
                  value={blogFormData.excerpt}
                  onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">İçerik (HTML) *</label>
                <textarea 
                  required
                  rows={12}
                  className="w-full p-3 border border-stone-200 rounded-xl font-mono text-sm" 
                  placeholder="HTML içerik yazın..."
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})}
                />
                <div className="mt-2 p-3 bg-stone-50 rounded-lg text-xs text-stone-600">
                  <p className="font-semibold mb-1">HTML Şablonu (Kopyalayıp düzenleyin):</p>
                  <pre className="text-xs overflow-x-auto">{`<h2>Başlık</h2>
<p>Paragraf metni buraya yazılır.</p>
<h3>Alt Başlık</h3>
<ul>
  <li>Liste öğesi 1</li>
  <li>Liste öğesi 2</li>
</ul>
<p><strong>Kalın metin</strong> ve normal metin.</p>`}</pre>
                  <p className="mt-2 text-stone-500">Kullanabileceğiniz HTML etiketleri: h2, h3, p, ul, li, ol, strong, em, a (link)</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">Kapak Resmi URL</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-stone-200 rounded-xl" 
                  placeholder="https://images.unsplash.com/photo-..."
                  value={blogFormData.featured_image}
                  onChange={(e) => setBlogFormData({...blogFormData, featured_image: e.target.value})}
                />
                {blogFormData.featured_image && (
                  <div className="mt-3 relative h-48 w-full border border-stone-200 rounded-xl overflow-hidden bg-stone-100">
                    <Image
                      src={blogFormData.featured_image}
                      alt="Önizleme"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <p className="text-xs text-stone-500 mt-1">
                  Unsplash'den resim alabilirsiniz. Örnek: 
                  <a href="https://unsplash.com" target="_blank" className="text-green-600 hover:underline ml-1">unsplash.com</a>
                </p>
              </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">Yazar</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-stone-200 rounded-xl" 
                    placeholder="Hobitat Ekibi"
                    value={blogFormData.author}
                    onChange={(e) => setBlogFormData({...blogFormData, author: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">Kategori</label>
                  <select 
                    className="w-full p-3 border border-stone-200 rounded-xl bg-white"
                    value={blogFormData.category}
                    onChange={(e) => setBlogFormData({...blogFormData, category: e.target.value})}
                  >
                    <option value="">Kategori Seç</option>
                    <option value="Rehber">Rehber</option>
                    <option value="Bakım">Bakım</option>
                    <option value="Haberler">Haberler</option>
                    <option value="İpuçları">İpuçları</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">Anahtar Kelimeler (virgülle ayırın)</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-stone-200 rounded-xl" 
                  placeholder="balkon bahçesi, domates, fide bakımı"
                  value={blogFormData.keywords}
                  onChange={(e) => setBlogFormData({...blogFormData, keywords: e.target.value})}
                />
                <p className="text-xs text-stone-500 mt-1">Örnek: fide bakımı, balkon bahçesi, domates yetiştirme</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-2">Yayın Tarihi</label>
                  <input 
                    type="date" 
                    className="w-full p-3 border border-stone-200 rounded-xl" 
                    value={blogFormData.published_at}
                    onChange={(e) => setBlogFormData({...blogFormData, published_at: e.target.value})}
                  />
                  <p className="text-xs text-stone-500 mt-1">Boş bırakırsanız bugünün tarihi kullanılır</p>
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-green-600 rounded"
                      checked={blogFormData.is_published}
                      onChange={(e) => setBlogFormData({...blogFormData, is_published: e.target.checked})}
                    />
                    <span className="text-sm font-medium text-stone-700">Yayında göster</span>
                  </label>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isSaving} 
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <><Save size={20}/> {editingBlog ? 'Güncelle' : 'Kaydet'}</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ÜRÜN FORM MODALI */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50 sticky top-0 z-10">
              <h3 className="text-lg font-bold text-stone-800">{editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}</h3>
              <button onClick={handleCloseForm} className="p-2 hover:bg-stone-200 rounded-full transition"><X size={20} className="text-stone-500" /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              {/* Resim Yükleme */}
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">Ürün Resmi {editingProduct && <span className="text-xs text-stone-400">(Değiştirmek için yeni resim seçin)</span>}</label>
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
              <div className="grid grid-cols-2 gap-4">
                <input type="number" min="0" className="w-full p-3 border border-stone-200 rounded-xl" placeholder="Stok Miktarı" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                <div className="flex items-center text-sm text-stone-500">
                  {formData.stock && parseInt(formData.stock) === 0 && (
                    <span className="text-red-600 font-medium">⚠️ Stokta yok</span>
                  )}
                  {formData.stock && parseInt(formData.stock) > 0 && parseInt(formData.stock) < 10 && (
                    <span className="text-yellow-600 font-medium">⚠️ Stok azalıyor</span>
                  )}
                </div>
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