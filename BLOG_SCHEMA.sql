-- ============================================
-- BLOG SİSTEMİ TABLOSU
-- ============================================
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor'de çalıştırın

-- 1. Blogs Tablosunu Oluştur
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author VARCHAR(100),
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  keywords TEXT[], -- Anahtar kelimeler array olarak saklanıyor
  category VARCHAR(100),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Index'ler (Arama performansı için)
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(is_published);
CREATE INDEX IF NOT EXISTS idx_blogs_keywords ON blogs USING GIN(keywords);

-- 3. Örnek Blog Yazıları (Opsiyonel)
INSERT INTO blogs (title, slug, excerpt, content, featured_image, author, published_at, is_published, keywords, category) VALUES
(
  'Balkon Bahçeciliği Başlangıç Rehberi',
  'balkon-bahceciligi-baslangic-rehberi',
  'Balkonunuzu yeşil bir cennete dönüştürmenin püf noktalarını öğrenin. Domates, biber, maydanoz gibi sebzeleri balkonunuzda nasıl yetiştirebileceğinizi keşfedin.',
  '<h2>Balkon Bahçeciliğine Başlarken</h2><p>Balkon bahçeciliği, şehirde yaşayanlar için harika bir hobi ve kendi yiyeceğinizi yetiştirmenin en pratik yoludur. Bu rehberde balkon bahçeciliğine başlamak için ihtiyacınız olan her şeyi bulacaksınız.</p><h3>Gerekli Malzemeler</h3><ul><li>Kaliteli toprak</li><li>Saksılar (drenaj delikli)</li><li>Fideler</li><li>Gübre</li></ul>',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070',
  'Hobitat Ekibi',
  NOW(),
  true,
  ARRAY['balkon bahçeciliği', 'sebze yetiştirme', 'şehir bahçesi', 'domates', 'biber'],
  'Rehber'
),
(
  'Fidelerinizi Kışa Nasıl Hazırlamalısınız?',
  'fideleri-kisa-hazirlama',
  'Kış aylarında fidelerinizi korumak ve bahara kadar sağlıklı tutmak için bilmeniz gerekenler.',
  '<h2>Kış Hazırlığı</h2><p>Fidelerinizi kışın soğuk havalardan korumak çok önemlidir. Doğru önlemlerle fidelerinizi bahara kadar sağlıklı tutabilirsiniz.</p>',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070',
  'Hobitat Ekibi',
  NOW(),
  true,
  ARRAY['kış bakımı', 'fide koruma', 'bahçe bakımı', 'bitki bakımı'],
  'Bakım'
)
ON CONFLICT (slug) DO NOTHING;

-- 4. Tablonun oluşturulduğunu kontrol etmek için:
-- SELECT * FROM blogs;




