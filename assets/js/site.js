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
    const hues = [24, 32, 12, 4, 350, 160, 40];
    return { h: hues[h % hues.length], x: 20 + (h % 60), y: 30 + ((h >> 2) % 50) };
  }

  function frame(src, label, extraClass = "", alt = "") {
    if (src) {
      return `<div class="frame ${extraClass}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;
    }
    const t = hueFor(label);
    return `<div class="frame placeholder ${extraClass}" data-label="${esc(label)}" style="--h:${t.h};--x:${t.x}%;--y:${t.y}%" role="img" aria-label="${esc(label)} (image coming soon)"></div>`;
  }

  function ytThumb(id) {
    return id ? `https://i.ytimg.com/vi/${encodeURIComponent(id)}/maxresdefault.jpg` : "";
  }

  // ---------- hero reel ----------
  function setupHero() {
    const hero = $(".hero");
    if (!hero) return;
    $(".hero p").textContent = C.site.tagline;
    const video = $("video", hero);
    const toggle = $("#reel-toggle");
    if (!C.site.reel) return video.remove();

    video.poster = C.site.reelPoster || "";
    video.src = C.site.reel;
    video.addEventListener("loadeddata", () => hero.classList.add("has-reel"), { once: true });
    video.addEventListener("error", () => video.remove(), { once: true });

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
      <article class="film">
        <button class="play" type="button" data-film="${i}" ${f.youtube ? "" : "disabled"} aria-label="Play ${esc(f.title)}">
          ${media}
          ${f.youtube ? `<span class="play-badge">Watch</span>` : ""}
        </button>
        <div class="info">
          <h3>${esc(f.title)}</h3>
          ${f.feeling ? `<p class="feeling">${esc(f.feeling)}</p>` : ""}
          ${meta ? `<p class="meta">${meta}</p>` : ""}
        </div>
      </article>`;
  }

  function renderFilms(el, limit) {
    if (!el) return;
    const list = limit ? C.films.slice(0, limit) : C.films;
    el.innerHTML = list.map(filmHTML).join("");
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
        ${frame(s.photos[0], s.title, "", s.title)}
        <h3>${esc(s.title)}</h3>
        <p>${esc([s.place, s.year].filter(Boolean).join(", "))}</p>
      </a>`;
  }

  function renderPhotoStrip(el) {
    if (!el) return;
    el.innerHTML = C.photography
      .slice(0, 3)
      .map((s) => `<a href="photography.html#${encodeURIComponent(s.id)}" aria-label="${esc(s.title)}">${frame(s.photos[0], s.title, "", s.title)}</a>`)
      .join("");
  }

  function renderPhotography() {
    const root = $("#photography-root");
    const show = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const s = C.photography.find((x) => x.id === id);
      if (!s) {
        root.innerHTML = `
          <header class="section-head"><div>
            <h1 class="page-title">Photography</h1>
            <p class="lede">Photographs in small sets, each one a place or a stretch of time.</p>
          </div></header>
          <div class="series-grid">${C.photography.map(seriesCard).join("")}</div>`;
        document.title = "Photography | CollinMotion";
        return;
      }
      const ratios = ["4 / 5", "3 / 2", "1 / 1", "2 / 3", "5 / 4"];
      const photos = s.photos.length
        ? s.photos.map((p, i) => `<button type="button" data-i="${i}" aria-label="Open photo ${i + 1} of ${s.photos.length}">${frame(p, s.title, "", `${s.title}, photo ${i + 1}`)}</button>`)
        : Array.from({ length: 6 }, (_, i) => `<div style="--ar:${ratios[i % ratios.length]};margin-bottom:clamp(.75rem,2vw,1.5rem)">${frame("", `${s.title}, ${i + 1}`)}</div>`);
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
      el.outerHTML = `<p class="empty-note">Short-form pieces are on the way. Until then, the newest ones go up on <a href="${esc(
        C.site.instagram
      )}">Instagram</a> first.</p>`;
      return;
    }
    el.innerHTML = C.shorts
      .map((s) => `<a class="short" href="${esc(s.url)}" target="_blank" rel="noopener">${frame(s.cover, s.title, "", s.title)}<p>${esc(s.title)}</p></a>`)
      .join("");
  }

  // ---------- about ----------
  function renderAbout() {
    const a = C.about;
    $("#about-portrait").outerHTML = frame(a.portrait, "Collin", "", "Collin Butrlakorn");
    $("#about-text").innerHTML = a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#about-kit").innerHTML = a.kit.map((k) => `<li>${esc(k)}</li>`).join("");
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
    renderFilms($("#films"), 3);
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
