# AU SASE Lab

Statische Demo-Website für eine SASE-Architektur im AU-Farblook mit getrennten Dateien.

## Dateien

- `index.html`
- `styles.css`
- `script.js`
- `partials/header.html`
- `partials/footer.html`
- `impressum.html`
- `datenschutz.html`
- `site.webmanifest`
- `CNAME`
- `icon.png` muss separat im Projektordner liegen, falls du dein eigenes Icon verwenden möchtest.

## Inhalt

- Bootstrap 5 im Darkmode
- Animierte SASE-Topologie mit integriertem Umschalter zwischen „Mit SASE“ und „Ohne SASE“
- Umschaltanimation mit Scan-Effekt und weich verblassenden Elementen
- Pfad ohne SASE: User → VPN-Gateway → Unternehmensnetz/Rechenzentrum → Internet/SaaS
- SASE-Pfad: Nutzer/Gerät → SASE Policy Enforcement → Anwendung
- Klickbare SASE-Bausteine: SD-WAN, ZTNA, SWG, CASB, FWaaS, DLP
- Simulierbares Risiko direkt unter dem Zugriffspfad
- Gemeinsame Kopf- und Fußzeile über `partials/header.html` und `partials/footer.html`
- Impressum und Datenschutz mit Hinweis auf Testwebsite für Übungszwecke

## Start

Lege dein `icon.png` in denselben Ordner wie `index.html`. Öffne die Website anschließend über einen lokalen Webserver oder über GitHub Pages.

Für einen schnellen lokalen Test kannst du im Projektordner ausführen:

```bash
python -m http.server 8000
```

Danach im Browser öffnen:

```text
http://localhost:8000
```

Für Bootstrap und Icons wird ein CDN genutzt. Eine Internetverbindung ist daher sinnvoll.

## GitHub Pages

Die Dateien können direkt im Root eines GitHub-Pages-Repositories liegen. Für die Domain `dhbw-lucas.de` ist die `CNAME`-Datei bereits vorbereitet und sollte genau diesen Inhalt haben:

```text
dhbw-lucas.de
```
