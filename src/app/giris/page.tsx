"use client";

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import { Loader2, LogIn, UserPlus, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Giriş mi Kayıt mı?
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // --- GİRİŞ YAP ---
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        alert("Giriş hatası: " + error.message);
        setLoading(false);
        return;
      }

      // Başarılı giriş - session'ın kurulduğundan emin ol
      if (data.session) {
        // Cookie'lerin set edilmesi için bekle
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Session'ın gerçekten kurulduğunu doğrula
        const { data: { session: verifySession } } = await supabase.auth.getSession();
        
        if (verifySession?.user) {
          // Tam sayfa yenilemesi ile yönlendir - bu middleware'in çalışmasını garanti eder
          window.location.href = '/hesabim';
        } else {
          alert("Giriş başarılı ama oturum kurulamadı. Lütfen sayfayı yenileyip tekrar deneyin.");
          setLoading(false);
        }
      }
    } else {
      // --- KAYIT OL ---
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        alert("Kayıt hatası: " + error.message);
        setLoading(false);
      } else {
        alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        setIsLogin(true); // Giriş ekranına dön
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-stone-100">
          
          {/* Başlık */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-green-800 mb-2">
              {isLogin ? "Hoş Geldiniz" : "Aramıza Katılın"}
            </h1>
            <p className="text-stone-500">
              {isLogin ? "Hesabınıza giriş yapın" : "Hobitat dünyasına adım atın"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-stone-400" size={20} />
              <input 
                required 
                type="email" 
                placeholder="E-posta Adresi" 
                className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-stone-400" size={20} />
              <input 
                required 
                type="password" 
                placeholder="Şifre" 
                className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Giriş Yap" : "Kayıt Ol")}
            </button>
          </form>

          {/* Geçiş Linki */}
          <div className="mt-6 text-center pt-6 border-t border-stone-100">
            <p className="text-stone-500 text-sm mb-2">
              {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
            </p>
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-green-700 font-bold hover:underline"
            >
              {isLogin ? "Hemen Kayıt Olun" : "Giriş Yapın"}
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}