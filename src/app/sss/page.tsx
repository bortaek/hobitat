import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/home/FAQ';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Hobitat",
  description: "Fide satın alma, dikim, bakım, kargo ve teslimat hakkında merak ettiğiniz tüm soruların cevapları.",
};

export default function SSSPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans flex flex-col">
      <Header />
      <FAQ showAll={true} />
      <Footer />
    </main>
  );
}

