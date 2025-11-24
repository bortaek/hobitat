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
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sepeti yerel depolamadan (localStorage) yükle
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
      throw new Error('Üzgünüz, bu ürün stokta bulunmamaktadır.');
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      // Mevcut ürün için stok kontrolü
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (product.stock !== undefined && newQuantity > product.stock) {
          throw new Error(`Üzgünüz, stokta sadece ${product.stock} adet bulunmaktadır.`);
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

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    // Stok kontrolü için mevcut item'ı bulmamız lazım, ama setItems içinde yaparsak throw edemeyiz (render phase hatası olur)
    // Bu yüzden önce kontrol edelim.
    const currentItem = items.find(item => item.id === id);
    if (currentItem && currentItem.stock !== undefined && quantity > currentItem.stock) {
       throw new Error(`Üzgünüz, stokta sadece ${currentItem.stock} adet bulunmaktadır.`);
    }

    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
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
