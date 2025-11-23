-- ============================================
-- STOK TAKİBİ KOLONU EKLEME
-- Bu SQL dosyasını Supabase Dashboard > SQL Editor'de çalıştırın
-- ============================================

-- 1. Products tablosuna stock kolonu ekle (varsayılan değer: 0)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;

-- 2. Mevcut ürünlere varsayılan stok değeri ata (örnek: 100)
UPDATE products 
SET stock = 100 
WHERE stock IS NULL OR stock = 0;

-- 3. Stok kolonuna NOT NULL constraint ekle (opsiyonel)
-- ALTER TABLE products ALTER COLUMN stock SET NOT NULL;

-- 4. Kontrol sorgusu - Stok durumunu görmek için:
-- SELECT id, title, stock FROM products ORDER BY id;

-- 5. Stok az olan ürünleri görmek için:
-- SELECT id, title, stock FROM products WHERE stock < 10 ORDER BY stock ASC;

