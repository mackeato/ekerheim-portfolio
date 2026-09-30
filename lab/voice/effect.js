// Webcam + mic → RGB-split + posterize + edges → conditional wobble/glitch to screen
// Wrapped for the portfolio: starts on demand and returns a stop() function.
window.startMirror = async function () {
  const v   = document.getElementById("v");
  const c   = document.getElementById("c");
  const ctx = c.getContext("2d", { willReadFrequently: true });

  // Offscreen: source frame (from video)
  const srcCanvas = document.createElement("canvas");
  const sctx = srcCanvas.getContext("2d", { willReadFrequently: true });

  // Offscreen: processed (RGB-split + posterize + edge)
  const fxCanvas = document.createElement("canvas");
  const fctx = fxCanvas.getContext("2d", { willReadFrequently: true });

  // Audio
  let ac, an, timeData, freqData;
  let activeStream = null;
  let running = true;

  // --- Tunables ---
  const POSTERIZE_LEVELS = 6;       // 2..8 (fewer = chunkier)
  const EDGE_GAIN = 0.8;            // edge strength scaler
  const EDGE_BIAS = 50;             // edge floor (glow)

  const WOBBLE_FREQ_Y = 1 / 30;     // vertical frequency of wobble lines
  const WOBBLE_VOL_SCALE = 400;     // loudness → shift pixels

  const PITCH_SMOOTHING = 0.85;     // 0..1 (higher = smoother)
  const HIGH_PITCH_HZ = 10000;      //threshold for "S-sound"

  let pitchSmoothHz = 0;

  // --- Start camera + mic ---
  //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 960 }, height: { ideal: 540 } },
      audio: true
    });
    v.srcObject = stream;
    await v.play();
    activeStream = stream;

    // Audio analysis
    // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
    // https://www.youtube.com/watch?v=2O3nm0Nvbi4
    ac = new (window.AudioContext || window.webkitAudioContext)();
    an = ac.createAnalyser();
    an.fftSize = 1024; // frequencyBinCount = 512
    const srcNode = ac.createMediaStreamSource(stream);
    srcNode.connect(an);

    await ac.resume();
    if (ac.state !== "running") {
      const resumeOnce = async () => {
        try { await ac.resume(); } catch {}
        if (ac.state === "running") {
          window.removeEventListener("pointerdown", resumeOnce, true);
          window.removeEventListener("keydown", resumeOnce, true);
        }
      };
      window.addEventListener("pointerdown", resumeOnce, true);
      window.addEventListener("keydown", resumeOnce, true);
    }

    timeData = new Uint8Array(an.fftSize);
    freqData = new Uint8Array(an.frequencyBinCount);
  } catch (err) {
    throw err;
  }

  // --- Size canvases to video ---
  function sizeAll() {
    const w = v.videoWidth || 960;
    const h = v.videoHeight || 540;
    [c, srcCanvas, fxCanvas].forEach(cv => { cv.width = w; cv.height = h; });
  }
  if (v.readyState >= 2) sizeAll();
  else v.addEventListener("loadedmetadata", sizeAll, { once: true });

  // --- Audio helpers ---
  function volume() {
    if (!an || !timeData || (ac && ac.state !== "running")) return 0;
    an.getByteTimeDomainData(timeData);
    let s = 0;
    for (let i = 0; i < timeData.length; i++) {
      const d = (timeData[i] - 128) / 128;
      s += d * d;
    }
    const rms = Math.sqrt(s / timeData.length);
    return Math.min(1, rms * 2);
  }

  function estimatePitchHz() {
    if (!an || !freqData || ac.state !== "running") return 0;
    an.getByteFrequencyData(freqData);
    let num = 0, den = 0;
    for (let i = 0; i < freqData.length; i++) {
      const mag = freqData[i];
      if (mag <= 0) continue;
      num += i * mag;
      den += mag;
    }
    if (den === 0) return 0;
    const centroidIndex = num / den;
    const hzPerBin = ac.sampleRate / an.fftSize;
    return centroidIndex * hzPerBin;
  }

  // --- Math helpers ---
  const clamp = (v, lo, hi) => v < lo ? lo : (v > hi ? hi : v);

  // --- Per-frame RGB split + posterize + edges into fxCanvas ---
  function rgbSplitPosterEdge(time, w, h, pitchBoostPx = 0) {
    // 1) grab frame
    sctx.drawImage(v, 0, 0, w, h);
    const src = sctx.getImageData(0, 0, w, h);
    const s = src.data;

    // 2) dst
    const dst = fctx.createImageData(w, h);
    const d = dst.data;

    // Channel offsets (chromatic aberration), determined by pitch
    const ax = Math.round((6 + pitchBoostPx) * Math.sin(time * 0.0017));
    const ay = Math.round((4 + pitchBoostPx * 0.5) * Math.cos(time * 0.0013));
    const bx = -ax, by = -ay;
    const cx = Math.round((3 + pitchBoostPx * 0.4) * Math.sin(time * 0.0023));
    const cy = -cx;

    const step = Math.floor(256 / POSTERIZE_LEVELS);

    // luma for Sobel
    const lum = new Float32Array(w * h);
    for (let i = 0, p = 0; i < s.length; i += 4, p++) {
      lum[p] = 0.2126 * s[i] + 0.7152 * s[i + 1] + 0.0722 * s[i + 2];
    }

    function sampleIndex(ofsX, ofsY, i) {
      const p = i >> 2;
      const x = p % w;
      const y = (p / w) | 0;
      const xx = clamp(x + ofsX, 0, w - 1);
      const yy = clamp(y + ofsY, 0, h - 1);
      return ((yy * w + xx) << 2);
    }
    function L(x, y) {
      x = clamp(x, 0, w - 1);
      y = clamp(y, 0, h - 1);
      return lum[y * w + x];
    }

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) << 2;

        const ir = sampleIndex(ax, ay, i);
        const ig = sampleIndex(bx, by, i);
        const ib = sampleIndex(cx, cy, i);

        let r = s[ir];
        let g = s[ig + 1];
        let b = s[ib + 2];

        // posterize
        r = ((r / step) | 0) * step;
        g = ((g / step) | 0) * step;
        b = ((b / step) | 0) * step;

        // sobel
        const gx =
          -L(x - 1, y - 1) + L(x + 1, y - 1) +
          -2 * L(x - 1, y)   + 2 * L(x + 1, y) +
          -L(x - 1, y + 1) + L(x + 1, y + 1);

        const gy =
           L(x - 1, y - 1) + 2 * L(x, y - 1) + L(x + 1, y - 1) -
           L(x - 1, y + 1) - 2 * L(x, y + 1) - L(x + 1, y + 1);

        let mag = Math.sqrt(gx * gx + gy * gy);
        mag = Math.min(255, mag * EDGE_GAIN + EDGE_BIAS);

        d[i]     = Math.max(r, mag);
        d[i + 1] = Math.max(g, mag);
        d[i + 2] = Math.max(b, mag);
        d[i + 3] = 255;
      }
    }

    fctx.putImageData(dst, 0, 0);
  }

  // --- Main loop ---
  function loop(time) {
    if (!running) return;
    const w = c.width, h = c.height;
    if (!w || !h || !v.videoWidth) return requestAnimationFrame(loop);

    // audio metrics
    const vol = volume();
    const rawPitch = estimatePitchHz();
    if (rawPitch > 0) {
      pitchSmoothHz = PITCH_SMOOTHING * pitchSmoothHz + (1 - PITCH_SMOOTHING) * rawPitch;
    } else {
      pitchSmoothHz *= PITCH_SMOOTHING;
    }

    // pitch -> extra RGB split pixels
    const pitchBoostPx = Math.max(0, (pitchSmoothHz - HIGH_PITCH_HZ) / 2000); // gentle growth
    rgbSplitPosterEdge(time, w, h, pitchBoostPx);

   
    const amp = vol * WOBBLE_VOL_SCALE;
    const t = performance.now() * 0.002;
    const isHigh = pitchSmoothHz > HIGH_PITCH_HZ && amp > 5;

    if (!isHigh) {
      // ----- Low tone: wobble -----
      for (let y = 0; y < h; y++) {
        const shift = Math.sin(y * (WOBBLE_FREQ_Y) + t) * amp; // y/40 matches original
        const dx = Math.round(shift);

        if (dx >= 0) {
          ctx.drawImage(fxCanvas, 0, y, w - dx, 1, dx, y, w - dx, 1);
          if (dx) ctx.drawImage(fxCanvas, w - dx, y, dx, 1, 0, y, dx, 1);
        } else {
          const sx = -dx;
          ctx.drawImage(fxCanvas, sx, y, w - sx, 1, 0, y, w - sx, 1);
          if (sx) ctx.drawImage(fxCanvas, 0, y, sx, 1, w - sx, y, sx, 1);
        }
      }
    } else {
      // ----- Hig pitch: glitch bands -----
      const band = 3 + ((amp / 20) | 0);
      for (let y = 0; y < h; y += band) {
        const jitter =
          Math.sin(y * 0.15 + t * 7) * (amp * 0.6) +
          Math.sin(y * 0.7 + t * 3.3) * (amp * 0.25);

        const spike = ((y / band) | 0) % 5 === 0 ? amp * 0.5 : 0;

        let dx = Math.round(jitter + spike);
        dx = Math.max(Math.min(dx, w - 1), -(w - 1));
        const hh = Math.min(band, h - y);

        if (dx >= 0) {
          ctx.drawImage(fxCanvas, 0, y, w - dx, hh, dx, y, w - dx, hh);
          if (dx) ctx.drawImage(fxCanvas, w - dx, y, dx, hh, 0, y, dx, hh);
        } else {
          const sx = -dx;
          ctx.drawImage(fxCanvas, sx, y, w - sx, hh, 0, y, w - sx, hh);
          if (sx) ctx.drawImage(fxCanvas, 0, y, sx, hh, w - sx, y, sx, hh);
        }
      }
    }

    requestAnimationFrame(loop);
  }

  // Kick off loop when ready
  if (v.readyState >= 2) requestAnimationFrame(loop);
  else v.addEventListener("loadedmetadata", () => requestAnimationFrame(loop), { once: true });

  return function stop() {
    running = false;
    if (activeStream) activeStream.getTracks().forEach((t) => t.stop());
    if (ac) ac.close();
    v.srcObject = null;
  };
};
