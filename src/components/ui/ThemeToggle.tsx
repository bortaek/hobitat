"use client";

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
      aria-label={theme === 'dark' ? "Aydınlık moda geç" : "Karanlık moda geç"}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-stone-600" />
      )}
    </button>
  );
}

