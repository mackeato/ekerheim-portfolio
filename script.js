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
    id: "ai-penalty",
    title: "The AI penalty",
    type: "Research · Bachelor thesis",
    summary:
      "Brands save time and money with AI-generated ads, but what does it cost them in trust? For our bachelor thesis we ran a controlled A/B experiment: 40 people rated 400 fictional Instagram ads. Half were generated with ChatGPT and half were made by hand in Photoshop and Illustrator, shown under three levels of AI disclosure. We built our own survey platform to control the randomisation and the disclosure groups.",
    meta: {
      Type: "Bachelor thesis, Informatics (15 credits)",
      Method: "A/B experiment, custom survey platform, ANOVA and paired t-tests",
      Context: "Jönköping University, 2026, with Charlie Eklund",
    },
    blocks: [
      {
        type: "stats",
        items: [
          { value: "79.8%", label: "Detection accuracy", detail: "People spotted which ads were AI far above chance (50%)." },
          { value: "86%", label: "AI ads caught", detail: "Most AI-generated ads were correctly identified as AI." },
          { value: "+10.1%", label: "Trust for human-made", detail: "Human-made ads were rated more trustworthy (p = .003)." },
          { value: "No gap", label: "In visual appeal", detail: "AI ads looked just as good: 3.53 vs 3.44, not significant." },
        ],
      },
      {
        type: "insight",
        kicker: "The key finding",
        title: "The penalty is psychological.",
        text: "Trust didn't follow what an ad actually was. It followed what people believed it was. AI-generated ads that were suspected of being AI scored 2.99 for trust; the ones that passed as human scored 3.54. Human-made ads that looked like AI took a hit too. And labelling AI content didn't change any of it: disclosure had no significant effect on any of the five measures.",
      },
      {
        type: "gallery",
        caption: "A selection of the AI-generated ads, made with ChatGPT from documented prompts. Only technical errors were corrected.",
        items: [
          { src: "assets/img/thesis-ai-velore.webp", w: 900, h: 1350, alt: "AI-generated perfume ad for the fictional brand Veloré, with the tagline 'Scent, Evolved.'" },
          { src: "assets/img/thesis-ai-dragon.webp", w: 900, h: 1350, alt: "AI-generated film poster for 'The Dragon's Heart'." },
          { src: "assets/img/thesis-ai-lastlight.webp", w: 900, h: 1350, alt: "AI-generated poster titled 'The last light of hope'." },
          { src: "assets/img/thesis-ai-nailstudio.webp", w: 900, h: 1125, alt: "AI-generated ad for a nail studio in Jönköping." },
        ],
      },
      {
        type: "note",
        text: "What it means: brands that swap human work for AI save on production but pay a trust premium, whether or not the ad is labelled. For the EU AI Act, which assumes labels protect consumers, our data suggests people often don't need the label to notice. Limitations: 40 participants, mostly aged 18–24, so the results point in a direction rather than settle it.",
      },
    ],
  },
  {
    id: "dishdash",
    title: "Dishdash",
    type: "UX & app design",
    summary:
      "A food-delivery app designed around what people actually complain about: late or cold food, confusing order status, hidden fees and support that's hard to find. We started with a competitor analysis of Foodora, Uber Eats, Wolt and Bolt Food, then interviews and a survey. The findings became personas, a sitemap, paper sketches and finally an interactive Figma prototype in a warm, playful orange.",
    meta: {
      Role: "Research, wireframes, UI design, usability testing",
      Tools: "Figma, Illustrator",
      Context: "UX design course, Jönköping University, 2024 · team of three",
    },
    blocks: [
      {
        type: "gallery",
        cols: 5,
        caption: "The order flow: browse by cuisine, pick a restaurant, review the cart, choose delivery and payment, then follow the driver.",
        items: [
          { src: "assets/img/dishdash-screen-18.webp", w: 600, h: 1298, alt: "Home screen with restaurants grouped by cuisine: sushi, pasta and Asian." },
          { src: "assets/img/dishdash-screen-13.webp", w: 600, h: 1298, alt: "Restaurant page for Eataly with popular dishes and add buttons." },
          { src: "assets/img/dishdash-screen-14.webp", w: 600, h: 1298, alt: "Cart view with items, quantities, a message to the restaurant and add-ons." },
          { src: "assets/img/dishdash-screen-15.webp", w: 600, h: 1298, alt: "Checkout with delivery time, delivery or pick-up, and payment by card, Apple Pay, Swish, Klarna or PayPal." },
          { src: "assets/img/dishdash-screen-17.webp", w: 600, h: 1298, alt: "Tracking screen with a map, estimated delivery time and a contact driver button." },
        ],
      },
      {
        type: "stats",
        items: [
          { value: "39", label: "Survey responses", detail: "Plus phone interviews, to find what makes or breaks a delivery app." },
          { value: "2", label: "Personas", detail: "A student in central Jönköping and a suburban dad with picky eaters." },
          { value: "5", label: "Usability tests", detail: "Run on campus with the Figma prototype on a real phone." },
          { value: "18", label: "Screens", detail: "From the home feed to live tracking, support and account." },
        ],
      },
      { type: "image", src: "assets/img/dishdash-sitemap.webp", w: 1800, h: 626, bg: "#fff", alt: "Sitemap: home page branching into account, browse restaurants, cart and checkout, and customer support.", caption: "The sitemap. Everything reachable from home, and home reachable from everywhere." },
      {
        type: "gallery",
        caption: "Personas and paper wireframes, before anything went into Figma.",
        items: [
          { src: "assets/img/dishdash-persona-1.webp", w: 1000, h: 1085, alt: "Persona: Emily Johansson, 21, student in Jönköping." },
          { src: "assets/img/dishdash-persona-2.webp", w: 1000, h: 999, alt: "Persona: Björn Larsson, 35, parent living in a suburb." },
          { src: "assets/img/dishdash-sketch-1.webp", w: 900, h: 1200, alt: "Hand-drawn wireframes of the home and restaurant screens." },
          { src: "assets/img/dishdash-sketch-2.webp", w: 900, h: 1200, alt: "Hand-drawn wireframes of the cart, checkout and confirmation screens." },
        ],
      },
      {
        type: "insight",
        kicker: "What testing changed",
        title: "Five tests, five fixes.",
        text: "The script typeface was hard to read, so it now appears only in the logo and a few titles. People got lost, so we added a back button and home buttons on the confirmation and tracking pages. The tracking page gained the delivery address and a way to contact the driver. The loud orange payment boxes were toned down to 50% with a solid outline. And we added more information about dishes and restaurants throughout.",
      },
      {
        type: "pair",
        narrow: true,
        items: [
          { src: "assets/img/dishdash-screen-1.webp", w: 600, h: 1298, alt: "Support screen with telephone, live chat and mail options." },
          { src: "assets/img/dishdash-screen-3.webp", w: 600, h: 1298, alt: "Account screen with profile details, order history and favourites." },
        ],
      },
      { type: "note", text: "Support was one of the most requested features in the research, so it sits in the bottom bar on every screen instead of being buried in a menu." },
    ],
  },
  {
    id: "taberg-springs",
    title: "Taberg Springs",
    type: "Packaging & brand",
    summary:
      "A sparkling water brand named after Taberg, the mountain just outside Jönköping. The label reduces the landscape to a few flat shapes (peaks, meadow, a waterfall) and the scalloped gold band follows the ridgeline. Forest green, sky blue and gold keep it fresh without shouting.",
    meta: {
      Role: "Brand name, label illustration, packaging mockups",
      Tools: "Illustrator, Photoshop",
      Context: "Marketing Communication, Jönköping University, 2024",
    },
    blocks: [
      { type: "image", src: "assets/img/taberg-front.webp", w: 640, h: 1200, narrow: true, bg: "#d2d2d2", alt: "Front view of the Taberg Springs can: mountain and waterfall illustration above a gold 'Sparkling Water' band." },
      { type: "image", src: "assets/img/taberg-lineup.webp", w: 2048, h: 1044, alt: "Four angles of the Taberg Springs can mockup." },
    ],
  },
  {
    id: "monarki",
    title: "Monarki",
    type: "Packaging concept",
    summary:
      "The brief: design a box for a single word. I picked “Monarki” and gave it a slogan, “Ett styre, en styr” (one rule, one ruler). The box uses the blue and yellow of the Swedish flag, a royal pattern that wraps all the way around, and “Est. 1544”, the year the Swedish crown became hereditary. A small “Demokrati ingår ej” (democracy not included) adds a wink. Underneath, the crowns from all four sides flow together into the Swedish flag.",
    meta: {
      Role: "Concept, slogan, typography, packaging",
      Type: "Frank Gothic Heavy and Book",
      Context: "University admission test, 2023",
    },
    blocks: [
      { type: "image", src: "assets/img/monarki-1.webp", w: 1600, h: 800, alt: "Flat artwork for the Monarki box: yellow wordmark, crown and slogan on a royal blue pattern." },
      {
        type: "gallery",
        light: true,
        items: [
          { src: "assets/img/monarki-3.webp", w: 738, h: 405, alt: "Monarki box mockup seen from above." },
          { src: "assets/img/monarki-2.webp", w: 738, h: 468, alt: "Monarki box mockup from the front, with a crown fading from blue to yellow." },
          { src: "assets/img/monarki-4.webp", w: 795, h: 616, alt: "The underside of the Monarki box, where the four crowns form the Swedish flag." },
        ],
      },
    ],
  },
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
  // Bubble floats up and to the right, clear of the cow.
  moo.style.left = `${x + r.width + 10}px`;
  moo.style.top = `${y - 46}px`;
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

// Case-study order (prev/next) follows the order of the cards in the grid.
const cardOrder = cards.map((c) => c.dataset.project);
PROJECTS.sort((a, b) => cardOrder.indexOf(a.id) - cardOrder.indexOf(b.id));

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
      return h("div", { class: `case__pair${block.narrow ? " case__pair--narrow" : ""}` }, block.items.map((i) => h("figure", { class: "case__figure" }, img(i))));
    case "video":
      return h("figure", { class: "case__figure case__figure--video" }, [
        h("video", { src: block.src, poster: block.poster, controls: true, playsinline: true, preload: "metadata" }),
        block.caption && h("figcaption", { text: block.caption, style: "text-align:center" }),
      ]);
    case "note":
      return h("p", { class: "case__note", text: block.text });
    case "stats":
      return h(
        "ul",
        { class: "stats" },
        block.items.map((i) =>
          h("li", {}, [
            h("span", { class: "stats__value", text: i.value }),
            h("span", { class: "stats__label", text: i.label }),
            h("span", { class: "stats__detail", text: i.detail }),
          ])
        )
      );
    case "insight":
      return h("section", { class: "insight" }, [
        h("p", { class: "insight__kicker", text: block.kicker }),
        h("h3", { class: "insight__title", text: block.title }),
        h("p", { class: "insight__text", text: block.text }),
      ]);
    case "gallery":
      return h("figure", { class: `case__gallery${block.light ? " case__gallery--light" : ""}` }, [
        h("div", { class: "case__gallery-grid", style: `--cols:${block.cols || Math.min(block.items.length, 4)}` }, block.items.map(img)),
        block.caption && h("figcaption", { text: block.caption }),
      ]);
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

// Other links into a case study (e.g. from the AI section).
$$("[data-open-project]").forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openProject(link.dataset.openProject);
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
  "%cHej! 👋%c\nNo frameworks, no templates. Designed by me, pair-programmed with Claude.\nLike what you see? markus.ekerheim@gmail.com",
  "font: 700 24px/1.4 sans-serif; color: #398481",
  "font: 14px/1.5 sans-serif; color: inherit"
);
