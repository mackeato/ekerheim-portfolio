/* Portfolio wrapper for Benny the Bird. The game itself (main.js) is unchanged:
   this file only places the p5 canvas in the page, adds on-screen controls for
   touch devices and a mute toggle, and stops game keys from scrolling the page. */

(function () {
  const cabinet = document.getElementById("cabinet");
  const loading = document.getElementById("loading");

  // p5 appends its canvas to <body>; move it into the cabinet once it exists.
  const place = setInterval(() => {
    const canvas = document.querySelector("canvas.p5Canvas");
    if (!canvas) return;
    cabinet.prepend(canvas);
    loading.hidden = true;
    clearInterval(place);
  }, 50);

  // Browsers only allow sound after a user gesture.
  const unlockAudio = () => {
    if (typeof userStartAudio === "function") userStartAudio();
  };
  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });

  // Keep Space and the arrow keys for the game instead of scrolling the page.
  window.addEventListener(
    "keydown",
    (e) => {
      if ([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    },
    { passive: false }
  );

  // On-screen buttons feed the same key values the game listens for.
  const press = (k, code) => {
    window.key = k;
    window.keyCode = code;
    if (typeof keyPressed === "function") keyPressed();
  };
  const release = () => {
    if (typeof keyReleased === "function") keyReleased();
  };

  document.querySelectorAll("[data-key]").forEach((btn) => {
    const k = btn.dataset.key;
    const code = Number(btn.dataset.code || 0);
    const hold = btn.hasAttribute("data-hold");
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      unlockAudio();
      press(k, code);
      if (hold) btn.setPointerCapture(e.pointerId);
    });
    if (hold) {
      ["pointerup", "pointercancel", "lostpointercapture"].forEach((t) => btn.addEventListener(t, release));
    }
  });

  // Mute toggle, remembered between visits.
  const muteBtn = document.getElementById("mute");
  let muted = false;
  try {
    muted = localStorage.getItem("benny-muted") === "1";
  } catch {}
  const applyMute = () => {
    const vol = muted ? 0 : 1;
    if (typeof outputVolume === "function") outputVolume(vol);
    else if (typeof masterVolume === "function") masterVolume(vol);
    muteBtn.setAttribute("aria-pressed", String(muted));
    muteBtn.textContent = muted ? "Sound off" : "Sound on";
  };
  muteBtn.addEventListener("click", () => {
    muted = !muted;
    try {
      localStorage.setItem("benny-muted", muted ? "1" : "0");
    } catch {}
    applyMute();
  });
  window.addEventListener("load", applyMute);
})();
