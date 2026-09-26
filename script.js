/* ==========================================================================
   Markus Ekerheim — portfolio
   Vanilla JS, no dependencies.
   ========================================================================== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* Projects ---------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "porsche",
    title: "Porsche coffee-table book",
    type: "Editorial design",
    summary:
      "Two spreads for a coffee-table book on a subject of my choice. I went with Porsche and the people who design them: full-bleed photography, an interview layout and quiet typography that lets the cars do the talking.",
    meta: {
      Role: "Layout, typography, retouching",
      Tools: "InDesign, Photoshop",
      Context: "School assignment",
    },
    blocks: [
      { type: "image", src: "assets/img/porsche-spread-1.webp", w: 2200, h: 1394, alt: "Spread one: Porsche 963 Singer race car over a warm light-painted background, with an interview introduction below." },
      { type: "image", src: "assets/img/porsche-spread-2.webp", w: 2200, h: 1394, alt: "Spread two: Porsche 992 Carrera shot from above and behind on black, with the article 'Symphony of Style and Speed'." },
      { type: "note", text: "I don't own the photography or the article text. My part was the layout design and the Photoshop work." },
    ],
  },
  {
    id: "cane-and-brew",
    title: "Cane & Brew Café",
    type: "Brand identity",
    summary:
      "A brand and moodboard for a café, built from scratch. The mark splits a coffee bean with a stalk of sugar cane. Warm browns, a fresh cane green and a serif with some personality make it feel handmade, but not rustic.",
    meta: {
      Role: "Logo, palette, typography, moodboard",
      Tools: "Illustrator, InDesign",
      Context: "School assignment",
    },
    blocks: [
      {
        type: "palette",
        colors: [
          { name: "Coffee Brown", hex: "#6D4C41", on: "#fff6de" },
          { name: "Sugar Green", hex: "#A8D78F", on: "#2C2924" },
          { name: "Creamy Beige", hex: "#EAE3D5", on: "#2C2924" },
          { name: "Espresso Black", hex: "#2C2924", on: "#fff6de" },
        ],
      },
      { type: "image", src: "assets/img/canebrew-moodboard.webp", w: 1570, h: 2592, narrow: true, alt: "Cane & Brew moodboard with palette, typography (Playfair Display and Lato), logo, latte art, signage and a cane-and-cup pattern." },
    ],
  },
  {
    id: "cars-and-coffee",
    title: "Cars & Coffee, Bad Gastein",
    type: "Event poster",
    summary:
      "A poster for a premium Cars & Coffee meet in Bad Gastein, Austria. Flowing single-weight lines carry the eye from the sky down into a car and a steaming cup. It's one continuous motion, like a mountain road.",
    meta: {
      Role: "Illustration, layout",
      Tools: "Illustrator, Photoshop",
      Context: "Self-initiated",
    },
    blocks: [
      { type: "pair", items: [
        { src: "assets/img/carscoffee-poster.webp", w: 842, h: 1191, alt: "Cars & Coffee poster: white line illustration of a sports car and coffee cup over a sepia castle photo, with dates, venue and brand list." },
        { src: "assets/img/carscoffee-mockup.webp", w: 1600, h: 1506, alt: "The poster framed and mounted on a stone wall." },
      ] },
    ],
  },
  {
    id: "bitburger",
    title: "Bitburger 5L",
    type: "Product film",
    summary:
      "A short product film made for TikTok. I shot a five-litre Bitburger keg at home on an iPhone 11 Pro with one light in a dark room, then edited and graded it in After Effects. It's vertical because TikTok is.",
    meta: {
      Role: "Filming, editing, grading",
      Tools: "iPhone 11 Pro, After Effects",
      Context: "School assignment",
    },
    blocks: [
      { type: "video", src: "assets/video/bitburger.mp4", poster: "assets/img/bitburger-poster.webp", caption: "Sound on. Best in fullscreen." },
    ],
  },
  {
    id: "frisk-luft",
    title: "Ta lite frisk luft",
    type: "Photo manipulation",
    summary:
      "“Get some fresh air.” It started as a photo I took of a sculpture in Vietnam. First I cleaned it up, then I moved it somewhere it would rather be. Drag the slider to compare the raw photo with the retouch.",
    meta: {
      Role: "Photography, retouching, compositing",
      Tools: "Photoshop",
      Context: "Personal, just because",
    },
    blocks: [
      { type: "compare", before: "assets/img/friskluft-raw.webp", after: "assets/img/friskluft-retouched.webp", labels: ["Raw", "Retouched"] },
      { type: "image", src: "assets/img/friskluft-final.webp", w: 1920, h: 1280, alt: "The final piece: the sculpted head resting on moss in a misty forest, titled 'Ta lite frisk luft'.", caption: "Step three: reimagined." },
    ],
  },
];

/* Hero: parallax landscape, sunset on scroll, cow ----------------------------- */

const hero = $(".hero");
const heroContent = $(".hero__content");
const layers = $$(".landscape .layer");
const cow = $(".cow");
const cowHit = $(".cow-hit");
const moo = $(".moo");

layers.forEach((layer, i) => layer.style.setProperty("--i", i));

let pointerX = 0;
let pointerY = 0;
let easedX = 0;
let easedY = 0;

if (finePointer && !reduceMotion) {
  hero.addEventListener("pointermove", (e) => {
    pointerX = e.clientX / window.innerWidth - 0.5;
    pointerY = e.clientY / window.innerHeight - 0.5;
  });
  hero.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
  });
}

function placeCow() {
  if (!cow) return;
  const r = cow.getBoundingClientRect();
  const hr = hero.getBoundingClientRect();
  const visible = r.width > 4 && r.right > 0 && r.left < window.innerWidth;
  cowHit.hidden = !visible;
  if (!visible) return;
  const x = r.left - hr.left;
  const y = r.top - hr.top;
  cowHit.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
  cowHit.style.width = `${r.width + 12}px`;
  cowHit.style.height = `${r.height + 12}px`;
  moo.style.left = `${x + r.width * 0.8}px`;
  moo.style.top = `${y - 36}px`;
}

const MOOS = ["Moo.", "Mooo!", "Hej hej.", "You found me.", "Hire Markus. Moo."];
let mooCount = 0;
let mooTimer;
function sayMoo() {
  moo.textContent = MOOS[mooCount++ % MOOS.length];
  moo.classList.add("is-on");
  cow.classList.remove("is-hopping");
  void cow.getBoundingClientRect();
  cow.classList.add("is-hopping");
  clearTimeout(mooTimer);
  mooTimer = setTimeout(() => moo.classList.remove("is-on"), 1800);
}
cow?.addEventListener("click", sayMoo);
cowHit?.addEventListener("click", sayMoo);

/* Scroll-linked updates (single rAF loop) ------------------------------------ */

const nav = $(".nav");
const progress = $(".progress");
let lastScroll = window.scrollY;
let ticking = false;

function frame() {
  const y = window.scrollY;
  const h = hero.offsetHeight;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);

  // Hide the nav when scrolling down, bring it back when scrolling up.
  if (y > h * 0.6 && y > lastScroll + 4) nav.classList.add("is-hidden");
  else if (y < lastScroll - 4 || y < h * 0.6) nav.classList.remove("is-hidden");
  lastScroll = y;

  if (!reduceMotion && y < h * 1.2) {
    easedX += (pointerX - easedX) * 0.08;
    easedY += (pointerY - easedY) * 0.08;
    const p = Math.min(y / h, 1);
    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth);
      // Far layers sink further as you scroll, so the sun sets behind the hills.
      const ty = y * depth * 0.55 + easedY * depth * -18;
      const tx = easedX * depth * -40;
      layer.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
    heroContent.style.transform = `translate3d(0, ${y * -0.18}px, 0)`;
    heroContent.style.opacity = String(1 - p * 1.3);
    hero.style.setProperty("--dusk", p.toFixed(3));
  }
  placeCow();
  ticking = false;
}

function requestFrame() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(frame);
  }
}

window.addEventListener("scroll", requestFrame, { passive: true });
window.addEventListener("resize", requestFrame);
if (finePointer && !reduceMotion) {
  // Keep easing the pointer parallax while the hero is on screen.
  (function loop() {
    if (window.scrollY < hero.offsetHeight) frame();
    requestAnimationFrame(loop);
  })();
}
requestFrame();

/* Nav colour follows the section underneath --------------------------------- */

const navSections = $$("[data-nav]");
const navLinks = $$(".nav__links a[href^='#']");
function updateNavTheme() {
  const probe = nav.offsetHeight / 2;
  for (const s of navSections) {
    const r = s.getBoundingClientRect();
    if (r.top <= probe && r.bottom > probe) {
      nav.dataset.theme = s.dataset.nav;
      break;
    }
  }
  const mid = window.innerHeight * 0.4;
  navLinks.forEach((a) => {
    const target = $(a.getAttribute("href"));
    if (!target) return;
    const r = target.getBoundingClientRect();
    a.setAttribute("aria-current", String(r.top <= mid && r.bottom > mid));
  });
}
window.addEventListener("scroll", updateNavTheme, { passive: true });
updateNavTheme();

/* Mobile menu -------------------------------------------------------------- */

const toggle = $(".nav__toggle");
const menu = $("#mobile-menu");
function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("is-locked", open);
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("is-open"));
    nav.dataset.theme = "dark";
  } else {
    menu.classList.remove("is-open");
    setTimeout(() => {
      if (toggle.getAttribute("aria-expanded") === "false") menu.hidden = true;
    }, 700);
    updateNavTheme();
  }
}
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));

/* Reveal on scroll ---------------------------------------------------------- */

const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealer.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
);

// Siblings reveal in a gentle cascade.
$$(".reveal").forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  const i = siblings.indexOf(el);
  el.style.setProperty("--delay", `${Math.min(i, 6) * 0.07}s`);
  revealer.observe(el);
});

/* Work cards: video preview + cursor pill ----------------------------------- */

const pill = $(".cursor-pill");
const cards = $$(".work-card");

if (finePointer) {
  let px = 0,
    py = 0,
    cx = 0,
    cy = 0,
    pillRunning = false;
  const movePill = () => {
    cx += (px - cx) * 0.2;
    cy += (py - cy) * 0.2;
    pill.style.translate = `${cx}px ${cy}px`;
    if (Math.abs(px - cx) > 0.1 || Math.abs(py - cy) > 0.1) requestAnimationFrame(movePill);
    else pillRunning = false;
  };
  cards.forEach((card) => {
    card.addEventListener("pointerenter", (e) => {
      cx = px = e.clientX;
      cy = py = e.clientY;
      pill.style.translate = `${cx}px ${cy}px`;
      pill.textContent = card.dataset.project === "bitburger" ? "Play" : "View";
      pill.classList.add("is-on");
    });
    card.addEventListener("pointermove", (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!pillRunning) {
        pillRunning = true;
        requestAnimationFrame(movePill);
      }
    });
    card.addEventListener("pointerleave", () => pill.classList.remove("is-on"));
  });
}

$$(".work-card__preview").forEach((video) => {
  const card = video.closest(".work-card");
  if (!finePointer || reduceMotion) return;
  card.addEventListener("pointerenter", () => {
    if (!video.src) video.src = video.dataset.src;
    video.play().then(() => card.classList.add("is-playing")).catch(() => {});
  });
  card.addEventListener("pointerleave", () => {
    card.classList.remove("is-playing");
    video.pause();
  });
});

/* Case study viewer --------------------------------------------------------- */

const dialog = $(".case");
const els = {
  count: $(".case__count", dialog),
  type: $(".case__type", dialog),
  title: $(".case__title", dialog),
  summary: $(".case__summary", dialog),
  meta: $(".case__meta", dialog),
  body: $(".case__body", dialog),
  prev: $(".case__prev", dialog),
  next: $(".case__next", dialog),
};
let current = -1;
let returnFocus = null;

const h = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "text") el.textContent = v;
    else if (k === "style") el.style.cssText = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  [].concat(children).forEach((c) => c && el.append(c));
  return el;
};

const img = (o) =>
  h("img", { src: o.src, alt: o.alt, width: o.w, height: o.h, loading: "lazy", decoding: "async", style: o.bg ? `background:${o.bg};padding:8%` : null });

function renderBlock(block) {
  switch (block.type) {
    case "image":
      return h("figure", { class: `case__figure${block.narrow ? " case__figure--narrow" : ""}` }, [
        img(block),
        block.caption && h("figcaption", { text: block.caption }),
      ]);
    case "pair":
      return h("div", { class: "case__pair" }, block.items.map((i) => h("figure", { class: "case__figure" }, img(i))));
    case "video":
      return h("figure", { class: "case__figure case__figure--video" }, [
        h("video", { src: block.src, poster: block.poster, controls: true, playsinline: true, preload: "metadata" }),
        block.caption && h("figcaption", { text: block.caption, style: "text-align:center" }),
      ]);
    case "note":
      return h("p", { class: "case__note", text: block.text });
    case "palette":
      return h(
        "ul",
        { class: "palette", "aria-label": "Colour palette" },
        block.colors.map((c) =>
          h("li", { style: `--swatch:${c.hex};--on:${c.on}` }, [h("strong", { text: c.name }), h("span", { text: c.hex })])
        )
      );
    case "compare": {
      const wrap = h("div", { class: "compare" }, [
        h("img", { src: block.before, alt: `${block.labels[0]} photo`, loading: "lazy" }),
        h("img", { src: block.after, alt: `${block.labels[1]} photo`, class: "compare__after", loading: "lazy" }),
        h("span", { class: "compare__label compare__label--before", text: block.labels[0] }),
        h("span", { class: "compare__label compare__label--after", text: block.labels[1] }),
        h("span", { class: "compare__handle", "aria-hidden": "true" }),
      ]);
      const range = h("input", {
        type: "range",
        min: 0,
        max: 100,
        value: 50,
        "aria-label": `Compare ${block.labels[0].toLowerCase()} and ${block.labels[1].toLowerCase()}`,
      });
      range.addEventListener("input", () => wrap.style.setProperty("--pos", `${range.value}%`));
      wrap.append(range);
      return wrap;
    }
  }
}

function renderProject(index) {
  const p = PROJECTS[index];
  current = index;
  els.count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`;
  els.type.textContent = p.type;
  els.title.textContent = p.title;
  els.summary.textContent = p.summary;
  els.meta.replaceChildren(
    ...Object.entries(p.meta).map(([k, v]) => h("div", {}, [h("dt", { text: k }), h("dd", { text: v })]))
  );
  els.body.replaceChildren(...p.blocks.map(renderBlock));
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  els.prev.lastElementChild.textContent = prev.title;
  els.next.lastElementChild.textContent = next.title;
  dialog.scrollTop = 0;
}

function openProject(id, { push = true } = {}) {
  const index = PROJECTS.findIndex((p) => p.id === id);
  if (index < 0) return;
  renderProject(index);
  if (!dialog.open) {
    returnFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add("is-locked");
  }
  $(".case__close", dialog).focus({ preventScroll: true });
  if (push) history.pushState({ project: id }, "", `#work/${id}`);
  document.title = `${PROJECTS[index].title} — Markus Ekerheim`;
}

function closeProject({ push = true } = {}) {
  if (!dialog.open) return;
  $$("video", dialog).forEach((v) => v.pause());
  const finish = () => {
    dialog.classList.remove("is-closing");
    dialog.close();
    document.body.classList.remove("is-locked");
    document.title = "Markus Ekerheim — Designer, developer & founder";
    if (returnFocus && returnFocus.focus) returnFocus.focus({ preventScroll: true });
  };
  if (reduceMotion) finish();
  else {
    dialog.classList.add("is-closing");
    setTimeout(finish, 380);
  }
  if (push) history.pushState({}, "", "#work");
}

cards.forEach((card) =>
  card.addEventListener("click", (e) => {
    e.preventDefault();
    openProject(card.dataset.project);
  })
);

$(".case__close", dialog).addEventListener("click", () => closeProject());
els.prev.addEventListener("click", () => openProject(PROJECTS[(current - 1 + PROJECTS.length) % PROJECTS.length].id));
els.next.addEventListener("click", () => openProject(PROJECTS[(current + 1) % PROJECTS.length].id));

dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeProject();
});

dialog.addEventListener("keydown", (e) => {
  if (e.target.matches("input, video")) return;
  if (e.key === "ArrowRight") els.next.click();
  if (e.key === "ArrowLeft") els.prev.click();
});

function syncFromHash() {
  const match = location.hash.match(/^#work\/([\w-]+)$/);
  if (match) openProject(match[1], { push: false });
  else closeProject({ push: false });
}
window.addEventListener("popstate", syncFromHash);
if (/^#work\/[\w-]+$/.test(location.hash)) syncFromHash();

/* Copy email ---------------------------------------------------------------- */

$$("[data-copy]").forEach((btn) => {
  const label = $(".copy__label", btn);
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      label.textContent = "Copied ✓";
    } catch {
      label.textContent = "Press ⌘/Ctrl + C";
      const range = document.createRange();
      range.selectNodeContents($(".contact__mail"));
      getSelection().removeAllRanges();
      getSelection().addRange(range);
    }
    btn.classList.add("is-done");
    setTimeout(() => {
      label.textContent = "Copy email";
      btn.classList.remove("is-done");
    }, 2200);
  });
});

/* Local time + year --------------------------------------------------------- */

const clock = $("[data-clock]");
const timeFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Stockholm", hour: "2-digit", minute: "2-digit" });
function tick() {
  if (clock) clock.textContent = timeFmt.format(new Date());
}
tick();
setInterval(tick, 20000);
$$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* Hello, fellow developer ---------------------------------------------------- */

console.log(
  "%cHej! 👋%c\nThis site is hand-built: no frameworks, no templates.\nLike what you see? markus.ekerheim@gmail.com",
  "font: 700 24px/1.4 sans-serif; color: #398481",
  "font: 14px/1.5 sans-serif; color: inherit"
);
