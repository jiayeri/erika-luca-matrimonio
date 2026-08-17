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


const ibanModal = document.getElementById("ibanModal");
const openIban = document.getElementById("openIban");
const closeIban = document.getElementById("closeIban");

openIban.addEventListener("click", () => {
  ibanModal.classList.add("open");
  ibanModal.setAttribute("aria-hidden", "false");
});

closeIban.addEventListener("click", () => {
  ibanModal.classList.remove("open");
  ibanModal.setAttribute("aria-hidden", "true");
});

ibanModal.addEventListener("click", (event) => {
  if (event.target === ibanModal) closeIban.click();
});


// Countdown al matrimonio
(function () {
  const target = new Date(2027, 8, 30, 0, 0, 0, 0);
  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  if (!days || !hours || !minutes || !seconds) return;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    days.textContent = pad(d);
    hours.textContent = pad(h);
    minutes.textContent = pad(m);
    seconds.textContent = pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
