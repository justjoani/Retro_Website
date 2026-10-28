/* shop.js – baut Produktlisten und die Detailseite aus products.js.
   Listen:  <div data-products></div>  (optional data-category="...", data-limit="6", data-exclude-current)
   Detailseite: Container mit data-product-page, darin Elemente mit
   data-product="name | price | description | image | gallery | cart-button" */
(function () {
  var products = window.PRODUCTS || [];

  function euro(n) {
    return Number(n).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  }
  function imagesOf(p) {
    if (p.images && p.images.length) return p.images;
    return p.image ? [p.image] : [];
  }
  function mainImage(p) {
    return imagesOf(p)[0] || "";
  }
  function byId(id) {
    return products.filter(function (p) { return p.id === id; })[0];
  }
  function currentId() {
    return new URLSearchParams(location.search).get("id");
  }
  function detailUrl(p) {
    return "single.html?id=" + encodeURIComponent(p.id);
  }
  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* Eine Produktkarte: beim Hovern wechseln die Bilder, ein Klick öffnet das Produkt */
  function buildCard(p) {
    var col = el("div", "col-md-4 text-center");
    var box = el("div", "product");
    var imgs = imagesOf(p);

    var grid = el("div", "product-grid");
    grid.style.backgroundImage = 'url("' + encodeURI(mainImage(p)) + '")';
    grid.style.cursor = "pointer";
    if (p.sale) grid.appendChild(el("span", "sale", "Sale"));

    var inner = el("div", "inner");
    var para = el("p");

    var add = el("a", "icon add-to-cart");
    add.href = "#";
    add.setAttribute("data-id", p.id);
    add.setAttribute("data-name", p.name);
    add.setAttribute("data-price", String(p.price));
    add.setAttribute("data-image", mainImage(p));
    add.setAttribute("data-url", detailUrl(p));
    add.setAttribute("aria-label", "In den Warenkorb: " + p.name);
    add.appendChild(el("i", "icon-shopping-cart"));

    var eye = el("a", "icon");
    eye.href = detailUrl(p);
    eye.setAttribute("aria-label", "Details: " + p.name);
    eye.appendChild(el("i", "icon-eye"));

    para.appendChild(add);
    para.appendChild(eye);
    inner.appendChild(para);
    grid.appendChild(inner);

    /* Bildwechsel beim Hovern (nur bei mehreren Bildern) */
    if (imgs.length > 1) {
      imgs.forEach(function (src) { new Image().src = src; }); /* vorladen */
      var timer = null;
      var idx = 0;
      var show = function (i) {
        grid.style.backgroundImage = 'url("' + encodeURI(imgs[i]) + '")';
      };
      grid.addEventListener("mouseenter", function () {
        if (timer) return;
        idx = (idx + 1) % imgs.length;
        show(idx);
        timer = setInterval(function () {
          idx = (idx + 1) % imgs.length;
          show(idx);
        }, 900);
      });
      grid.addEventListener("mouseleave", function () {
        clearInterval(timer);
        timer = null;
        idx = 0;
        show(0);
      });
    }

    /* Klick aufs Bild = gleiches Ziel wie der Produktname (Symbole behalten ihre eigene Funktion) */
    grid.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      location.href = detailUrl(p);
    });

    var desc = el("div", "desc");
    var h3 = el("h3");
    var link = el("a", "", p.name);
    link.href = detailUrl(p);
    h3.appendChild(link);
    desc.appendChild(h3);
    desc.appendChild(el("span", "price", euro(p.price)));

    box.appendChild(grid);
    box.appendChild(desc);
    col.appendChild(box);
    return col;
  }

  /* Alle Listen auf der Seite füllen, je drei Produkte pro Reihe */
  function renderGrids() {
    document.querySelectorAll("[data-products]").forEach(function (target) {
      var category = target.getAttribute("data-category");
      var limit = parseInt(target.getAttribute("data-limit"), 10);
      var exclude = target.hasAttribute("data-exclude-current") ? currentId() : null;

      var list = products.filter(function (p) {
        return (!category || p.category === category) && p.id !== exclude;
      });
      if (limit > 0) list = list.slice(0, limit);

      target.textContent = "";
      if (!list.length) {
        target.appendChild(el("p", "text-center", "Keine Produkte gefunden."));
        return;
      }
      for (var i = 0; i < list.length; i += 3) {
        var row = el("div", "row");
        list.slice(i, i + 3).forEach(function (p) {
          row.appendChild(buildCard(p));
        });
        target.appendChild(row);
      }
    });
  }

  function setText(key, text) {
    document.querySelectorAll("[data-product='" + key + "']").forEach(function (e) {
      e.textContent = text;
    });
  }

  function showImage(src, name) {
    document.querySelectorAll("[data-product='image']").forEach(function (e) {
      if (e.tagName === "IMG") {
        e.src = src;
        e.alt = name;
      } else {
        e.style.backgroundImage = 'url("' + encodeURI(src) + '")';
      }
    });
  }

  /* Vorschaubilder unter dem Hauptbild, nur wenn es mehrere Bilder gibt */
  function buildGallery(p) {
    var imgs = imagesOf(p);
    document.querySelectorAll("[data-product='gallery']").forEach(function (gal) {
      gal.textContent = "";
      if (imgs.length < 2) return;
      imgs.forEach(function (src, i) {
        var a = el("a", i === 0 ? "active" : "");
        a.href = "#";
        a.setAttribute("aria-label", "Bild " + (i + 1) + " von " + imgs.length + ": " + p.name);
        var im = document.createElement("img");
        im.src = src;
        im.alt = "";
        a.appendChild(im);
        a.addEventListener("click", function (e) {
          e.preventDefault();
          showImage(src, p.name);
          gal.querySelectorAll("a").forEach(function (x) { x.classList.remove("active"); });
          a.classList.add("active");
        });
        gal.appendChild(a);
      });
    });
  }

  /* Detailseite: ohne ?id= das erste Produkt, bei falscher id eine Meldung */
  function fillDetail() {
    if (!document.querySelector("[data-product-page]")) return;
    var id = currentId();
    var p = id ? byId(id) : products[0];

    if (!p) {
      setText("name", "Produkt nicht gefunden");
      setText("price", "");
      setText("description", "Dieses Produkt gibt es nicht. Bitte wähle eines aus dem Shop.");
      return;
    }

    document.title = p.name + " \u2014 Retro Gaming Gear";
    setText("name", p.name);
    setText("price", euro(p.price));
    setText("description", p.description);
    showImage(mainImage(p), p.name);
    buildGallery(p);

    document.querySelectorAll("[data-product='cart-button']").forEach(function (b) {
      b.classList.add("add-to-cart");
      b.setAttribute("href", "#");
      b.setAttribute("data-id", p.id);
      b.setAttribute("data-name", p.name);
      b.setAttribute("data-price", String(p.price));
      b.setAttribute("data-image", mainImage(p));
      b.setAttribute("data-url", detailUrl(p));
    });

    /* Bewertungen gehören zum jeweiligen Produkt */
    var form = document.getElementById("review-form");
    if (form) form.setAttribute("data-product-id", p.id);
  }

  renderGrids();
  fillDetail();
})();
