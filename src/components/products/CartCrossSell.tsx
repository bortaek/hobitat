"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/context/CartContext';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image_url: string;
  stock?: number;
}

interface CartCrossSellProps {
  cartItemIds: number[];
}

export default function CartCrossSell({ cartItemIds }: CartCrossSellProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchCrossSellProducts() {
      if (cartItemIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Sepetteki ürünlerin kategorilerini al
        const { data: cartProducts } = await supabase
          .from('products')
          .select('category')
          .in('id', cartItemIds);

        const categories = cartProducts?.map(p => p.category) || [];
        const uniqueCategories = [...new Set(categories)];

        // Aynı kategorideki diğer ürünleri getir (sepettekiler hariç)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('category', uniqueCategories)
          .not('id', 'in', `(${cartItemIds.join(',')})`)
          .limit(3)
          .order('id', { ascending: false });

        if (error) {
          console.error('Sepet çapraz satış ürünleri çekilirken hata:', error);
          // Hata durumunda popüler ürünleri göster
          const { data: popularData } = await supabase
            .from('products')
            .select('*')
            .not('id', 'in', `(${cartItemIds.join(',')})`)
            .limit(3)
            .order('id', { ascending: false });
          
          setProducts(popularData as Product[] || []);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Beklenmeyen hata:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCrossSellProducts();
  }, [cartItemIds]);

  if (loading || products.length === 0) {
    return null;
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image_url,
      stock: product.stock,
    });
  };

  return (
    <div className="mt-6 pt-6 border-t border-stone-200">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag size={18} className="text-green-600" />
        <h3 className="font-bold text-stone-800 text-sm">Sepetinize Ekleyebileceğiniz Ürünler</h3>
      </div>
      
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex gap-3 group">
            <Link 
              href={`/urun/${product.id}`}
              className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0 border border-stone-200 relative"
            >
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition"
                sizes="64px"
              />
            </Link>
            
            <div className="flex-1 min-w-0">
              <Link 
                href={`/urun/${product.id}`}
                className="block"
              >
                <h4 className="font-medium text-stone-800 text-sm line-clamp-1 group-hover:text-green-700 transition">
                  {product.title}
                </h4>
              </Link>
              <p className="text-green-700 font-bold text-sm mt-1">{product.price} ₺</p>
              
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className="mt-2 w-full bg-green-600 hover:bg-green-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs py-1.5 px-3 rounded-lg font-medium transition flex items-center justify-center gap-1"
                aria-label={`${product.title} ürününü sepete ekle`}
              >
                <Plus size={14} aria-hidden="true" />
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

