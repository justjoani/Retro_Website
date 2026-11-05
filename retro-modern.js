/* retro-modern.js – Fortschrittsleiste, Kachel-Neigung, Funken beim Warenkorb, Hero-Parallax */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Fortschrittsleiste: zeigt, wie weit man die Seite gescrollt hat */
  var bar = document.createElement("div");
  bar.id = "retro-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    if (!reduce) {
      var hero = document.querySelector("#fh5co-hero .flexslider .slides > li, #fh5co-header");
      if (hero && window.scrollY < 900) hero.style.backgroundPosition = "center " + (50 + window.scrollY / 30) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (reduce) return;

  /* Produktkacheln neigen sich leicht zur Maus (nur mit echter Maus) */
  if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", function (e) {
      var g = e.target.closest && e.target.closest(".product-grid");
      if (!g) return;
      var r = g.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      g.style.transform = "perspective(700px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg)";
    });
    document.addEventListener("mouseout", function (e) {
      var g = e.target.closest && e.target.closest(".product-grid");
      if (g && !g.contains(e.relatedTarget)) g.style.transform = "";
    });
  }

  /* Pixel-Funken beim Hinzufügen zum Warenkorb */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".add-to-cart");
    if (!b) return;
    var r = b.getBoundingClientRect();
    var colors = ["#ffe600", "#ff2a6d", "#05d9e8", "#7b2ff7"];
    for (var i = 0; i < 10; i++) {
      var s = document.createElement("span");
      s.className = "retro-spark";
      s.style.left = r.left + r.width / 2 + "px";
      s.style.top = r.top + r.height / 2 + "px";
      s.style.background = colors[i % colors.length];
      var a = (Math.PI * 2 * i) / 10;
      s.style.setProperty("--dx", Math.cos(a) * 46 + "px");
      s.style.setProperty("--dy", Math.sin(a) * 46 + "px");
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }, 750, s);
    }
  });
})();
