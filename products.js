/* products.js – alle Produktdaten an EINER Stelle.
   Neues Produkt: einen Block kopieren, id eindeutig machen, Werte ändern.
   price als Zahl mit Punkt (z. B. 49.90), images = Pfade zu den Bilddateien, video = optional. */
window.PRODUCTS = [
  {
    id: "kabel",
    name: "Pixel-Herz Kabel-Protektoren (2er-Set)",
    category: "Retro",
    price: 4.99,
    images: [
      "images/produkte/kabel1.webp",
      "images/produkte/kabel2.webp",
      "images/produkte/kabel3.webp",
      "images/produkte/kabel4.webp"
    ],
    description: "Ein Extra-Leben für deine Kabel! Die niedlichen Kabel-Protektoren im Pixel-Herz-Design setzen farbenfrohe Akzente und helfen, deine Ladekabel vor Knickbelastung zu schützen.",
    sale: false
  },
  {
    id: "kassette",
    name: "Retro-Kassetten-Schutzhüllen (5er-Pack)",
    category: "Retro",
    price: 14.99,
    images: [
      "images/produkte/kassette1.webp",
      "images/produkte/kassette2.webp",
      "images/produkte/kassette3.webp",
      "images/produkte/kassette4.webp"
    ],
    description: "Schutz für deine Retro-Schätze! Die Schutzhüllen im klassischen CRT-Look bewahren deine Gaming-Kassetten stilvoll auf. Perfekt für Sammler und Nostalgie-Fans.",
    video: "videos/kassette.mp4",
    sale: false
  },
  {
    id: "notizblockhalter",
    name: "CRT-Fernseher Zettelbox & Holder",
    category: "Retro",
    price: 11.99,
    images: [
      "images/produkte/notizblockhalter-01-schraegansicht.webp",
      "images/produkte/notizblockhalter-02-vorderansicht.webp",
      "images/produkte/notizblockhalter-02-vorderansicht-1.webp",
      "images/produkte/notizblockhalter-03-rueckansicht.webp",
      "images/produkte/notizblockhalter-04-detailansicht.webp"
    ],
    description: "Retro-Charme für deinen Schreibtisch! Die originelle Zettelbox im Design eines klassischen Röhrenfernsehers bringt nostalgisches Gaming-Flair und Ordnung in dein Desk-Setup.",
    video: "videos/notizblockhalter.mp4",
    sale: false
  },
  {
    id: "putztuch",
    name: "Gamer-Grip Mikrofaser-Reinigungstuch",
    category: "Retro",
    price: 5.99,
    images: [
      "images/produkte/putztuch-01-schraegansicht.webp",
      "images/produkte/putztuch-02-draufsicht.webp",
      "images/produkte/putztuch-03-detailansicht.webp",
      "images/produkte/putztuch-04-gefaltet.webp"
    ],
    description: "Sauberes Setup, klares Game! Das weiche Mikrofaser-Reinigungstuch im coolen 8-Bit-Design entfernt Staub und Fingerabdrücke von deinem Gaming-Equipment.",
    video: "videos/putztuch.mp4",
    sale: false
  },
  {
    id: "tasse",
    name: "USB-Kaffeebecher-Wärmer „Insert Power“",
    category: "Retro",
    price: 17.99,
    images: [
      "images/produkte/tasse1.webp",
      "images/produkte/tasse1-1.webp",
      "images/produkte/tasse2.webp",
      "images/produkte/tasse3.webp",
      "images/produkte/tasse4.webp"
    ],
    description: "Game an, Kaffee warm! Der USB-betriebene Tassenwärmer im Retro-Gaming-Look hält dein Getränk länger angenehm warm. Ideal für lange Gaming- oder Arbeitssessions.",
    video: "videos/tasse.mp4",
    sale: false
  }
];
