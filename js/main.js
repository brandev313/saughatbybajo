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

  $("#yr").textContent = new Date().getFullYear();
})();
