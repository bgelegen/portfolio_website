/* ============================================================
   ULUSLARARASILAŞTIRMA (i18n) — Türkçe / English çevirileri
   İçerik: statik metinler + dinamik (proje/deneyim/sertifika) EN
   Bu dosya main.js'ten ÖNCE yüklenir.
   ============================================================ */
window.I18N = (function () {
  /* ----------------- STATİK METİNLER ----------------- */
  const staticText = {
    // Nav
    "nav.home":         { tr: "Ana Sayfa",     en: "Home" },
    "nav.about":        { tr: "Hakkımda",      en: "About" },
    "nav.skills":       { tr: "Yetenekler",    en: "Skills" },
    "nav.projects":     { tr: "Projeler",      en: "Projects" },
    "nav.achievements": { tr: "Başarılar",     en: "Achievements" },
    "nav.experience":   { tr: "Deneyim",       en: "Experience" },
    "nav.contact":      { tr: "İletişim",      en: "Contact" },
    "nav.cv":           { tr: "CV",            en: "CV" },

    // Hero
    "hero.badge":         { tr: "Staj & proje iş birliklerine açık", en: "Open to internships & project collaborations" },
    "hero.location":      { tr: "Malatya, Türkiye", en: "Malatya, Türkiye" },
    "hero.cta.projects":  { tr: "Projelerimi Keşfet", en: "Explore My Projects" },
    "hero.cta.cv":        { tr: "Özgeçmişi Görüntüle", en: "View CV" },

    // About
    "about.kicker":         { tr: "Hakkımda",  en: "About Me" },
    "about.title.emph":     { tr: "mühendislik", en: "engineering" },
    "about.edu.chip":       { tr: "Eğitim", en: "Education" },
    "about.stats.chip":     { tr: "İstatistikler", en: "Statistics" },
    "about.stats.projects": { tr: "Aktif Ar-Ge Projesi", en: "Active R&D Project" },
    "about.stats.langs":    { tr: "Programlama Dili", en: "Programming Languages" },
    "about.edu.school":     { tr: "Samsun Üniversitesi", en: "Samsun University" },
    "about.edu.detail":     { tr: "Yazılım Mühendisliği · Lisans · 3. Sınıf", en: "Software Engineering · BSc · 3rd Year" },
    "about.edu.period":     { tr: "2024 — Devam Ediyor", en: "2024 — Present" },
    "about.role":           { tr: "Yazılım Mühendisi Adayı", en: "Software Engineer Candidate" },

    // Focus cards
    "focus.uav.title":       { tr: "İnsansız Hava Araçları", en: "Unmanned Aerial Vehicles" },
    "focus.ai.title":        { tr: "Yapay Zekâ & Görüntü İşleme", en: "AI & Image Processing" },
    "focus.defense.title":   { tr: "Savunma Sanayi", en: "Defense Industry" },
    "focus.embedded.title":  { tr: "Gömülü & Otonom Sistemler", en: "Embedded & Autonomous Systems" },

    // Section kickers/titles
    "skills.kicker":         { tr: "Teknik Yetenekler", en: "Technical Skills" },
    "skills.title.emph":     { tr: "teknolojiler",      en: "technologies" },
    "projects.kicker":       { tr: "Seçili Projeler",   en: "Selected Projects" },
    "projects.title.emph":   { tr: "otonom sistemlere", en: "autonomous systems" },
    "achievements.kicker":   { tr: "Yarışmalar & Başarılar", en: "Competitions & Achievements" },
    "achievements.title.emph": { tr: "sonuçlar", en: "results" },
    "experience.kicker":     { tr: "Deneyim & Kariyer Yolculuğu", en: "Experience & Career Journey" },
    "experience.title.emph": { tr: "deneyim", en: "experience" },
    "contact.kicker":        { tr: "İletişim", en: "Contact" },
    "contact.title.emph":    { tr: "üretelim", en: "build" },
    "achievements.finalist": { tr: "FİNALİST", en: "FINALIST" },
    "ach.award.title":  { tr: "TEKNOFEST Savaşan İHA", en: "TEKNOFEST Fighting UAV" },
    "ach.award.label":  { tr: "“EN İYİ ARAYÜZ YAZILIMI” MANSİYON ÖDÜLÜ", en: "“BEST INTERFACE SOFTWARE” HONORABLE MENTION" },
    "ach.award.org":    { tr: "1.032 takım arasından finale kalan 42 takım içinde 18. sıra · IKARUS AR-GE", en: "18th place among 42 finalists out of 1,032 teams · IKARUS AR-GE" },
    "ach.finalist.title": { tr: "TEKNOFEST Savaşan İHA", en: "TEKNOFEST Fighting UAV" },
    "ach.tag.award":    { tr: "Ödül", en: "Award" },
    "ach.tag.competition":   { tr: "Yarışma", en: "Competition" },
    "ach.tag.research":      { tr: "Araştırma", en: "Research" },

    // TÜBİTAK featured card
    "tubitak.label": { tr: "PROJE DESTEĞİ", en: "PROJECT SUPPORT" },
    "tubitak.title": { tr: "TÜBİTAK 2209-A Proje Desteği", en: "TÜBİTAK 2209-A Project Support" },
    "tubitak.org":   { tr: "TÜBİTAK · Kasım 2025 — Devam Ediyor", en: "TÜBİTAK · November 2025 — Ongoing" },
    "teknofest.org": { tr: "693 takım arasından finale kalan 40 takım içinde 35. sıra · IKARUS AR-GE", en: "35th place among 40 finalists out of 693 teams · IKARUS AR-GE" },

    // Contact info
    "contact.label.email":    { tr: "E-POSTA", en: "EMAIL" },
    "contact.label.phone":    { tr: "TELEFON", en: "PHONE" },
    "contact.label.location": { tr: "KONUM", en: "LOCATION" },

    // Contact form
    "contact.form.name":              { tr: "Ad Soyad",  en: "Full Name" },
    "contact.form.email":             { tr: "E-posta",   en: "Email" },
    "contact.form.subject":           { tr: "Konu",      en: "Subject" },
    "contact.form.message":           { tr: "Mesaj",     en: "Message" },
    "contact.form.namePlaceholder":   { tr: "Adınız",    en: "Your name" },
    "contact.form.subjectPlaceholder":{ tr: "Konu başlığı", en: "Subject line" },
    "contact.form.messagePlaceholder":{ tr: "Mesajınız…", en: "Your message…" },
    "contact.form.err.name":     { tr: "Lütfen adınızı girin.", en: "Please enter your name." },
    "contact.form.err.email":    { tr: "Geçerli bir e-posta girin.", en: "Please enter a valid email." },
    "contact.form.err.subject":  { tr: "Lütfen bir konu girin.", en: "Please enter a subject." },
    "contact.form.err.message":  { tr: "Lütfen bir mesaj yazın.", en: "Please enter a message." },
    "contact.form.submit":       { tr: "Mesaj Gönder", en: "Send Message" },
    "contact.form.sending":      { tr: "Gönderiliyor…", en: "Sending…" },
    "contact.form.success":      { tr: "Mesaj iletildi · Teşekkürler!", en: "Message sent · Thank you!" },
    "contact.status.success":    { tr: "Mesajın e-posta kutuma ulaştı. En kısa sürede dönüş yapacağım.", en: "Your message reached my inbox. I'll get back to you shortly." },

    // Mobile menu
    "mobile.menuLabel":  { tr: "Menü", en: "Menu" },

    // CV modal
    "cv.title":     { tr: "Batuhan Gelegen — Özgeçmiş", en: "Batuhan Gelegen — Resume" },

    // Profil kart etiketleri + değerleri
    "profile.field":          { tr: "ALAN", en: "FIELD" },
    "profile.field.value":    { tr: "Savunma · İHA · YZ", en: "Defense · UAV · AI" },
    "profile.status":         { tr: "DURUM", en: "STATUS" },
    "profile.status.value":   { tr: "Aktif Geliştirici", en: "Active Developer" },
    "profile.school":         { tr: "OKUL", en: "SCHOOL" },
    "profile.school.value":   { tr: "Samsun Üni. · 3. Sınıf", en: "Samsun Uni. · 3rd Year" },

    // Footer
    "footer.brand.desc":  { tr: "Savunma sanayi, insansız hava araçları ve ileri teknoloji alanlarında milli ve yenilikçi çözümler geliştiriyorum.", en: "I develop national and innovative solutions in the defense industry, unmanned aerial vehicles, and advanced technology." },
    "footer.nav.label":   { tr: "Alt menü", en: "Footer menu" },
  };

  /* ----------------- BAŞLIKLAR (HTML içi karışık span'lı başlıklar) ----------------- */
  // Section head başlıkları özel — gradient span'lı yapılar.
  // Bunları JS ile tüm başlığı toptan değiştireceğiz.
  const sectionTitles = {
    about:        { tr: 'Milli teknoloji için <span class="text-gradient">mühendislik</span> tutkusu.', en: 'A passion for <span class="text-gradient">engineering</span> national technology.' },
    skills:       { tr: 'Diller, araçlar ve <span class="text-gradient">teknolojiler</span>.', en: 'Languages, tools and <span class="text-gradient">technologies</span>.' },
    projects:     { tr: 'Fikirden <span class="text-gradient">otonom sistemlere</span>.', en: 'From ideas to <span class="text-gradient">autonomous systems</span>.' },
    achievements: { tr: 'Sahada kanıtlanmış <span class="text-gradient">sonuçlar</span>.', en: 'Field-proven <span class="text-gradient">results</span>.' },
    certificates: { tr: 'Katıldığım <span class="text-gradient">program ve belgeler</span>.', en: 'The <span class="text-gradient">programs and credentials</span> I earned.' },
    experience:   { tr: 'Zaman çizelgesinde <span class="text-gradient">deneyim</span>.', en: 'A timeline of <span class="text-gradient">experience</span>.' },
    contact:      { tr: 'Birlikte <span class="text-gradient">üretelim</span>.', en: 'Let\'s <span class="text-gradient">build</span> together.' },
  };

  const sectionDescs = {
    skills:       { tr: "Yazılım geliştirmeden simülasyon ve görüntü işlemeye uzanan, projelerle pekiştirilmiş yetkinlikler.", en: "Competencies spanning software development, simulation, and image processing — sharpened through real projects." },
    projects:     { tr: "Savunma sanayi ve İHA teknolojileri odağında geliştirdiğim, uçtan uca yazılım projeleri.", en: "End-to-end software projects focused on defense industry and UAV technologies." },
    certificates: { tr: "Kurumsal programlar ve yetkinlik belgeleri. Her kart, ilgili doğrulama bağlantısına yönlendirir.", en: "Institutional programs and credentials. Each card links to its verification page." },
    contact:      { tr: "Staj, proje veya iş birliği için bana ulaşabilirsiniz. En kısa sürede dönüş yaparım.", en: "Reach out for internships, projects, or collaborations. I'll get back to you as soon as possible." },
  };

  /* ----------------- HERO YAZI ANİMASYONU + META ----------------- */
  const heroTypedEn = [
    "Software Engineer Candidate",
    "Defense Industry & UAV Developer",
    "Image Processing · AI",
    "Autonomous Systems Enthusiast",
  ];
  const heroTaglineEn = "Building national and innovative solutions in the defense industry, unmanned aerial vehicles, and advanced technology.";
  const heroTaglineTr = "Savunma sanayi, insansız hava araçları ve ileri teknoloji alanlarında milli ve yenilikçi çözümler geliştiriyorum.";

  /* ----------------- HAKKIMDA UZUN METİNLER ----------------- */
  const aboutTextEn = {
    lead: "I am a third-year Software Engineering student at Samsun University. I have a strong interest in the defense industry, unmanned aerial vehicles (UAVs), and advanced technology, and I aim to develop innovative solutions in these fields. I support my problem-solving and software development skills with proficiency in languages such as Python, C/C++, and C#, as well as expertise in image processing technologies, simulation environments, and user interface design.",
    text: "As an engineering candidate who is open to learning, thinks analytically, and values teamwork, I aim to use my project experience to produce innovative, reliable, and national solutions in the defense industry.",
  };
  const aboutTextTr = {
    lead: "Samsun Üniversitesi Yazılım Mühendisliği 3. sınıf öğrencisiyim. Savunma sanayi, insansız hava araçları (İHA) ve ileri teknoloji alanlarına yoğun ilgi duyuyor, bu alanlarda yenilikçi çözümler üretebilecek projeler geliştirmeyi hedefliyorum. Problem çözme ve yazılım geliştirme becerilerimi; Python, C/C++ ve C# gibi dillerin yanı sıra görüntü işleme teknolojileri, simülasyon ortamları ve kullanıcı arayüzü tasarımı alanlarındaki yetkinliklerimle destekliyorum.",
    text: "Öğrenmeye açık, analitik düşünebilen ve takım çalışmasına yatkın bir mühendis adayı olarak; edindiğim proje tecrübelerini savunma sanayisinde yenilikçi, güvenilir ve milli çözümler üretmek için kullanmayı hedefliyorum.",
  };

  /* ----------------- FOCUS CARD AÇIKLAMALARI ----------------- */
  const focusDescEn = {
    uav:      "Autonomous mission algorithms, ground control stations, and applied flight stabilization development.",
    ai:       "Real-time target detection, classification, and machine-learning-based decision-support systems.",
    defense:  "National and reliable solutions; threat assessment, air defense, and simulation scenarios.",
    embedded: "ROS/Gazebo simulations, sensor emulation, and hardware-close control mechanisms.",
  };
  const focusDescTr = {
    uav:      "Otonom görev algoritmaları, yer kontrol istasyonları ve uçuş stabilizasyonu üzerine uygulamalı geliştirme.",
    ai:       "Gerçek zamanlı hedef tespiti, sınıflandırma ve makine öğrenmesi tabanlı karar destek sistemleri.",
    defense:  "Milli ve güvenilir çözümler; tehdit değerlendirme, hava savunma ve simülasyon senaryoları.",
    embedded: "ROS/Gazebo simülasyonları, sensör benzetimleri ve donanıma yakın kontrol mekanizmaları.",
  };

  /* ----------------- PROJELER — EN ----------------- */
  // main.js data.js'ten proje verisini alıyor. Her projenin `id`'sine göre EN varyant.
  const projectsEn = {
    "tubitak-2209a": {
      title: "TÜBİTAK 2209-A · AI for Air Defense",
      period: "November 2025 — Ongoing",
      status: "Ongoing",
      category: "AI · Simulation",
      tagline: "AI-based target classification and threat prioritization system that distinguishes decoys from real threats.",
      description: "I am building a Gazebo–ROS-based simulation infrastructure and a Python-based AI target classification and threat prioritization model so that modern air-defense systems can distinguish decoys from real threats.",
      highlights: [
        "Modeling a 3D Gazebo simulation environment including MRV/MIRV re-entry vehicles, decoys (balloon, flare, chaff, jammer), and real warheads.",
        "ROS-based infrastructure with sensor emulations processing position, speed, altitude, RCS, and thermal signature data in real time.",
        "Training and comparing machine-learning models with simulation data.",
        "Threat-score prioritization algorithm based on approach speed, altitude, and time-to-impact.",
      ],
      tech: ["Python", "Gazebo", "ROS", "Machine Learning", "Sensor Fusion"],
    },
    "yer-kontrol-istasyonu": {
      title: "Ground Control Station (GCS)",
      period: "September 2024 — August 2025",
      status: "Completed",
      category: "Interface · Communication",
      tagline: "A ground control station with real-time HUD and interactive map for managing UAV operations.",
      description: "I built a ground control station using Python and Qt Designer to manage and track UAV operations. I established a secure communication infrastructure by transmitting all UAV data to the referee server.",
      highlights: [
        "Real-time HUD screen providing information on UAV behavior and status.",
        "Interactive map showing position, restricted areas, air defense zones, and rival UAVs.",
        "Enhanced user experience with visually appealing indicators and gauges.",
        "Operational command control for take-off, landing, and mode switching.",
        "Interface design supported by Photoshop; merging aesthetics with functionality.",
      ],
      tech: ["Python", "Qt Designer", "PyQt", "MAVLink", "Photoshop"],
    },
    "otonom-kamikaze": {
      title: "Autonomous Kamikaze Mission Algorithm",
      period: "September 2025 — August 2026",
      status: "Completed",
      category: "Autonomous Control · Image Processing",
      tagline: "Mission algorithm managing autonomous dive, target detection, and maneuver phases based on coordinate data.",
      description: "Using Python and image processing techniques, I developed a mission algorithm that includes autonomous dive, target detection, and maneuver phases based on coordinate data the UAV receives from the server. The system is designed around three main phases: approach, dive, and pass-through.",
      highlights: [
        "Algorithmic route planning and flight stabilization that minimize wind drift.",
        "Control mechanisms including speed and distance parameters during target approach.",
        "Autonomous maneuver model providing pitch and roll stabilization in the dive phase.",
        "Integration of real-time image processing for target detection and verification.",
        "Autonomous recovery maneuvers via motor thrust control and pull-up algorithm.",
        "Software-locked management of altitude, speed, and G-force limits.",
      ],
      tech: ["Python", "Image Processing", "OpenCV", "Control Systems"],
    },
  };

  /* ----------------- DENEYİM — EN ----------------- */
  // Sırayla eşleşiyor (aynı index)
  const experiencesEn = [
    {
      role: "Team Captain", org: "IKARUS AR-GE",
      period: "September 2026 — Present",
      desc: "As captain of the 40-person IKARUS AR-GE team, I lead the project development processes for the Fighting UAV, International UAV, and Sloshing Rocket competitions.",
      highlights: [
        "Ensuring cross-department integration through regular meetings with sub-team captains.",
        "Increasing organizational efficiency by managing the administrative and technical processes of a 40-person team.",
        "Planning and running strategic project management processes aligned with competition timelines.",
      ],
      tags: ["Team Leadership", "Project Management", "Strategy"],
    },
    {
      role: "Sen Geleceksin Scholar", org: "T3 Vakfı · Deneyap Technology Workshops",
      period: "February 2026 — Present",
      desc: "As a scholar in the program, I serve in technical education and mentoring activities for students at Deneyap Technology Workshops.",
      highlights: [
        "Delivering hands-on training focused on basic programming and technology.",
        "Providing technical mentorship in project development processes.",
        "Supporting the planning and execution of workshop activities.",
      ],
      tags: ["Mentorship", "Education", "Community"],
    },
    {
      role: "Software Engineer · Management Team Member", org: "IKARUS AR-GE",
      period: "September 2025 — August 2026",
      desc: "At the TEKNOFEST Fighting UAV Competition we placed 18th among the 42 finalists selected from 1,032 teams and won the “Best Interface Software” honorable mention award. I was responsible for kamikaze algorithms and image processing.",
      highlights: [
        "Carrying out image processing and kamikaze algorithm development work.",
        "Contributing to organizational processes as part of the 7-person management staff within a 55-person team.",
        "Playing an active role in technical and administrative decision-making.",
      ],
      tags: ["Image Processing", "Kamikaze Algorithms", "Leadership"],
    },
    {
      role: "Software Engineer", org: "IKARUS AR-GE",
      period: "September 2024 — August 2025",
      desc: "We completed the TEKNOFEST Fighting UAV Competition in 35th place among the 40 finalists selected from 693 teams. I was responsible for communication and ground control station development.",
      highlights: [
        "Developed the GCS interface and command infrastructure for operational control.",
        "Built and optimized the UAV–GCS data communication infrastructure.",
        "Supported the team in avionics and structural areas.",
      ],
      tags: ["Ground Control Station", "Communication", "Python"],
    },
    {
      role: "Designer · Management Team Member", org: "Google Developer Groups Turkey",
      period: "September 2024 — June 2025",
      desc: "As a member of the management team, I ran the community's visual communication processes and designed event and social media content.",
      highlights: [
        "Designed event posters and social media content in Photoshop.",
        "Increased community engagement through visual communication.",
        "Contributed to planning and coordination of events.",
      ],
      tags: ["UI / Visual Design", "Photoshop", "Figma"],
    },
  ];

  /* ----------------- SKILL GROUP başlıkları — EN ----------------- */
  const skillGroupTitlesEn = [
    "Programming Languages",
    "AI & Image Processing",
    "Simulation & Robotics",
    "Tools & Design",
  ];

  /* Skill chip isimleri — TR yazılı ama İngilizce görünmesi gerekenler */
  const skillNamesEn = {
    "Görüntü İşleme":     "Image Processing",
    "Makine Öğrenmesi":   "Machine Learning",
    "Yapay Zekâ":         "Artificial Intelligence",
    "Otonom Sistemler":   "Autonomous Systems",
  };

  /* ----------------- COPYRIGHT ----------------- */
  const copyrightEn = "All rights reserved.";
  const copyrightTr = "Tüm hakları saklıdır.";

  /* ----------------- BÖLÜM GENEL ----------------- */
  return {
    staticText, sectionTitles, sectionDescs,
    heroTypedEn, heroTaglineEn, heroTaglineTr,
    aboutTextEn, aboutTextTr,
    focusDescEn, focusDescTr,
    projectsEn, experiencesEn,
    skillGroupTitlesEn, skillNamesEn,
    copyrightEn, copyrightTr,
    // Yardımcı: mevcut dili döndür
    get: () => (localStorage.getItem("lang") === "en" ? "en" : "tr"),
  };
})();
