/* ============================================================
   PORTFOLYO İÇERİĞİ — CV verisi (BURADAN DÜZENLEYİN)
   Bu dosya js/main.js'ten ÖNCE yüklenir ve içeriği sağlar.
   ============================================================ */
window.PORTFOLIO = (function () {
  const typedWords = [
    "Yazılım Mühendisi Adayı",
    "Savunma Sanayi & İHA Geliştirici",
    "Görüntü İşleme · Yapay Zekâ",
    "Otonom Sistemler Meraklısı",
  ];

  const skillGroups = [
    {
      title: "Programlama Dilleri", icon: "code",
      skills: [
        { name: "Python", level: 90 },
        { name: "C / C++", level: 75 },
        { name: "C#", level: 70 },
      ],
    },
    {
      title: "Yapay Zekâ & Görüntü İşleme", icon: "brain",
      skills: [
        { name: "Görüntü İşleme", level: 85 },
        { name: "Makine Öğrenmesi", level: 72 },
        { name: "OpenCV", level: 80 },
      ],
    },
    {
      title: "Simülasyon & Robotik", icon: "radar",
      skills: [
        { name: "Gazebo", level: 78 },
        { name: "ROS", level: 72 },
        { name: "Mission Planner", level: 85 },
        { name: "QGroundControl", level: 80 },
      ],
    },
    {
      title: "Araçlar & Tasarım", icon: "design",
      skills: [
        { name: "Qt Designer", level: 85 },
        { name: "Linux", level: 75 },
        { name: "Figma", level: 80 },
        { name: "Adobe Photoshop", level: 82 },
      ],
    },
  ];

  const projects = [
    {
      id: "yer-kontrol-istasyonu",
      image: "assets/projects/gcs.png",
      title: "Yer Kontrol İstasyonu (GCS)",
      period: "Eylül 2024 — Ağustos 2025",
      status: "Tamamlandı",
      category: "Arayüz · Haberleşme",
      icon: "terminal",
      tagline:
        "İHA operasyonlarını yöneten, gerçek zamanlı HUD ve interaktif harita içeren yer kontrol istasyonu.",
      description:
        "Python ve Qt Designer kullanarak geliştirdiğim yer kontrol istasyonu, İHA operasyonlarını yönetmek ve takip etmek için tasarlandı. Hakem sunucusuna tüm İHA bilgilerinin aktarılmasını sağlayarak güvenli haberleşme altyapısını kurdum.",
      highlights: [
        "İHA davranışları ve durumu hakkında bilgi veren gerçek zamanlı HUD ekranı.",
        "Konum, yasaklı alanlar, hava savunma bölgeleri ve rakip İHA'ları gösteren interaktif harita.",
        "Görsel olarak çekici ibreler ve göstergelerle gelişmiş kullanıcı deneyimi.",
        "Kalkış, iniş ve mod değiştirme gibi operasyonel komut kontrolü.",
        "Photoshop ile arayüz tasarımı; estetik ve işlevselliğin birleştirilmesi.",
      ],
      tech: ["Python", "Qt Designer", "PyQt", "MAVLink", "Photoshop"],
      github: "#", demo: "",
    },
    {
      id: "tubitak-2209a",
      image: "assets/projects/tubitak.png",
      title: "TÜBİTAK 2209-A · Hava Savunma için Yapay Zekâ",
      period: "Kasım 2025 — Devam Ediyor",
      status: "Devam Ediyor",
      category: "Yapay Zekâ · Simülasyon",
      icon: "radar",
      tagline:
        "Sahte hedefleri gerçek tehditlerden ayırt eden, AI tabanlı hedef sınıflandırma ve tehdit önceliklendirme sistemi.",
      description:
        "Modern hava savunma sistemlerinin sahte hedefler ile gerçek tehditleri ayırt edebilmesi için Gazebo–ROS tabanlı bir simülasyon altyapısı ve Python ile yapay zekâ tabanlı bir hedef sınıflandırma ve tehdit önceliklendirme modeli geliştiriyorum.",
      highlights: [
        "MRV/MIRV, sahte hedefler (balon, flare, chaff, jammer) ve gerçek savaş başlıklarını içeren 3D Gazebo simülasyon ortamı modelleme.",
        "ROS tabanlı altyapı ile konum, hız, irtifa, RCS ve termal iz verilerini gerçek zamanlı işleyen sensör benzetimleri.",
        "Simülasyon verileriyle makine öğrenmesi modelleri eğitme ve karşılaştırma.",
        "Yaklaşma hızı, irtifa ve çarpma süresine göre tehdit skoru tabanlı önceliklendirme algoritması.",
      ],
      tech: ["Python", "Gazebo", "ROS", "Makine Öğrenmesi", "Sensör Füzyonu"],
      github: "#", demo: "",
    },
    {
      id: "otonom-kamikaze",
      image: "assets/projects/kamikaze.png",
      title: "Otonom Kamikaze Görev Algoritması",
      period: "Eylül 2025 — Devam Ediyor",
      status: "Devam Ediyor",
      category: "Otonom Kontrol · Görüntü İşleme",
      icon: "target",
      tagline:
        "Koordinat verisine göre otonom dalış, hedef tespiti ve manevra fazlarını yöneten görev algoritması.",
      description:
        "Python ve görüntü işleme tekniklerini kullanarak, İHA'nın sunucudan aldığı koordinat verilerine göre otonom dalış, hedef tespiti ve manevra fazlarını içeren görev algoritmasını geliştirdim. Sistem; yaklaşma, dalış ve pas geçme olmak üzere üç ana faz üzerine tasarlandı.",
      highlights: [
        "Rüzgâr sürüklenmesini minimize eden algoritmik rota planlama ve uçuş stabilizasyonu.",
        "Hedefe yaklaşmada hız ve mesafe parametreleri içeren kontrol mekanizmaları.",
        "Dalış fazında pitch ve roll stabilizasyonu sağlayan otonom manevra modeli.",
        "Gerçek zamanlı görüntü işleme ile hedef tespiti ve doğrulama.",
        "Motor itki kontrolü ve pull-up algoritması ile otonom kurtarma manevraları.",
        "İrtifa, hız ve G-kuvveti sınırlarının yazılımsal kilitleme mekanizmaları.",
      ],
      tech: ["Python", "Görüntü İşleme", "OpenCV", "Kontrol Sistemleri"],
      github: "#", demo: "",
    },
  ];

  const certificates = [
    { title: "Teknofest Savaşan İHA — Finalist Belgesi", issuer: "TEKNOFEST", date: "2025", icon: "trophy", verifyUrl: "#", skills: ["İHA", "Haberleşme", "GCS"] },
    { title: "Google Developer Groups — Yönetim Ekibi", issuer: "GDG Turkey", date: "2025", icon: "community", verifyUrl: "#", skills: ["Görsel Tasarım", "Topluluk Yönetimi"] },
    { title: "Sen Geleceksin Burs Programı", issuer: "T3 Vakfı", date: "2026", icon: "scholarship", verifyUrl: "#", skills: ["Mentorluk", "Teknik Eğitim", "Liderlik"] },
  ];

  /* ----------------------------------------------------------------
   * DENEYİM (Timeline)
   *
   * ŞİRKET LOGOSU EKLEMEK için:
   *   1. Logo dosyanı `assets/logos/` klasörüne kopyala (örn: ikarus.png)
   *   2. İlgili deneyim satırındaki `logo:` alanına yolu yaz:
   *        logo: "assets/logos/ikarus.png"
   *   3. Kaydet — logo otomatik gelir.
   *
   * `logo:` alanı boş bırakılırsa (veya silinirse) varsayılan icon gösterilir.
   * ---------------------------------------------------------------- */
  const experiences = [
    {
      role: "Yazılım Mühendisi", org: "IKARUS AR-GE",
      logo: "assets/logos/ikarus.png", invertOnLight: true,   // beyaz kuş → açık temada siyah olsun
      period: "Eylül 2024 — Ağustos 2025", current: false, icon: "drone",
      desc: "Teknofest Savaşan İHA Yarışması'na katılarak 598 takım arasından finalist olduk. Haberleşme ve yer kontrol istasyonu geliştirme görevlerinden sorumluydum.",
      highlights: ["GCS arayüz ve komut altyapısını geliştirerek operasyonel kontrol sağlamak.", "İHA–GCS veri iletişim altyapısını geliştirip optimize etmek.", "Mission Planner ile yer kontrol süreçlerini yönetmek.", "Aviyonik ve yapısal alanlarda ekibe destek sağlamak."],
      tags: ["Yer Kontrol İstasyonu", "Mission Planner", "Haberleşme"],
    },
    {
      role: "Tasarımcı · Yönetim Ekip Üyesi", org: "Google Developer Groups Turkey",
      logo: "assets/logos/gdg.png",
      period: "Eylül 2024 — Haziran 2025", current: true, icon: "design",
      desc: "Yönetim ekibi üyesi olarak topluluğun görsel iletişim süreçlerini yürütüyor, etkinlik ve sosyal medya içeriklerini tasarlıyorum.",
      highlights: ["Photoshop ile etkinlik afişleri ve sosyal medya içerikleri tasarlamak.", "Görsel iletişimle topluluk etkileşimini artırmak.", "Etkinliklerin planlama ve koordinasyonuna katkıda bulunmak."],
      tags: ["UI/Görsel Tasarım", "Photoshop", "Figma"],
    },
    {
      role: "Yazılım Mühendisi · Yönetim Ekip Üyesi", org: "IKARUS AR-GE",
      logo: "assets/logos/ikarus.png", invertOnLight: true,   // beyaz kuş → açık temada siyah olsun
      period: "Eylül 2025 — Devam Ediyor", current: true, icon: "target",
      desc: "Görüntü işleme tabanlı yöntemler kullanarak kamikaze İHA senaryoları üzerine yazılım geliştiriyor, 55 kişilik ekipteki 7 kişilik yönetim kadrosunda yer alıyorum.",
      highlights: ["Görüntü işleme ve algoritma geliştirme çalışmaları.", "Kamikaze senaryolarına uygun yazılım modülleri geliştirmek.", "Teknik ve idari karar alma süreçlerinde aktif rol almak."],
      tags: ["Görüntü İşleme", "Liderlik", "Python"],
    },
    {
      role: "Sen Geleceksin Bursiyeri", org: "T3 Vakfı · Deneyap Teknoloji Atölyeleri",
      logo: "assets/logos/t3.png",
      period: "Şubat 2026 — Devam Ediyor", current: true, icon: "mentor",
      desc: "Burs programı kapsamında bursiyer olarak, Deneyap Teknoloji Atölyeleri bünyesinde öğrencilere yönelik teknik eğitim ve mentorluk faaliyetlerinde görev alıyorum.",
      highlights: ["Temel programlama ve teknoloji odaklı uygulamalı eğitimler vermek.", "Proje geliştirme süreçlerinde teknik rehberlik sağlamak.", "Atölye çalışmalarının planlanması ve yürütülmesine destek olmak."],
      tags: ["Mentorluk", "Eğitim", "Topluluk"],
    },
  ];

  /* ----------------------------------------------------------------
   * İLETİŞİM FORMU — İZİN VERİLEN E-POSTA DOMAIN'LERİ
   * Sadece bu listedeki servislerden mesaj gönderilebilir.
   * Yeni domain eklemek için diziye yeni bir satır ekleyin.
   * .edu.tr ve .edu uzantıları otomatik kabul edilir (üniversiteler).
   * ---------------------------------------------------------------- */
  const allowedEmailDomains = [
    // ── Türkiye ──
    "mynet.com",
    "superonline.com",
    "ttmail.com", "ttnet.com.tr", "ttnet.net.tr",
    "turknet.com.tr", "turknet.net.tr", "turk.net",
    "vodafone.com.tr",

    // ── Google ──
    "gmail.com", "googlemail.com",

    // ── Microsoft (Hotmail / Outlook / Live / MSN) ──
    "hotmail.com", "hotmail.com.tr", "hotmail.co.uk",
    "hotmail.fr", "hotmail.de", "hotmail.it", "hotmail.es",
    "outlook.com", "outlook.com.tr", "outlook.fr", "outlook.de", "outlook.it", "outlook.es",
    "live.com", "live.com.tr", "live.co.uk", "live.fr", "live.de", "live.it",
    "msn.com",

    // ── Yahoo ──
    "yahoo.com", "yahoo.com.tr", "yahoo.co.uk", "yahoo.fr", "yahoo.de",
    "ymail.com", "rocketmail.com",

    // ── Apple ──
    "icloud.com", "me.com", "mac.com",

    // ── Proton ──
    "protonmail.com", "proton.me", "pm.me",

    // ── Yandex ──
    "yandex.com", "yandex.com.tr", "yandex.ru",

    // ── Diğer popüler ──
    "aol.com",
    "zoho.com",
    "gmx.com", "gmx.net", "gmx.de",
    "fastmail.com",
    "tutanota.com", "tuta.io",
    "mail.ru",
  ];

  return {
    typedWords, skillGroups, projects, certificates, experiences,
    allowedEmailDomains,
  };
})();
