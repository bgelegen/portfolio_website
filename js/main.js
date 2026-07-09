/* ============================================================
   BATUHAN GELEGEN — PORTFOLYO · main.js (vanilla)
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------------------------------------------------------
     VERİ — içerik js/data.js dosyasından gelir (orayı düzenleyin)
     --------------------------------------------------------- */
  const DATA = window.PORTFOLIO || {};
  const typedWords = DATA.typedWords || [];
  const skillGroups = DATA.skillGroups || [];
  const projects = DATA.projects || [];
  const experiences = DATA.experiences || [];
  const allowedEmailDomains = (DATA.allowedEmailDomains || []).map((d) =>
    String(d).toLowerCase()
  );


  const ic = (name) => `<svg class="icon" viewBox="0 0 24 24"><use href="#i-${name}"></use></svg>`;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ---------------------------------------------------------
     RENDER
     --------------------------------------------------------- */
  function renderSkills() {
    const grid = $("#skills-grid");
    if (!grid) return;
    const lang = (window.__lang) || "tr";
    const enTitles = (window.I18N && window.I18N.skillGroupTitlesEn) || [];
    const enNames = (window.I18N && window.I18N.skillNamesEn) || {};
    const skillName = (name) => (lang === "en" && enNames[name]) ? enNames[name] : name;
    grid.innerHTML = skillGroups
      .map(
        (g, i) => `
      <div class="skill-group card reveal" data-delay="${i * 80}">
        <div class="skill-group__head">
          <span class="ic-badge">${ic(g.icon)}</span>
          <h3>${esc(lang === "en" && enTitles[i] ? enTitles[i] : g.title)}</h3>
        </div>
        <div class="skill-chips reveal-stagger" data-delay="${i * 80 + 120}">
          ${g.skills.map((s) => `<span class="skill-chip">${esc(skillName(s.name))}</span>`).join("")}
        </div>
      </div>`
      )
      .join("");
  }

  function renderProjects() {
    const list = $("#projects-list");
    if (!list) return;
    const lang = (window.__lang) || "tr";
    const enProjects = (window.I18N && window.I18N.projectsEn) || {};
    const liveLbl = lang === "en" ? "Live Demo" : "Canlı Demo";
    const moduleLbl = lang === "en" ? "MODULES" : "MODÜL";
    const projLbl = lang === "en" ? "PROJECT" : "PROJE";

    list.innerHTML = projects
      .map((p, i) => {
        // Dil bazlı proje verisini uygula (title/tagline/desc vb.)
        const en = enProjects[p.id];
        const proj = (lang === "en" && en) ? Object.assign({}, p, en) : p;
        const live = p.status === "Devam Ediyor" || proj.status === "Ongoing";
        const sysId = p.id.toUpperCase().replace(/-/g, "_");
        const rings = [180, 280, 380]
          .map(
            (s, ri) =>
              `<span style="width:${s}px;height:${s}px;left:50%;top:50%;transform:translate(-50%,-50%);animation:spin ${10 + ri * 4}s linear infinite"></span>`
          )
          .join("");
        const flipped = i % 2 === 1;
        // Görsel: image varsa gerçek ekran görüntüsü, yoksa dekoratif icon + rings
        const visualContent = p.image
          ? `<img src="${esc(p.image)}" alt="${esc(proj.title)}" class="project__image" width="1200" height="675" loading="eager" fetchpriority="high" decoding="async" />
             <div class="project__image-overlay"></div>`
          : `<div class="project__visual-grid"></div>
             <div class="project__rings">${rings}</div>
             <div class="project__icon"><div class="project__icon-inner">${ic(p.icon)}</div></div>`;

        return `
      <article class="project ${flipped ? "is-flipped" : ""}">
        <div class="project__visual scanlines${p.image ? " project__visual--photo" : ""} ${flipped ? "reveal-right" : "reveal-left"}">
          ${visualContent}
          <span class="project__hud project__hud--tl">${String(i + 1).padStart(2, "0")} / ${projLbl}</span>
          <span class="project__hud project__hud--tr">${live ? "● LIVE" : "■ ARCHIVE"}</span>
          <div class="project__hud project__hud--b"><span>SYS::${sysId}</span><span>${proj.tech.length} ${moduleLbl}</span></div>
          <span class="project__tick project__tick--tl"></span>
          <span class="project__tick project__tick--br"></span>
        </div>
        <div class="project__content ${flipped ? "reveal-left" : "reveal-right"}" data-delay="120">
          <div class="project__meta">
            <span class="chip chip--accent">${ic(p.icon)} ${esc(proj.category)}</span>
            <span class="chip ${live ? "chip--ongoing" : "chip--done"}"><span class="chip__dot"></span>${esc(proj.status)}</span>
          </div>
          <h3 class="project__title">${esc(proj.title)}</h3>
          <p class="project__tagline">${esc(proj.tagline)}</p>
          <p class="project__desc">${esc(proj.description)}</p>
          <ul class="project__highlights">${proj.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          <div class="project__tech">${proj.tech.map((t) => `<span class="tech-tag">${esc(t)}</span>`).join("")}</div>
          <div class="project__actions">
            ${
              p.demo
                ? `<a class="link-btn link-btn--primary" href="${p.demo}" target="_blank" rel="noopener noreferrer">${liveLbl} ${ic("arrow-ur")}</a>`
                : ""
            }
          </div>
        </div>
      </article>`;
      })
      .join("");
  }

  function renderTimeline() {
    const tl = $("#timeline");
    if (!tl) return;
    const lang = (window.__lang) || "tr";
    const enExp = (window.I18N && window.I18N.experiencesEn) || [];
    tl.innerHTML = experiences
      .map(
        (e, i) => {
          const en = (lang === "en" && enExp[i]) ? enExp[i] : null;
          const role = en ? en.role : e.role;
          const org = en ? en.org : e.org;
          const period = en ? en.period : e.period;
          const desc = en ? en.desc : e.desc;
          const highlights = en ? en.highlights : e.highlights;
          const tags = en ? en.tags : e.tags;
          return `
      <div class="timeline__item ${e.current ? "is-current" : ""} reveal" data-delay="${i * 60}">
        <span class="timeline__node"></span>
        <div class="timeline__card card">
          <div class="timeline__head">
            <h3 class="timeline__role">${esc(role)}</h3>
            <span class="timeline__period">${esc(period)}</span>
          </div>
          <div class="timeline__org">
            <span class="ic-badge${e.logo ? " ic-badge--logo" : ""}">
              ${e.logo
                ? `<img src="${esc(e.logo)}" alt="${esc(org)}" class="ic-badge__logo" width="48" height="48"${e.invertOnLight ? ' data-invert-on-light="true"' : ""} loading="lazy" decoding="async" />`
                : ic(e.icon)}
            </span>${esc(org)}
          </div>
          <p class="timeline__desc">${esc(desc)}</p>
          <ul class="timeline__highlights">${highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          <div class="timeline__tags">${tags.map((t) => `<span class="tech-tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </div>`;
        }
      )
      .join("");
  }

  /* ---------------------------------------------------------
     PRELOADER
     --------------------------------------------------------- */
  function initPreloader() {
    const pre = $("#preloader");
    if (!pre) return;
    const isMobile = window.matchMedia("(max-width: 900px)").matches
      || window.matchMedia("(pointer: coarse)").matches;
    // MOBİLDE preloader tamamen atlanır — LCP direkt fire etsin (mobil hızı öncelik)
    // reduce-motion kullanıcıları da preloader göremez
    if (reduceMotion || isMobile) {
      pre.remove();
      document.body.classList.remove("no-scroll");
      initReveal();
      return;
    }
    const totalDuration = 500;
    const tickInterval = 40;

    document.body.classList.add("no-scroll");
    const fill = $("#preloader-fill");
    const pct = $("#preloader-pct");
    const statusEl = $("#preloader-status");
    const lines = ["Yükleniyor", "Neredeyse hazır", "Son dokunuşlar", "Hoş geldiniz"];
    let v = 0;
    const prog = setInterval(() => {
      v = Math.min(100, v + Math.random() * 24 + 12);
      if (fill) fill.style.transform = "scaleX(" + (v / 100) + ")";
      if (pct) pct.textContent = String(Math.floor(v)).padStart(2, "0") + "%";
      if (statusEl) statusEl.textContent = lines[Math.min(lines.length - 1, Math.floor(v / 26))] + "…";
      if (v >= 100) clearInterval(prog);
    }, tickInterval);
    setTimeout(() => {
      pre.classList.add("is-hidden");
      document.body.classList.remove("no-scroll");
      requestAnimationFrame(() => requestAnimationFrame(initReveal));
      // Opacity fade bittikten sonra DOM'dan tamamen çıkar — non-composited
      // visibility animasyonuna gerek kalmasın (PageSpeed uyarısı için)
      const cleanup = () => { pre.remove(); pre.removeEventListener("transitionend", cleanup); };
      pre.addEventListener("transitionend", cleanup);
      setTimeout(cleanup, 800);    // güvenlik ağı (transition 0.3s)
    }, totalDuration);
  }

  /* ---------------------------------------------------------
     THEME TOGGLE
     --------------------------------------------------------- */
  function initTheme() {
    const btn = $("#theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const dark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
      try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
      window.dispatchEvent(new CustomEvent("themechange", { detail: { dark } }));
    });
  }

  /* ---------------------------------------------------------
     NAV: scrolled state, scrollspy, mobile menu
     --------------------------------------------------------- */
  function initNav() {
    const inner = $("#nav-inner");
    let rafScheduled = false;
    let lastScrolled = null;
    const onScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const scrolled = window.scrollY > 24;
        if (inner && scrolled !== lastScrolled) {
          inner.classList.toggle("is-scrolled", scrolled);
          lastScrolled = scrolled;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const links = $$(".nav__link");
    const mlinks = $$(".mobile-menu__link");
    const map = {};
    links.concat(mlinks).forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      (map[id] = map[id] || []).push(a);
    });
    const sections = $$("main section[id]");
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const id = en.target.id;
            links.concat(mlinks).forEach((a) => a.classList.remove("is-active"));
            (map[id] || []).forEach((a) => a.classList.add("is-active"));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));

    // mobile menu
    const menu = $("#mobile-menu");
    const open = () => { menu.classList.add("is-open"); menu.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; };
    const close = () => { menu.classList.remove("is-open"); menu.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
    $("#nav-burger") && $("#nav-burger").addEventListener("click", open);
    $("#mobile-close") && $("#mobile-close").addEventListener("click", close);
    $("#mobile-overlay") && $("#mobile-overlay").addEventListener("click", close);
    mlinks.forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    // Tüm dahili anchor tıklamalarında URL'ye #hash yazma — sadece pürüzsüz scroll
    // History API ile hash'siz temiz URL bırak.
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Adres çubuğunda #hero, #about vb. görünmesin — mevcut URL'yi koruyarak temizle
      try { history.replaceState(null, "", location.pathname + location.search); } catch (err) {}
    });
  }

  /* ---------------------------------------------------------
     SCROLL PROGRESS
     --------------------------------------------------------- */
  function initScrollProgress() {
    const bar = $("#scroll-progress");
    if (!bar) return;
    let rafScheduled = false;
    let cachedH = 0;
    const recalcH = () => { cachedH = document.documentElement.scrollHeight - window.innerHeight; };
    const update = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const p = cachedH > 0 ? window.scrollY / cachedH : 0;
        bar.style.transform = "scaleX(" + p + ")";
      });
    };
    recalcH();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => { recalcH(); update(); });
  }

  /* ---------------------------------------------------------
     REVEAL ON SCROLL (+ skill bars)
     --------------------------------------------------------- */
  function initReveal() {
    const selector = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger";
    const els = $$(selector);
    if (reduceMotion) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // MOBİL: daha erken tetikle + stagger delay'ini sıfırla → hızlı hissettirir
    const isMobile = window.matchMedia("(max-width: 900px)").matches
      || window.matchMedia("(pointer: coarse)").matches;
    const rootMargin = isMobile ? "200px 0px 200px 0px" : "0px 0px -80px 0px";
    const threshold = isMobile ? 0 : 0.05;

    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          if (!isMobile) {
            const d = parseInt(el.dataset.delay || "0", 10);
            if (d) el.style.transitionDelay = d + "ms";
          }
          // Mobilde stagger delay yok — hepsi anında görünsün
          el.classList.add("is-visible");
          o.unobserve(el);
        });
      },
      { rootMargin, threshold }
    );
    els.forEach((el) => obs.observe(el));
  }

  /* ---------------------------------------------------------
     TYPING EFFECT
     --------------------------------------------------------- */
  function initTyping() {
    const el = $("#typed");
    if (!el) return;
    const getWords = () => (window.__typedWordsCurrent && window.__typedWordsCurrent.length)
      ? window.__typedWordsCurrent
      : typedWords;
    if (reduceMotion) { el.textContent = getWords()[0]; return; }
    let wi = 0, sub = 0, del = false;
    window.addEventListener("languagechange", () => { wi = 0; sub = 0; del = false; });
    const tick = () => {
      const words = getWords();
      const word = words[wi % words.length];
      if (!del && sub === word.length) {
        setTimeout(() => { del = true; tick(); }, 1500);
        return;
      }
      if (del && sub === 0) { del = false; wi++; setTimeout(tick, 200); return; }
      sub += del ? -1 : 1;
      el.textContent = word.slice(0, sub);
      setTimeout(tick, del ? 40 : 80);
    };
    // LCP tamamlanana kadar preseed metnini koru — typewriter'ı ~1.2s sonra başlat
    // Bu, #typed elementinin sürekli boyut değiştirmesini önler
    setTimeout(() => { sub = 0; del = false; tick(); }, 1200);
  }

  /* ---------------------------------------------------------
     CUSTOM CURSOR
     --------------------------------------------------------- */
  function initCursor() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = $("#cursor-dot");
    const ring = $("#cursor-ring");
    if (!dot || !ring) return;
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.opacity = ring.style.opacity = "1";
      const hov = !!(e.target.closest && e.target.closest('a, button, .magnetic, [data-cursor="hover"]'));
      ring.classList.toggle("is-hover", hov);
    });
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------------------------------------------------------
     MAGNETIC BUTTONS
     --------------------------------------------------------- */
  function initMagnetic() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.28}px, ${y * 0.32}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------
     CONTACT FORM
     --------------------------------------------------------- */
  function initContact() {
    const form = $("#contact-form");
    if (!form) return;
    const fields = {
      name: $("#cf-name"), email: $("#cf-email"),
      subject: $("#cf-subject"), message: $("#cf-message"),
    };

    // Textarea otomatik büyüme (mouse ile resize yok, kullanıcı yazdıkça büyür)
    if (fields.message) {
      const baseHeight = fields.message.offsetHeight || 96;
      const autoGrow = () => {
        fields.message.style.height = "auto";
        const next = Math.max(baseHeight, fields.message.scrollHeight);
        fields.message.style.height = next + "px";
      };
      fields.message.addEventListener("input", autoGrow);
      // Form reset sonrasında yükseklik başlangıca dönsün
      const form = $("#contact-form");
      form && form.addEventListener("reset", () => {
        setTimeout(() => (fields.message.style.height = baseHeight + "px"), 0);
      });
    }

    /* ========================================================
       ANTI-SPAM / RATE LIMITING
       Aşağıdaki değerleri ihtiyacına göre değiştirebilirsin.
       ======================================================== */
    const ANTISPAM = {
      minFillTimeMs:     3 * 1000,            // 3 sn'den hızlı dolan form botsa
      cooldownMs:       60 * 1000,            // iki gönderim arası min süre
      maxPerHour:       5,                    // 1 saatte max 5 mesaj
      maxPerDay:        15,                   // 24 saatte max 15 mesaj
      duplicateWindowMs: 6 * 60 * 60 * 1000,  // aynı mesaj/adres 6 saat içinde tekrar yok
    };
    const HISTORY_KEY = "contact-history-v1";

    // İlk etkileşim zamanı — formun ne kadar hızlı doldurulduğunu ölçer
    let firstInteractTs = 0;
    const trackFirst = () => { if (!firstInteractTs) firstInteractTs = Date.now(); };
    Object.values(fields).forEach((f) => {
      f.addEventListener("focus", trackFirst, { once: true });
      f.addEventListener("input", trackFirst, { once: true });
    });

    // Basit hash (kriptografik değil, sadece dedup için)
    function hashStr(s) {
      let h = 5381;
      const str = String(s || "");
      for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
      return (h >>> 0).toString(36);
    }

    function loadHistory() {
      try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return [];
        const cutoff = Date.now() - 24 * 60 * 60 * 1000;
        return arr.filter((e) => e && e.t >= cutoff);
      } catch (e) { return []; }
    }

    function saveHistory(history) {
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (e) { /* ignore */ }
    }

    function checkAntiSpam(email, message) {
      const now = Date.now();
      const history = loadHistory();

      // 1) Min süre (bot çok hızlı doldurur)
      if (firstInteractTs && now - firstInteractTs < ANTISPAM.minFillTimeMs) {
        return { ok: false, reason: "Form çok hızlı dolduruldu. Birkaç saniye bekleyip tekrar dene." };
      }

      // 2) Cooldown — son gönderimden bu yana 60 sn geçmedi mi?
      const last = history.length ? history[history.length - 1].t : 0;
      if (last && now - last < ANTISPAM.cooldownMs) {
        const wait = Math.ceil((ANTISPAM.cooldownMs - (now - last)) / 1000);
        return { ok: false, reason: `Lütfen tekrar mesaj göndermek için ${wait} saniye bekle.` };
      }

      // 3) Saatlik limit
      const hourAgo = now - 60 * 60 * 1000;
      if (history.filter((e) => e.t >= hourAgo).length >= ANTISPAM.maxPerHour) {
        return { ok: false, reason: "Saatlik mesaj sınırına ulaşıldı. Lütfen daha sonra tekrar dene." };
      }

      // 4) Günlük limit (history zaten 24 saatlik)
      if (history.length >= ANTISPAM.maxPerDay) {
        return { ok: false, reason: "Günlük mesaj sınırına ulaşıldı. Lütfen yarın tekrar dene." };
      }

      // 5) Duplicate — aynı e-posta + aynı mesaj son 6 saatte gönderildi mi?
      const dupHash = hashStr(String(email).toLowerCase() + "|" + String(message));
      const dupCutoff = now - ANTISPAM.duplicateWindowMs;
      if (history.some((e) => e.h === dupHash && e.t >= dupCutoff)) {
        return { ok: false, reason: "Bu mesajı kısa süre önce gönderdin. Lütfen farklı bir mesajla tekrar dene." };
      }

      // 6) Honeypot — gizli checkbox işaretlenmişse bot var
      const honey = form.querySelector('input[name="botcheck"]');
      if (honey && honey.checked) {
        return { ok: false, reason: "Bot algılandı." };
      }

      return { ok: true, hash: dupHash };
    }

    function recordSubmission(hash) {
      const history = loadHistory();
      history.push({ t: Date.now(), h: hash });
      saveHistory(history);
    }
    /* ======================================================== */
    // E-postanın domain'i izin verilen servislerden mi?
    // .edu.tr ve .edu uzantıları üniversite olduğu için otomatik kabul edilir.
    function isAllowedEmail(value) {
      const v = String(value || "").trim().toLowerCase();
      const m = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/.exec(v);
      if (!m) return false;
      const domain = m[1];
      if (/\.edu(\.[a-z]{2,3})?$/.test(domain)) return true; // üniversiteler
      return allowedEmailDomains.includes(domain);
    }

    const validate = () => {
      let ok = true;
      Object.entries(fields).forEach(([key, input]) => {
        const wrap = input.closest(".field");
        const val = input.value.trim();
        let valid = val.length > 0;
        let reason = "";
        if (key === "email") {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            valid = false;
            reason = "Geçerli bir e-posta adresi girin.";
          } else if (!isAllowedEmail(val)) {
            valid = false;
            reason =
              "Lütfen tanınan bir e-posta servisi kullanın (Gmail, Hotmail, Outlook, Yahoo, iCloud, üniversite vb.).";
          }
        }
        wrap.classList.toggle("is-invalid", !valid);
        // Alana özel hata mesajını güncelle
        const errEl = wrap.querySelector(".field__error");
        if (errEl && reason) errEl.textContent = reason;
        if (!valid) ok = false;
      });
      return ok;
    };
    Object.values(fields).forEach((input) =>
      input.addEventListener("input", () => {
        const wrap = input.closest(".field");
        if (wrap.classList.contains("is-invalid")) wrap.classList.remove("is-invalid");
      })
    );
    const ENDPOINT = form.action || "https://api.web3forms.com/submit";

    const btn = $("#contact-submit");
    const status = $("#contact-status");
    const statusMsg = $("#contact-status-msg");
    const statusIcon = $("#contact-status-icon");

    function setStatus(text, kind /* "success" | "error" */) {
      if (statusMsg) {
        const span = statusMsg.querySelector("span");
        if (span) span.textContent = text;
      }
      // Görsel olarak başarı yeşili / hata kırmızısı
      if (status) {
        status.classList.toggle("is-error", kind === "error");
      }
    }

    function reset(after) {
      setTimeout(() => {
        btn.classList.remove("is-success", "is-loading", "is-error");
        if (status) status.classList.remove("is-visible", "is-error");
      }, after);
    }

    // Cooldown göstergesi: gönderim sonrası butonu N saniye kilitler ve sayar.
    let cooldownTimer = null;
    function startCooldown(seconds) {
      if (cooldownTimer) clearInterval(cooldownTimer);
      const label = btn.querySelector(".btn__label");
      const originalHTML = label ? label.innerHTML : "";
      btn.disabled = true;
      btn.classList.add("is-cooldown");
      let remaining = seconds;
      const tick = () => {
        if (label) label.textContent = `Tekrar göndermek için ${remaining}sn`;
        if (remaining <= 0) {
          clearInterval(cooldownTimer);
          cooldownTimer = null;
          btn.classList.remove("is-cooldown");
          btn.disabled = false;
          if (label) label.innerHTML = originalHTML;
          return;
        }
        remaining--;
      };
      tick();
      cooldownTimer = setInterval(tick, 1000);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate()) return;

      const vName = fields.name.value.trim();
      const vEmail = fields.email.value.trim();
      const vSubject = fields.subject.value.trim();
      const vMessage = fields.message.value.trim();

      // Anti-spam / rate-limit kontrolleri
      const spam = checkAntiSpam(vEmail, vMessage);
      if (!spam.ok) {
        setStatus(spam.reason, "error");
        if (status) status.classList.add("is-visible");
        reset(6000);
        return;
      }

      btn.classList.remove("is-success", "is-error");
      btn.classList.add("is-loading");
      btn.disabled = true;

      const data = new FormData(form);

      // === E-posta başlığı ve gönderen kimliği ===
      // Gelen kutusunda "Portfolyo · Ali Veli" şeklinde görünür — kim mesaj atmış anında belli olur.
      data.set("from_name", "Portfolyo · " + (vName || "Ziyaretçi"));
      // Konu satırı: "[Portfolyo] Konu — Ali Veli"
      data.set(
        "subject",
        "[Portfolyo] " + (vSubject || "Yeni mesaj") + " — " + (vName || "Ziyaretçi")
      );
      // Gmail'de "Yanıtla"ya bastığında doğrudan ziyaretçinin adresine yazılır
      if (vEmail) data.set("replyto", vEmail);

      // === E-posta gövdesindeki alanları yeniden düzenle (etiketler okunaklı olsun) ===
      // Web3Forms, alan adlarını e-posta etiketi olarak kullanır.
      // Form'daki orijinal alanları kaldırıp yerine Türkçe başlıklı, düzenli alanlar koyalım.
      data.delete("name");
      data.delete("email");
      data.delete("subject");
      data.delete("message");
      data.delete("botcheck");
      // Web3Forms alanları sıralı işler — istediğimiz sırada ekliyoruz.
      data.set("👤 Ad Soyad", vName);
      data.set("✉️ E-posta", vEmail);
      data.set("📋 Konu", vSubject);
      data.set("💬 Mesaj", vMessage);
      data.set(
        "🗓️ Gönderim Tarihi",
        new Date().toLocaleString("tr-TR", {
          dateStyle: "long",
          timeStyle: "short",
        })
      );
      data.set("🌐 Kaynak", window.location.href);
      // Bot tuzağını geri ekle
      data.set("botcheck", "");

      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // Web3Forms hem multipart hem JSON kabul eder; JSON daha güvenilir.
          body: JSON.stringify(Object.fromEntries(data.entries())),
        });
        const json = await res.json().catch(() => ({}));
        // Web3Forms: { success: true, message: "..." } — boolean
        // FormSubmit:  { success: "true"|"false" }       — string
        const ok = res.ok && (json.success === true || json.success === "true");
        if (!ok) throw new Error(json.message || res.statusText || "Gönderim başarısız");

        // Başarılı
        btn.classList.remove("is-loading");
        btn.classList.add("is-success");
        btn.disabled = false;
        setStatus("Mesajın e-posta kutuma ulaştı. En kısa sürede dönüş yapacağım.", "success");
        if (status) status.classList.add("is-visible");
        form.reset();

        // Anti-spam kaydı + butonu cooldown süresince kilitle
        recordSubmission(spam.hash);
        firstInteractTs = 0;
        setTimeout(() => {
          btn.classList.remove("is-success");
          startCooldown(Math.floor(ANTISPAM.cooldownMs / 1000));
        }, 2200);
        reset(8000);
      } catch (err) {
        btn.classList.remove("is-loading");
        btn.classList.add("is-error");
        btn.disabled = false;
        setStatus(
          "Mesaj gönderilemedi. Lütfen birkaç dakika sonra tekrar deneyin.",
          "error"
        );
        if (status) status.classList.add("is-visible");
        reset(8000);
      }
    });
  }

  /* ---------------------------------------------------------
     HERO 2D FALLBACK (Three.js yüklenemezse)
     --------------------------------------------------------- */
  window.startHeroFallback = function startHeroFallback() {
    const canvas = $("#hero-canvas");
    if (!canvas || canvas.dataset.fallback === "1" || window.__heroSceneActive) return;
    canvas.dataset.fallback = "1";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w, h, dpr, particles, raf;
    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#22d3ee";
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init() {
      resize();
      particles = Array.from({ length: Math.min(120, Math.floor(w / 12)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    }
    let angle = 0;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const col = accent();
      const cx = w / 2, cy = h / 2;
      // radar sweep
      const grd = ctx.createConicGradient ? ctx.createConicGradient(angle, cx, cy) : null;
      if (grd) {
        grd.addColorStop(0, col + "00");
        grd.addColorStop(0.06, col + "33");
        grd.addColorStop(0.12, col + "00");
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(cx, cy, Math.min(w, h) * 0.42, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = col + "22";
      [0.18, 0.3, 0.42].forEach((f) => {
        ctx.beginPath(); ctx.arc(cx, cy, Math.min(w, h) * f, 0, Math.PI * 2); ctx.stroke();
      });
      // particles + links
      ctx.fillStyle = col;
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.globalAlpha = 0.6;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      angle += 0.012;
      raf = requestAnimationFrame(frame);
    }
    init();
    if (reduceMotion) { frame(); cancelAnimationFrame(raf); }
    else frame();
    window.addEventListener("resize", () => { resize(); init(); });
  };

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  function init() {
    $("#year") && ($("#year").textContent = new Date().getFullYear());
    window.__lang = (window.I18N && window.I18N.get) ? window.I18N.get() : "tr";

    // KRİTİK — hero için gerekli, ana thread'te hemen
    renderProjects();
    initPreloader();
    initTheme();
    initNav();
    initTyping();
    applyLanguage(window.__lang);

    // DEFER — ilk paint sonrasına ertele, uzun görevi parçala
    const deferInit = () => {
      renderSkills();
      renderTimeline();
      initScrollProgress();
      initCursor();
      initMagnetic();
      initContact();
      initCvModal();
      initLangToggle();
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(deferInit, { timeout: 800 });
    } else {
      setTimeout(deferInit, 0);
    }
  }

  /* ---------------------------------------------------------
     DİL DEĞİŞTİRME — TR ↔ EN
     --------------------------------------------------------- */
  function getLang() {
    return window.__lang || "tr";
  }

  function initLangToggle() {
    const btn = $("#lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const next = getLang() === "tr" ? "en" : "tr";
      try { localStorage.setItem("lang", next); } catch (e) {}
      window.__lang = next;
      applyLanguage(next);
      // Dinamik render'ları tazele
      renderSkills();
      renderProjects();
        renderTimeline();
      // Reveal state'i yeni render'lara aktarıldığı için tekrar tetikle
      $$(".reveal, .reveal-left, .reveal-right, .reveal-stagger").forEach(el => el.classList.add("is-visible"));
    });
  }

  function applyLanguage(lang) {
    if (!window.I18N) return;
    const I = window.I18N;

    // html lang attribute'unu güncelle
    document.documentElement.lang = lang;

    // Buton üzerindeki etiket (TR aktifken EN, EN aktifken TR gösterir)
    const langLabel = $("#lang-toggle-label");
    if (langLabel) langLabel.textContent = lang === "tr" ? "EN" : "TR";

    // 1) Statik metinler
    Object.keys(I.staticText).forEach((key) => {
      const val = I.staticText[key][lang];
      if (val == null) return;
      $$(`[data-i18n="${key}"]`).forEach(el => {
        el.textContent = val;
      });
    });

    // 2) Section head başlıkları (HTML içerikli)
    const titleMap = {
      "about": ".section-head__title",
      "skills": ".section-head__title",
    };
    // Bölüm başlıklarını section id'sine göre bul
    Object.entries(I.sectionTitles).forEach(([sectionId, texts]) => {
      const sec = document.getElementById(sectionId);
      if (!sec) return;
      const titleEl = sec.querySelector(".section-head__title");
      if (titleEl) titleEl.innerHTML = texts[lang];
    });

    // 3) Section açıklamaları
    Object.entries(I.sectionDescs).forEach(([sectionId, texts]) => {
      const sec = document.getElementById(sectionId);
      if (!sec) return;
      const descEl = sec.querySelector(".section-head__desc");
      if (descEl) descEl.textContent = texts[lang];
    });

    // 4) Hero — typed words + tagline
    // Typed animasyonu için global bir referansımız olmadığından, main.js'teki words array'i i18n'den yeniden bağlanır.
    window.__typedWordsCurrent = lang === "en" ? I.heroTypedEn : (window.PORTFOLIO?.typedWords || []);

    const heroTagline = $(".hero__tagline");
    if (heroTagline) heroTagline.textContent = lang === "en" ? I.heroTaglineEn : I.heroTaglineTr;

    // 5) About uzun metinler
    const aboutLead = $(".about__lead");
    const aboutText = $(".about__text");
    const aboutObj = lang === "en" ? I.aboutTextEn : I.aboutTextTr;
    if (aboutLead) aboutLead.textContent = aboutObj.lead;
    if (aboutText) aboutText.textContent = aboutObj.text;

    // 6) Focus card açıklamaları — kart sırası: uav, ai, defense, embedded
    const focusKeys = ["uav", "ai", "defense", "embedded"];
    const focusObj = lang === "en" ? I.focusDescEn : I.focusDescTr;
    $$(".focus-card").forEach((card, idx) => {
      const p = card.querySelector("p");
      const key = focusKeys[idx];
      if (p && key && focusObj[key]) p.textContent = focusObj[key];
    });

    // 7) Achievement kartı: TEKNOFEST başlığı (data-i18n olmayan h3)
    const teknofestTitle = document.querySelector(".ach-card:first-child .ach-card__title");
    if (teknofestTitle && I.achievementsFeatured) {
      teknofestTitle.textContent = I.achievementsFeatured.title[lang];
    }

    // 8) Form placeholder'ları
    const placeholders = {
      "cf-name": "contact.form.namePlaceholder",
      "cf-email": lang === "en" ? "email@example.com" : "ornek@mail.com",
      "cf-subject": "contact.form.subjectPlaceholder",
      "cf-message": "contact.form.messagePlaceholder",
    };
    Object.entries(placeholders).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (I.staticText[val]) el.placeholder = I.staticText[val][lang];
      else el.placeholder = val;
    });

    // 9) Footer copyright
    const copyright = document.querySelector(".footer__bottom p");
    if (copyright) {
      const year = new Date().getFullYear();
      copyright.innerHTML = lang === "en"
        ? `© ${year} Batuhan Gelegen · ${I.copyrightEn}`
        : `© ${year} Batuhan Gelegen · ${I.copyrightTr}`;
    }

    // 10) Typed animasyonunu yenile (aktif ise)
    window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  }

  /* ---------------------------------------------------------
     CV MODAL — Site içinde PDF görüntüleme
     --------------------------------------------------------- */
  function initCvModal() {
    const modal = $("#cv-modal");
    if (!modal) return;
    const frame = $("#cv-modal-frame");
    const CV_URL = "assets/Batuhan_Gelegen_CV.pdf";
    let lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      // PDF'i sadece açılınca yükle (performans)
      if (frame && !frame.src.includes(CV_URL)) {
        // toolbar=0 → PDF üst çubuğunu gizler; scrollbar=0 → PDF'in kendi scroll'unu gizler
        // Scroll bizim styled modal-body scrollbar'ımızdan yapılır
        frame.src = CV_URL + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH";
      }
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("cv-modal-open");
      const closeBtn = modal.querySelector(".cv-modal__close");
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("cv-modal-open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    // Tetikleyici düğmelere bağla
    $$("[data-cv-open]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        open();
      });
    });
    // Kapatma butonu + overlay
    $$("[data-cv-close]", modal).forEach((el) =>
      el.addEventListener("click", close)
    );
    // ESC ile kapat
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Three.js modülü canvas'ı talep etmediyse 2D yedeği başlat
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (!window.__heroClaimed && !window.__heroSceneActive) window.startHeroFallback();
    }, 600);
  });
})();
