-- ============================================================
-- ÜRÜN GÖRSELLERİ GÜNCELLEME (İNGİLİZCE ÜRÜN ARAMA ODAKLI)
-- ============================================================
-- Bu dosya, ürünlerin isimlerine karşılık gelen İngilizce terimlerle 
-- (örn: Lettuce, Tomato Plant, Eggplant) bulunan yüksek kaliteli 
-- Unsplash görsellerini kullanır.

-- --- MARULLAR ---
-- Kıvırcık Marul -> "Curly Lettuce"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556801712-3d884d81810f?q=80&w=800' WHERE title = 'Kıvırcık Marul';

-- Iceberg Marul -> "Iceberg Lettuce"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800' WHERE title = 'Iceberg Marul';

-- Yağlı Marul -> "Butterhead Lettuce"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1644317767998-3f93f6784807?q=80&w=800' WHERE title = 'Yağlı Marul';


-- --- DOMATESLER ---
-- Domates Fidesi -> "Tomato Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800' WHERE title = 'Domates Fidesi';

-- Aşılı Domates -> "Grafted Tomato Plant" (Verimli görünüm)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1591951425328-48c1fe7179cd?q=80&w=800' WHERE title = 'Aşılı Domates';

-- Sırık Domates -> "Vine Tomato"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?q=80&w=800' WHERE title = 'Sırık Domates';

-- Cherry Domates -> "Cherry Tomato Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1561136120-f8146f43619b?q=80&w=800' WHERE title = 'Cherry Domates';

-- Kokteyl Domates -> "Cocktail Tomato"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?q=80&w=800' WHERE title = 'Kokteyl Domates';


-- --- PATLICANLAR ---
-- Patlıcan Fidesi -> "Eggplant Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1715941872503-fe35529b9c2e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' WHERE title = 'Patlıcan Fidesi';

-- Aşılı Patlıcan -> "Eggplant Garden"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1605637900247-75b04c0c0162?q=80&w=800' WHERE title = 'Aşılı Patlıcan';


-- --- HIYARLAR ---
-- Hıyar Fidesi -> "Cucumber Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1518568403628-df55701ade9e?q=80&w=800' WHERE title = 'Hıyar Fidesi';

-- Aşılı Hıyar -> "Grafted Cucumber"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800' WHERE title = 'Aşılı Hıyar';

-- Kornişon -> "Pickling Cucumber"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1602491673980-73aa38de027a?q=80&w=800' WHERE title = 'Kornişon';


-- --- LAHANA & BROKOLİ ---
-- Brokoli Fidesi -> "Broccoli Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1617122823297-5d390e6074b3?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' WHERE title = 'Brokoli Fidesi';

-- Beyaz Lahana -> "White Cabbage"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1621459524627-829957ce9479?q=80&w=800' WHERE title = 'Beyaz Lahana';

-- Kırmızı Lahana -> "Red Cabbage"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1698794923145-ff23324eb61a?q=80&w=536&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' WHERE title = 'Kırmızı Lahana';

-- Karnabahar Fidesi -> "Cauliflower"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=800' WHERE title = 'Karnabahar Fidesi';


-- --- BİBERLER ---
-- Acı Kıl Biber -> "Chili Pepper Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1554292026-2274b47d7469?q=80&w=800' WHERE title = 'Acı Kıl Biber';

-- Tatlı Kıl Biber -> "Green Pepper Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1754994701837-83376fb06c42?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' WHERE title = 'Tatlı Kıl Biber';

-- Dolma Biber -> "Bell Pepper Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1604488943825-f95dc6796ca5?q=80&w=800' WHERE title = 'Dolma Biber';

-- Demre Biber -> "Pointed Pepper"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1633413261291-2f45f7b10d8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' WHERE title = 'Demre Biber';

-- Çarliston Biber -> "Long Green Pepper"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1666795822344-af367c7c22f9?q=80&w=800' WHERE title = 'Çarliston Biber';

-- Jalapeno Biber -> "Jalapeno Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1753640006440-2af67315a9dc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' WHERE title = 'Jalapeno Biber';

-- Kapya Biber -> "Capia Pepper"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1663500617750-350be54823e2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' WHERE title = 'Kapya Biber';


-- --- MEYVELER ---
-- Karpuz Fidesi -> "Watermelon Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1589596677671-754e51d63d2f?q=80&w=800' WHERE title = 'Karpuz Fidesi';

-- Aşılı Karpuz -> "Large Watermelon"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1534783931582-9e3d7e790d6c?q=80&w=800' WHERE title = 'Aşılı Karpuz';

-- Kavun Fidesi -> "Melon Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1598087268127-2793a4da2366?q=80&w=800' WHERE title = 'Kavun Fidesi';

-- Çilek Fidesi -> "Strawberry Plant"
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800' WHERE title = 'Çilek Fidesi';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800' WHERE title = 'Tatlı çilek fidesi';

