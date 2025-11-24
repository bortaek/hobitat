-- ============================================
-- TEKRAR EDEN ÜRÜNLERİ TEMİZLEME
-- Bu SQL dosyasını Supabase Dashboard > SQL Editor'de çalıştırın
-- Aynı isme sahip (duplicate) ürünlerden sadece en yüksek ID'ye sahip (en son eklenen) olanı tutar
-- ============================================

-- Tekrarlayan kayıtları silme sorgusu
DELETE FROM products
WHERE id NOT IN (
    SELECT MAX(id)
    FROM products
    GROUP BY title
);

-- Kontrol sorgusu - Benzersiz ürün listesi
SELECT id, title, category, price, stock 
FROM products 
ORDER BY title;

