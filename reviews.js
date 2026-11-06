/* reviews.js - Bewertungen abschicken (localStorage) */
(function () {
  var form = document.getElementById("review-form");
  var list = document.getElementById("review-list");
  if (!form || !list) return;

  var productId = new URLSearchParams(location.search).get("id") || form.getAttribute("data-product-id") || (location.pathname.split("/").pop() + location.search);
  var KEY = "retroReviews:" + productId;
  var DEMO = {
    kabel: [
      {name:"Jonas K.", rating:5, text:"Sieht auf dem Schreibtisch richtig cool aus und hält das Ladekabel endlich am Knickpunkt zusammen."},
      {name:"Mira S.", rating:4, text:"Süße Pixelherzen, die Montage dauert keine Minute. Gerne mehr Farben!"}
    ],
    kassette: [
      {name:"Daniel P.", rating:5, text:"Meine alten Spielmodule sind jetzt sicher verstaut. Die Hüllen sitzen perfekt."},
      {name:"Svenja L.", rating:5, text:"Tolles Retro-Gefühl und stabil verarbeitet. Genau, was meine Sammlung gebraucht hat."}
    ],
    notizblockhalter: [
      {name:"Tobias R.", rating:5, text:"Der kleine Röhrenfernseher ist ein Hingucker im Homeoffice und ich verliere keine Zettel mehr."},
      {name:"Nina H.", rating:4, text:"Charmante Idee, sehr gut verarbeitet. Passt auch auf einen schmalen Schreibtisch."}
    ],
    putztuch: [
      {name:"Leon B.", rating:5, text:"Reinigt Bildschirm und Controller streifenfrei, und das Pixel-Muster ist einfach schön."},
      {name:"Anja M.", rating:5, text:"Weich, saugfähig und viel schöner als jedes Standardtuch. Ein tolles Mitbringsel."}
    ],
    tasse: [
      {name:"Felix W.", rating:5, text:"Mein Kaffee bleibt endlich warm, während ich zocke. Der Wärmer sieht aus wie ein Mini-Controller."},
      {name:"Clara D.", rating:4, text:"Funktioniert zuverlässig per USB und ist ein super Geschenk für Gamer."}
    ]
  };

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
    (load().slice().reverse().concat(DEMO[productId] || [])).forEach(function (r) {
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
