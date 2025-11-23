"use client";

import React, { useState } from 'react';
import { SlidersHorizontal, X, DollarSign, Package, TrendingUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
}

export interface FilterState {
  priceRange: [number, number];
  inStock: boolean | null;
  category: string;
  searchTerm: string;
}

export default function AdvancedFilters({ onFilterChange, onSortChange, currentSort }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000] as [number, number],
    inStock: null,
    category: '',
    searchTerm: '',
  });

  const handlePriceRangeChange = (min: number, max: number) => {
    const newFilters: FilterState = { ...filters, priceRange: [min, max] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStockFilter = (value: boolean | null) => {
    const newFilters = { ...filters, inStock: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryFilter = (category: string) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (searchTerm: string) => {
    const newFilters = { ...filters, searchTerm };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      priceRange: [0, 1000] as [number, number],
      inStock: null,
      category: '',
      searchTerm: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 || 
                          filters.inStock !== null || filters.category !== '';

  return (
    <div className="mb-8">
      {/* Filtre Butonu ve Sıralama */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
        {/* Arama */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={filters.searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
          />
          <SlidersHorizontal className="absolute left-3 top-3.5 text-stone-400" size={20} />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {/* Filtre Butonu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition ${
              hasActiveFilters
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <SlidersHorizontal size={18} />
            <span>Filtrele</span>
            {hasActiveFilters && (
              <span className="bg-white text-green-600 text-xs font-bold px-2 py-0.5 rounded-full">
                Aktif
              </span>
            )}
          </button>

          {/* Sıralama */}
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-stone-200 rounded-xl px-4 py-3 pr-10 font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
              <option value="default">Varsayılan</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="stock-high">Stok: Yüksekten Düşüğe</option>
              <option value="stock-low">Stok: Düşükten Yükseğe</option>
            </select>
            <TrendingUp className="absolute right-3 top-3.5 text-stone-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* Gelişmiş Filtreler (Açılır Panel) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                  <SlidersHorizontal size={20} className="text-green-600" />
                  Gelişmiş Filtreler
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Filtreleri Temizle
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Fiyat Aralığı */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                    <DollarSign size={16} className="text-green-600" />
                    Fiyat Aralığı
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        min="0"
                        value={filters.priceRange[0] || ''}
                        onChange={(e) => handlePriceRangeChange(Number(e.target.value) || 0, filters.priceRange[1])}
                        className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        min="0"
                        value={filters.priceRange[1] || ''}
                        onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value) || 1000)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="text-xs text-stone-500">
                      {filters.priceRange[0]} ₺ - {filters.priceRange[1]} ₺
                    </div>
                  </div>
                </div>

                {/* Stok Durumu */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                    <Package size={16} className="text-green-600" />
                    Stok Durumu
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStockFilter(null)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        filters.inStock === null
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Tümü
                    </button>
                    <button
                      onClick={() => handleStockFilter(true)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        filters.inStock === true
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Stokta Var
                    </button>
                    <button
                      onClick={() => handleStockFilter(false)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        filters.inStock === false
                          ? 'bg-red-100 text-red-700 font-medium'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Stokta Yok
                    </button>
                  </div>
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-3">
                    Kategori
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="">Tüm Kategoriler</option>
                    <option value="Sebze">Sebze Fideleri</option>
                    <option value="Meyve">Meyve Fideleri</option>
                    <option value="Baharat">Baharat</option>
                    <option value="Toprak">Toprak & Gübre</option>
                  </select>
                </div>
              </div>

              {/* Aktif Filtreler */}
              {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-stone-200">
                  <div className="flex flex-wrap gap-2">
                    {filters.priceRange[0] > 0 && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Min: {filters.priceRange[0]} ₺
                      </span>
                    )}
                    {filters.priceRange[1] < 1000 && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Max: {filters.priceRange[1]} ₺
                      </span>
                    )}
                    {filters.inStock === true && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Stokta Var
                      </span>
                    )}
                    {filters.inStock === false && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Stokta Yok
                      </span>
                    )}
                    {filters.category && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {filters.category}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

