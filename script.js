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


// Countdown al matrimonio: 30 settembre 2027 alle 17:00 (ora locale del dispositivo)
const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");
const countdownTarget = new Date(2027, 8, 30, 17, 0, 0);

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

