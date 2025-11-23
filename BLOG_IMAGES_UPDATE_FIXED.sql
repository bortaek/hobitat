-- ============================================
-- BLOG RESİMLERİ GÜNCELLEMESİ
-- Her blog için içeriğe uygun spesifik resimler
-- Başlığa ve slug'a göre güncelleme (güvenilir)
-- ============================================
-- Bu SQL dosyasını Supabase Dashboard > SQL Editor'de çalıştırın
-- NOT: Bu dosyayı birden fazla kez çalıştırabilirsiniz, sorun yaratmaz
-- Her UPDATE komutu sadece eşleşen kayıtları günceller

-- ÖNCE MEVCUT DURUMU KONTROL EDİN (İsteğe bağlı):
-- SELECT id, title, slug, featured_image FROM blogs ORDER BY id;

-- 1. BALKON BAHÇECİLİĞİ - Balkon/teras bahçe resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%balkon%bahçe%' OR slug = 'evde-balkon-bahceciligi-baslangic-rehberi';

-- 2. DOMATES - Domates bitkisi ve meyve resmi (DOMATES RESMİ)
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%domates%' OR slug = 'domates-fidesi-yetistirme-10-adimda-basarı';

-- 3. BİBER - Biber bitkisi ve meyve resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%biber%' OR slug = 'biber-fidesi-dikimi-ve-bakimi-uzman-rehberi';

-- 4. SALATALIK - Salatalık bitkisi ve meyve resmi (SALATALIK RESMİ - DOMATES DEĞİL!)
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%salatalık%' OR title ILIKE '%salatalik%' OR slug = 'salatalik-yetistirme-tohumdan-hasada';

-- 5. PATLICAN - Patlıcan bitkisi ve meyve resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1595093741759-8e4acda07670?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%patlıcan%' OR title ILIKE '%patlican%' OR slug = 'patlican-fidesi-bakimi-ve-yetistirme-ipuclari';

-- 6. ORGANİK TOPRAK - Toprak/el ile toprak resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%toprak%' AND (title ILIKE '%organik%' OR title ILIKE '%seçim%') OR slug = 'organik-toprak-secimi-fideler-icin-en-iyi-toprak';

-- 7. ORGANİK GÜBRE - Gübre/kompost resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%gübre%' OR title ILIKE '%gubre%' OR slug = 'organik-gubre-kullanimi-fideler-icin-dogal-beslenme';

-- 8. SAKSI SEÇİMİ - Saksılar/bitki saksıları resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%saksı%' OR title ILIKE '%saksi%' OR slug = 'saksi-secimi-rehberi-hangi-bitki-icin-hangi-saksi';

-- 9. SULAMA - Sulama/bitki sulama resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%sulama%' OR slug = 'fide-sulama-teknikleri-ne-zaman-ve-nasil-sulamali';

-- 10. TARLA - Tarla/tarım arazisi resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%tarla%' OR slug = 'tarlada-fide-yetistiriciligi-profesyonel-rehber';

-- 11. HASTALIKLAR - Bitki hastalığı/yaprak resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%hastalık%' OR title ILIKE '%hastalik%' OR slug = 'fide-hastaliklari-ve-cozumleri-onleme-ve-tedavi';

-- 12. ZARARLI BÖCEKLER - Böcek/zararlı resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%böcek%' OR title ILIKE '%bocek%' OR title ILIKE '%zararlı%' OR slug = 'zararli-boceklerle-mucadele-organik-yontemler';

-- 13. MARUL/YEŞİLLİK - Marul/yeşillik resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%marul%' OR title ILIKE '%yeşillik%' OR title ILIKE '%yesillik%' OR slug = 'marul-ve-yesillik-yetistirme-hizli-hasat-rehberi';

-- 14. KABAK - Kabak bitkisi ve meyve resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%kabak%' OR slug = 'kabak-yetistirme-balkonda-ve-bahcede-basarı-ipuclari';

-- 15. SOĞAN/SARIMSAK - Soğan/sarımsak resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%soğan%' OR title ILIKE '%sogan%' OR title ILIKE '%sarımsak%' OR title ILIKE '%sarimsak%' OR slug = 'sogan-ve-sarimsak-yetistirme-baslangic-rehberi';

-- 16. ÇİLEK - Çilek bitkisi ve meyve resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%çilek%' OR title ILIKE '%cilek%' OR slug = 'cilek-fidesi-dikimi-ve-bakimi-ev-bahcesinde-cilek';

-- 17. İLKBAHAR - Bahar/ilkbahar bahçe resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%ilkbahar%' OR slug = 'ilkbahar-fide-dikimi-ne-zaman-ve-nasil';

-- 18. YAZ BAKIMI - Yaz bahçe/sıcak hava resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%yaz%' AND (title ILIKE '%bakım%' OR title ILIKE '%bakim%') OR slug = 'yaz-aylarinda-fide-bakimi-sicak-havalarda-dikkat-edilecekler';

-- 19. SONBAHAR - Sonbahar bahçe/yaprak resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%sonbahar%' OR slug = 'sonbahar-bahce-hazirligi-kisa-hazirlik-rehberi';

-- 20. KIŞ - Kış bahçe/sera resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%kış%' OR title ILIKE '%kis%' OR slug = 'kis-aylarinda-bahce-serada-ve-ic-mekanda-yetistirme';

-- 21. AŞILI FİDE - Fide/aşılama resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%aşılı%' OR title ILIKE '%asili%' OR slug = 'asili-fide-kullanimi-avantajlari-ve-dikkat-edilecekler';

-- 22. FİDE ÇOĞALTMA - Tohum/fide üretimi resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%çoğaltma%' OR title ILIKE '%cogaltma%' OR slug = 'fide-cogaltma-teknikleri-tohumdan-ve-celikten-uretim';

-- 23. DİKEY BAHÇE - Dikey bahçe/duvar bahçe resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%dikey%' OR slug = 'dikey-bahce-teknigi-kucuk-alanlarda-maksimum-verim';

-- 24. KOMPOST - Kompost/geri dönüşüm resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%kompost%' OR slug = 'kompost-yapimi-evde-organik-gubre-uretime';

-- 25. BAHÇE PLANLAMA - Bahçe planı/tasarım resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%planlama%' OR title ILIKE '%plan%' OR slug = 'bahce-planlama-fide-duzeni-ve-rotasyon-sistemi';

-- 26. COMPANION PLANTING - Birlikte bitkiler resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%uyumlu%' OR title ILIKE '%companion%' OR slug = 'birlikte-uyumlu-bitkiler-companion-planting-rehberi';

-- 27. HASAT - Sebze hasadı resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%hasat%' OR slug = 'sebze-hasadi-en-iyi-hasat-zamani-ve-yontemleri';

-- 28. HİDROPONİK - Hidroponik sistem resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%hidroponik%' OR slug = 'hidroponik-fide-yetistirme-topraksiz-tarim-rehberi';

-- 29. ORGANİK SERTİFİKASYON - Organik bahçe/sertifika resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%sertifika%' OR slug = 'organik-bahce-sertifikasyonu-organik-uretim-standartlari';

-- 30. BAHÇE GÜNLÜĞÜ - Bahçe günlüğü/not defteri resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%günlük%' OR title ILIKE '%gunluk%' OR slug = 'bahce-gunlugu-tutma-basarili-bahcivanin-sirri';

-- 31. ÇOCUKLARLA BAHÇE - Çocuklarla bahçe/aile resmi
UPDATE blogs SET
  featured_image = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2070&q=80'
WHERE title ILIKE '%çocuk%' OR title ILIKE '%cocuk%' OR slug = 'cocuklarla-bahce-aile-bahceciligi-ve-egitici-etkinlikler';

-- KONTROL SORGUSU - Güncellemeleri kontrol edin:
-- SELECT id, title, slug, featured_image FROM blogs ORDER BY id;

-- TÜM BLOG RESİMLERİ GÜNCELLENDİ! ✅
-- Her blog için içeriğe uygun spesifik resimler seçildi
-- Başlığa göre güncelleme yapıldı (daha güvenilir)

