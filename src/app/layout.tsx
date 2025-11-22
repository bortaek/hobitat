import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/context/CartContext";
import CartSidebar from "@/components/layout/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

// --- BURASI SİTENİN KİMLİK KARTIDIR (SEO) ---
export const metadata: Metadata = {
  title: {
    default: "Hobitat | Evinizdeki Doğal Yaşam",
    template: "%s | Hobitat" // Alt sayfalarda örn: "Domates | Hobitat" yazar
  },
  description: "Aşılanmış sebze fideleri, meyve ağaçları ve organik toprak çeşitleri. Hobitat ile balkonunuzu üretim bahçesine dönüştürün. 24 saatte kargo garantisi.",
  keywords: ["fide", "domates fidesi", "meyve fidanı", "organik gübre", "evde bahçe", "saksı bitkileri", "hobitat"],
  openGraph: {
    title: "Hobitat - Doğayı Evinize Getirin",
    description: "Sertifikalı ve garantili fidelerle tanışın.",
    url: "https://hobitat.com", // (İleride alacağın domain)
    siteName: "Hobitat",
    images: [
      {
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200", // Paylaşım resmi (Whatsapp vb.)
        width: 1200,
        height: 630,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>
          <CartSidebar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}