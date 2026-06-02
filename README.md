# AU SASE Lab

Statische Demo-Website für eine SASE-Architektur im AU-Farblook mit getrennten Dateien:

- `index.html`
- `styles.css`
- `script.js`
- `impressum.html`
- `datenschutz.html`
- `icon.png`

## Inhalt

- Bootstrap 5 im Darkmode
- Animierte SASE-Topologie mit integriertem Umschalter zwischen „Mit SASE“ und „Ohne SASE / Klassisch“
- Kontextbasierter SASE-Zugriffspfad und klassische VPN-/Backhaul-Variante in derselben Abbildung
- Klickbare SASE-Bausteine: SD-WAN, ZTNA, SWG, CASB, FWaaS, DLP
- Simulierte Security-Events und Demo-Telemetrie
- Impressum und Datenschutz mit Hinweis auf Testwebsite für Übungszwecke

## Start

Lege dein eigenes `icon.png` in denselben Ordner wie `index.html`, wenn du das Platzhalter-Icon ersetzen möchtest. Öffne anschließend `index.html` im Browser.

Für Bootstrap und Icons wird ein CDN genutzt. Eine Internetverbindung ist daher sinnvoll.

## GitHub Pages

Die Dateien können direkt im Root eines GitHub-Pages-Repositories liegen. Für die Domain `dhbw-lucas.de` kann zusätzlich eine `CNAME`-Datei mit genau diesem Inhalt verwendet werden:

```text
dhbw-lucas.de
```
