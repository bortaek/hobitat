# Canlı Ortam Deployment Rehberi

## Giriş Problemi Çözümü

Canlı sitede giriş problemi yaşıyorsanız, aşağıdaki adımları kontrol edin:

### 1. Environment Variables (Çok Önemli!)

Canlı ortamda (Vercel, Netlify vb.) aşağıdaki environment variables'ların tanımlı olduğundan emin olun:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rflpqejsnhzgyjrjyikt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Kontrol:**
- Deployment platform'unuzda (Vercel/Netlify) Settings > Environment Variables bölümüne gidin
- Her iki değişkenin de Production, Preview ve Development için tanımlı olduğundan emin olun

### 2. Middleware Dosyası

`middleware.ts` dosyasının projenin root dizininde olduğundan emin olun. Bu dosya session cookie'lerini yönetir.

### 3. Supabase Auth Ayarları

Supabase Dashboard'da şu ayarları kontrol edin:

1. **Authentication > URL Configuration**
   - Site URL: Canlı sitenizin URL'i (örn: `https://hobitat.vercel.app`)
   - Redirect URLs: 
     - `https://hobitat.vercel.app/**`
     - `https://hobitat.vercel.app/hesabim`
     - `https://hobitat.vercel.app/giris`

2. **Authentication > Cookie Settings**
   - Cookie name: `sb-access-token` (varsayılan)
   - Secure: `true` (HTTPS için)
   - SameSite: `lax` veya `none` (cross-site için)

### 4. Build ve Deploy Sonrası

Deploy sonrası:
1. Tarayıcı cache'ini temizleyin (Ctrl+Shift+R veya Cmd+Shift+R)
2. Gizli pencerede test edin
3. Browser console'da hataları kontrol edin

### 5. Hata Ayıklama

Eğer hala çalışmıyorsa:

1. **Browser Console'u açın** (F12)
   - Network sekmesinde cookie'lerin set edildiğini kontrol edin
   - Console sekmesinde hata mesajlarını kontrol edin

2. **Supabase Logs'u kontrol edin**
   - Supabase Dashboard > Logs > Auth Logs
   - Giriş denemelerini kontrol edin

3. **Middleware log'ları**
   - Canlı ortamda middleware'in çalışıp çalışmadığını kontrol edin

### 6. Yaygın Sorunlar ve Çözümleri

**Sorun: "Invalid API key"**
- Çözüm: Environment variables'ların doğru tanımlandığından emin olun

**Sorun: "Session not found"**
- Çözüm: Middleware'in çalıştığından ve cookie'lerin set edildiğinden emin olun

**Sorun: "Redirect URL mismatch"**
- Çözüm: Supabase Dashboard'da Redirect URLs'e canlı site URL'ini ekleyin

**Sorun: Cookie'ler set edilmiyor**
- Çözüm: 
  - HTTPS kullandığınızdan emin olun
  - Cookie ayarlarını kontrol edin (Secure, SameSite)
  - Domain ayarlarını kontrol edin

### 7. Test Etme

Giriş akışını test edin:
1. `/giris` sayfasına gidin
2. Giriş yapın
3. `/hesabim` sayfasına yönlendirilmelisiniz
4. Sayfayı yenilediğinizde hala giriş yapmış olmalısınız

### 8. Vercel Deployment

Vercel kullanıyorsanız:

1. **Environment Variables ekleyin:**
   ```
   Settings > Environment Variables
   NEXT_PUBLIC_SUPABASE_URL = https://rflpqejsnhzgyjrjyikt.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_key_here
   ```

2. **Redeploy yapın:**
   - Deployments > ... > Redeploy

### 9. Netlify Deployment

Netlify kullanıyorsanız:

1. **Environment Variables ekleyin:**
   ```
   Site settings > Environment variables
   ```

2. **Build settings:**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

### Notlar

- Environment variables değiştirildikten sonra mutlaka redeploy yapın
- Production build'i local'de test etmek için: `npm run build && npm start`
- Cookie'ler sadece HTTPS üzerinde çalışır (production'da)

