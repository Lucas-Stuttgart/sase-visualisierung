const services = {
  sase: {
    title: "SASE Policy Enforcement",
    icon: "bi-shield-check",
    text: "SASE bündelt Netzwerk- und Sicherheitsfunktionen als cloudnahes Service-Modell. Entscheidungen werden anhand von Identität, Gerätezustand, Zielanwendung und Risiko getroffen.",
    tags: ["Unified Policy", "SASE PoP", "TLS Inspection", "Context Engine", "Zero Trust"]
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
    title: "Branch / SD-WAN",
    icon: "bi-building-lock",
    text: "Standorte können über SD-WAN- oder PoP-Anbindungen mit Sicherheitsdiensten und Anwendungen verbunden werden.",
    tags: ["SD-WAN", "Local Breakout", "QoS", "Encrypted Tunnel"]
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

const randomBetween = (min, max, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};

function setActiveService(key) {
  const service = services[key] ?? services.sase;

  detailTitle.textContent = service.title;
  detailText.textContent = service.text;
  detailIcon.className = `bi ${service.icon}`;
  detailTags.innerHTML = service.tags.map(tag => `<span>${tag}</span>`).join("");

  document.querySelectorAll("[data-service]").forEach(item => {
    item.classList.toggle("active", item.dataset.service === key);
  });

  addEvent("Demo-Kontext aktualisiert", `${service.title} wurde ausgewählt.`, "success");
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
    latency: randomBetween(12, 31),
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

function simulateThreat() {
  topologyCard.classList.add("threat-mode");
  threatParticle.classList.add("active");

  addEvent("Demo-Anomalie erkannt", "Beispielhafter Login-Kontext mit erhöhtem Risiko.", "danger");
  setActiveService("swg");

  try {
    threatMotion.beginElement();
  } catch {
    // Einige Browser blockieren SVG beginElement bei sehr restriktiven Einstellungen.
  }

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
  setActiveService("sase");
  filterTelemetry("all");
  addEvent("Demo zurückgesetzt", "Die Ausgangswerte und die Standardansicht sind wieder aktiv.", "success");
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
  addEvent("SASE Demo aktiv", "Beispielhafter SASE PoP mit 18 ms Latenz ausgewählt.", "success");
  addEvent("CASB-Regel aktiv", "SaaS-Zugriff anhand einer Beispielrichtlinie bewertet.");
  addEvent("SWG Inspection", "Web-Request wurde in der Demo kategorisiert und freigegeben.");
}

function boot() {
  bindInteractions();
  setActiveService("sase");
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
