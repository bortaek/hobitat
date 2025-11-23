-- ============================================
-- SITE AYARLARI TABLOSU OLUŞTURMA
-- ============================================
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor'de çalıştırın

-- 1. Tabloyu Oluştur
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Varsayılan Verileri Ekle
INSERT INTO site_settings (key, value) VALUES
('hero_section', '{"background_image":"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070","badge_text":"🌱 Sezonun En Taze Fideleri","title":"Evinde Kendi","title_highlight":"Hasadını Yarat","button_text":"Fideleri Keşfet","button_link":"/magaza"}'),
('value_props', '{"items":[{"icon":"ShieldCheck","icon_color":"orange","title":"Aşılanmış Güçlü Kökler","description":"Klasik fidelere göre 3 kat daha verimli ve hastalıklara dirençli özel üretim."},{"icon":"Truck","icon_color":"green","title":"Hasarsız Kargo Garantisi","description":"Özel koruyucu ambalajlarımızla fideniz kırılmadan, kurumadan kapınıza gelir."},{"icon":"Sun","icon_color":"blue","title":"7/24 Ziraat Desteği","description":"Bitkiniz büyürken aklınıza takılan her soruda uzmanlarımız yanınızda."}]}'),
('footer', '{"brand_description":"Doğayı evinize getiriyoruz. Sertifikalı, aşılanmış ve garantili fidelerle kendi bahçenizi kurun.","social_media":{"instagram":"#","facebook":"#","twitter":"#"},"contact":{"address":"Hobitat Sera Tesisleri\nKemalpaşa Mah. 123. Sk.\nİzmir, Türkiye","phone":"+90 (555) 123 45 67","email":"destek@hobitat.com"},"copyright":"© 2025 Hobitat Bitki Dünyası. Tüm hakları saklıdır."}'),
('contact_page', '{"title":"Bize Ulaşın","address":{"title":"Adresimiz","value":"Kemalpaşa Mah. 123. Sokak No:45\nİzmir, Türkiye"},"phone":{"title":"Telefon","value":"+90 (555) 123 45 67","subtitle":"Hafta içi 09:00 - 18:00"},"email":{"title":"E-posta","value":"destek@hobitat.com","subtitle":"24 saat içinde dönüş yapılır."},"map_url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200065.39526623755!2d27.1475!3d38.4192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8fe!2zxLB6bWly!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"}'),
('about_page', '{"title":"Hikayemiz","image":"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070","content":[{"paragraph":"Hobitat, 2024 yılında doğaya özlem duyan şehir insanlarını toprakla buluşturmak amacıyla İzmir''de kuruldu.","bold_text":"Hobitat,"},{"paragraph":"Beton binaların arasında sıkışıp kaldığımız bu çağda, bir saksı domatesin büyümesini izlemenin veya kendi yetiştirdiğin fesleğeni salatana koymanın verdiği hazzı herkese yaşatmak istiyoruz."}],"mission":{"title":"Misyonumuz","text":"Sadece fide satmak değil; balkonları, terasları ve salonları yaşayan birer ekosisteme dönüştürmek. Aşılanmış, hastalıklara dirençli ve yüksek verimli fidelerimizle, tarım bilgisi olmayan birinin bile başarıyla ürün almasını sağlıyoruz."},"features":[{"icon":"🌱","title":"Doğal Üretim"},{"icon":"🚚","title":"Güvenli Kargo"},{"icon":"💚","title":"%100 Müşteri Mutluluğu"}]}')
ON CONFLICT (key) DO NOTHING;

-- 3. Tablonun oluşturulduğunu kontrol etmek için:
-- SELECT * FROM site_settings;
