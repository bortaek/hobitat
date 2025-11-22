import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] font-sans flex flex-col">
      <Header />
      
      <div className="container mx-auto px-6 py-16 flex-grow">
        <h1 className="text-4xl font-serif font-bold text-center text-stone-800 mb-12">Bize Ulaşın</h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700"><MapPin size={24} /></div>
              <div>
                <h3 className="font-bold text-lg text-stone-800">Adresimiz</h3>
                <p className="text-stone-500">Kemalpaşa Mah. 123. Sokak No:45<br/>İzmir, Türkiye</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700"><Phone size={24} /></div>
              <div>
                <h3 className="font-bold text-lg text-stone-800">Telefon</h3>
                <p className="text-stone-500">+90 (555) 123 45 67</p>
                <p className="text-stone-400 text-sm mt-1">Hafta içi 09:00 - 18:00</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700"><Mail size={24} /></div>
              <div>
                <h3 className="font-bold text-lg text-stone-800">E-posta</h3>
                <p className="text-stone-500">destek@hobitat.com</p>
                <p className="text-stone-400 text-sm mt-1">24 saat içinde dönüş yapılır.</p>
              </div>
            </div>
          </div>

          {/* Harita (Temsili) */}
          <div className="bg-stone-200 rounded-3xl overflow-hidden h-full min-h-[300px] relative">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200065.39526623755!2d27.1475!3d38.4192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8fe!2zxLB6bWly!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
               width="100%" 
               height="100%" 
               style={{border:0}} 
               allowFullScreen={true} 
               loading="lazy" 
               className="absolute inset-0"
             ></iframe>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}