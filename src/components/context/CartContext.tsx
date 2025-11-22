"use client"; // Bu dosya tarayıcıda çalışacak demek

import React, { createContext, useContext, useState, useEffect } from 'react';

// Sepetteki bir ürünün tipi
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Sepet kutusunun özellikleri
interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sepete ekle
  const addToCart = (product: any) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Ürün zaten varsa sayısını artır
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Yoksa yeni ekle
      return [...currentItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Eklendiğinde sepeti aç
  };

  // Sepetten çıkar
  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  // Sepeti Aç/Kapa
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Toplam sayı ve fiyat hesaplama
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, totalItems, totalPrice, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Başka dosyalardan bu kutuyu kullanmak için kanca
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}