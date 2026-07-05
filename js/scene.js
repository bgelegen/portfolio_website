/* ============================================================
   HERO 3D SAHNE — Three.js (vanilla, ES module)
   importmap üzerinden CDN'den three çeker. Hata olursa
   main.js içindeki 2D yedeğe devreder.
   ============================================================ */

// Modül gövdesi hemen çalışır → canvas'ı talep et (yedek başlamasın)
window.__heroClaimed = true;

(async function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // MOBİL/DÜŞÜK GÜÇLÜ CİHAZLARDA Three.js YÜKLE-ME → hafif 2D canvas yedeği kullan.
  // Kritik perf kazancı: Three.js ~500KB + WebGL frame rendering yerine basit 2D
  // hardware-cursor + points render.
  const isSmallScreen = window.matchMedia("(max-width: 900px)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = isSmallScreen || isCoarsePointer || cores <= 4;

  if (isMobile) {
    if (window.startHeroFallback) window.startHeroFallback();
    return;
  }

  let THREE;
  try {
    THREE = await import("three");
  } catch (err) {
    console.warn("Three.js yüklenemedi, 2D yedek kullanılıyor.", err);
    if (window.startHeroFallback) window.startHeroFallback();
    return;
  }

  try {
    initScene(THREE);
    window.__heroSceneActive = true;
  } catch (err) {
    console.warn("3D sahne başlatılamadı, 2D yedek kullanılıyor.", err);
    if (window.startHeroFallback) window.startHeroFallback();
  }

  function readPalette() {
    const css = getComputedStyle(document.documentElement);
    const c = (v, f) => new THREE.Color((css.getPropertyValue(v).trim()) || f);
    return {
      accent: c("--accent", "#22d3ee"),
      blue: c("--accent-2", "#3b82f6"),
      amber: c("--accent-3", "#f59e0b"),
    };
  }

  function initScene(THREE) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      // Hareket azaltıldığında tek kare çizilir; tampon korunmazsa
      // sonraki kompozit işleminde temizlenip kaybolur.
      preserveDrawingBuffer: reduce,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    let palette = readPalette();

    // ---- Lights ----
    scene.add(new THREE.AmbientLight(0xffffff, 1.25));
    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(3, 4, 5);
    scene.add(dir);
    const pAmber = new THREE.PointLight(palette.amber, 22, 26);
    pAmber.position.set(-5, -2, -3);
    scene.add(pAmber);
    const pAccent = new THREE.PointLight(palette.accent, 16, 26);
    pAccent.position.set(4, 3, 4);
    scene.add(pAccent);

    // ---- Groups ----
    const outer = new THREE.Group(); // fare parallax
    const spin = new THREE.Group(); // sürekli dönüş
    outer.add(spin);
    scene.add(outer);

    // ---- Wireframe core ----
    const coreMat = new THREE.MeshStandardMaterial({
      color: palette.accent, emissive: palette.accent, emissiveIntensity: 0.7,
      wireframe: true, transparent: true, opacity: 0.72,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), coreMat);
    spin.add(core);

    // ---- Inner solid ----
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0a1726"), emissive: palette.blue,
      emissiveIntensity: 0.55, metalness: 0.7, roughness: 0.25,
    });
    const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.92, 0), innerMat);
    spin.add(innerCore);

    // ---- Radar rings ----
    const ringMats = [];
    const ringDefs = [
      { r: 2.3, color: palette.accent, op: 0.45, rot: [1.4, 0.2, 0], speed: 0.25 },
      { r: 2.75, color: palette.accent, op: 0.3, rot: [1.0, 0.9, 0.4], speed: -0.18 },
      { r: 3.15, color: palette.amber, op: 0.32, rot: [0.4, 0.3, 1.1], speed: 0.14 },
    ];
    const rings = ringDefs.map((d) => {
      const mat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.op });
      ringMats.push(mat);
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(d.r, 0.012, 8, 120), mat);
      mesh.rotation.set(d.rot[0], d.rot[1], d.rot[2]);
      mesh.userData.speed = d.speed;
      spin.add(mesh);
      return mesh;
    });

    // ---- Orbiting nodes ----
    const nodeMat = new THREE.MeshStandardMaterial({
      color: palette.amber, emissive: palette.amber, emissiveIntensity: 1.4,
    });
    const nodeDefs = [
      { r: 2.3, speed: 0.5, off: 0, tilt: 0.3, s: 0.06 },
      { r: 2.8, speed: -0.35, off: 2.1, tilt: -0.5, s: 0.05 },
      { r: 3.2, speed: 0.28, off: 4.0, tilt: 0.8, s: 0.07 },
    ];
    const nodes = nodeDefs.map((d) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(d.s, 16, 16), nodeMat);
      m.userData = d;
      spin.add(m);
      return m;
    });

    // ---- Particle field ----
    const count = 820;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.7 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.042, color: palette.accent, transparent: true, opacity: 0.95,
      sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pGeo, pMat);
    spin.add(points);

    // ---- Responsive scale ----
    function applyScale() {
      const w = window.innerWidth;
      outer.scale.setScalar(w < 768 ? 0.72 : 1);
      // Geniş ekranlarda sahneyi sağa kaydır (metin solda kalsın)
      outer.position.x = w >= 1024 ? 1.6 : 0;
    }
    applyScale();

    // ---- Resize ----
    function resize() {
      const w = canvas.clientWidth || canvas.parentElement.clientWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      applyScale();
    }
    resize();
    window.addEventListener("resize", resize);

    // ---- Pointer ----
    const pointer = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // ---- Theme reactivity ----
    window.addEventListener("themechange", () => {
      palette = readPalette();
      coreMat.color.copy(palette.accent);
      coreMat.emissive.copy(palette.accent);
      innerMat.emissive.copy(palette.blue);
      pMat.color.copy(palette.accent);
      nodeMat.color.copy(palette.amber);
      nodeMat.emissive.copy(palette.amber);
      ringMats[0].color.copy(palette.accent);
      ringMats[1].color.copy(palette.accent);
      ringMats[2].color.copy(palette.amber);
      pAmber.color.copy(palette.amber);
      pAccent.color.copy(palette.accent);
      // Hareket azaltıldığında döngü yok; rengi hemen yansıtmak için çiz
      renderer.render(scene, camera);
    });

    // ---- Visibility pause ----
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(canvas);

    function placeNodes(t) {
      nodes.forEach((m) => {
        const d = m.userData;
        const a = t * d.speed + d.off;
        m.position.set(
          Math.cos(a) * d.r,
          Math.sin(a) * d.r * Math.sin(d.tilt),
          Math.sin(a) * d.r * Math.cos(d.tilt)
        );
      });
    }

    // ---- Reduced motion: hareketsiz, korunan tek kare ----
    if (reduce) {
      placeNodes(0.6);
      const renderStatic = () => {
        resize();
        renderer.render(scene, camera);
      };
      renderStatic();
      window.addEventListener("resize", renderStatic);
      window.addEventListener("load", renderStatic);
      // Yerleşim/font yüklemesi sonrası tekrar çiz
      setTimeout(renderStatic, 300);
      setTimeout(renderStatic, 1200);
      return;
    }

    // ---- Animasyonlu döngü ----
    const clock = new THREE.Clock();
    function loop() {
      requestAnimationFrame(loop);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);

      outer.rotation.y += (pointer.x * 0.5 - outer.rotation.y) * 0.05;
      outer.rotation.x += (-pointer.y * 0.35 - outer.rotation.x) * 0.05;
      spin.rotation.y += dt * 0.12;
      core.rotation.x += dt * 0.18;
      core.rotation.z += dt * 0.05;
      rings.forEach((m) => (m.rotation.z += dt * m.userData.speed));
      points.rotation.y += dt * 0.04;
      placeNodes(t);

      renderer.render(scene, camera);
    }
    loop();
  }
})();
