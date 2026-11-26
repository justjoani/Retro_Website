# Geschützte Vorschau für Retro Gaming Gear

**Stand:** Vorbereitung. Dieser Leitfaden richtet sich an das Repository `justjoani/Retro_Website`.

**Wichtig:** Kein Passwort und keine E-Mail-Freigabeliste in HTML, CSS oder JavaScript speichern. Das wäre kein echter Schutz. GitHub Pages auf diesem Repository bitte **nicht** aktivieren.

## Ziel

Cloudflare Pages hostet den bestehenden HTML/CSS/JavaScript-Demo-Shop; Cloudflare Access prüft vor dem Anzeigen der Website, ob eine Person freigegeben ist. **Nicht** die GitHub-URL öffentlich teilen. Dieses Repository war bei der Vorbereitung öffentlich, daher sind die Quelldateien separat zugänglich, bis der Eigentümer das Repository auf privat stellt.

## 1. Repository optional privat machen (empfohlen)

Auf GitHub: `justjoani/Retro_Website` > **Settings** > **General** > **Danger Zone** > **Change repository visibility** > **Make private**.

Cloudflare Pages unterstützt Git-Integrationen mit privaten Repositories. Eventuell muss der Cloudflare-GitHub-App anschließend Zugriff auf dieses Repository erlaubt werden. Eine private GitHub-Quelle allein schützt **nicht** automatisch eine gehostete Website.

## 2. Cloudflare Pages zuerst nur mit Platzhalter veröffentlichen

1. Cloudflare-Konto öffnen: https://dash.cloudflare.com/
2. **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. GitHub verbinden und `justjoani/Retro_Website` auswählen.
4. Projektname nach Wunsch (z. B. `retro-gaming-geschuetzt` – nur wenn noch verfügbar).
5. **Production branch**: `main`.
6. **Framework preset**: None / kein Framework.
7. **Build command**: leer lassen.
8. **Build output directory**: **`private-preview-holding`** (wichtig, **noch nicht** `.`!).
9. **Root directory**: Standard / Repo-Wurzel.
10. **Save and Deploy**.

Jetzt wird ausschließlich die neutrale Platzhalterseite ausgeliefert. Der eigentliche Shop bleibt im Hosting noch unveröffentlicht. Achtung: Die Platzhalterseite kann bis zur Einrichtung von Access öffentlich sichtbar sein; sie enthält keine vertraulichen Shop-Inhalte.

## 3. Cloudflare Access für Produktions- UND Vorschauadressen einrichten

Cloudflare-Dokumentation: https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain

1. In Cloudflare zum neuen Pages-Projekt: **Settings > General > Enable access policy**. Das schützt *zunächst nur Preview-Deployments*.
2. **Manage** der so erstellten Access-Anwendung öffnen. Unter **Access > Applications** das Projekt auswählen, **Configure** wählen.
3. Unter **Public hostname** im Feld **Subdomain** das Wildcard-Zeichen `*` entfernen und speichern (Anwendungsname ggf. anpassen). Damit wird die eigentliche Adresse `DEIN-PROJEKT.pages.dev` geschützt.
4. Zurück zu **Pages > Settings > General** und **Enable access policy** erneut auswählen, damit auch die Vorschau-URLs `*.DEIN-PROJEKT.pages.dev` geschützt werden.
5. In den **Access policies** ausschließlich ausdrücklich freigegebene E-Mail-Adressen erlauben (**Allow > Emails**). **Nicht** `Everyone` freigeben. Für Besucher ohne Cloudflare-Konto unter **Zero Trust > Settings > Authentication** bei Bedarf die **One-time PIN**-Anmeldemethode aktivieren; sie ist bei neuen Konten nicht mehr standardmäßig eingerichtet.
6. Die eigene E-Mail-Adresse und die erlaubten Besuchenden hinzufügen. Niemals Geheimnisse oder Zugangscodes ins Repository schreiben.

Dokumentation für E-Mail-Code-Anmeldung: https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/

**Vor der Freischaltung unbedingt prüfen:** Im privaten Browserfenster ohne Anmeldung dürfen die Produktionsadresse, mindestens eine bestehende Vorschauadresse sowie direkte Links wie `/product.html` nicht den Shop zeigen. Nach Anmeldung mit einer freigegebenen Adresse soll die Platzhalterseite zu sehen sein.

## 4. Erst nach Prüfung den vollständigen Demo-Shop ausliefern

1. Im Cloudflare-Pages-Projekt die **Build output directory** von `private-preview-holding` auf **`.`** ändern.
2. Für den Produktionsbranch `main` neu deployen (gegebenenfalls Deployment erneut ausführen).
3. Wieder im privaten Browserfenster prüfen: ohne Berechtigung keine Shop-Seite sichtbar, mit Berechtigung Startseite, Produkte, Warenkorb und `demo-checkout.html` erreichbar.
4. Zusätzlich beide Hostnamen `DEIN-PROJEKT.pages.dev` und `*.DEIN-PROJEKT.pages.dev` testen; bei einer zusätzlichen eigenen Domain auch diese separat über Access schützen.
5. Erst danach den geschützten Vorschau-Link mit ausgewählten Personen teilen.

## Hinweise

- Dies ist weiterhin ein **Demo-Shop**. Keine Zahlungen, keine echten Bestellungen und kein Backend.
- Das lokale `localStorage` ist nur für die Demo-Warenkorbdaten gedacht.
- Die öffentliche GitHub-Repository-Adresse selbst wird durch Cloudflare Access **nicht** geschützt. Repository bei Bedarf auf privat stellen.
- Ein bloßes `noindex` schützt die Website nicht vor Besuchenden.
- Cloudflare-Login und Zugriffseinstellungen müssen vom Kontoinhaber im Cloudflare-Dashboard vorgenommen werden; der GitHub-Connector kann diese Kontoeinstellungen nicht setzen.

## Originaldokumentation

- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/configuration/preview-deployments/
- https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain
- https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/
