(() => {
  const WA = "923147668207"; // WhatsApp number, country code first, no +
  const $ = (s, r = document) => r.querySelector(s);

  // Mobile menu
  const burger = $(".burger"), menu = $("#menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", e => { if (e.target.tagName === "A") menu.classList.remove("open"); });

  // Reveal on scroll
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 })
    : null;
  document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  // Product buttons pre-select the order form
  document.querySelectorAll("[data-product]").forEach(b =>
    b.addEventListener("click", () => { $("#orderForm [name=product]").value = b.dataset.product; }));

  // Order form -> WhatsApp message
  const form = $("#orderForm"), err = $(".err", form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const ok = ["name", "phone", "city", "address"].every(k => (d[k] || "").trim());
    err.hidden = ok;
    if (!ok) return;
    const msg = [
      "Assalam o Alaikum Saughat by Bajo! I would like to order:",
      `Product: ${d.product} (${d.size}) x ${d.qty}`,
      `Name: ${d.name}`, `Phone: ${d.phone}`, `City: ${d.city}`,
      `Address: ${d.address}`, `Payment: ${d.pay}`
    ].join("\n");
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  // Hero image slider (manual: arrows, dots, swipe, arrow keys)
  const car = $(".carousel");
  if (car) {
    const track = $(".car-track", car), slides = [...car.querySelectorAll(".slide")], n = slides.length, dotsEl = $(".dots", car);
    let cur = 0;
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "dot"; b.setAttribute("aria-label", `Show product ${i + 1}`);
      b.addEventListener("click", () => go(i)); dotsEl.appendChild(b); return b;
    });
    function go(i) {
      cur = ((i % n) + n) % n;
      track.style.transform = `translateX(-${cur * 100}%)`;
      slides.forEach((s, k) => s.setAttribute("aria-hidden", k !== cur));
      dots.forEach((b, k) => { b.classList.toggle("on", k === cur); b.toggleAttribute("aria-current", k === cur); });
    }
        car.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(cur + 1); if (e.key === "ArrowLeft") go(cur - 1); });
    let x0 = null;
    car.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); });
    go(0);
  }

  // WhatsApp reviews: endless moving slider
  const wa = $(".wa-slider");
  if (wa && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const t = $(".wa-track", wa), cards = [...t.children];
    cards.forEach(c => { const k = c.cloneNode(true); k.setAttribute("aria-hidden", "true"); t.appendChild(k); });
    wa.style.setProperty("--wa-dur", cards.length * 7 + "s");
    wa.classList.add("is-moving");
  }

  $("#yr").textContent = new Date().getFullYear();
})();
