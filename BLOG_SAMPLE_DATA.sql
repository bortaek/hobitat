-- ============================================
-- 30 ADET ÖRNEK BLOG YAZISI
-- Fide Yetiştiriciliği, Evde Bahçe, Tarla Konuları
-- ============================================
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor'de çalıştırın
-- Önce BLOG_SCHEMA.sql dosyasını çalıştırmış olmanız gerekiyor

INSERT INTO blogs (title, slug, excerpt, content, featured_image, author, published_at, is_published, keywords, category) VALUES

-- EVDE BAHÇECİLİK KONULU BLOG YAZILARI
(
  'Evde Balkon Bahçeciliği: Başlangıç Rehberi',
  'evde-balkon-bahceciligi-baslangic-rehberi',
  'Balkonunuzu küçük bir bahçeye dönüştürün! Evde balkon bahçeciliği yapmanın püf noktalarını öğrenin. Domates, biber, maydanoz ve daha fazlası için pratik ipuçları.',
  '<h2>Balkon Bahçeciliğine Başlarken</h2><p>Balkon bahçeciliği, şehir hayatında doğaya dokunmanın en pratik yoludur. Sadece birkaç saksı ve doğru fidelerle başlayabilirsiniz.</p><h3>Gerekli Malzemeler</h3><ul><li>Kaliteli organik toprak</li><li>Drenaj delikli saksılar</li><li>Organik gübre</li><li>Doğru fide seçimi</li></ul><h3>Başlangıç İpuçları</h3><p>Güneş alan bir balkon seçin ve günde en az 6 saat güneş ışığı alan alanları tercih edin. Fidelerinizi düzenli sulayın ama aşırıya kaçmayın.</p>',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '5 days',
  true,
  ARRAY['balkon bahçesi', 'evde bahçe', 'domates yetiştirme', 'biber yetiştirme', 'saksıda sebze', 'şehir bahçeciliği', 'evde fide bakımı'],
  'Rehber'
),

(
  'Domates Fidesi Yetiştirme: 10 Adımda Başarı',
  'domates-fidesi-yetistirme-10-adimda-basarı',
  'Domates fidesi nasıl yetiştirilir? Balkonda, bahçede veya tarlada domates yetiştirmenin tüm sırlarını öğrenin. Verimli bir hasat için profesyonel ipuçları.',
  '<h2>Domates Yetiştirme Rehberi</h2><p>Domates, ev bahçeciliğinde en popüler sebzelerden biridir. Doğru tekniklerle her sezon bol miktarda domates hasat edebilirsiniz.</p><h3>1. Doğru Fide Seçimi</h3><p>Sağlıklı, yaprakları canlı ve kök sistemi güçlü fideler seçin. Aşılı fideler daha dayanıklıdır.</p><h3>2. Toprak Hazırlığı</h3><p>Organik toprak karışımı kullanın. pH seviyesi 6.0-6.8 arası olmalıdır.</p><h3>3. Dikim</h3><p>Fideleri saksıya veya toprağa derin bir şekilde dikin. Kök çevresinde hava boşluğu bırakmayın.</p><h3>4. Sulama</h3><p>Düzenli ama aşırı olmayan sulama yapın. Sabah erken saatlerde su verin.</p><h3>5. Gübreleme</h3><p>Organik gübre kullanın. Çiçeklenme döneminde potasyum açısından zengin gübre tercih edin.</p>',
  'https://images.unsplash.com/photo-1546094097-3c5cc5cc54d7?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '4 days',
  true,
  ARRAY['domates fidesi', 'domates yetiştirme', 'fide bakımı', 'organik domates', 'domates hasadı', 'bahçe domatesi', 'saksıda domates'],
  'Rehber'
),

(
  'Biber Fidesi Dikimi ve Bakımı: Uzman Rehberi',
  'biber-fidesi-dikimi-ve-bakimi-uzman-rehberi',
  'Biber fidesi nasıl dikilir? Biber yetiştirirken dikkat edilmesi gerekenler nelerdir? Sivri biber, dolmalık biber ve diğer çeşitler için detaylı rehber.',
  '<h2>Biber Yetiştirme Teknikleri</h2><p>Biber, vitamin açısından zengin ve yetiştirmesi kolay bir sebzedir. Hem sivri hem de dolmalık biber çeşitleri için aynı prensipler geçerlidir.</p><h3>İklim ve Toprak</h3><p>Biber sıcak iklim bitkisidir. Günde en az 6-8 saat güneş ışığı ister. Toprak sıcaklığı 15°C''nin üzerinde olmalıdır.</p><h3>Dikim Aralıkları</h3><p>Fideler arasında 40-50 cm mesafe bırakın. Her saksıya tek fide dikin.</p><h3>Su İhtiyacı</h3><p>Düzenli sulama çok önemlidir. Toprak nemli tutulmalı ama ıslak olmamalıdır.</p><h3>Hasat Zamanı</h3><p>Biberler tam olgunlaşmadan hasat edilebilir. Düzenli hasat, yeni meyve oluşumunu teşvik eder.</p>',
  'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '3 days',
  true,
  ARRAY['biber fidesi', 'biber yetiştirme', 'sivri biber', 'dolmalık biber', 'biber bakımı', 'fide dikimi', 'bahçe biberi'],
  'Rehber'
),

(
  'Salatalık Yetiştirme: Tohumdan Hasada',
  'salatalik-yetistirme-tohumdan-hasada',
  'Salatalık nasıl yetiştirilir? Balkonda ve bahçede salatalık yetiştirmenin tüm incelikleri. Su ihtiyacı, gübreleme ve hasat zamanı hakkında bilgiler.',
  '<h2>Salatalık Yetiştirme Rehberi</h2><p>Salatalık, yaz aylarının vazgeçilmez sebzelerinden biridir. Sıcak havaları seven bu bitki, doğru bakımla bol verim verir.</p><h3>Ekim ve Dikim</h3><p>Salatalık fidelerini toprak sıcaklığı 18°C''ye ulaştığında dikin. Soğuk toprakta kök gelişimi yavaşlar.</p><h3>Destek Sistemi</h3><p>Salatalık sarmaşık bir bitkidir. Dikey büyümesi için destek çubukları veya file kullanın.</p><h3>Su Yönetimi</h3><p>Salatalık su sever. Özellikle meyve tutumundan sonra düzenli ve yeterli sulama şarttır.</p><h3>Hastalık Kontrolü</h3><p>Yapraklarda sararma görürseniz mantar hastalıklarına karşı önlem alın. İyi havalandırma sağlayın.</p>',
  'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '2 days',
  true,
  ARRAY['salatalık yetiştirme', 'salatalık fidesi', 'saksıda salatalık', 'bahçe salatalığı', 'organik salatalık', 'fide bakımı'],
  'Rehber'
),

(
  'Patlıcan Fidesi Bakımı ve Yetiştirme İpuçları',
  'patlican-fidesi-bakimi-ve-yetistirme-ipuclari',
  'Patlıcan fidesi nasıl yetiştirilir? Patlıcan yetiştirme sürecinde dikkat edilmesi gereken noktalar ve profesyonel bakım teknikleri.',
  '<h2>Patlıcan Yetiştirme Kılavuzu</h2><p>Patlıcan, Akdeniz mutfağının vazgeçilmez sebzelerinden biridir. Sıcak iklim koşullarında mükemmel yetişir.</p><h3>Toprak ve İklim</h3><p>Patlıcan sıcak ve güneşli iklimleri sever. Günde 8-10 saat güneş ışığı alan yerler idealdir.</p><h3>Fide Dikimi</h3><p>Fideler arası 60-70 cm mesafe bırakın. Her saksıda bir fide yeterlidir.</p><h3>Gübreleme</h3><p>Azotlu gübreleri dengeli kullanın. Çiçeklenme döneminde potasyum desteği sağlayın.</p><h3>Hasat</h3><p>Meyveler tam olgunlaşmadan, parlak ve sertken hasat edin. Düzenli hasat verimi artırır.</p>',
  'https://images.unsplash.com/photo-1595093741759-8e4acda07670?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '1 day',
  true,
  ARRAY['patlıcan fidesi', 'patlıcan yetiştirme', 'bahçe patlıcanı', 'fide bakımı', 'organik patlıcan', 'fide dikimi'],
  'Rehber'
),

-- TOPRAK VE GÜBRE KONULU YAZILAR
(
  'Organik Toprak Seçimi: Fideler İçin En İyi Toprak',
  'organik-toprak-secimi-fideler-icin-en-iyi-toprak',
  'Fide yetiştiriciliğinde doğru toprak seçimi nasıl yapılır? Organik toprak çeşitleri, toprak karışımları ve pH dengesi hakkında detaylı bilgiler.',
  '<h2>Doğru Toprak Seçimi</h2><p>Toprak, fide yetiştiriciliğinin temelidir. Doğru toprak seçimi, sağlıklı bitki gelişiminin ilk adımıdır.</p><h3>Toprak Türleri</h3><ul><li>Torflu toprak: Havalanma ve drenaj için ideal</li><li>Humuslu toprak: Besin açısından zengin</li><li>Perlitli karışım: Su tutma kapasitesi yüksek</li></ul><h3>pH Seviyesi</h3><p>Çoğu sebze için 6.0-7.0 pH aralığı idealdir. Test kitleri ile toprak pH''ınızı ölçebilirsiniz.</p><h3>Drenaj</h3><p>Toprak iyi drenaj sağlamalıdır. Kök çürümesini önlemek için saksı altında drenaj delikleri olmalıdır.</p>',
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2070',
  'Hobitat Ekibi',
  NOW(),
  true,
  ARRAY['organik toprak', 'toprak seçimi', 'fide toprağı', 'bahçe toprağı', 'toprak karışımı', 'pH dengesi', 'torflu toprak'],
  'Bakım'
),

(
  'Organik Gübre Kullanımı: Fideler İçin Doğal Beslenme',
  'organik-gubre-kullanimi-fideler-icin-dogal-beslenme',
  'Organik gübre nasıl kullanılır? Fide yetiştiriciliğinde organik gübre çeşitleri, uygulama yöntemleri ve zamanlaması hakkında rehber.',
  '<h2>Organik Gübre Rehberi</h2><p>Organik gübreler, bitkilerin sağlıklı büyümesi için gerekli tüm besin maddelerini doğal yollarla sağlar.</p><h3>Gübre Çeşitleri</h3><ul><li>Kompost: Evsel atıklardan elde edilen zengin gübre</li><li>Solucan gübresi: Yüksek besin değeri</li><li>Hayvan gübresi: Azot açısından zengin</li></ul><h3>Uygulama Zamanı</h3><p>İlk gübreleme dikim öncesi toprağa karıştırılır. Sonrasında 2-3 haftada bir tekrarlanır.</p><h3>Doz Ayarı</h3><p>Aşırı gübreleme kök yanmasına neden olur. Üretici talimatlarına uyun ve doz aşımı yapmayın.</p>',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '10 days',
  true,
  ARRAY['organik gübre', 'gübre kullanımı', 'fide gübresi', 'kompost gübre', 'solucan gübresi', 'bahçe gübresi', 'doğal gübre'],
  'Bakım'
),

(
  'Saksı Seçimi Rehberi: Hangi Bitki İçin Hangi Saksı?',
  'saksi-secimi-rehberi-hangi-bitki-icin-hangi-saksi',
  'Doğru saksı seçimi fide yetiştiriciliğinde kritik önem taşır. Büyüklük, malzeme ve drenaj açısından saksı seçimi rehberi.',
  '<h2>Saksı Seçimi Kılavuzu</h2><p>Her bitki farklı saksı ihtiyacı duyar. Doğru saksı seçimi, kök gelişimini ve bitki sağlığını doğrudan etkiler.</p><h3>Saksı Büyüklüğü</h3><ul><li>Domates için: Minimum 30 litre</li><li>Biber için: 15-20 litre</li><li>Yeşillikler için: 5-10 litre</li></ul><h3>Malzeme Seçimi</h3><p>Seramik saksılar hava alır ama ağır olur. Plastik saksılar hafiftir ve kolay taşınır. Ahşap saksılar doğal görünür ama çürüyebilir.</p><h3>Drenaj</h3><p>Alt delikler mutlaka olmalıdır. Fazla suyun tahliyesi kök sağlığı için kritiktir.</p>',
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '9 days',
  true,
  ARRAY['saksı seçimi', 'saksı boyutu', 'fide saksısı', 'bahçe saksısı', 'drenaj', 'saksı malzemesi', 'evde bahçe'],
  'Rehber'
),

-- SU VE SULAMA KONULU YAZILAR
(
  'Fide Sulama Teknikleri: Ne Zaman ve Nasıl Sulamalı?',
  'fide-sulama-teknikleri-ne-zaman-ve-nasil-sulamali',
  'Fide sulama rehberi: Doğru sulama zamanı, miktarı ve yöntemleri. Aşırı sulama ve susuzluk belirtileri ile pratik ipuçları.',
  '<h2>Doğru Sulama Teknikleri</h2><p>Sulama, fide yetiştiriciliğinde en kritik faktörlerden biridir. Yanlış sulama bitki ölümüne neden olabilir.</p><h3>Sulama Zamanı</h3><p>Sabah erken saatlerde veya akşamüstü sulama yapın. Öğle sıcağında sulama yapmaktan kaçının.</p><h3>Sulama Miktarı</h3><p>Toprak nemli tutulmalı ama ıslak olmamalıdır. Parmak testi yapın: Toprak 2 cm derinliğe kadar nemli ise yeterlidir.</p><h3>Yöntem</h3><p>Yapraklara değil, kök çevresine su verin. Damlama sulama sistemi en verimli yöntemdir.</p><h3>Belirtiler</h3><p>Yapraklarda solma: Susuzluk. Kök çürümesi: Aşırı sulama. Dengeli sulama için toprak durumunu sürekli kontrol edin.</p>',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '8 days',
  true,
  ARRAY['fide sulama', 'sulama teknikleri', 'bahçe sulama', 'su verme', 'fide bakımı', 'bitki sulama', 'drenaj'],
  'Bakım'
),

(
  'Tarlada Fide Yetiştiriciliği: Profesyonel Rehber',
  'tarlada-fide-yetistiriciligi-profesyonel-rehber',
  'Tarla koşullarında fide yetiştirme teknikleri. Toprak hazırlığı, ekim zamanı, sulama sistemleri ve hasat yönetimi hakkında detaylı bilgiler.',
  '<h2>Tarla Fide Yetiştiriciliği</h2><p>Tarla koşullarında fide yetiştiriciliği, büyük ölçekli üretim için idealdir. Doğru planlama ve tekniklerle yüksek verim elde edilir.</p><h3>Toprak Hazırlığı</h3><p>Tarla toprağını sonbaharda sürün ve organik gübre ekleyin. İlkbaharda tekrar işleyin ve fideler için hazırlayın.</p><h3>Ekim Planlaması</h3><p>Sıra arası ve sıra üzeri mesafeleri bitki türüne göre ayarlayın. Domates için 70x50 cm, biber için 60x40 cm uygundur.</p><h3>Sulama Sistemi</h3><p>Damlama sulama sistemi kurun. Bu sistem hem su tasarrufu sağlar hem de bitki sağlığını korur.</p><h3>Gübreleme Programı</h3><p>Toprak analizi yaptırın ve eksik besin maddelerine göre gübre programı oluşturun.</p>',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '7 days',
  true,
  ARRAY['tarla fide', 'tarla bahçe', 'profesyonel fide', 'tarla yetiştiricilik', 'büyük ölçek', 'tarım teknikleri', 'fide ekimi'],
  'Rehber'
),

-- HASTALIK VE ZARARLILAR
(
  'Fide Hastalıkları ve Çözümleri: Önleme ve Tedavi',
  'fide-hastaliklari-ve-cozumleri-onleme-ve-tedavi',
  'Fide hastalıkları nasıl önlenir? Yaprak sararması, kök çürümesi, mantar hastalıkları ve zararlı böcekler için organik çözümler.',
  '<h2>Hastalık Yönetimi</h2><p>Hastalıklar, fide yetiştiriciliğinde en büyük tehditlerden biridir. Önleme, tedaviden daha kolay ve etkilidir.</p><h3>Yaygın Hastalıklar</h3><ul><li>Mantar hastalıkları: İyi havalandırma ile önlenir</li><li>Kök çürümesi: Doğru sulama ile kontrol edilir</li><li>Yaprak lekeleri: Organik fungisitlerle tedavi edilir</li></ul><h3>Önleyici Tedbirler</h3><p>Sağlıklı fideler seçin, temiz toprak kullanın, bitkiler arası mesafeyi koruyun ve iyi havalandırma sağlayın.</p><h3>Organik Çözümler</h3><p>Karbonat çözeltisi, sarımsak suyu ve neem yağı gibi doğal yöntemler hastalıkları kontrol altında tutar.</p>',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '6 days',
  true,
  ARRAY['fide hastalığı', 'bitki hastalığı', 'organik ilaç', 'hastalık önleme', 'bahçe bakımı', 'fide sağlığı', 'mantar hastalığı'],
  'Bakım'
),

(
  'Zararlı Böceklerle Mücadele: Organik Yöntemler',
  'zararli-boceklerle-mucadele-organik-yontemler',
  'Bahçedeki zararlı böceklerden nasıl kurtulunur? Yaprak bitleri, örümcek akarı ve diğer zararlılar için doğal mücadele yöntemleri.',
  '<h2>Organik Zararlı Kontrolü</h2><p>Zararlı böcekler, fidelerin sağlığını tehdit eder. Organik yöntemlerle etkili mücadele mümkündür.</p><h3>Yaygın Zararlılar</h3><ul><li>Yaprak bitleri: Yapışkan yapraklara neden olur</li><li>Örümcek akarı: İnce ağlar oluşturur</li><li>Beyaz sinek: Yapraklarda sararmaya yol açar</li></ul><h3>Organik Çözümler</h3><p>Neem yağı spreyi, sabunlu su çözeltisi ve yararlı böcekler (ladybug) kullanarak zararlıları kontrol edin.</p><h3>Önleyici Tedbirler</h3><p>Bitkileri düzenli kontrol edin, hastalıklı yaprakları hemen temizleyin ve doğal predatörleri çekmek için çiçek dikin.</p>',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '15 days',
  true,
  ARRAY['zararlı böcek', 'organik mücadele', 'yaprak biti', 'bahçe zararlısı', 'doğal ilaç', 'fide koruma', 'bahçe bakımı'],
  'Bakım'
),

-- ÖZEL SEBZE ÇEŞİTLERİ
(
  'Marul ve Yeşillik Yetiştirme: Hızlı Hasat Rehberi',
  'marul-ve-yesillik-yetistirme-hizli-hasat-rehberi',
  'Marul, roka, maydanoz ve diğer yeşillikler nasıl yetiştirilir? Hızlı büyüyen yeşillikler için pratik ipuçları ve bakım yöntemleri.',
  '<h2>Yeşillik Yetiştirme Kılavuzu</h2><p>Yeşillikler, hızlı büyüyen ve kolay yetiştirilen bitkilerdir. Küçük alanlarda bile bol miktarda üretim yapılabilir.</p><h3>Marul Yetiştirme</h3><p>Marul, serin havaları sever. Direkt güneş yerine yarı gölge alanlar tercih edilmelidir. 4-6 hafta içinde hasat edilebilir.</p><h3>Roka ve Maydanoz</h3><p>Bu bitkiler daha az bakım gerektirir. Düzenli sulama yeterlidir. Hasat için yaprakları dıştan içe toplayın.</p><h3>Kış Yeşillikleri</h3><p>Ispanak, lahana ve pazı gibi bitkiler kış aylarında da yetiştirilebilir. Soğuğa dayanıklı çeşitler seçin.</p>',
  'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '14 days',
  true,
  ARRAY['marul yetiştirme', 'yeşillik', 'roka', 'maydanoz', 'bahçe yeşillik', 'hızlı hasat', 'evde yeşillik'],
  'Rehber'
),

(
  'Kabak Yetiştirme: Balkonda ve Bahçede Başarı İpuçları',
  'kabak-yetistirme-balkonda-ve-bahcede-basarı-ipuclari',
  'Kabak fidesi nasıl yetiştirilir? Balkon ve bahçe koşullarında kabak yetiştirmenin püf noktaları, sulama ve hasat rehberi.',
  '<h2>Kabak Yetiştirme Rehberi</h2><p>Kabak, yaz aylarının en verimli sebzelerinden biridir. Doğru bakımla bir bitkiden onlarca meyve alınabilir.</p><h3>Dikim ve Yerleşim</h3><p>Kabak fidelerini geniş saksılara veya bahçe toprağına dikin. Her fide için en az 50x50 cm alan gereklidir.</p><h3>Su İhtiyacı</h3><p>Kabak çok su sever. Özellikle meyve tutumundan sonra düzenli ve bol sulama şarttır. Yapraklar altına su vermeyin.</p><h3>Tozlaşma</h3><p>Meyve tutumu için arılar gereklidir. Çiçek açan bitkiler dikerek arıları bahçenize çekin.</p><h3>Hasat</h3><p>Kabakları küçükken hasat edin. 15-20 cm boyunda toplayın. Büyük meyveler yeni meyve oluşumunu engeller.</p>',
  'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '13 days',
  true,
  ARRAY['kabak yetiştirme', 'kabak fidesi', 'bahçe kabağı', 'saksıda kabak', 'fide bakımı', 'organik kabak'],
  'Rehber'
),

(
  'Soğan ve Sarımsak Yetiştirme: Başlangıç Rehberi',
  'sogan-ve-sarimsak-yetistirme-baslangic-rehberi',
  'Soğan ve sarımsak nasıl yetiştirilir? Soğan seti, sarımsak dişi ekimi ve bakımı hakkında detaylı bilgiler. Kış ayları için ideal sebzeler.',
  '<h2>Soğan ve Sarımsak Rehberi</h2><p>Soğan ve sarımsak, bahçenizin temel ürünleridir. Kolay yetiştirilir ve uzun süre saklanabilir.</p><h3>Soğan Seti Ekip</h3><p>Soğan setlerini ilkbahar veya sonbaharda toprağa dikin. 10-15 cm aralıklarla yerleştirin. Üst kısmı toprak üzerinde kalmalıdır.</p><h3>Sarımsak Dikimi</h3><p>Sarımsak dişlerini sonbaharda dikin. İlkbaharda yeşil yapraklar çıkar. Yapraklar sararınca hasat zamanı gelmiştir.</p><h3>Bakım</h3><p>Düzenli sulama yapın ama aşırıya kaçmayın. Yabani otları temizleyin. Gübreleme az miktarda yeterlidir.</p><h3>Hasat ve Saklama</h3><p>Yapraklar sararınca soğan ve sarımsakları sökün. Serin ve kuru bir yerde saklayın.</p>',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '12 days',
  true,
  ARRAY['soğan yetiştirme', 'sarımsak yetiştirme', 'bahçe soğanı', 'fide dikimi', 'kış sebzesi', 'bahçe bakımı'],
  'Rehber'
),

-- MEYVE FİDELERİ
(
  'Çilek Fidesi Dikimi ve Bakımı: Ev Bahçesinde Çilek',
  'cilek-fidesi-dikimi-ve-bakimi-ev-bahcesinde-cilek',
  'Çilek fidesi nasıl dikilir? Balkonda ve bahçede çilek yetiştirme rehberi. Sulama, gübreleme ve kış bakımı hakkında ipuçları.',
  '<h2>Çilek Yetiştirme Kılavuzu</h2><p>Çilek, meyve fideleri arasında en popüler olanlarından biridir. Küçük alanlarda bile yetiştirilebilir.</p><h3>Fide Dikimi</h3><p>Çilek fidelerini toprağa tam gömmeyin. Kök boğazı toprak üzerinde kalmalıdır. Fideler arası 30 cm mesafe bırakın.</p><h3>Toprak ve Güneş</h3><p>İyi drenajlı, humuslu toprak tercih edin. Günde 6-8 saat güneş ışığı alan yerler idealdir.</p><h3>Bakım</h3><p>Düzenli sulama yapın. Yabani otları temizleyin. Çiçek açtıktan sonra organik gübre verin.</p><h3>Kış Bakımı</h3><p>Kış aylarında bitkileri saman veya yaprakla örtün. İlkbaharda örtüyü kaldırın ve gübreleyin.</p>',
  'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '11 days',
  true,
  ARRAY['çilek fidesi', 'çilek yetiştirme', 'meyve fidesi', 'balkon çileği', 'bahçe çileği', 'fide bakımı', 'evde çilek'],
  'Rehber'
),

-- MEVSİMLİK REHBERLER
(
  'İlkbahar Fide Dikimi: Ne Zaman ve Nasıl?',
  'ilkbahar-fide-dikimi-ne-zaman-ve-nasil',
  'İlkbahar fide dikimi rehberi: Hangi fideler ne zaman dikilir? İlkbahar bahçe hazırlığı, toprak işleme ve fide seçimi hakkında bilgiler.',
  '<h2>İlkbahar Fide Dikimi</h2><p>İlkbahar, fide dikimi için en uygun mevsimdir. Doğru zamanlama ve hazırlık ile başarılı bir sezon geçirirsiniz.</p><h3>Zamanlama</h3><p>Son don tarihinden sonra fide dikmeye başlayın. Türkiye''de genellikle nisan ayı uygundur.</p><h3>Hazırlık</h3><p>Toprağı sonbaharda işleyin. İlkbaharda gübre ekleyin ve fideler için hazırlayın. Sıcaklığı kontrol edin.</p><h3>Fide Seçimi</h3><p>Sağlıklı, kök sistemi gelişmiş fideler seçin. Aşılı fideler daha dayanıklı olur.</p><h3>İlk Bakım</h3><p>Dikimden sonra bolca su verin. İlk hafta düzenli sulama yapın. Gübreleme 2-3 hafta sonra başlayın.</p>',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '20 days',
  true,
  ARRAY['ilkbahar fide', 'fide dikimi', 'bahçe hazırlığı', 'fide seçimi', 'bahar ekimi', 'fide bakımı', 'bahçe planlama'],
  'Rehber'
),

(
  'Yaz Aylarında Fide Bakımı: Sıcak Havalarda Dikkat Edilecekler',
  'yaz-aylarinda-fide-bakimi-sicak-havalarda-dikkat-edilecekler',
  'Yaz sıcaklarında fide bakımı nasıl yapılır? Su ihtiyacı, güneş koruması ve sıcaklık yönetimi hakkında pratik ipuçları.',
  '<h2>Yaz Fide Bakımı</h2><p>Yaz ayları, fideler için hem büyüme hem de zorluk dönemidir. Doğru bakımla yazı sorunsuz geçirirsiniz.</p><h3>Su Yönetimi</h3><p>Yazın su ihtiyacı artar. Sabah erken veya akşamüstü sulama yapın. Öğle sıcağında sulamayın. Toprak nemli tutulmalıdır.</p><h3>Gölgeleme</h3><p>Aşırı güneşten bitkileri koruyun. Gölgelik kullanın veya yüksek bitkiler dikin. Yapraklarda yanma görürseniz önlem alın.</p><h3>Malçlama</h3><p>Toprak yüzeyine malç serin. Bu hem su kaybını önler hem de toprak sıcaklığını düşürür.</p><h3>Hastalık Kontrolü</h3><p>Yaz aylarında mantar hastalıkları artar. İyi havalandırma sağlayın ve önleyici tedbirler alın.</p>',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '19 days',
  true,
  ARRAY['yaz bakımı', 'fide bakımı', 'sıcak hava', 'su yönetimi', 'bahçe bakımı', 'yaz bahçesi', 'fide koruma'],
  'Bakım'
),

(
  'Sonbahar Bahçe Hazırlığı: Kışa Hazırlık Rehberi',
  'sonbahar-bahce-hazirligi-kisa-hazirlik-rehberi',
  'Sonbahar bahçe bakımı nasıl yapılır? Fideleri kışa hazırlama, toprak işleme ve gelecek sezon için planlama hakkında rehber.',
  '<h2>Sonbahar Bahçe Hazırlığı</h2><p>Sonbahar, bahçenizi kışa hazırlama ve gelecek sezon için planlama zamanıdır. Doğru hazırlık ile bahara iyi başlarsınız.</p><h3>Son Hasatlar</h3><p>Kışa dayanıklı olmayan bitkileri hasat edin. Olgun meyve ve sebzeleri toplayın.</p><h3>Toprak İşleme</h3><p>Toprağı sürün ve organik gübre ekleyin. Kış boyunca toprak dinlenecek ve besin değerini artıracaktır.</p><h3>Kış Bitkileri</h3><p>Ispanak, lahana, pazı gibi kışa dayanıklı bitkiler ekin. Bu bitkiler kış aylarında da yetişir.</p><h3>Alet Temizliği</h3><p>Bahçe aletlerini temizleyin ve saklayın. Saksıları yıkayın ve gelecek sezon için hazırlayın.</p>',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '18 days',
  true,
  ARRAY['sonbahar bahçe', 'kış hazırlığı', 'bahçe bakımı', 'toprak işleme', 'kış bitkileri', 'bahçe planlama'],
  'Rehber'
),

(
  'Kış Aylarında Bahçe: Serada ve İç Mekanda Yetiştirme',
  'kis-aylarinda-bahce-serada-ve-ic-mekanda-yetistirme',
  'Kış aylarında fide yetiştirme rehberi. Serada, balkonda ve iç mekanda kış bahçeciliği yapmanın yolları ve ipuçları.',
  '<h2>Kış Bahçeciliği</h2><p>Kış aylarında da bahçecilik yapılabilir. Doğru yöntemlerle kış boyunca taze sebze üretebilirsiniz.</p><h3>Sera Kullanımı</h3><p>Küçük sera veya cam kutu kullanarak bitkilerinizi soğuktan koruyun. Sera içi sıcaklığı düzenleyin.</p><h3>İç Mekan Yetiştirme</h3><p>Yeşillikler ve bazı sebzeler iç mekanda yetiştirilebilir. Yeterli ışık ve sıcaklık sağlayın.</p><h3>Kış Bitkileri</h3><p>Ispanak, roka, lahana gibi soğuğa dayanıklı bitkiler seçin. Bu bitkiler kış aylarında da büyür.</p><h3>Koruma</h3><p>Don tehlikesi olan gecelerde bitkilerinizi örtün. Saman, yaprak veya örtü kullanın.</p>',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '17 days',
  true,
  ARRAY['kış bahçesi', 'sera yetiştirme', 'iç mekan bahçe', 'kış bitkileri', 'bahçe koruma', 'don koruması'],
  'Rehber'
),

-- ÖZEL TEKNİKLER
(
  'Aşılı Fide Kullanımı: Avantajları ve Dikkat Edilecekler',
  'asili-fide-kullanimi-avantajlari-ve-dikkat-edilecekler',
  'Aşılı fidenin avantajları nelerdir? Daha dayanıklı ve verimli üretim için aşılı fide kullanımı hakkında bilgiler.',
  '<h2>Aşılı Fide Rehberi</h2><p>Aşılı fideler, özel tekniklerle geliştirilmiş, daha dayanıklı ve verimli bitkilerdir.</p><h3>Avantajları</h3><ul><li>Hastalıklara daha dayanıklı</li><li>Daha yüksek verim</li><li>Kök sistemi daha güçlü</li><li>Daha uzun ömür</li></ul><h3>Kullanım</h3><p>Aşılı fideleri dikerken aşı noktasını toprak üzerinde bırakın. Bu nokta toprağa gömülmemelidir.</p><h3>Bakım</h3><p>Normal fideler gibi bakım yapın. Aşılı fideler daha dayanıklı olduğu için daha az ilaç gerektirir.</p>',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '16 days',
  true,
  ARRAY['aşılı fide', 'fide seçimi', 'dayanıklı fide', 'verimli fide', 'fide bakımı', 'bahçe fide'],
  'Rehber'
),

(
  'Fide Çoğaltma Teknikleri: Tohumdan ve Çelikten Üretim',
  'fide-cogaltma-teknikleri-tohumdan-ve-celikten-uretim',
  'Fide nasıl çoğaltılır? Tohumdan fide üretimi, çelik alma yöntemleri ve fide çoğaltma teknikleri hakkında rehber.',
  '<h2>Fide Çoğaltma Yöntemleri</h2><p>Kendi fidelerinizi üretmek hem ekonomik hem de keyiflidir. Doğru tekniklerle başarılı fide üretimi yapabilirsiniz.</p><h3>Tohumdan Üretim</h3><p>Kaliteli tohumlar seçin. Tohum yatağı hazırlayın ve uygun sıcaklıkta çimlendirin. Fideler 3-4 yapraklı olduğunda şaşırtın.</p><h3>Çelik Alma</h3><p>Sağlıklı bitkilerden çelik alın. Köklendirme hormonu kullanarak kök oluşumunu hızlandırın.</p><h3>Bölme Yöntemi</h3><p>Bazı bitkiler kök veya soğan bölerek çoğaltılabilir. Her bölümün kök ve yaprak içermesi gerekir.</p>',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '25 days',
  true,
  ARRAY['fide çoğaltma', 'tohum ekimi', 'çelik alma', 'fide üretimi', 'bahçe teknikleri', 'fide yetiştirme'],
  'Rehber'
),

(
  'Dikey Bahçe Tekniği: Küçük Alanlarda Maksimum Verim',
  'dikey-bahce-teknigi-kucuk-alanlarda-maksimum-verim',
  'Dikey bahçe nasıl yapılır? Küçük balkonlarda ve alanlarda dikey bahçe teknikleri ile daha fazla ürün yetiştirme rehberi.',
  '<h2>Dikey Bahçe Rehberi</h2><p>Dikey bahçe, sınırlı alanlarda maksimum verim almanın en etkili yöntemidir.</p><h3>Kurulum</h3><p>Duvara monte edilen saksılar, askılı sistemler veya dikey kuleler kullanın. Sağlam destek sistemi kurun.</p><h3>Bitki Seçimi</h3><p>Küçük köklü bitkiler seçin. Yeşillikler, çilek ve küçük sebzeler idealdir.</p><h3>Bakım</h3><p>Üstten aşağıya sulama yapın. Gübreleme için suda çözünen gübreler kullanın. Düzenli budama yapın.</p><h3>Avantajlar</h3><p>Az yer kaplar, daha fazla ürün alırsınız, dekoratif görünür ve bakımı kolaydır.</p>',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '24 days',
  true,
  ARRAY['dikey bahçe', 'balkon bahçesi', 'küçük alan', 'dikey tarım', 'şehir bahçesi', 'evde bahçe', 'verimli bahçe'],
  'Rehber'
),

(
  'Kompost Yapımı: Evde Organik Gübre Üretimi',
  'kompost-yapimi-evde-organik-gubre-uretime',
  'Evde kompost nasıl yapılır? Organik atıklardan kompost üretimi, kompost çeşitleri ve kullanım yöntemleri hakkında rehber.',
  '<h2>Kompost Yapımı Rehberi</h2><p>Kompost, evsel atıklardan üretilen en değerli organik gübredir. Hem çevreye katkı sağlar hem de bahçenize besin verir.</p><h3>Kompost Çeşitleri</h3><ul><li>Soğuk kompost: Yavaş ama kolay</li><li>Sıcak kompost: Hızlı ama daha fazla çaba gerektirir</li><li>Solucan kompostu: En zengin kompost</li></ul><h3>Malzemeler</h3><p>Yeşil malzeme (sebze artıkları, ot) ve kahverengi malzeme (kuru yaprak, karton) karışımı kullanın.</p><h3>Süreç</h3><p>Katmanlar halinde yerleştirin, düzenli karıştırın ve nemli tutun. 3-6 ay içinde hazır olur.</p><h3>Kullanım</h3><p>Hazır kompostu toprağa karıştırın veya üst malç olarak kullanın. Fideler için mükemmel bir besin kaynağıdır.</p>',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '23 days',
  true,
  ARRAY['kompost', 'organik gübre', 'evsel atık', 'kompost yapımı', 'bahçe gübresi', 'organik tarım', 'geri dönüşüm'],
  'Bakım'
),

-- BAHÇE TASARIMI VE PLANLAMA
(
  'Bahçe Planlama: Fide Düzeni ve Rotasyon Sistemi',
  'bahce-planlama-fide-duzeni-ve-rotasyon-sistemi',
  'Bahçe planlaması nasıl yapılır? Fide düzeni, rotasyon sistemi ve bahçe tasarımı hakkında profesyonel ipuçları.',
  '<h2>Bahçe Planlama Rehberi</h2><p>İyi planlanmış bir bahçe, hem görsel olarak güzel hem de verimli olur. Doğru düzenleme ile maksimum ürün alırsınız.</p><h3>Alan Değerlendirmesi</h3><p>Güneş alan yerleri belirleyin. Su kaynağına yakınlığı kontrol edin. Toprak kalitesini analiz edin.</p><h3>Fide Düzeni</h3><p>Yüksek bitkileri kuzeye, alçak bitkileri güneye dikin. Birlikte uyumlu bitkileri yan yana yerleştirin.</p><h3>Rotasyon</h3><p>Her yıl bitki yerlerini değiştirin. Aynı familyadan bitkileri aynı yere 3 yıl üst üste dikmeyin.</p><h3>Yollar ve Erişim</h3><p>Hasat ve bakım için yeterli yol alanı bırakın. Saksılar arasında geçiş yolları oluşturun.</p>',
  'https://images.unsplash.com/email/photo-1585320806297-9794b3e4eeae?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '22 days',
  true,
  ARRAY['bahçe planlama', 'fide düzeni', 'rotasyon', 'bahçe tasarımı', 'bahçe organizasyonu', 'verimli bahçe'],
  'Rehber'
),

(
  'Birlikte Uyumlu Bitkiler: Companion Planting Rehberi',
  'birlikte-uyumlu-bitkiler-companion-planting-rehberi',
  'Hangi bitkiler birlikte dikilir? Companion planting nedir? Zararlı böcekleri uzaklaştıran ve verimi artıran bitki kombinasyonları.',
  '<h2>Birlikte Uyumlu Bitkiler</h2><p>Bazı bitkiler birlikte dikildiğinde birbirlerine fayda sağlar. Bu teknik hem verimi artırır hem de zararlıları uzaklaştırır.</p><h3>Klasik Kombinasyonlar</h3><ul><li>Domates + Fesleğen: Fesleğen zararlıları uzaklaştırır</li><li>Havuç + Soğan: Soğan havuç sineğini uzaklaştırır</li><li>Salatalık + Dereotu: Dereotu salatalığa iyi gelir</li></ul><h3>Çiçekler</h3><p>Kadife çiçeği, lavanta ve kekik gibi bitkiler zararlı böcekleri uzaklaştırır ve arıları çeker.</p><h3>Kaçınılması Gerekenler</h3><p>Domates ve patates aynı yerde yetişmemeli. Biber ve fasulye de birbirine çok yakın olmamalıdır.</p>',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '21 days',
  true,
  ARRAY['companion planting', 'uyumlu bitkiler', 'bahçe planlama', 'zararlı kontrolü', 'organik bahçe', 'bitki kombinasyonu'],
  'Rehber'
),

-- HASAT VE SAKLAMA
(
  'Sebze Hasadı: En İyi Hasat Zamanı ve Yöntemleri',
  'sebze-hasadi-en-iyi-hasat-zamani-ve-yontemleri',
  'Sebzeler ne zaman hasat edilir? Hasat zamanı belirleme, hasat yöntemleri ve taze sebze saklama teknikleri hakkında rehber.',
  '<h2>Hasat Rehberi</h2><p>Doğru zamanda hasat, lezzet ve besin değeri açısından kritik öneme sahiptir.</p><h3>Hasat Zamanı</h3><p>Domates: Tam kırmızı ama sertken. Biber: İstediğiniz boyutta. Salatalık: Küçük ve gevrek. Yeşillikler: Yapraklar tam gelişmişken.</p><h3>Hasat Yöntemi</h3><p>Makas veya bıçak kullanın. Çekerek koparmayın. Temiz alet kullanın. Hasat sırasında bitkiye zarar vermeyin.</p><h3>Saklama</h3><p>Taze sebzeleri serin ve nemli yerde saklayın. Buzdolabında saklarken nemli bez kullanın. Hasattan hemen sonra tüketmek en iyisidir.</p>',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '30 days',
  true,
  ARRAY['sebze hasadı', 'hasat zamanı', 'taze sebze', 'bahçe hasadı', 'sebze saklama', 'hasat yöntemleri'],
  'Rehber'
),

-- İLERİ SEVİYE KONULAR
(
  'Hidroponik Fide Yetiştirme: Topraksız Tarım Rehberi',
  'hidroponik-fide-yetistirme-topraksiz-tarim-rehberi',
  'Hidroponik sistem nasıl kurulur? Topraksız tarım, hidroponik fide yetiştirme ve evde hidroponik sistem kurulumu hakkında rehber.',
  '<h2>Hidroponik Yetiştirme</h2><p>Hidroponik, toprak olmadan bitki yetiştirme yöntemidir. Su içinde çözünmüş besinlerle bitkiler yetiştirilir.</p><h3>Sistem Kurulumu</h3><p>Basit sistem: Su tankı, pompa ve büyüme yatağı. NFT sistemi: Sürekli akan su. DWC sistemi: Derin su kültürü.</p><h3>Besin Çözeltisi</h3><p>Hidroponik besin solüsyonu kullanın. pH seviyesini 5.5-6.5 arasında tutun. EC değerini düzenli kontrol edin.</p><h3>Avantajlar</h3><p>Daha hızlı büyüme, daha yüksek verim, az su kullanımı ve hastalık riski düşüktür.</p><h3>Başlangıç</h3><p>Basit sistemlerle başlayın. Yeşillikler ve marul hidroponik için idealdir. Deneyim kazandıkça sisteminizi genişletin.</p>',
  'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '29 days',
  true,
  ARRAY['hidroponik', 'topraksız tarım', 'hidroponik sistem', 'evde hidroponik', 'modern tarım', 'su kültürü'],
  'Rehber'
),

(
  'Organik Bahçe Sertifikasyonu: Organik Üretim Standartları',
  'organik-bahce-sertifikasyonu-organik-uretim-standartlari',
  'Organik bahçe nasıl sertifikalanır? Organik üretim standartları, sertifikasyon süreci ve organik fide yetiştirme kuralları.',
  '<h2>Organik Sertifikasyon</h2><p>Organik sertifikasyon, ürünlerinizin organik standartlara uygun olduğunu gösterir.</p><h3>Standartlar</h3><p>Organik tohum ve fide kullanımı. Sentetik gübre ve ilaç yasağı. Doğal gübre ve mücadele yöntemleri. Toprak sağlığı korunmalı.</p><h3>Süreç</h3><p>Organik dönüşüm süreci en az 2 yıl sürer. Bu süreçte organik yöntemler kullanılır. Toprak analizi yapılır.</p><h3>Kayıt ve Denetim</h3><p>Sertifikasyon kuruluşuna başvurun. Düzenli denetimler yapılır. Kayıt tutulur ve raporlama yapılır.</p><h3>Avantajlar</h3><p>Sağlıklı ürünler, çevre koruma, yüksek değer ve güven tesis eder.</p>',
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '28 days',
  true,
  ARRAY['organik sertifikasyon', 'organik tarım', 'organik standart', 'sertifikalı organik', 'organik üretim', 'sürdürülebilir tarım'],
  'Rehber'
),

(
  'Bahçe Günlüğü Tutma: Başarılı Bahçıvanın Sırrı',
  'bahce-gunlugu-tutma-basarili-bahcivanin-sirri',
  'Bahçe günlüğü nasıl tutulur? Fide dikimi, bakım notları, hasat kayıtları ve bahçe planlaması için günlük tutma rehberi.',
  '<h2>Bahçe Günlüğü Rehberi</h2><p>Bahçe günlüğü, başarılı bahçıvanların en önemli araçlarından biridir. Gelecek sezonlar için değerli bilgiler sağlar.</p><h3>Neler Kaydedilmeli?</h3><ul><li>Dikim tarihleri ve yerleri</li><li>Çeşit isimleri ve kaynakları</li><li>Hava durumu ve sıcaklık</li><li>Sulama ve gübreleme programı</li><li>Hastalık ve zararlı kayıtları</li><li>Hasat tarihleri ve miktarları</li></ul><h3>Faydaları</h3><p>Hangi çeşitler iyi yetişti? Ne zaman dikim yapılmalı? Hangi sorunlarla karşılaştık? Gelecek sezon için planlama yapılır.</p><h3>Yöntem</h3><p>Not defteri, dijital uygulama veya fotoğraf günlüğü kullanabilirsiniz. Düzenli kayıt tutmak önemlidir.</p>',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '27 days',
  true,
  ARRAY['bahçe günlüğü', 'bahçe planlama', 'bahçe kayıtları', 'bahçe organizasyonu', 'bahçe yönetimi'],
  'Rehber'
),

(
  'Çocuklarla Bahçe: Aile Bahçeciliği ve Eğitici Etkinlikler',
  'cocuklarla-bahce-aile-bahceciligi-ve-egitici-etkinlikler',
  'Çocuklarla bahçe nasıl yapılır? Aile bahçeciliği, çocuklar için bahçe etkinlikleri ve eğitici bahçe projeleri hakkında rehber.',
  '<h2>Çocuklarla Bahçe Rehberi</h2><p>Bahçecilik, çocuklar için hem eğitici hem de eğlenceli bir aktivitedir. Doğayı tanımalarına ve sorumluluk almalarına yardımcı olur.</p><h3>Başlangıç Projeleri</h3><p>Hızlı büyüyen bitkiler seçin: Turp, marul, fasulye. Renkli sebzeler: Turuncu havuç, mor lahana. Çocukların sevdiği sebzeler: Domates, çilek.</p><h3>Eğitici Değer</h3><p>Bitki yaşam döngüsü, sorumluluk, sabır ve doğa sevgisi öğretilir.</p><h3>Güvenlik</h3><p>Güvenli aletler kullanın. Organik yöntemler tercih edin. Sürekli gözetim sağlayın.</p><h3>Aile Aktiviteleri</h3><p>Birlikte dikim yapın, sulama sırası belirleyin ve hasat kutlaması yapın.</p>',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070',
  'Hobitat Ekibi',
  NOW() - INTERVAL '26 days',
  true,
  ARRAY['çocuklarla bahçe', 'aile bahçesi', 'eğitici bahçe', 'çocuk etkinlikleri', 'bahçe eğitimi', 'doğa eğitimi'],
  'Rehber'
)

ON CONFLICT (slug) DO NOTHING;

-- Toplam 30 blog yazısı eklendi!
-- Her blog SEO odaklı anahtar kelimeler içeriyor
-- Farklı kategoriler: Rehber, Bakım, İpuçları



