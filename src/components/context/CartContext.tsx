"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void; // <--- YENİ: MİKTAR GÜNCELLEME
  clearCart: () => void; // <--- YENİ ÖZELLİK
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sepeti yerel depolamadan (localStorage) yükle - İsteğe bağlı, sayfa yenilenince sepet gitmesin diye
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Sepet her değiştiğinde kaydet
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any) => {
    // Stok kontrolü
    if (product.stock !== undefined && product.stock <= 0) {
      alert('Üzgünüz, bu ürün stokta bulunmamaktadır.');
      return;
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      // Mevcut ürün için stok kontrolü
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (product.stock !== undefined && newQuantity > product.stock) {
          alert(`Üzgünüz, stokta sadece ${product.stock} adet bulunmaktadır.`);
          return currentItems;
        }
        return currentItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      
      // Yeni ürün ekleme
      return [...currentItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  // --- YENİ: MİKTAR GÜNCELLEME FONKSİYONU ---
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.id === id) {
          // Stok kontrolü
          if (item.stock !== undefined && quantity > item.stock) {
            alert(`Üzgünüz, stokta sadece ${item.stock} adet bulunmaktadır.`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // --- YENİ: SEPETİ BOŞALT FONKSİYONU ---
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart'); // Hafızadan da sil
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}