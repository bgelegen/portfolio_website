# Batuhan Gelegen — Kişisel Portfolyo

Saf **HTML · CSS · JavaScript** ile geliştirilmiş, modern ve responsive kişisel portfolyo sitesi.
3D sahne için **Three.js** (CDN), animasyonlar için saf CSS/JS kullanılır. Derleme (build) adımı yoktur.

## 📁 Dosya Yapısı

```
Web/
├── index.html              # Tüm bölümler + SVG ikon seti + tema scripti
├── css/
│   └── styles.css          # Tasarım sistemi (açık/koyu tema, responsive)
├── js/
│   ├── data.js             # ⭐ CV İÇERİĞİ — metinleri burada düzenleyin
│   ├── main.js             # Etkileşimler (tema, menü, animasyon, form...)
│   └── scene.js            # Three.js 3D hero sahnesi (+ 2D yedek)
├── assets/
│   └── Batuhan_Gelegen_CV.pdf
└── README.md
```

## ▶️ Çalıştırma

- **Hızlı bakış:** `index.html`'e çift tıklayın. (3D sahne yerine otomatik 2D yedek çalışır.)
- **Tam 3D deneyimi** (ES modülleri bir sunucu gerektirir): bu klasörde bir terminal açıp:
  ```bash
  python -m http.server 5500
  ```
  Sonra tarayıcıda `http://localhost:5500` adresini açın.
  (VS Code "Live Server" eklentisi de kullanılabilir.)

## ✏️ İçeriği Düzenleme

Neredeyse tüm metin ve veriler **`js/data.js`** dosyasındadır:

| Değişken | İçerik |
|---|---|
| `typedWords` | Hero'daki yazı animasyonu satırları |
| `techMarquee` | Kayan teknoloji şeridi |
| `skillGroups` | Yetenekler ve seviyeleri |
| `projects` | Projeler (açıklama, teknolojiler, `github`/`demo` linkleri) |
| `certificates` | Sertifikalar ve `verifyUrl` doğrulama linkleri |
| `experiences` | Deneyim/zaman çizelgesi |

İletişim bilgileri, isim ve sosyal medya linkleri `index.html` içindedir.

### Doldurulması gerekenler (`#` placeholder'lar)
- GitHub & LinkedIn linkleri (`index.html`)
- Proje `github` / `demo` linkleri (`js/data.js`)
- Sertifika `verifyUrl` linkleri (`js/data.js`)
- İsterseniz `projects` içine `image: "/assets/..."` ekleyerek gerçek ekran görüntüsü gösterebilirsiniz.

## 🎨 Renk / Tema
Renkler `css/styles.css` en üstteki `:root` (açık) ve `html.dark` (koyu) değişkenlerinden yönetilir.

---
HTML · CSS · JavaScript · Three.js ile geliştirildi.
