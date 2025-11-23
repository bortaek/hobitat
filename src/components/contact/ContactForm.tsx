"use client";

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simüle edilmiş form gönderimi (gerçek uygulamada API'ye gönderilir)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // 3 saniye sonra başarı mesajını kaldır
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
            Ad Soyad *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Adınız ve soyadınız"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
            E-posta *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="ornek@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="0555 123 45 67"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
            Konu *
          </label>
          <select
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white"
          >
            <option value="">Konu seçin</option>
            <option value="siparis">Sipariş Sorgulama</option>
            <option value="urun">Ürün Bilgisi</option>
            <option value="destek">Teknik Destek</option>
            <option value="sikayet">Şikayet</option>
            <option value="oneriler">Öneriler</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
          Mesajınız *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition resize-none"
          placeholder="Mesajınızı buraya yazın..."
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send size={20} />
            Mesaj Gönder
          </>
        )}
      </button>
    </form>
  );
}

