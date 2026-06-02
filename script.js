const partialFallbacks = {
  header: `
<nav class="navbar navbar-expand-lg fixed-top nav-blur">
  <div class="container">
    <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="index.html" aria-label="AU SASE Lab Startseite">
      <img src="icon.png" alt="AU Icon" class="brand-logo" onerror="this.style.display='none'">
      <span class="brand-wording"><span>AU SASE Lab</span><small>Secure Access Service Edge</small></span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNav" aria-controls="topNav" aria-expanded="false" aria-label="Navigation umschalten"><span class="navbar-toggler-icon"></span></button>
    <div id="topNav" class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
        <li class="nav-item"><a class="nav-link" href="index.html#topology">Topologie</a></li>
        <li class="nav-item"><a class="nav-link" href="index.html#capabilities">Bausteine</a></li>
        <li class="nav-item"><a class="nav-link" href="index.html#telemetry">Telemetrie</a></li>
        <li class="nav-item"><a class="nav-link" href="impressum.html">Impressum</a></li>
        <li class="nav-item"><a class="nav-link" href="datenschutz.html">Datenschutz</a></li>
      </ul>
    </div>
  </div>
</nav>`,
  footer: `
<footer class="py-5">
  <div class="container d-flex flex-column flex-lg-row justify-content-between gap-4 text-secondary">
    <div class="footer-brand">
      <img src="icon.png" alt="AU Icon" class="footer-icon" onerror="this.style.display='none'">
      <div><strong>AU SASE Lab</strong><span>Testwebsite für Übungszwecke • Keine offizielle Produktivseite</span></div>
    </div>
    <div class="footer-links"><a href="index.html">Startseite</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></div>
  </div>
</footer>`
};

async function loadPartials() {
  const targets = [...document.querySelectorAll("[data-include]")];

  await Promise.all(targets.map(async target => {
    const name = target.dataset.include;
    const url = `partials/${name}.html`;

    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Partial ${url} nicht gefunden`);
      target.innerHTML = await response.text();
    } catch {
      target.innerHTML = partialFallbacks[name] ?? "";
    }
  }));
}

const services = {
  sase: {
    title: "SASE Policy Enforcement",
    icon: "bi-shield-check",
    text: "SASE bündelt Netzwerk- und Sicherheitsfunktionen als cloudnahes Service-Modell. Entscheidungen werden anhand von Identität, Gerätezustand, Zielanwendung und Risiko getroffen.",
    tags: ["Unified Policy", "Policy Enforcement", "TLS Inspection", "Context Engine", "Zero Trust"]
  },
  classic: {
    title: "Klassischer Zugriff ohne SASE",
    icon: "bi-hdd-network",
    text: "Im klassischen Remote-Access-Modell wird der Nutzer häufig zuerst per VPN in das Unternehmensnetz oder Rechenzentrum geführt. Von dort erfolgt die weitere Prüfung und der Zugriff auf Internet-, SaaS- oder private Anwendungen.",
    tags: ["VPN", "Unternehmensnetz", "Rechenzentrum", "Proxy / Firewall", "Backhaul"]
  },
  vpn: {
    title: "VPN-Gateway",
    icon: "bi-key",
    text: "Ein VPN-Gateway baut einen Tunnel ins Unternehmensnetz auf. Der Zugriff orientiert sich dadurch oft stärker am Netzwerk als an der einzelnen Anwendung.",
    tags: ["Tunnel", "Remote Access", "Gateway", "Netzwerkzugang"]
  },
  central: {
    title: "Zentrale Firewall / Proxy",
    icon: "bi-building-lock",
    text: "Im klassischen Modell liegen Sicherheitsprüfungen häufig zentral im Unternehmensnetz oder Rechenzentrum, zum Beispiel auf Firewall-, Proxy- oder Secure-Web-Gateway-Systemen.",
    tags: ["Firewall", "Proxy", "Zentrale Prüfung", "Hub-and-Spoke"]
  },
  backhaul: {
    title: "Unternehmensnetz / Rechenzentrum",
    icon: "bi-building-gear",
    text: "Traffic wird oft erst über ein zentrales Unternehmensnetz oder Rechenzentrum geführt. Für Cloud- und Internetzugriffe kann dadurch ein zusätzlicher Umweg entstehen.",
    tags: ["Datacenter", "WAN", "Backhaul", "Zentrale Kontrolle"]
  },
  sdwan: {
    title: "SD-WAN",
    icon: "bi-router",
    text: "SD-WAN ist ein Netzwerkbaustein innerhalb einer SASE-Architektur. Es kann Standorte und Nutzerpfade dynamisch über geeignete Verbindungen und Policies steuern.",
    tags: ["Pfadsteuerung", "Standorte", "QoS", "Local Breakout", "WAN Policy"]
  },
  ztna: {
    title: "Zero Trust Network Access",
    icon: "bi-door-closed",
    text: "ZTNA stellt den Zugriff auf einzelne Anwendungen bereit. Es wird nicht pauschal ein gesamtes Netzwerk freigegeben.",
    tags: ["Least Privilege", "Identity-first", "App Segmentation", "Continuous Auth"]
  },
  swg: {
    title: "Secure Web Gateway",
    icon: "bi-browser-edge",
    text: "SWG bewertet Webzugriffe anhand von Kategorien, Bedrohungsinformationen und Sicherheitsrichtlinien.",
    tags: ["URL Filtering", "Malware Defense", "Browser Control", "SSL Inspection"]
  },
  casb: {
    title: "Cloud Access Security Broker",
    icon: "bi-cloud-fog2",
    text: "CASB unterstützt Transparenz und Richtlinienkontrolle für SaaS- und Cloud-Anwendungen.",
    tags: ["SaaS Visibility", "Shadow IT", "API Control", "Tenant Restriction"]
  },
  fwaas: {
    title: "Firewall as a Service",
    icon: "bi-fire",
    text: "FWaaS stellt Firewall- und Layer-7-Kontrollen als cloudnahen Dienst bereit.",
    tags: ["L7 Firewall", "IPS", "Egress Control", "Global Rules"]
  },
  dlp: {
    title: "Data Loss Prevention",
    icon: "bi-file-earmark-lock",
    text: "DLP erkennt sensible Datenmuster und kann Richtlinien anwenden, um unerwünschten Datenabfluss zu reduzieren.",
    tags: ["Data Discovery", "Classification", "Exfiltration Stop", "Compliance"]
  },
  user: {
    title: "User Identity",
    icon: "bi-person-workspace",
    text: "Identität, Rolle, MFA-Status und Verhalten liefern wichtige Signale für die Zugriffsbewertung.",
    tags: ["MFA", "Role Context", "Behavior", "Risk Signal"]
  },
  device: {
    title: "Device Posture",
    icon: "bi-phone",
    text: "Gerätezustand, Patch-Level, Sicherheitsstatus und Standort können in die Zugriffsbewertung einfließen.",
    tags: ["Posture Check", "EDR", "Patch Level", "Geo Signal"]
  },
  branch: {
    title: "Standort / Niederlassung",
    icon: "bi-building-lock",
    text: "Standorte können über SD-WAN- oder andere Anbindungen mit Sicherheitsdiensten und Anwendungen verbunden werden.",
    tags: ["Standort", "WAN", "QoS", "Encrypted Tunnel"]
  },
  cloud: {
    title: "Cloud Apps",
    icon: "bi-cloud-check",
    text: "SaaS-, IaaS- und private Anwendungen werden im SASE-Modell erst nach Policy-Prüfung erreichbar.",
    tags: ["SaaS", "IaaS", "Private Apps", "API Security"]
  },
  internet: {
    title: "Internet / SaaS",
    icon: "bi-globe2",
    text: "Internet- und SaaS-Zugriffe können je nach Architektur direkt geprüft oder klassisch über ein zentrales Unternehmensnetz geführt werden.",
    tags: ["Web", "SaaS", "Egress", "Content Filter"]
  }
};

let currentAccessMode = "sase";
let elements = {};

const pathModeDefinitions = {
  sase: {
    pathUserEdge: "M130 155 C285 115 345 235 470 260",
    pathBranchEdge: "M125 410 C300 395 310 305 470 280",
    pathDeviceEdge: "M165 285 C270 255 350 255 470 270",
    pathEdgeCloud: "M520 260 C640 190 720 140 840 145",
    pathEdgeApp: "M525 300 C655 345 720 405 842 410",
    pathRouteSweep: "M130 155 C285 115 345 235 470 260 C640 190 720 140 840 145"
  },
  classic: {
    pathUserEdge: "M130 155 C250 165 350 225 470 260",
    pathBranchEdge: "M125 410 C255 405 350 330 470 290",
    pathDeviceEdge: "M165 285 C280 292 365 286 470 276",
    pathEdgeCloud: "M525 260 C590 250 632 250 660 274 C735 250 780 195 840 145",
    pathEdgeApp: "M525 296 C590 315 650 330 725 370 C770 394 805 405 842 410",
    pathRouteSweep: "M130 155 C250 165 350 225 470 260 C560 266 610 270 660 274 C735 300 790 370 842 410"
  }
};

const modeContent = {
  sase: {
    title: "SASE Zugriffspfad",
    subtitle: "Identität, Kontext, Policy, SD-WAN und Security-Funktionen in einer Demo-Ansicht",
    status: "Mit SASE",
    coreTitle: "SASE",
    coreSubtitle: "Policy Enforcement",
    coreIcon: "bi-shield-check",
    coreService: "sase",
    legendPrimary: "Direkter, geprüfter Zugriff",
    legendSecondary: "Policy / Inspection",
    legendThreat: "Blockierte Anfrage",
    detail: "sase",
    labels: ["", "", ""],
    steps: ["Nutzer / Gerät", "SASE", "Anwendung"],
    hint: "Startet eine beispielhafte SASE-Policy-Prüfung im aktiven Zugriffspfad.",
    eventMessage: "Die Grafik zeigt wieder den kontextbasierten SASE-Zugriffspfad."
  },
  classic: {
    title: "Klassischer Zugriffspfad ohne SASE",
    subtitle: "Remote User → VPN-Gateway → Unternehmensnetz/Rechenzentrum → Internet oder SaaS",
    status: "Ohne SASE",
    coreTitle: "VPN-Gateway",
    coreSubtitle: "Unternehmensnetz",
    coreIcon: "bi-hdd-network",
    coreService: "classic",
    legendPrimary: "VPN-Verbindung ins Unternehmensnetz",
    legendSecondary: "Zentrale Prüfung / Backhaul",
    legendThreat: "Blockierte Anfrage",
    detail: "classic",
    labels: ["", "", ""],
    steps: ["User", "VPN-Gateway", "Unternehmensnetz/Rechenzentrum", "Internet/SaaS"],
    hint: "Startet eine beispielhafte Prüfung über VPN, zentrale Security und Backhaul.",
    eventMessage: "Die Grafik zeigt jetzt den klassischen Pfad über VPN-Gateway, Unternehmensnetz und zentrale Prüfung."
  }
};

const randomBetween = (min, max, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};

function collectElements() {
  elements = {
    detailTitle: document.querySelector("#detailTitle"),
    detailText: document.querySelector("#detailText"),
    detailIcon: document.querySelector("#detailIcon i"),
    detailTags: document.querySelector("#detailTags"),
    eventLog: document.querySelector("#eventLog"),
    topologyCard: document.querySelector("#topologyCard"),
    threatParticle: document.querySelector("#threatParticle"),
    threatMotion: document.querySelector("#threatMotion"),
    trustRange: document.querySelector("#trustRange"),
    trustLabel: document.querySelector("#trustLabel"),
    trustMeterFill: document.querySelector("#trustMeterFill"),
    topologyModeTitle: document.querySelector("#topologyModeTitle"),
    topologyModeSubtitle: document.querySelector("#topologyModeSubtitle"),
    modeStatus: document.querySelector("#modeStatus"),
    coreNode: document.querySelector("#coreNode"),
    coreNodeIcon: document.querySelector("#coreNodeIcon"),
    coreNodeTitle: document.querySelector("#coreNodeTitle"),
    coreNodeSubtitle: document.querySelector("#coreNodeSubtitle"),
    legendPrimary: document.querySelector("#legendPrimary"),
    legendSecondary: document.querySelector("#legendSecondary"),
    legendThreat: document.querySelector("#legendThreat"),
    routeLabelLeft: document.querySelector("#routeLabelLeft"),
    routeLabelCore: document.querySelector("#routeLabelCore"),
    routeLabelRight: document.querySelector("#routeLabelRight"),
    routeStepper: document.querySelector("#routeStepper"),
    simulationHint: document.querySelector("#simulationHint")
  };
}

function hasTopology() {
  return Boolean(elements.topologyCard && elements.detailTitle && elements.eventLog);
}

function setActiveService(key, options = {}) {
  if (!hasTopology()) return;

  const service = services[key] ?? services.sase;
  elements.detailTitle.textContent = service.title;
  elements.detailText.textContent = service.text;
  elements.detailIcon.className = `bi ${service.icon}`;
  elements.detailTags.innerHTML = service.tags.map(tag => `<span>${tag}</span>`).join("");

  document.querySelectorAll("[data-service]").forEach(item => {
    item.classList.toggle("active", item.dataset.service === key);
  });

  if (!options.silent) {
    addEvent("Demo-Kontext aktualisiert", `${service.title} wurde ausgewählt.`, "success");
  }
}

function addEvent(title, message, variant = "") {
  if (!elements.eventLog) return;

  const item = document.createElement("div");
  item.className = `event-item ${variant}`;
  item.innerHTML = `<strong>${title}</strong><small>${message}</small>`;
  elements.eventLog.prepend(item);

  const items = elements.eventLog.querySelectorAll(".event-item");
  if (items.length > 7) items[items.length - 1].remove();
}

function updateTrust(value) {
  if (!elements.trustMeterFill || !elements.trustLabel) return;

  elements.trustMeterFill.style.width = `${value}%`;

  if (value < 34) {
    elements.trustLabel.textContent = "Niedriges Risiko";
    elements.trustLabel.className = "badge text-bg-success";
  } else if (value < 70) {
    elements.trustLabel.textContent = "Adaptive Prüfung";
    elements.trustLabel.className = "badge text-bg-warning";
  } else {
    elements.trustLabel.textContent = "Hohes Risiko";
    elements.trustLabel.className = "badge text-bg-danger";
  }

  document.querySelectorAll("[data-counter='risk']").forEach(element => {
    element.textContent = String(value).padStart(2, "0");
  });
}

function animateCounter(element, target) {
  const current = Number(String(element.textContent).replace(/[^\d.]/g, "")) || 0;
  const duration = 520;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = current + (target - current) * eased;

    if (target >= 1000) element.textContent = Math.round(value).toLocaleString("de-DE");
    else if (String(target).includes(".")) element.textContent = value.toFixed(1);
    else element.textContent = Math.round(value);

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function refreshMetrics() {
  const metricTargets = {
    latency: randomBetween(currentAccessMode === "classic" ? 42 : 12, currentAccessMode === "classic" ? 85 : 31),
    sessions: randomBetween(4.1, 6.8, 1),
    allowed: randomBetween(11800, 16450),
    inspected: randomBetween(39800, 58100),
    blocked: randomBetween(250, 540),
    edges: randomBetween(39, 48)
  };

  Object.entries(metricTargets).forEach(([key, value]) => {
    document.querySelectorAll(`[data-counter="${key}"]`).forEach(element => animateCounter(element, value));
  });
}

function applyPathMode(mode) {
  const definition = pathModeDefinitions[mode] ?? pathModeDefinitions.sase;
  Object.entries(definition).forEach(([id, d]) => {
    document.querySelector(`#${id}`)?.setAttribute("d", d);
  });
}

function updateRouteStepper(steps) {
  if (!elements.routeStepper) return;

  elements.routeStepper.innerHTML = steps
    .map((step, index) => {
      const separator = index < steps.length - 1 ? '<i class="bi bi-arrow-right"></i>' : "";
      return `<span>${step}</span>${separator}`;
    })
    .join("");
}


function setAccessMode(mode, options = {}) {
  if (!hasTopology()) return;
  if (!modeContent[mode]) mode = "sase";

  const previousMode = currentAccessMode;
  currentAccessMode = mode;
  const content = modeContent[mode];
  const isClassic = mode === "classic";
  const shouldAnimate = previousMode !== mode && !options.silent;

  if (shouldAnimate) elements.topologyCard.classList.add("mode-switching");

  elements.topologyCard.dataset.accessMode = mode;
  elements.topologyCard.classList.toggle("classic-mode", isClassic);

  document.querySelectorAll(".access-mode-btn").forEach(button => {
    const active = button.dataset.accessMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  elements.topologyModeTitle.textContent = content.title;
  elements.topologyModeSubtitle.textContent = content.subtitle;
  elements.modeStatus.textContent = content.status;
  elements.coreNode.dataset.service = content.coreService;
  elements.coreNodeIcon.className = `bi ${content.coreIcon}`;
  elements.coreNodeTitle.textContent = content.coreTitle;
  elements.coreNodeSubtitle.textContent = content.coreSubtitle;
  elements.legendPrimary.innerHTML = `<i class="legend-dot normal"></i> ${content.legendPrimary}`;
  elements.legendSecondary.innerHTML = `<i class="legend-dot inspect"></i> ${content.legendSecondary}`;
  elements.legendThreat.innerHTML = `<i class="legend-dot threat"></i> ${content.legendThreat}`;

  if (elements.routeLabelLeft) elements.routeLabelLeft.textContent = content.labels[0];
  if (elements.routeLabelCore) elements.routeLabelCore.textContent = content.labels[1];
  if (elements.routeLabelRight) elements.routeLabelRight.textContent = content.labels[2];
  elements.simulationHint.textContent = content.hint;
  updateRouteStepper(content.steps);

  applyPathMode(mode);
  setActiveService(content.detail, { silent: true });

  if (shouldAnimate) {
    window.setTimeout(() => elements.topologyCard?.classList.remove("mode-switching"), 720);
  }

  if (!options.silent) {
    addEvent("Zugriffsmodus gewechselt", content.eventMessage, isClassic ? "" : "success");
    refreshMetrics();
  }
}

function simulateThreat() {
  if (!hasTopology()) return;

  elements.topologyCard.classList.add("threat-mode");
  elements.threatParticle?.classList.add("active");

  addEvent("Demo-Anomalie erkannt", "Beispielhafter Login-Kontext mit erhöhtem Risiko.", "danger");

  try { elements.threatMotion?.beginElement(); } catch { /* optional */ }

  if (currentAccessMode === "classic") {
    setActiveService("vpn");

    setTimeout(() => {
      setActiveService("central");
      addEvent("Zentrale Prüfung", "Die Demo-Anfrage wird über VPN-Gateway und zentrale Security-Komponenten geführt.", "danger");
      if (elements.trustRange) elements.trustRange.value = 72;
      updateTrust(72);
    }, 950);

    setTimeout(() => {
      setActiveService("backhaul");
      addEvent("Backhaul sichtbar", "Der Beispieltraffic läuft über Unternehmensnetz / Rechenzentrum weiter Richtung Internet oder SaaS.", "danger");
    }, 1850);

    setTimeout(() => {
      setActiveService("classic");
      addEvent("Klassische Policy greift", "Die Demo-Anfrage wird zentral geprüft und anschließend blockiert.", "success");
      elements.topologyCard.classList.remove("threat-mode");
      elements.threatParticle?.classList.remove("active");
    }, 3300);

    return;
  }

  setActiveService("swg");

  setTimeout(() => {
    setActiveService("ztna");
    addEvent("ZTNA-Prüfung", "Die Demo-Session erhält eine zusätzliche Prüfung und eingeschränkten App-Zugriff.", "danger");
    if (elements.trustRange) elements.trustRange.value = 78;
    updateTrust(78);
  }, 950);

  setTimeout(() => {
    setActiveService("dlp");
    addEvent("DLP Match", "Eine Beispieldatei mit sensiblen Mustern wurde erkannt.", "danger");
  }, 1850);

  setTimeout(() => {
    setActiveService("sase");
    addEvent("Anfrage blockiert", "Die Demo-Policy blockiert den riskanten Vorgang und lässt unauffällige Sessions weiterlaufen.", "success");
    elements.topologyCard.classList.remove("threat-mode");
    elements.threatParticle?.classList.remove("active");
  }, 3300);
}

function filterTelemetry(filter) {
  document.querySelectorAll(".control-chip").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });

  document.querySelectorAll(".metric-card").forEach(card => {
    const visible = filter === "all" || card.dataset.status === filter;
    card.classList.toggle("hide", !visible);
  });
}

function resetDashboard() {
  if (elements.trustRange) elements.trustRange.value = 22;
  updateTrust(22);
  setAccessMode("sase", { silent: true });
  filterTelemetry("all");
  addEvent("Demo zurückgesetzt", "Die Ausgangswerte und die SASE-Standardansicht sind wieder aktiv.", "success");
}

function bindAccessModeSwitch() {
  document.querySelectorAll(".access-mode-btn").forEach(button => {
    button.addEventListener("click", () => setAccessMode(button.dataset.accessMode));
  });
}

function bindInteractions() {
  document.querySelectorAll("[data-service]").forEach(element => {
    element.addEventListener("click", () => setActiveService(element.dataset.service));
    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveService(element.dataset.service);
      }
    });
  });

  document.querySelectorAll("[data-jump]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.jump)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelector("#simulateThreat")?.addEventListener("click", simulateThreat);
  document.querySelector("#resetBtn")?.addEventListener("click", resetDashboard);

  document.querySelectorAll(".control-chip").forEach(button => {
    button.addEventListener("click", () => filterTelemetry(button.dataset.filter));
  });

  elements.trustRange?.addEventListener("input", event => updateTrust(Number(event.target.value)));
}

function seedEvents() {
  addEvent("SASE Demo aktiv", "Standardansicht mit SASE, Policy Enforcement und SD-WAN-Baustein geladen.", "success");
  addEvent("CASB-Regel aktiv", "SaaS-Zugriff anhand einer Beispielrichtlinie bewertet.");
  addEvent("SWG Inspection", "Web-Request wurde in der Demo kategorisiert und freigegeben.");
}

function initTooltips() {
  if (!window.bootstrap?.Tooltip) return;

  document.querySelectorAll(".cap-card").forEach(card => {
    card.setAttribute("data-bs-toggle", "tooltip");
    card.setAttribute("data-bs-title", `Details zu ${services[card.dataset.service]?.title ?? "SASE"} anzeigen`);
  });

  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
    .map(element => new bootstrap.Tooltip(element));
}

async function boot() {
  await loadPartials();
  collectElements();
  bindInteractions();
  bindAccessModeSwitch();

  if (hasTopology()) {
    setAccessMode("sase", { silent: true });
    updateTrust(Number(elements.trustRange?.value ?? 22));
    seedEvents();
    setInterval(refreshMetrics, 3600);
  }

  initTooltips();
}

document.addEventListener("DOMContentLoaded", boot);
