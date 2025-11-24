-- ============================================
-- ÜRÜN RESİMLERİNİ DÜZELTME
-- Bu SQL dosyasını Supabase Dashboard > SQL Editor'de çalıştırın
-- Hatalı veya tekrarlayan ürün resimlerini doğru görsellerle günceller
-- ============================================

-- MARUL GRUBU
-- Iceberg Marul
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Iceberg Marul';

-- Yağlı Marul
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1644317767998-3f93f6784807?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Yağlı Marul';

-- DOMATES GRUBU
-- Aşılı Domates
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1591951425328-48c1fe7179cd?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Aşılı Domates';

-- Sırık Domates
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1524593166156-311f36f63c7c?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Sırık Domates';

-- Cherry Domates
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1561136120-f8146f43619b?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Cherry Domates';

-- Kokteyl Domates
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1447875562698-58d7055dc96a?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Kokteyl Domates';

-- PATLICAN GRUBU
-- Aşılı Patlıcan
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1615485500704-3e995f85aa2f?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Aşılı Patlıcan';

-- HIYAR GRUBU
-- Hıyar Fidesi
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Hıyar Fidesi';

-- Aşılı Hıyar
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Aşılı Hıyar';

-- Kornişon
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1602016320961-da422f5e5741?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Kornişon';

-- LAHANA VE BROKOLİ GRUBU
-- Beyaz Lahana
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1550081699-79c1c2e48a77?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Beyaz Lahana';

-- Kırmızı Lahana
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1556782441-3545d547284c?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Kırmızı Lahana';

-- Karnabahar Fidesi
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Karnabahar Fidesi';

-- BİBER GRUBU (KULLANICI İSTEĞİ ÜZERİNE GÜNCELLENDİ)
-- Acı Kıl Biber
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1662517507177-1a8ec897890e?q=80&w=1170&auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Acı Kıl Biber';

-- Tatlı Kıl Biber
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1662517507177-1a8ec897890e?q=80&w=1170&auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Tatlı Kıl Biber';

-- Dolma Biber
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1662517507177-1a8ec897890e?q=80&w=1170&auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Dolma Biber';

-- Demre Biber
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1662517507177-1a8ec897890e?q=80&w=1170&auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Demre Biber';

-- Çarliston Biber
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1662517507177-1a8ec897890e?q=80&w=1170&auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Çarliston Biber';

-- Jalapeno Biber
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1662517507177-1a8ec897890e?q=80&w=1170&auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Jalapeno Biber';

-- MEYVE GRUBU
-- Aşılı Karpuz
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1589539159425-7b61ce7bd57c?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Aşılı Karpuz';

-- Kavun Fidesi
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1594356865706-76650397322f?auto=format&fit=crop&w=800&q=80' 
WHERE title = 'Kavun Fidesi';

-- KONTROL
-- SELECT title, image_url FROM products;
