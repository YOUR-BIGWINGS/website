(function () {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  const root = document.createElement("div");
  root.className = "bg-blobs";
  document.body.appendChild(root);

  const colors = [
    "rgba(124,92,255,0.65)", // accent
    "rgba(110,231,255,0.6)", // primary
    "rgba(40,224,169,0.6)", // accent-2
  ];

  const blobCount = Math.max(
    3,
    Math.min(6, Math.floor(window.innerWidth / 500) + 3)
  );

  const blobs = Array.from({ length: blobCount }).map((_, i) => {
    const el = document.createElement("div");
    el.className = "blob";
    const size = 18 + Math.random() * 14; // vmin size
    el.style.setProperty("--size", `${size}vmax`);
    const color = colors[i % colors.length];
    el.style.setProperty("--color", color);
    root.appendChild(el);
    return el;
  });

  function move(el) {
    const pad = 14; // tighter bounds for subtler motion
    const x = pad + Math.random() * (100 - pad * 2);
    const y = pad + Math.random() * (100 - pad * 2);
    el.style.transform = `translate(${x}vw, ${y}vh)`;
  }

  function shuffleAll() {
    blobs.forEach((b, idx) => {
      // small stagger so they don't sync
      const delay = idx * 200 + Math.random() * 600;
      setTimeout(() => move(b), delay);
    });
  }

  // Initial positions then continue to wander
  shuffleAll();
  const interval = setInterval(shuffleAll, 12000);

  // Keep within bounds on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(shuffleAll, 300);
  });

  // Clean up on page navigation in SPA-like contexts
  window.addEventListener("beforeunload", () => clearInterval(interval));
})();
