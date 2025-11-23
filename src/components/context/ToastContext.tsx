"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Otomatik kapanma
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((message: string) => addToast(message, 'success'), [addToast]);
  const error = useCallback((message: string) => addToast(message, 'error'), [addToast]);
  const info = useCallback((message: string) => addToast(message, 'info'), [addToast]);
  const warning = useCallback((message: string) => addToast(message, 'warning'), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, success, error, info, warning }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-24 right-6 z-[1000] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              layout
              className="pointer-events-auto min-w-[300px] max-w-md"
            >
              <div className={`
                relative overflow-hidden rounded-xl shadow-lg border p-4 pr-10 flex items-start gap-3
                backdrop-blur-md transition-colors duration-300
                ${toast.type === 'success' ? 'bg-white/90 border-green-200 dark:bg-stone-900/90 dark:border-green-900' : ''}
                ${toast.type === 'error' ? 'bg-white/90 border-red-200 dark:bg-stone-900/90 dark:border-red-900' : ''}
                ${toast.type === 'info' ? 'bg-white/90 border-blue-200 dark:bg-stone-900/90 dark:border-blue-900' : ''}
                ${toast.type === 'warning' ? 'bg-white/90 border-yellow-200 dark:bg-stone-900/90 dark:border-yellow-900' : ''}
              `}>
                {/* Sol Çizgi */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5
                  ${toast.type === 'success' ? 'bg-green-500' : ''}
                  ${toast.type === 'error' ? 'bg-red-500' : ''}
                  ${toast.type === 'info' ? 'bg-blue-500' : ''}
                  ${toast.type === 'warning' ? 'bg-yellow-500' : ''}
                `} />

                {/* İkon */}
                <div className="flex-shrink-0 mt-0.5">
                  {toast.type === 'success' && <CheckCircle size={20} className="text-green-600 dark:text-green-500" />}
                  {toast.type === 'error' && <AlertCircle size={20} className="text-red-600 dark:text-red-500" />}
                  {toast.type === 'info' && <Info size={20} className="text-blue-600 dark:text-blue-500" />}
                  {toast.type === 'warning' && <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-500" />}
                </div>

                {/* Mesaj */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-100 leading-snug">
                    {toast.message}
                  </p>
                </div>

                {/* Kapat Butonu */}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="absolute top-3 right-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

