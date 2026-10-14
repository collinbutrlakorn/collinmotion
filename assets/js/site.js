/* Renders the pages from content.js. No build step, no dependencies. */
(function () {
  const C = window.CM;
  const page = document.body.dataset.page;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A stable warm hue per title so empty frames don't all look the same.
  function hueFor(s) {
    let h = 0;
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 997;
    const hues = [44, 38, 48, 30, 52, 40, 34];
    return { h: hues[h % hues.length], x: 20 + (h % 60), y: 30 + ((h >> 2) % 50) };
  }

  function frame(src, label, extraClass = "", alt = "") {
    if (src) {
      return `<div class="frame ${extraClass}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;
    }
    const t = hueFor(label);
    return `<div class="frame placeholder ${extraClass}" data-label="${esc(label)}" style="--h:${t.h};--x:${t.x}%;--y:${t.y}%" role="img" aria-label="${esc(label)} (image coming soon)"></div>`;
  }

  // Grids load a small copy ("01-sm.jpg") next to each photo; if one doesn't
  // exist yet, fall back to the full image.
  const sm = (p) => (p ? p.replace(/(\.[a-z]+)$/i, "-sm$1") : p);
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && /-sm\.[a-z]+$/i.test(img.src)) img.src = img.src.replace(/-sm(\.[a-z]+)$/i, "$1");
  }, true);

  function ytThumb(id) {
    return id ? `https://i.ytimg.com/vi/${encodeURIComponent(id)}/maxresdefault.jpg` : "";
  }

  const SERIES = C.photography.filter((s) => s.photos && s.photos.length);
  const igNote = (lead) =>
    `<p class="empty-note">${lead} For now the newest ones go up on <a href="${esc(C.site.instagram)}">Instagram</a> first.</p>`;

  // ---------- hero reel ----------
  function setupHero() {
    const hero = $(".hero");
    if (!hero) return;
    $(".hero .hand").textContent = C.site.tagline;
    const video = $("video", hero);
    const toggle = $("#reel-toggle");
    const lead = C.films.find((f) => f.youtube);
    const useStill = () => {
      video.remove();
      if (!lead) return;
      const reel = $(".reel", hero);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "reel-still";
      b.setAttribute("aria-label", `Play ${lead.title}`);
      b.innerHTML = `<img src="${ytThumb(lead.youtube)}" alt=""><span class="play-badge">Watch ${esc(lead.title)}</span>`;
      const img = $("img", b);
      img.addEventListener("error", () => (img.src = img.src.replace("maxresdefault", "hqdefault")), { once: true });
      b.addEventListener("click", () => openPlayer(lead));
      reel.appendChild(b);
      hero.classList.add("has-still");
    };
    if (!C.site.reel) return useStill();

    video.poster = C.site.reelPoster || "";
    video.src = C.site.reel;
    video.addEventListener("loadeddata", () => hero.classList.add("has-reel"), { once: true });
    video.addEventListener("error", useStill, { once: true });

    const setLabel = () => (toggle.textContent = video.paused ? "Play reel" : "Pause reel");
    if (reduceMotion) video.removeAttribute("autoplay");
    else video.play().catch(() => {});
    video.addEventListener("play", setLabel);
    video.addEventListener("pause", setLabel);
    toggle.addEventListener("click", () => (video.paused ? video.play() : video.pause()));
    setLabel();
  }

  // ---------- films ----------
  function filmHTML(f, i) {
    const label = f.title;
    const media = f.still ? frame(f.still, label, "", "") : f.youtube ? frame(ytThumb(f.youtube), label) : frame("", label);
    const meta = [f.year, f.runtime, f.place].filter(Boolean).map((m) => `<span>${esc(m)}</span>`).join("");
    return `
      <article class="film"${f.zoom ? ` style="--zoom:${+f.zoom}"` : ""}>
        <button class="play" type="button" data-film="${i}" ${f.youtube ? "" : "disabled"} aria-label="Play ${esc(f.title)}">
          ${media}
          ${f.youtube ? `<span class="play-badge">Watch</span>` : ""}
        </button>
        <div class="info">
          <h3>${esc(f.title)}</h3>
          ${f.feeling ? `<p class="feeling hand">${esc(f.feeling)}</p>` : ""}
          ${meta ? `<p class="meta">${meta}</p>` : ""}
        </div>
      </article>`;
  }

  function renderFilms(el, limit, skip = 0) {
    if (!el) return;
    const list = C.films.map((f, i) => [f, i]).slice(skip, limit ? skip + limit : undefined);
    el.innerHTML = list.map(([f, i]) => filmHTML(f, i)).join("");
    // YouTube's maxres thumbnail doesn't exist for every video; fall back.
    el.querySelectorAll("img[src*='maxresdefault']").forEach((img) =>
      img.addEventListener("error", () => (img.src = img.src.replace("maxresdefault", "hqdefault")), { once: true })
    );
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-film]");
      if (b) openPlayer(C.films[+b.dataset.film]);
    });
  }

  const player = $("#player");
  function openPlayer(f) {
    if (!player || !f.youtube) return;
    $(".player-frame", player).innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(
      f.youtube
    )}?autoplay=1&rel=0&modestbranding=1" title="${esc(f.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    $(".player-caption h3", player).textContent = f.title;
    player.showModal();
  }
  if (player) {
    player.addEventListener("close", () => ($(".player-frame", player).innerHTML = ""));
    $(".dialog-close", player).addEventListener("click", () => player.close());
    player.addEventListener("click", (e) => e.target === player && player.close());
  }

  // ---------- photography ----------
  function seriesCard(s) {
    return `
      <a class="series-card" href="photography.html#${encodeURIComponent(s.id)}">
        ${frame(sm(s.photos[0]), s.title, "", s.title)}
        <h3>${esc(s.title)}</h3>
        <p>${esc([s.place, s.year].filter(Boolean).join(", "))}</p>
      </a>`;
  }

  function renderPhotoStrip(el) {
    if (!el) return;
    if (!SERIES.length) return el.closest(".section").remove(); // nothing to show on home yet
    el.innerHTML = SERIES
      .slice(0, 4)
      .map((s) => `<a href="photography.html#${encodeURIComponent(s.id)}" aria-label="${esc(s.title)}">${frame(sm(s.photos[0]), s.title, "", s.title)}</a>`)
      .join("");
  }

  function renderPhotography() {
    const root = $("#photography-root");
    const show = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const s = SERIES.find((x) => x.id === id);
      if (!s) {
        root.innerHTML = `
          <header class="section-head"><div>
            <h1 class="page-title">Photography</h1>
            <p class="lede">Photographs in small sets, each one a place or a stretch of time.</p>
          </div></header>
          ${SERIES.length ? `<div class="series-grid">${SERIES.map(seriesCard).join("")}</div>` : igNote("Photo sets are on the way.")}`;
        document.title = "Photography | CollinMotion";
        return;
      }
      const photos = s.photos.map((p, i) => `<button type="button" data-i="${i}" aria-label="Open photo ${i + 1} of ${s.photos.length}">${frame(sm(p), s.title, "", `${s.title}, photo ${i + 1}`)}</button>`);
      root.innerHTML = `
        <div class="series-view">
          <a class="back" href="photography.html">All photography</a>
          <h1 class="page-title">${esc(s.title)}</h1>
          <p class="lede">${esc([s.place, s.year].filter(Boolean).join(", "))}</p>
          ${s.note ? `<p class="lede">${esc(s.note)}</p>` : ""}
          <div class="series-photos">${photos.join("")}</div>
        </div>`;
      document.title = `${s.title} | CollinMotion`;
      root.querySelectorAll("[data-i]").forEach((b) => b.addEventListener("click", () => openLightbox(s, +b.dataset.i)));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", show);
    show();
  }

  const lb = $("#lightbox");
  let lbState = null;
  function drawLightbox() {
    const { s, i } = lbState;
    $(".lb-slot", lb).innerHTML = `<img class="lb-img" src="${esc(s.photos[i])}" alt="${esc(s.title)}, photo ${i + 1}">`;
    $(".lb-count", lb).textContent = `${s.title}, ${i + 1} of ${s.photos.length}`;
  }
  function openLightbox(s, i) {
    lbState = { s, i };
    drawLightbox();
    lb.showModal();
  }
  function stepLightbox(d) {
    const n = lbState.s.photos.length;
    lbState.i = (lbState.i + d + n) % n;
    drawLightbox();
  }
  if (lb) {
    $(".lb-prev", lb).addEventListener("click", () => stepLightbox(-1));
    $(".lb-next", lb).addEventListener("click", () => stepLightbox(1));
    $(".dialog-close", lb).addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => e.target === lb && lb.close());
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
  }

  // ---------- shorts ----------
  function renderShorts(el) {
    if (!el) return;
    if (!C.shorts.length) {
      el.outerHTML = igNote("Short-form pieces are on the way.");
      return;
    }
    el.innerHTML = C.shorts
      .map((s) => `<a class="short" href="${esc(s.url)}" target="_blank" rel="noopener">${frame(s.cover, s.title, "", s.title)}<p>${esc(s.title)}</p></a>`)
      .join("");
  }

  // ---------- about ----------
  function renderAbout() {
    const a = C.about;
    $("#about-portrait").outerHTML = a.portrait
      ? frame(a.portrait, "Collin", "", "Collin Butrlakorn")
      : `<div class="about-mark"><img src="assets/logo/cb-sun.png" alt="CollinMotion logo"></div>`;
    $("#about-text").innerHTML = a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
    if (a.kit && a.kit.length) $("#about-kit").innerHTML = a.kit.map((k) => `<li>${esc(k)}</li>`).join("");
    else { $("#about-kit").previousElementSibling.remove(); $("#about-kit").remove(); }
  }

  // ---------- shared ----------
  function fillLinks() {
    document.querySelectorAll("[data-link]").forEach((a) => {
      const key = a.dataset.link;
      const url = key === "email" ? (C.site.email ? `mailto:${C.site.email}` : "") : C.site[key];
      if (url) a.href = url;
      else (a.closest("li") || a).remove();
    });
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  fillLinks();
  if (page === "home") {
    setupHero();
    const st = $("#statement");
    if (st) st.textContent = C.statement;
    // Without a reel, the hero already shows the lead film, so the list starts after it.
    renderFilms($("#films"), 3, $(".hero.has-still") ? 1 : 0);
    renderPhotoStrip($("#photo-strip"));
    renderShorts($("#shorts"));
  }
  if (page === "films") {
    renderFilms($("#films"));
    renderShorts($("#shorts"));
  }
  if (page === "photography") renderPhotography();
  if (page === "about") renderAbout();
})();
