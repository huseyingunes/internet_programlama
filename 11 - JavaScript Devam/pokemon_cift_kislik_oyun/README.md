# ⚡ Pokemon TCG - Multiplayer Oyun

## 📋 Proje Açıklaması

Node.js + Socket.io tabanlı gerçek zamanlı iki kişilik Pokemon Trading Card Game oyunu. İki oyuncu farklı bilgisayarlardan bağlanarak:
1. 1-6 Pokémon'dan oluşan deste seçer
2. Destilerle multiplayer savaş yapar
3. Rakibinin tüm Pokémon'larını yenerek oyunu kazanır

---

## 🛠️ KURULUM (Windows, Mac, Linux)

### **1. Node.js Yükleme**
- https://nodejs.org/ adresinden Node.js'i indirin (v16 veya üzeri)
- Kurulumu tamamlayın
- Terminal/Command Prompt'ta test edin:
  ```bash
  node --version
  npm --version
  ```

### **2. Proje Dosyalarını Hazırlama**
1. Boş bir klasör oluşturun (Örn: `pokemon-tcg`)
2. Aşağıdaki dosyaları bu klasöre kopyalayın:
   - `server.js`
   - `package.json`
   - `index.html`

3. Klasör yapısı şu şekilde olmalı:
   ```
   pokemon-tcg/
   ├── server.js
   ├── package.json
   └── index.html
   ```

### **3. Bağımlılıkları Yükle**
Terminal/Command Prompt'u açın ve klasöre gidin:
```bash
cd pokemon-tcg
npm install
```

Bu komut `node_modules` klasörünü oluşturup gerekli kütüphaneleri indirecek.

### **4. Sunucuyu Başlat**
```bash
npm start
```

Aşağıdaki çıktı görülmeli:
```
🎮 Pokemon TCG Server çalışıyor: http://localhost:3000
⚡ Socket.IO aktif: ws://localhost:3000
```

---

## 🎮 OYUN NASIL OYNANIR?

### **ADIM 1: Oyuncuları Hazırla**
İki farklı bilgisayardan (veya aynı bilgisayardan iki ayrı tarayıcı):
- Web tarayıcısı açın
- Sunucu adresi: `http://localhost:3000` (lokal ağda olan ise sunucu IP'si)

### **ADIM 2: Oyuncu 1 - Oda Oluştur**
1. Oyuncu adını girin (Örn: "Ash")
2. "Yeni Oda Oluştur" seçili kalmalı
3. "Devam Et" butonuna tıklayın
4. **Oda ID'sini not edin** (6 haneli kod, Örn: `a7k3m2`)

### **ADIM 3: Oyuncu 2 - Odaya Katıl**
1. Oyuncu adını girin (Örn: "Misty")
2. "Odaya Katıl" seçeneğini seçin
3. Oyuncu 1'in oda ID'sini girin
4. "Devam Et" butonuna tıklayın

### **ADIM 4: Deste Seçimi (Her iki oyuncu)**
**Her oyuncu sırasıyla:**
1. Pokemon ID girin (1-1000 arası, Örn: 25 = Pikachu)
2. "🔍 Ara" butonuna tıklayın
3. Çıkan Pokemon'u tıklayarak destesine ekleyin
4. **En az 1, en fazla 6 Pokemon seçin**
5. Deste gözüküldüğünde "Oyuna Başla" butonu aktif olur

**Popular Pokemon ID'leri:**
- 1 = Bulbasaur
- 4 = Charmander
- 7 = Squirtle
- 25 = Pikachu
- 39 = Jigglypuff
- 54 = Psyduck
- 63 = Abra
- 100 = Voltorb

### **ADIM 5: Savaş Başlıyor**
1. Her oyuncu teker teker **"⚡ Saldır"** butonuna basar
2. Pokémon istatistiklerine göre hasar hesaplanır
3. Bir oyuncunun Pokémon health 0'a düşerse, sonraki Pokémon otomatik seçilir
4. Tüm Pokémon'ları yenen oyuncu **KAZANIR** 🏆

---

## 🌐 UZAK AĞDA OYNATMA

Aynı ağdaki başka bilgisayarlardan veya internetten oynatmak için:

### **1. Sunucu IP'sini Bul**
- **Windows:** `ipconfig` komutunu terminal'de çalıştır → "IPv4 Address" (Örn: 192.168.1.100)
- **Mac/Linux:** `ifconfig` komutunu çalıştır

### **2. Sunucu'yu External Bağlantıya Aç**
`server.js` dosyasında son satırı şu şekilde değiştir:
```javascript
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Pokemon TCG Server çalışıyor: http://0.0.0.0:${PORT}`);
});
```

### **3. Client Tarafında URL Değiştir**
`index.html` dosyasında Socket.io bağlantısını bul (satır ~350 civarı):
```javascript
const socket = io('http://SUNUCU_IP:3000');
// Örneğin:
const socket = io('http://192.168.1.100:3000');
```

### **4. İnternet Üzerinden Oynatma (Port Forwarding)**
Eğer internetten erişilmek istenirse:
1. Router'ın portunu yönlendir (3000 → external port)
2. Dynamic DNS veya sabit IP kullan
3. Güvenlik duvarı ayarlarını kontrol et

**Basit alternatif:** ngrok kullan
```bash
npm install -g ngrok
ngrok http 3000
```
Bu, internet URL'si sağlayacak.

---

## 📊 HASAR HESAPLAMA

```
Hasar = (Saldıranın ATK × 0.8 × Rastgele(0.8-1.2)) / (100 + Savunanın DEF)

Minimum Hasar: 5
```

**Örnek:**
- Pikachu (ATK: 55) → Charizard (DEF: 78)
- Hasar = (55 × 0.8 × 1.0) / (100 + 78) ≈ 24 hasar

**İpuçları:**
- Yüksek ATK'lı Pokémon isterseniz, low DEF'li seçin (ör: Alakazam)
- Defensive oyun istiyorsanız yüksek DEF'li Pokémon seçin (ör: Blissey)

---

## 🐛 SORUN GİDERME

### **"Cannot find module 'socket.io'"**
Çözüm:
```bash
npm install
```

### **"EADDRINUSE: address already in use :::3000"**
Port zaten kullanılıyor. Çözüm:
```bash
# PORT numarasını değiştir
PORT=3001 npm start
```

### **İki oyuncu bağlanamıyor**
1. Firewalls kontrol et (Windows Defender, antivirus)
2. Port 3000'i aç
3. Router'ın UPnP özelliğini aç

### **Sunucu gidiyor, oyuncu yapışıyor**
İmplementasyona error handling ekle. Şimdilik sayfa yenile (`F5`)

---

## 🎯 İLERİ FEATÜRLER (Eklenebilir)

1. **Database entegrasyonu** (MongoDB) - Oyuncu hesapları, skorları
2. **Ranking Sistemi** - Leaderboard, Elo puanları
3. **Item/Ability Sistemi** - Pokemon'lara özel güçler
4. **Chat Sistemi** - Oyuncular arasında iletişim
5. **Spectator Modu** - Başkaları oyunu izleyebilsin
6. **AI Opponent** - Bot karşısında oynama

---

## 📝 DOSYALARIN AÇIKLAMASI

### **server.js**
- Express + Socket.io sunucusu
- Oda yönetimi (create, join, leave)
- Oyun lojikleri (deste, savaş, hasar)
- PokeAPI'den veri çekme

### **index.html**
- Client-side UI (HTML + CSS + JS)
- Socket.io bağlantısı
- Login, deste seçim, savaş ekranları
- Responsive design

### **package.json**
- Node.js bağımlılıkları
- Script komutları
- Meta bilgiler

---

## 🎓 TEKNIK DETAYLARı

**Teknolojiler:**
- **Backend:** Node.js + Express
- **Real-time İletişim:** Socket.IO
- **API:** PokeAPI (ücretsiz)
- **Frontend:** HTML5 + CSS3 + Vanilla JS

**Protokol Akışı:**
```
1. Player1 creates room → Server creates room
2. Player2 joins room → Server updates both players
3. Both build decks → Server syncs deck info
4. Game starts → Server initializes Pokemon
5. Attack flow → Server calculates damage, broadcasts
6. Winner determined → Game ends
```

---

## 💡 NOTLAR

- Pokémon verileri real-time PokeAPI'den çekiliyor (internet gerekli)
- Socket.IO otomatik reconnection sağlıyor
- Oyun state'i server'da tutuluyor (client side cheating önlemek için)
- Her oda maksimum 2 oyuncu destekler

---

## 📞 DESTEK

Sorunlarla karşılaşırsanız:
1. Browser console'u aç (F12)
2. Error mesajlarını not et
3. Terminal'deki sunucu output'unu kontrol et

---

**Eğlenceli oyunlar dilerim! 🎮⚡**
