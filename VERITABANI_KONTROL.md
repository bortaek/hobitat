# Blog Resimlerini Kontrol Etme Rehberi

## 1. Veritabanında Resimlerin Güncellenip Güncellenmediğini Kontrol Edin

Supabase Dashboard > SQL Editor'e gidin ve şu sorguyu çalıştırın:

```sql
SELECT 
  id,
  title,
  slug,
  featured_image,
  updated_at
FROM blogs
ORDER BY id;
```

Bu sorgu tüm blogların mevcut resim URL'lerini gösterecek.

## 2. SQL Dosyasını Çalıştırın

Eğer resimler güncellenmemişse:

1. `BLOG_IMAGES_UPDATE.sql` dosyasını açın
2. Tüm içeriği kopyalayın
3. Supabase Dashboard > SQL Editor'e gidin
4. Yapıştırın ve "Run" butonuna tıklayın
5. Başarılı mesajını kontrol edin

## 3. Tarayıcı Console'unu Kontrol Edin

Sayfayı yeniledikten sonra:

1. Tarayıcıda F12'ye basın (Developer Tools)
2. Console sekmesine gidin
3. "Blog resmi:" veya "Featured blog resmi:" ile başlayan logları kontrol edin
4. Bu loglar veritabanından çekilen resim URL'lerini gösterecek

## 4. Admin Panelinden Kontrol Edin

1. `/admin` sayfasına gidin
2. "Bloglar" sekmesine tıklayın
3. Her blogun yanındaki küçük resim önizlemesini kontrol edin
4. Bir blogu düzenleyip "Kapak Resmi URL" alanındaki URL'yi kontrol edin

## 5. Hard Refresh Yapın

Tarayıcı cache'ini temizlemek için:

- **Windows/Linux**: `Ctrl + Shift + R` veya `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

## 6. Eğer Hala Sorun Varsa

Console'da görünen resim URL'lerini kontrol edin. Eğer eski URL'ler görünüyorsa:

1. Veritabanında resimler güncellenmemiş olabilir
2. SQL dosyasını tekrar çalıştırın
3. Slug'ların eşleştiğinden emin olun (SQL'deki slug'lar veritabanındaki slug'larla aynı olmalı)

