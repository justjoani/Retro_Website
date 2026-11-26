/* Reiner Demo-Checkout: keine Zahlung, keine Bestellung an einen Server, keine Personendaten. */
(function () {
  "use strict";
  var CART_KEY = "retroCart";
  var DEMO_KEY = "retroDemoLastOrder";
  var products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  var byId = Object.create(null);
  products.forEach(function (product) {
    if (product && typeof product.id === "string") byId[product.id] = product;
  });

  var itemBox = document.getElementById("demo-items");
  var subtotalBox = document.getElementById("demo-subtotal");
  var totalBox = document.getElementById("demo-total");
  var button = document.getElementById("demo-place-order");
  var view = document.getElementById("demo-checkout");
  var success = document.getElementById("demo-confirmation");
  var successHeading = document.getElementById("demo-confirmation-heading");
  var successMessage = document.getElementById("demo-confirmation-message");
  if (!itemBox || !subtotalBox || !totalBox || !button || !view || !success) return;

  function euro(amount) {
    return amount.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  }
  function loadCart() {
    var raw;
    try { raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch (error) { return []; }
    if (!Array.isArray(raw)) return [];

    var combined = Object.create(null);
    raw.forEach(function (item) {
      if (!item || typeof item.id !== "string") return;
      var p = byId[item.id];
      if (!p || !Number.isFinite(Number(p.price)) || Number(p.price) < 0) return;
      var qty = Number(item.qty);
      if (!Number.isInteger(qty) || qty < 1) return;
      combined[item.id] = Math.min(99, (combined[item.id] || 0) + qty);
    });
    return Object.keys(combined).map(function (id) {
      var p = byId[id];
      return {
        id: id,
        name: p.name,
        image: (p.images && p.images[0]) || p.image || "",
        price: Number(p.price),
        qty: combined[id]
      };
    });
  }
  function el(tag, name, value) {
    var node = document.createElement(tag);
    if (name) node.className = name;
    if (value !== undefined) node.textContent = value;
    return node;
  }

  var cart = loadCart();
  function render() {
    itemBox.textContent = "";
    if (!cart.length) {
      var empty = el("p", "demo-empty", "Dein Warenkorb ist leer. Lege zuerst ein Produkt hinein, um den Demo-Checkout zu testen.");
      itemBox.appendChild(empty);
      button.disabled = true;
    } else {
      cart.forEach(function (item) {
        var row = el("div", "demo-item");
        if (item.image) {
          var img = el("img", "demo-thumb");
          img.src = item.image;
          img.alt = "";
          img.width = 82;
          img.height = 82;
          img.loading = "lazy";
          row.appendChild(img);
        }
        var detail = el("div", "demo-item-info");
        var link = el("a", "", item.name);
        link.href = "single.html?id=" + encodeURIComponent(item.id);
        detail.appendChild(link);
        detail.appendChild(el("p", "", "Menge: " + item.qty + " × " + euro(item.price)));
        row.appendChild(detail);
        row.appendChild(el("span", "demo-item-price", euro(item.price * item.qty)));
        itemBox.appendChild(row);
      });
      button.disabled = false;
    }
    var cents = cart.reduce(function (sum, item) {
      return sum + Math.round(item.price * 100) * item.qty;
    }, 0);
    subtotalBox.textContent = euro(cents / 100);
    totalBox.textContent = euro(cents / 100);
  }
  render();

  button.addEventListener("click", function () {
    // Nochmals lesen, falls sich der Warenkorb in einem zweiten Tab verändert hat.
    cart = loadCart();
    if (!cart.length) { render(); return; }

    var cents = cart.reduce(function (sum, item) {
      return sum + Math.round(item.price * 100) * item.qty;
    }, 0);
    var reference = "DEMO-" + Date.now().toString(36).toUpperCase();
    // Nur anonyme Artikel-ID, Menge und Summe lokal speichern, keine persönlichen Angaben.
    try {
      localStorage.setItem(DEMO_KEY, JSON.stringify({
        reference: reference,
        items: cart.map(function (item) { return { id: item.id, qty: item.qty }; }),
        totalCents: cents
      }));
      localStorage.removeItem(CART_KEY);
    } catch (error) {
      // Lokaler Speicher ist optional; die Simulation funktioniert auch ohne ihn.
    }
    view.hidden = true;
    success.hidden = false;
    successMessage.textContent = "Testnummer " + reference + " · Demo-Gesamtwert: " + euro(cents / 100) + ".";
    if (successHeading) successHeading.focus();
  });
})();
