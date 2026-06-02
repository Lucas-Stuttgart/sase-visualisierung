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
    text: "Der klassische Remote-Access-Ansatz führt Nutzer häufig erst über VPN und zentrale Sicherheitskomponenten ins Unternehmensnetz, bevor Anwendungen erreicht werden.",
    tags: ["VPN", "Netzwerkzugang", "Zentrale Firewall", "Proxy", "Backhaul"]
  },
  vpn: {
    title: "VPN-Zugang",
    icon: "bi-key",
    text: "Ein VPN baut einen Tunnel ins Unternehmensnetz auf. Dadurch entsteht oft zunächst Netzwerkzugang, bevor der konkrete Anwendungszugriff weiter eingeschränkt wird.",
    tags: ["Tunnel", "Remote Access", "Netzwerkfokus", "Gateway"]
  },
  central: {
    title: "Zentrale Firewall / Proxy",
    icon: "bi-building-lock",
    text: "Im klassischen Modell laufen Prüfungen häufig über zentrale Komponenten wie Firewall, Proxy oder VPN-Gateway. Das kann zu Umwegen führen, besonders bei SaaS- und Internet-Zugriffen.",
    tags: ["Firewall", "Proxy", "Hub-and-Spoke", "Inspection"]
  },
  backhaul: {
    title: "WAN-Backhaul",
    icon: "bi-arrow-repeat",
    text: "Traffic wird oft erst über das zentrale Netzwerk zurückgeführt, auch wenn die Zielanwendung eigentlich direkt im Internet oder in der Cloud liegt.",
    tags: ["Umweg", "WAN", "Zentrale Kontrolle", "Latenz"]
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
    title: "Branch / Standort",
    icon: "bi-building-lock",
    text: "Standorte können über SD-WAN- oder andere Anbindungen mit Sicherheitsdiensten und Anwendungen verbunden werden.",
    tags: ["Standort", "WAN", "QoS", "Encrypted Tunnel"]
  },
  cloud: {
    title: "Cloud Apps",
    icon: "bi-cloud-check",
    text: "SaaS-, IaaS- und private Anwendungen werden in diesem Modell erst nach Policy-Prüfung erreichbar.",
    tags: ["SaaS", "IaaS", "Private Apps", "API Security"]
  },
  internet: {
    title: "Internet Egress",
    icon: "bi-globe2",
    text: "Internet-Traffic kann kategorisiert, geprüft und anhand von Bedrohungs- oder Datenmustern bewertet werden.",
    tags: ["DNS Control", "Threat Intel", "Content Filter", "Sandboxing"]
  }
};

const detailTitle = document.querySelector("#detailTitle");
const detailText = document.querySelector("#detailText");
const detailIcon = document.querySelector("#detailIcon i");
const detailTags = document.querySelector("#detailTags");
const eventLog = document.querySelector("#eventLog");
const topologyCard = document.querySelector("#topologyCard");
const threatParticle = document.querySelector("#threatParticle");
const threatMotion = document.querySelector("#threatMotion");
const trustRange = document.querySelector("#trustRange");
const trustLabel = document.querySelector("#trustLabel");
const trustMeterFill = document.querySelector("#trustMeterFill");
const topologyModeTitle = document.querySelector("#topologyModeTitle");
const topologyModeSubtitle = document.querySelector("#topologyModeSubtitle");
const modeStatus = document.querySelector("#modeStatus");
const coreNode = document.querySelector("#coreNode");
const coreNodeIcon = document.querySelector("#coreNodeIcon");
const coreNodeTitle = document.querySelector("#coreNodeTitle");
const coreNodeSubtitle = document.querySelector("#coreNodeSubtitle");
const legendPrimary = document.querySelector("#legendPrimary");
const legendSecondary = document.querySelector("#legendSecondary");
const legendThreat = document.querySelector("#legendThreat");

let currentAccessMode = "sase";

const pathModeDefinitions = {
  sase: {
    pathUserEdge: "M130 155 C285 115 345 235 470 260",
    pathBranchEdge: "M125 410 C300 395 310 305 470 280",
    pathDeviceEdge: "M165 285 C270 255 350 255 470 270",
    pathEdgeCloud: "M520 260 C640 190 720 140 840 145",
    pathEdgeApp: "M525 300 C655 345 720 405 842 410"
  },
  classic: {
    pathUserEdge: "M130 155 C250 165 355 220 470 260",
    pathBranchEdge: "M125 410 C285 455 355 350 470 292",
    pathDeviceEdge: "M165 285 C285 300 355 292 470 278",
    pathEdgeCloud: "M520 255 C610 105 730 92 840 145",
    pathEdgeApp: "M520 306 C635 470 735 455 842 410"
  }
};

const modeContent = {
  sase: {
    title: "SASE Zugriffspfad",
    subtitle: "Identität, Kontext, Policy und Inspection in einer Demo-Ansicht",
    status: "Mit SASE",
    coreTitle: "SASE",
    coreSubtitle: "Policy Enforcement",
    coreIcon: "bi-shield-check",
    coreService: "sase",
    legendPrimary: "Direkter, geprüfter Zugriff",
    legendSecondary: "Policy / Inspection",
    legendThreat: "Blockierte Anfrage",
    detail: "sase"
  },
  classic: {
    title: "Klassischer Zugriffspfad ohne SASE",
    subtitle: "VPN, zentrale Security und Backhaul als vereinfachte Vergleichsansicht",
    status: "Ohne SASE",
    coreTitle: "VPN / Security",
    coreSubtitle: "Zentrales Netzwerk",
    coreIcon: "bi-hdd-network",
    coreService: "classic",
    legendPrimary: "Verbindung über VPN / Zentrale",
    legendSecondary: "Backhaul und zentrale Prüfung",
    legendThreat: "Blockierte Anfrage",
    detail: "classic"
  }
};

const randomBetween = (min, max, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};

function setActiveService(key, options = {}) {
  const service = services[key] ?? services.sase;

  detailTitle.textContent = service.title;
  detailText.textContent = service.text;
  detailIcon.className = `bi ${service.icon}`;
  detailTags.innerHTML = service.tags.map(tag => `<span>${tag}</span>`).join("");

  document.querySelectorAll("[data-service]").forEach(item => {
    item.classList.toggle("active", item.dataset.service === key);
  });

  if (!options.silent) {
    addEvent("Demo-Kontext aktualisiert", `${service.title} wurde ausgewählt.`, "success");
  }
}

function addEvent(title, message, variant = "") {
  const item = document.createElement("div");
  item.className = `event-item ${variant}`;
  item.innerHTML = `<strong>${title}</strong><small>${message}</small>`;
  eventLog.prepend(item);

  const items = eventLog.querySelectorAll(".event-item");
  if (items.length > 7) {
    items[items.length - 1].remove();
  }
}

function updateTrust(value) {
  trustMeterFill.style.width = `${value}%`;

  if (value < 34) {
    trustLabel.textContent = "Niedriges Risiko";
    trustLabel.className = "badge text-bg-success";
  } else if (value < 70) {
    trustLabel.textContent = "Adaptive Prüfung";
    trustLabel.className = "badge text-bg-warning";
  } else {
    trustLabel.textContent = "Hohes Risiko";
    trustLabel.className = "badge text-bg-danger";
  }

  document.querySelector("[data-counter='risk']").textContent = String(value).padStart(2, "0");
}

function animateCounter(element, target) {
  const current = Number(String(element.textContent).replace(/[^\d.]/g, "")) || 0;
  const duration = 520;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = current + (target - current) * eased;

    if (target >= 1000) {
      element.textContent = Math.round(value).toLocaleString("de-DE");
    } else if (String(target).includes(".")) {
      element.textContent = value.toFixed(1);
    } else {
      element.textContent = Math.round(value);
    }

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
    document.querySelectorAll(`[data-counter="${key}"]`).forEach(element => {
      animateCounter(element, value);
    });
  });
}

function applyPathMode(mode) {
  Object.entries(pathModeDefinitions[mode]).forEach(([id, d]) => {
    document.querySelector(`#${id}`)?.setAttribute("d", d);
  });
}

function setAccessMode(mode, options = {}) {
  currentAccessMode = mode;
  const content = modeContent[mode];

  topologyCard.dataset.accessMode = mode;
  topologyCard.classList.toggle("classic-mode", mode === "classic");
  topologyCard.classList.add("mode-switching");
  setTimeout(() => topologyCard.classList.remove("mode-switching"), 560);

  document.querySelectorAll(".access-mode-btn").forEach(button => {
    const active = button.dataset.accessMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  topologyModeTitle.textContent = content.title;
  topologyModeSubtitle.textContent = content.subtitle;
  modeStatus.textContent = content.status;
  coreNode.dataset.service = content.coreService;
  coreNodeIcon.className = `bi ${content.coreIcon}`;
  coreNodeTitle.textContent = content.coreTitle;
  coreNodeSubtitle.textContent = content.coreSubtitle;
  legendPrimary.innerHTML = `<i class="legend-dot normal"></i> ${content.legendPrimary}`;
  legendSecondary.innerHTML = `<i class="legend-dot inspect"></i> ${content.legendSecondary}`;
  legendThreat.innerHTML = `<i class="legend-dot threat"></i> ${content.legendThreat}`;

  applyPathMode(mode);
  setActiveService(content.detail, { silent: true });

  if (!options.silent) {
    const message = mode === "classic"
      ? "Die Grafik zeigt jetzt VPN, zentrale Security und Backhaul als klassische Variante."
      : "Die Grafik zeigt wieder den kontextbasierten SASE-Zugriffspfad.";
    addEvent("Zugriffsmodus gewechselt", message, mode === "classic" ? "" : "success");
  }
}

function simulateThreat() {
  topologyCard.classList.add("threat-mode");
  threatParticle.classList.add("active");

  addEvent("Demo-Anomalie erkannt", "Beispielhafter Login-Kontext mit erhöhtem Risiko.", "danger");

  try {
    threatMotion.beginElement();
  } catch {
    // Einige Browser blockieren SVG beginElement bei sehr restriktiven Einstellungen.
  }

  if (currentAccessMode === "classic") {
    setActiveService("vpn");

    setTimeout(() => {
      setActiveService("central");
      addEvent("Zentrale Prüfung", "Die Demo-Anfrage wird über VPN und zentrale Security-Komponenten geführt.", "danger");
      trustRange.value = 72;
      updateTrust(72);
    }, 950);

    setTimeout(() => {
      setActiveService("backhaul");
      addEvent("Backhaul sichtbar", "Der Beispieltraffic nimmt den Umweg über das zentrale Netzwerk.", "danger");
    }, 1850);

    setTimeout(() => {
      setActiveService("classic");
      addEvent("Klassische Policy greift", "Die Demo-Anfrage wird zentral geprüft und anschließend blockiert.", "success");
      topologyCard.classList.remove("threat-mode");
      threatParticle.classList.remove("active");
    }, 3300);

    return;
  }

  setActiveService("swg");

  setTimeout(() => {
    setActiveService("ztna");
    addEvent("ZTNA-Prüfung", "Die Demo-Session erhält eine zusätzliche Prüfung und eingeschränkten App-Zugriff.", "danger");
    trustRange.value = 78;
    updateTrust(78);
  }, 950);

  setTimeout(() => {
    setActiveService("dlp");
    addEvent("DLP Match", "Eine Beispieldatei mit sensiblen Mustern wurde erkannt.", "danger");
  }, 1850);

  setTimeout(() => {
    setActiveService("sase");
    addEvent("Anfrage blockiert", "Die Demo-Policy blockiert den riskanten Vorgang und lässt unauffällige Sessions weiterlaufen.", "success");
    topologyCard.classList.remove("threat-mode");
    threatParticle.classList.remove("active");
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
  trustRange.value = 22;
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

  document.querySelector("#simulateThreat").addEventListener("click", simulateThreat);
  document.querySelector("#resetBtn").addEventListener("click", resetDashboard);

  document.querySelectorAll(".control-chip").forEach(button => {
    button.addEventListener("click", () => filterTelemetry(button.dataset.filter));
  });

  trustRange.addEventListener("input", event => updateTrust(Number(event.target.value)));
}

function seedEvents() {
  addEvent("SASE Demo aktiv", "Standardansicht mit SASE, Policy Enforcement und SD-WAN-Baustein geladen.", "success");
  addEvent("CASB-Regel aktiv", "SaaS-Zugriff anhand einer Beispielrichtlinie bewertet.");
  addEvent("SWG Inspection", "Web-Request wurde in der Demo kategorisiert und freigegeben.");
}

function boot() {
  bindInteractions();
  bindAccessModeSwitch();
  setAccessMode("sase", { silent: true });
  updateTrust(Number(trustRange.value));
  seedEvents();

  setInterval(refreshMetrics, 3600);

  // Bootstrap Tooltips für interaktive Cards.
  document.querySelectorAll(".cap-card").forEach(card => {
    card.setAttribute("data-bs-toggle", "tooltip");
    card.setAttribute("data-bs-title", `Details zu ${services[card.dataset.service]?.title ?? "SASE"} anzeigen`);
  });

  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
    .map(element => new bootstrap.Tooltip(element));
}

document.addEventListener("DOMContentLoaded", boot);
