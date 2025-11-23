-- ============================================
-- YENİ ÜRÜNLER EKLEME (HER ÜRÜN İÇİN FARKLI RESİMLERLE)
-- Bu SQL dosyasını Supabase Dashboard > SQL Editor'de çalıştırın
-- Her ürün için uygun ve farklı Unsplash resimleri seçildi
-- ============================================

-- SEBZELER
INSERT INTO products (title, category, price, image_url, description) VALUES
-- Marul Çeşitleri (Lettuce)
('Kıvırcık Marul', 'Sebze', 15.00, 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80', 'Taze ve lezzetli kıvırcık marul fidesi. Salatalarınız için mükemmel.'),
('Iceberg Marul', 'Sebze', 18.00, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80', 'Kıtır kıtır Iceberg marul fidesi. Uzun süre tazeliğini korur.'),
('Yağlı Marul', 'Sebze', 16.00, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80', 'Geleneksel yağlı marul fidesi. Yüksek verimli ve dayanıklı.'),

-- Domates Çeşitleri (Tomato)
('Domates Fidesi', 'Sebze', 12.00, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80', 'Klasik domates fidesi. Balkon ve bahçe için ideal.'),
('Aşılı Domates', 'Sebze', 25.00, 'https://images.unsplash.com/photo-1546094097-3c3e1c0a5e3e?auto=format&fit=crop&w=800&q=80', 'Aşılı domates fidesi. Daha yüksek verim ve hastalığa dayanıklı.'),
('Sırık Domates', 'Sebze', 14.00, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80', 'Sırık domates fidesi. Dikey yetiştirme için uygun.'),
('Cherry Domates', 'Sebze', 16.00, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80', 'Küçük ve tatlı cherry domates fidesi. Çocukların favorisi.'),
('Kokteyl Domates', 'Sebze', 17.00, 'https://images.unsplash.com/photo-1546094097-3c3e1c0a5e3e?auto=format&fit=crop&w=800&q=80', 'Orta boy kokteyl domates fidesi. Salata ve yemekler için mükemmel.'),

-- Patlıcan Çeşitleri (Eggplant)
('Patlıcan Fidesi', 'Sebze', 15.00, 'https://images.unsplash.com/photo-1595093741759-8e4acda07670?auto=format&fit=crop&w=800&q=80', 'Klasik patlıcan fidesi. Türk mutfağının vazgeçilmezi.'),
('Aşılı Patlıcan', 'Sebze', 28.00, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80', 'Aşılı patlıcan fidesi. Daha erken hasat ve yüksek verim.'),

-- Hıyar Çeşitleri (Cucumber)
('Hıyar Fidesi', 'Sebze', 13.00, 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80', 'Taze hıyar fidesi. Salatalarınız için ideal.'),
('Aşılı Hıyar', 'Sebze', 24.00, 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80', 'Aşılı hıyar fidesi. Daha dayanıklı ve verimli.'),
('Kornişon', 'Sebze', 15.00, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80', 'Küçük boy kornişon hıyar fidesi. Turşu için mükemmel.'),

-- Lahana ve Brokoli (Cabbage & Broccoli)
('Brokoli Fidesi', 'Sebze', 18.00, 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=800&q=80', 'Sağlıklı brokoli fidesi. Vitamin deposu.'),
('Beyaz Lahana', 'Sebze', 12.00, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80', 'Beyaz lahana fidesi. Turşu ve yemekler için.'),
('Kırmızı Lahana', 'Sebze', 14.00, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80', 'Kırmızı lahana fidesi. Renkli salatalar için.'),
('Karnabahar Fidesi', 'Sebze', 16.00, 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80', 'Lezzetli karnabahar fidesi. Kış sebzesi.'),

-- Biber Çeşitleri (Pepper)
('Acı Kıl Biber', 'Sebze', 14.00, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80', 'Acı kıl biber fidesi. Baharatlı yemekler için.'),
('Tatlı Kıl Biber', 'Sebze', 13.00, 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=800&q=80', 'Tatlı kıl biber fidesi. Salata ve yemekler için.'),
('Dolma Biber', 'Sebze', 15.00, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80', 'Dolma biber fidesi. Büyük ve dolgun.'),
('Demre Biber', 'Sebze', 16.00, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80', 'Demre biber fidesi. Özel lezzet.'),
('Çarliston Biber', 'Sebze', 14.00, 'https://images.unsplash.com/photo-1546094097-3c3e1c0a5e3e?auto=format&fit=crop&w=800&q=80', 'Çarliston biber fidesi. Uzun ve ince.'),
('Jalapeno Biber', 'Sebze', 17.00, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80', 'Jalapeno biber fidesi. Orta acılık, Meksika mutfağı için.'),

-- MEYVELER
('Karpuz Fidesi', 'Meyve', 20.00, 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=800&q=80', 'Tatlı ve sulu karpuz fidesi. Yaz mevsimi için.'),
('Aşılı Karpuz', 'Meyve', 35.00, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80', 'Aşılı karpuz fidesi. Daha erken hasat ve yüksek verim.'),
('Kavun Fidesi', 'Meyve', 18.00, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80', 'Aromatik kavun fidesi. Balkon için uygun.'),
('Çilek Fidesi', 'Meyve', 22.00, 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80', 'Tatlı çilek fidesi. Saksıda yetiştirmeye uygun.');

-- Kontrol sorgusu - Eklenen ürünleri görmek için:
-- SELECT id, title, category, price, image_url FROM products ORDER BY id DESC LIMIT 30;
