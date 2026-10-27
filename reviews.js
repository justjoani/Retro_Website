/* reviews.js - Bewertungen abschicken (localStorage) */
(function () {
  var form = document.getElementById("review-form");
  var list = document.getElementById("review-list");
  if (!form || !list) return;

  var productId = form.getAttribute("data-product-id") ||
    (location.pathname.split("/").pop() + location.search);
  var KEY = "retroReviews:" + productId;

  function say(text, ok) {
    var msg = document.getElementById("review-message");
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = ok ? "#39ff88" : "#ff2a6d";
  }

  function load() {
    try {
      var reviews = JSON.parse(localStorage.getItem(KEY)) || [];
      if (!Array.isArray(reviews)) {
        throw new Error("Stored reviews are not an array.");
      }
      return reviews;
    } catch (e) {
      say("Bewertungen konnten nicht geladen werden.", false);
      return [];
    }
  }

  function save(reviews) {
    localStorage.setItem(KEY, JSON.stringify(reviews));
  }

  function buildReview(r) {
    var wrap = document.createElement("div");

    var blockquote = document.createElement("blockquote");
    var p = document.createElement("p");
    p.textContent = r.text;
    blockquote.appendChild(p);
    wrap.appendChild(blockquote);

    var h = document.createElement("h3");
    h.textContent = "\u2014 " + r.name;
    wrap.appendChild(h);

    var rate = document.createElement("span");
    rate.className = "rate";
    for (var i = 1; i <= 5; i++) {
      var star = document.createElement("i");
      star.className = i <= r.rating ? "icon-star2" : "icon-star-outlined";
      rate.appendChild(star);
    }
    wrap.appendChild(rate);

    return wrap;
  }

  function render() {
    list.textContent = "";
    var feed = document.createElement("div");
    feed.className = "feed";
    load().slice().reverse().forEach(function (r) {
      feed.appendChild(buildReview(r));
    });
    list.appendChild(feed);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("review-name").value.trim();
    var text = document.getElementById("review-text").value.trim();
    var checked = form.querySelector("input[name='review-rating']:checked");
    var rating = checked ? parseInt(checked.value, 10) : 0;

    if (!name || !text || rating < 1 || rating > 5) {
      say("Bitte Name, Sternebewertung und Text ausfüllen.", false);
      return;
    }

    var reviews = load();
    reviews.push({
      name: name.slice(0, 40),
      text: text.slice(0, 500),
      rating: rating,
      date: new Date().toISOString()
    });

    try {
      save(reviews);
    } catch (e) {
      say("Bewertung konnte nicht im Browser gespeichert werden.", false);
      return;
    }

    render();
    form.reset();
    say("Danke für deine Bewertung!", true);
  });

  render();
})();
