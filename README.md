# Retro Gaming Gear – Demo-Shop

Dies ist ein **fiktiver Retro-Gaming-Shop** für eine Vorschau / ein Schulprojekt. Es werden **keine realen Bestellungen angenommen**, keine Zahlungen abgewickelt und keine Waren versendet.

## Starten

1. Repository lokal herunterladen oder klonen.
2. Einen lokalen Webserver im Projektordner starten, z. B. mit Python: \`python -m http.server 8000\`
3. Im Browser \`http://localhost:8000/index.html\` öffnen.

Der Shop nutzt HTML, CSS und JavaScript. Der Warenkorb wird in \`localStorage\` unter \`retroCart\` gespeichert.

## Demo-Kasse (Feature-Branch)

1. Auf \`product.html\` eines der bestehenden Produkte in den Warenkorb legen.
2. \`cart.html\` öffnen und auf **Zur Demo-Kasse** klicken.
3. Auf \`demo-checkout.html\` alle Posten und die Gesamtsumme kontrollieren.
4. Über **Testbestellung abschließen** eine unverbindliche Simulation ausführen.
5. Die Seite zeigt eine Testnummer, leert den lokalen Warenkorb und speichert nur eine anonyme Zusammenfassung im Browser (\`retroDemoLastOrder\`). Es werden keinerlei Zahlungs- oder Adressdaten abgefragt oder an einen Server übertragen.

**Hinweis:** Die HTML-Seite ist eine Demo. Es gibt keinen Server für echte Bestellungen. Produktpreise und -daten stammen für die Demo-Simulation aus \`products.js\`. Die Simulation ist nicht als echte Kassenlösung geeignet.

### Prüffälle

- Leerer Warenkorb: Abschluss ist deaktiviert, ein Hinweis erscheint.
- Ein Produkt: Stückzahl und Summe werden richtig angezeigt.
- Mehrere Produkte: Summen werden aus den Produktdaten berechnet.
- Manipulierter lokaler Warenkorb: unbekannte Artikel und ungültige Mengen werden verworfen.
- Abschluss: lokale Bestätigung statt Zahlung, Warenkorb wird geleert.

## Projektstruktur

- \`products.js\` – Produktdaten und Medienpfade (aktuell fünf Produkte).
- \`shop.js\` – dynamische Produktkarten, Galerien und Produktdetailseiten.
- \`cart.js\` – Warenkorb und Speicherung im Browser.
- \`demo-checkout.html\`, \`demo-checkout.css\`, \`demo-checkout.js\` – zusätzliche Demo-Kasse.
- \`images/produkte/\` und \`videos/\` – bereits vorhandene Produktmedien.

## Nächste Schritte

1. Die restliche Retro-Gaming-Kollektion anhand der noch hochzuladenden Medien in \`products.js\` ergänzen.
2. Echte Suchfunktion für den Demo-Shop implementieren.
3. Demo-Kennzeichnung auf allen Seiten konsistent anzeigen.
4. Kontakt-, Newsletter- und Bewertungsformulare eindeutig als Demo behandeln; keine echten Kundendaten sammeln.
5. Mobile Darstellung, Zugänglichkeit, Bildpfade und Testabläufe überprüfen.
