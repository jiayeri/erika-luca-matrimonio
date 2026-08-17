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
