const services = {
  sase: {
    title: "Advanced UniByte SASE Edge",
    icon: "bi-shield-check",
    text: "Der Advanced-UniByte-Demo-Edge bündelt Netzwerkzugriff, Identitätsprüfung, Policy Enforcement und Threat Protection nah am Nutzer.",
    tags: ["Unified Policy", "Edge PoP", "TLS Inspection", "Context Engine", "Zero Trust"]
  },
  ztna: {
    title: "Zero Trust Network Access",
    icon: "bi-door-closed",
    text: "ZTNA ersetzt klassische VPN-Modelle: User erhalten nur Zugriff auf exakt freigegebene Apps, nicht auf das gesamte Netzwerk.",
    tags: ["Least Privilege", "Identity-first", "App Segmentation", "Continuous Auth"]
  },
  swg: {
    title: "Secure Web Gateway",
    icon: "bi-browser-edge",
    text: "SWG kontrolliert Web-Zugriffe, stoppt Malware, prüft URLs und erzwingt Richtlinien für riskante Internet-Nutzung.",
    tags: ["URL Filtering", "Malware Defense", "Browser Control", "SSL Inspection"]
  },
  casb: {
    title: "Cloud Access Security Broker",
    icon: "bi-cloud-fog2",
    text: "CASB schafft Transparenz über SaaS-Nutzung, erkennt Schatten-IT und schützt Daten in Cloud-Anwendungen.",
    tags: ["SaaS Visibility", "Shadow IT", "API Control", "Tenant Restriction"]
  },
  fwaas: {
    title: "Firewall as a Service",
    icon: "bi-fire",
    text: "FWaaS bringt Firewall-, IPS- und Layer-7-Kontrollen in die Cloud und verteilt sie global über Edge-Standorte.",
    tags: ["L7 Firewall", "IPS", "Egress Control", "Global Rules"]
  },
  dlp: {
    title: "Data Loss Prevention",
    icon: "bi-file-earmark-lock",
    text: "DLP erkennt sensible Daten wie personenbezogene Informationen, Quellcode oder Finanzdaten und verhindert Abfluss.",
    tags: ["Data Discovery", "Classification", "Exfiltration Stop", "Compliance"]
  },
  user: {
    title: "User Identity",
    icon: "bi-person-workspace",
    text: "Identität, Rolle, MFA-Status und Verhalten bilden den Startpunkt jeder Policy-Entscheidung.",
    tags: ["MFA", "Role Context", "Behavior", "Risk Signal"]
  },
  device: {
    title: "Device Posture",
    icon: "bi-phone",
    text: "Gerätezustand, Patch-Level, EDR-Status und Standort fließen in die adaptive Zugriffsbewertung ein.",
    tags: ["Posture Check", "EDR", "Patch Level", "Geo Signal"]
  },
  branch: {
    title: "Branch / SD-WAN",
    icon: "bi-building-lock",
    text: "Standorte verbinden sich direkt und sicher zum nächsten Edge, ohne Backhauling durch zentrale Rechenzentren.",
    tags: ["SD-WAN", "Local Breakout", "QoS", "Encrypted Tunnel"]
  },
  cloud: {
    title: "Cloud Apps",
    icon: "bi-cloud-check",
    text: "SaaS-, IaaS- und private Anwendungen werden nur nach erfolgreicher Policy-Prüfung erreichbar.",
    tags: ["SaaS", "IaaS", "Private Apps", "API Security"]
  },
  internet: {
    title: "Internet Egress",
    icon: "bi-globe2",
    text: "Internet-Traffic wird kategorisiert, inspiziert und nach Bedrohungen oder Datenverlustmustern gefiltert.",
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

  addEvent("Policy context aktualisiert", `${service.title} wurde fokussiert.`, "success");
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
    trustLabel.textContent = "High Risk";
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

  addEvent("Anomalie erkannt", "Ungewöhnlicher Login-Kontext von User → Edge.", "danger");
  setActiveService("swg");

  try {
    threatMotion.beginElement();
  } catch {
    // Einige Browser blockieren SVG beginElement bei sehr restriktiven Einstellungen.
  }

  setTimeout(() => {
    setActiveService("ztna");
    addEvent("ZTNA Challenge", "Session erhält Step-up MFA und App-Zugriff wird begrenzt.", "danger");
    trustRange.value = 78;
    updateTrust(78);
  }, 950);

  setTimeout(() => {
    setActiveService("dlp");
    addEvent("DLP Match", "Verdächtige Datei mit sensitiven Mustern wurde erkannt.", "danger");
  }, 1850);

  setTimeout(() => {
    setActiveService("sase");
    addEvent("Threat isoliert", "Policy Engine blockiert Exfiltration und hält legitime Sessions aktiv.", "success");
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
  addEvent("Dashboard zurückgesetzt", "Baseline-Policy und Standardansicht sind wieder aktiv.", "success");
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
  addEvent("Advanced UniByte SASE Edge online", "Nächster Demo-PoP mit 18 ms Latenz ausgewählt.", "success");
  addEvent("CASB Policy aktiv", "SaaS-App Zugriff nach Sensitivität bewertet.");
  addEvent("SWG Inspection", "Web Request wurde kategorisiert und freigegeben.");
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
