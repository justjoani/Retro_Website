/* cart.js – Warenkorb mit Bild und Link zum Produkt (localStorage)
   Einbinden auf JEDER Seite kurz vor </body>:  <script src="cart.js"></script>

   Buttons brauchen: class="add-to-cart" data-id data-name data-price
   Optional: data-image="images/..." data-url="single.html"
   Fehlen data-image / data-url, sucht das Skript Bild und Link selbst im Produkt. */
(function () {
  var KEY = "retroCart";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function save(cart) {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {}
  }
  function euro(n) {
    return n.toFixed(2).replace(".", ",") + " €";
  }

  /* Bild des Produkts finden */
  function guessImage(btn) {
    var box = btn.closest(".product");
    if (box) {
      var grid = box.querySelector(".product-grid");
      if (grid && grid.style.backgroundImage) {
        var m = /url\(["']?(.*?)["']?\)/.exec(grid.style.backgroundImage);
        if (m) return m[1];
      }
      var own = box.querySelector("img");
      if (own) return own.getAttribute("src");
      return "";
    }
    /* Großer Slider auf der Startseite: Bild steht als Hintergrund im <li> */
    var slide = btn.closest("li[style*='background-image']");
    if (slide) {
      var sm = /url\(["']?(.*?)["']?\)/.exec(slide.style.backgroundImage);
      if (sm) return sm[1];
    }
    /* Einzelprodukt-Seite */
    var img = document.querySelector(".product-carousel img, .product-detail img, .owl-carousel img");
    return img ? img.getAttribute("src") : "";
  }

  /* Link zur Produktseite finden */
  function guessUrl(btn) {
    var box = btn.closest(".product");
    if (box) {
      var a = box.querySelector("h3 a[href]:not([href='#']), a[href*='single']");
      if (a) return a.getAttribute("href");
    }
    var file = location.pathname.split("/").pop() || "index.html";
    /* Auf der Einzelprodukt-Seite ist es die Seite selbst, sonst die Detailseite */
    if (file.indexOf("single") === 0) return file + location.search;
    return "single.html";
  }

  /* Zähler im Menü aktualisieren */
  function updateBadge() {
    var n = load().reduce(function (sum, i) { return sum + i.qty; }, 0);
    document.querySelectorAll("a.cart small").forEach(function (el) {
      el.textContent = n;
    });
  }

  /* Produkt hinzufügen */
  function addItem(item) {
    var cart = load();
    var found = cart.filter(function (i) { return i.id === item.id; })[0];
    if (found) {
      found.qty += 1;
      if (!found.image && item.image) found.image = item.image;
      if (!found.url && item.url) found.url = item.url;
    } else {
      item.qty = 1;
      cart.push(item);
    }
    save(cart);
    updateBadge();
  }

  function makeButton(label, action, id, extraClass) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.setAttribute("data-action", action);
    b.setAttribute("data-id", id);
    if (extraClass) b.className = extraClass;
    return b;
  }

  /* Warenkorb-Seite zeichnen (nur wenn #cart-items existiert) */
  function renderCart() {
    var box = document.getElementById("cart-items");
    if (!box) return;
    var cart = load();
    box.textContent = "";

    if (cart.length === 0) {
      var p = document.createElement("p");
      p.textContent = "Dein Warenkorb ist noch leer.";
      var back = document.createElement("a");
      back.href = "index.html";
      back.className = "btn";
      back.textContent = "Weiter einkaufen";
      box.appendChild(p);
      box.appendChild(back);
      return;
    }

    var table = document.createElement("table");
    table.className = "table";
    var head = table.createTHead().insertRow();
    ["Produkt", "", "Preis", "Menge", "Summe", ""].forEach(function (t) {
      var th = document.createElement("th");
      th.textContent = t;
      head.appendChild(th);
    });

    var body = table.createTBody();
    var total = 0;
    cart.forEach(function (item) {
      var row = body.insertRow();
      var sum = item.price * item.qty;
      total += sum;

      /* Bild (anklickbar) */
      var imgCell = row.insertCell();
      if (item.image) {
        var img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.style.width = "90px";
        img.style.height = "auto";
        if (item.url) {
          var imgLink = document.createElement("a");
          imgLink.href = item.url;
          imgLink.appendChild(img);
          imgCell.appendChild(imgLink);
        } else {
          imgCell.appendChild(img);
        }
      }

      /* Name (anklickbar) */
      var nameCell = row.insertCell();
      if (item.url) {
        var nameLink = document.createElement("a");
        nameLink.href = item.url;
        nameLink.textContent = item.name;
        nameCell.appendChild(nameLink);
      } else {
        nameCell.textContent = item.name;
      }

      row.insertCell().textContent = euro(item.price);

      var qtyCell = row.insertCell();
      qtyCell.appendChild(makeButton("-", "minus", item.id));
      qtyCell.appendChild(document.createTextNode(" " + item.qty + " "));
      qtyCell.appendChild(makeButton("+", "plus", item.id));

      row.insertCell().textContent = euro(sum);

      row.insertCell().appendChild(makeButton("X", "remove", item.id, "eightbit-btn--reset"));
    });
    box.appendChild(table);

    var totalEl = document.createElement("h3");
    totalEl.textContent = "Gesamt: " + euro(total);
    box.appendChild(totalEl);

    var more = document.createElement("a");
    more.href = "index.html";
    more.className = "btn";
    more.textContent = "Weiter einkaufen";
    box.appendChild(more);

    var clear = document.createElement("button");
    clear.type = "button";
    clear.textContent = "Warenkorb leeren";
    clear.className = "eightbit-btn--reset";
    clear.setAttribute("data-action", "clear");
    box.appendChild(clear);
  }

  /* Klicks abfangen */
  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".add-to-cart");
    if (addBtn) {
      e.preventDefault();
      addItem({
        id: addBtn.getAttribute("data-id"),
        name: addBtn.getAttribute("data-name"),
        price: parseFloat(addBtn.getAttribute("data-price")) || 0,
        image: addBtn.getAttribute("data-image") || guessImage(addBtn),
        url: addBtn.getAttribute("data-url") || guessUrl(addBtn)
      });
      var old = addBtn.textContent;
      if (old.trim()) {
        addBtn.textContent = "Hinzugefügt!";
        setTimeout(function () { addBtn.textContent = old; }, 1000);
      }
      return;
    }

    var actBtn = e.target.closest("[data-action]");
    if (!actBtn) return;
    var action = actBtn.getAttribute("data-action");
    var id = actBtn.getAttribute("data-id");
    var cart = load();

    if (action === "clear") {
      cart = [];
    } else {
      cart = cart.map(function (i) {
        if (i.id !== id) return i;
        if (action === "plus") i.qty += 1;
        if (action === "minus") i.qty -= 1;
        return i;
      }).filter(function (i) {
        return !(i.id === id && (action === "remove" || i.qty < 1));
      });
    }
    save(cart);
    updateBadge();
    renderCart();
  });

  updateBadge();
  renderCart();
})();
