const envelopeScreen = document.getElementById("envelopeScreen");
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");
const invitation = document.getElementById("invitation");
const enterSite = document.getElementById("enterSite");
const site = document.getElementById("site");

let opened = false;

function openEnvelope() {
  if (opened) return;
  opened = true;

  envelopeScreen.classList.add("opened");
  envelopeScreen.classList.add("is-opening");

  setTimeout(() => {
    envelopeScreen.classList.add("is-hidden");
    invitation.classList.add("visible");
    invitation.setAttribute("aria-hidden", "false");
  }, 950);
}

seal.addEventListener("click", openEnvelope);
seal.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEnvelope();
  }
});

enterSite.addEventListener("click", () => {
  invitation.classList.remove("visible");
  invitation.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    invitation.style.display = "none";
    site.classList.add("visible");
    site.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 550);
});


// Countdown al matrimonio: 29 maggio 2027 alle 17:00 (ora locale del dispositivo)
const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");
const countdownTarget = new Date(2027, 4, 29, 17, 0, 0);

function updateCountdown() {
  const remaining = countdownTarget.getTime() - Date.now();

  if (remaining <= 0) {
    countdownDays.textContent = "0";
    countdownHours.textContent = "0";
    countdownMinutes.textContent = "0";
    countdownSeconds.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownDays.textContent = days;
  countdownHours.textContent = String(hours).padStart(2, "0");
  countdownMinutes.textContent = String(minutes).padStart(2, "0");
  countdownSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Card IBAN: resta chiusa finché non viene aperta dall'invitato
const ibanCard = document.getElementById("ibanCard");
const ibanToggle = document.getElementById("ibanToggle");
const ibanDetails = document.getElementById("ibanDetails");

ibanToggle.addEventListener("click", () => {
  const isOpen = ibanCard.classList.toggle("is-open");
  ibanToggle.setAttribute("aria-expanded", String(isOpen));
  ibanDetails.setAttribute("aria-hidden", String(!isOpen));
});

// Copia IBAN negli appunti con un tap
const ibanCopyBtn = document.getElementById("ibanCopyBtn");
const ibanValue = document.getElementById("ibanValue");

if (ibanCopyBtn && ibanValue) {
  ibanCopyBtn.addEventListener("click", async () => {
    const text = ibanValue.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback per contesti non sicuri o browser meno recenti
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        tempInput.style.position = "fixed";
        tempInput.style.opacity = "0";
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      const originalLabel = ibanCopyBtn.textContent;
      ibanCopyBtn.textContent = "Copiato ✓";
      ibanCopyBtn.classList.add("copied");

      setTimeout(() => {
        ibanCopyBtn.textContent = originalLabel;
        ibanCopyBtn.classList.remove("copied");
      }, 1800);
    } catch (err) {
      ibanCopyBtn.textContent = "Riprova";
      setTimeout(() => {
        ibanCopyBtn.textContent = "Copia";
      }, 1800);
    }
  });
}

// Drago decorativo che vola attraverso lo schermo durante lo scroll
const flyingDragon = document.getElementById("flyingDragon");

if (flyingDragon) {
  // Due "finestre" di volo lungo l'intera altezza della pagina (in frazione 0–1 dello scroll)
  const flightWindows = [
    { start: 0.06, end: 0.30, fromLeft: true },
    { start: 0.52, end: 0.78, fromLeft: false }
  ];

  let ticking = false;

  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  function updateDragon() {
    ticking = false;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = scrollable > 0 ? window.scrollY / scrollable : 0;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let active = null;
    for (const w of flightWindows) {
      if (fraction >= w.start && fraction <= w.end) {
        active = w;
        break;
      }
    }

    if (!active) {
      flyingDragon.style.opacity = "0";
      return;
    }

    const p = (fraction - active.start) / (active.end - active.start);
    const eased = easeInOutSine(p);

    // percorso da un lato all'altro dello schermo, con un leggero arco verticale
    const startX = active.fromLeft ? -0.25 * vw : 1.15 * vw;
    const endX = active.fromLeft ? 1.15 * vw : -0.25 * vw;
    const x = startX + (endX - startX) * eased;

    const baseY = vh * 0.32;
    const arc = Math.sin(Math.PI * eased) * (vh * 0.16);
    const y = baseY - arc;

    const tilt = active.fromLeft ? 10 - eased * 20 : -10 + eased * 20;
    const flip = active.fromLeft ? 1 : -1;

    // dissolvenza in entrata/uscita della finestra di volo
    let opacity = 1;
    if (p < 0.12) opacity = p / 0.12;
    else if (p > 0.88) opacity = (1 - p) / 0.12;

    flyingDragon.style.opacity = String(Math.max(0, Math.min(1, opacity)));
    flyingDragon.style.transform =
      `translate3d(${x}px, ${y}px, 0) scaleX(${flip}) rotate(${tilt}deg)`;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateDragon);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateDragon();
}

