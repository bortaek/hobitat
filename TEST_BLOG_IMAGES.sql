-- ============================================
-- BLOG RESİMLERİNİ TEST ETMEK İÇİN
-- Bu sorguyu çalıştırarak hangi blogların hangi resimlere sahip olduğunu görebilirsiniz
-- ============================================

-- Tüm blogları resimleriyle birlikte göster
SELECT 
  id,
  title,
  slug,
  featured_image,
  updated_at,
  created_at
FROM blogs
ORDER BY id;

-- Sadece salatalık blogunu göster
SELECT 
  id,
  title,
  slug,
  featured_image
FROM blogs
WHERE title ILIKE '%salatalık%' 
   OR title ILIKE '%salatalik%'
   OR slug ILIKE '%salatalik%';

-- Sadece domates blogunu göster
SELECT 
  id,
  title,
  slug,
  featured_image
FROM blogs
WHERE title ILIKE '%domates%'
   OR slug ILIKE '%domates%';

-- Resim URL'lerinde "domates" geçen blogları bul (yanlış eşleşme kontrolü)
SELECT 
  id,
  title,
  slug,
  featured_image
FROM blogs
WHERE featured_image LIKE '%1592924357228%'  -- Domates resmi ID'si
  AND (title ILIKE '%salatalık%' OR title ILIKE '%salatalik%');

