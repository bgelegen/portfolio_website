# Şirket Logoları

Bu klasöre deneyim kartlarındaki şirket logolarını buraya koy.

## Nasıl kullanılır?

1. Logo dosyanı bu klasöre kopyala (örn: `ikarus.png`)
2. `js/data.js` içindeki ilgili deneyim satırında `logo:` alanına dosya yolunu yaz:

```js
{
  role: "Yazılım Mühendisi",
  org: "IKARUS AR-GE",
  logo: "assets/logos/ikarus.png",   // ← BURAYA yaz
  period: "Eylül 2024 — Ağustos 2025",
  ...
}
```

3. Kaydet ve tarayıcıda **Ctrl+Shift+R** ile yenile — logo otomatik gelir.

## Önerilen format

- **Boyut:** 200×200 piksel (kare)
- **Format:** PNG (şeffaf arka planlı) veya SVG (en iyi kalite)
- **İçerik:** Sadece logo, çevresinde padding olabilir; site zaten kart içinde ortalar

## Örnekler

Bu klasörde olabilecek dosyalar:
- `ikarus.png` → IKARUS AR-GE
- `gdg.svg` → Google Developer Groups
- `t3-vakfi.png` → T3 Vakfı
- `samsun-uni.svg` → Samsun Üniversitesi

## Notlar

- Dosya adında Türkçe karakter kullanma (ş, ı, ğ vb.) — URL encoding sorunlarını önler
- `logo:` alanı **boş bırakılırsa** (veya satır silinirse) sistem otomatik olarak varsayılan icon'u gösterir
