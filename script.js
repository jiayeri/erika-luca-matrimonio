const opening = document.getElementById("opening");
const seal = document.getElementById("seal");
const inviteReveal = document.getElementById("inviteReveal");
const enterSite = document.getElementById("enterSite");
const site = document.getElementById("site");

let opened = false;

function openInvitation() {
  if (opened) return;
  opened = true;

  // Prima rompe il sigillo, poi apre il lembo e solo dopo mostra la partecipazione.
  opening.classList.add("open");

  setTimeout(() => {
    opening.classList.add("hide");
    inviteReveal.classList.add("show");
    inviteReveal.setAttribute("aria-hidden", "false");
  }, 1550);
}

seal.addEventListener("click", openInvitation);
seal.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openInvitation();
  }
});

enterSite.addEventListener("click", () => {
  inviteReveal.style.display = "none";
  site.classList.add("show");
  site.setAttribute("aria-hidden", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const modal = document.getElementById("cardModal");
const openCard = document.getElementById("openCard");
const closeCard = document.getElementById("closeCard");

openCard.addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});
closeCard.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeCard.click();
});
