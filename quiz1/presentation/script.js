const slides = Array.from(document.querySelectorAll(".slide"));
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const counter = document.querySelector("#slide-counter");
const progressBar = document.querySelector("#progress-bar");
const dotsContainer = document.querySelector("#slide-dots");
const overview = document.querySelector("#overview");
const overviewGrid = document.querySelector("#overview-grid");
const overviewButton = document.querySelector("#overview-button");
const closeOverviewButton = document.querySelector("#close-overview");
const fullscreenButton = document.querySelector("#fullscreen-button");
const paperModal = document.querySelector("#paper-modal");
const paperDialogTitle = document.querySelector("#paper-dialog-title");
const paperDialogAward = document.querySelector("#paper-dialog-award");
const paperDialogContent = document.querySelector("#paper-dialog-content");
const closePaperModalButton = document.querySelector("#close-paper-modal");

let currentSlide = getSlideFromHash();
let lastPaperTrigger = null;

function getSlideFromHash() {
  const requestedSlide = Number(window.location.hash.slice(1));
  if (!Number.isInteger(requestedSlide)) return 0;
  return Math.min(Math.max(requestedSlide - 1, 0), slides.length - 1);
}

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function renderNavigation() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "slide-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a la diapositiva ${index + 1}: ${slide.dataset.title}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);

    const card = document.createElement("button");
    card.className = "overview-card";
    card.type = "button";
    card.innerHTML = `<span>${formatNumber(index + 1)}</span><strong>${slide.dataset.title}</strong>`;
    card.addEventListener("click", () => {
      goToSlide(index);
      closeOverview();
    });
    overviewGrid.appendChild(card);
  });
}

function goToSlide(index, updateHash = true) {
  const target = Math.min(Math.max(index, 0), slides.length - 1);
  currentSlide = target;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentSlide;
    slide.classList.toggle("is-active", isActive);
    slide.classList.toggle("is-before", slideIndex < currentSlide);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dotsContainer.querySelectorAll(".slide-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
    dot.setAttribute("aria-current", dotIndex === currentSlide ? "true" : "false");
  });

  overviewGrid.querySelectorAll(".overview-card").forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === currentSlide);
  });

  counter.textContent = `${formatNumber(currentSlide + 1)} / ${formatNumber(slides.length)}`;
  progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;

  if (updateHash) {
    history.replaceState(null, "", `#${currentSlide + 1}`);
  }
}

function openOverview() {
  overview.classList.add("is-open");
  overview.setAttribute("aria-hidden", "false");
  closeOverviewButton.focus();
}

function closeOverview() {
  overview.classList.remove("is-open");
  overview.setAttribute("aria-hidden", "true");
  overviewButton.focus();
}

function openPaperDetails(trigger) {
  const template = document.querySelector(`#paper-${trigger.dataset.paperModal}-template`);
  if (!template) return;

  lastPaperTrigger = trigger;
  paperDialogTitle.textContent = trigger.dataset.paperTitle;
  paperDialogAward.textContent = trigger.dataset.paperAward;
  paperDialogContent.replaceChildren(template.content.cloneNode(true));
  paperDialogContent.scrollTop = 0;
  paperModal.classList.add("is-open");
  paperModal.setAttribute("aria-hidden", "false");
  closePaperModalButton.focus();
}

function closePaperDetails() {
  paperModal.classList.remove("is-open");
  paperModal.setAttribute("aria-hidden", "true");
  paperDialogContent.replaceChildren();
  lastPaperTrigger?.focus();
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("El navegador no pudo cambiar a pantalla completa.", error);
  }
}

previousButton.addEventListener("click", () => goToSlide(currentSlide - 1));
nextButton.addEventListener("click", () => goToSlide(currentSlide + 1));
overviewButton.addEventListener("click", openOverview);
closeOverviewButton.addEventListener("click", closeOverview);
fullscreenButton.addEventListener("click", toggleFullscreen);
closePaperModalButton.addEventListener("click", closePaperDetails);

document.querySelectorAll("[data-paper-modal]").forEach((trigger) => {
  trigger.addEventListener("click", () => openPaperDetails(trigger));
});

paperModal.addEventListener("click", (event) => {
  if (event.target === paperModal) closePaperDetails();
});

document.addEventListener("fullscreenchange", () => {
  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenButton.setAttribute("aria-label", isFullscreen ? "Salir de pantalla completa" : "Activar pantalla completa");
});

document.addEventListener("keydown", (event) => {
  if (paperModal.classList.contains("is-open")) {
    if (event.key === "Escape") closePaperDetails();
    return;
  }

  if (overview.classList.contains("is-open")) {
    if (event.key === "Escape" || event.key.toLowerCase() === "o") closeOverview();
    return;
  }

  if (event.target.matches("button, a, input, textarea, select")) return;

  if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    goToSlide(currentSlide + 1);
  }

  if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goToSlide(currentSlide - 1);
  }

  if (event.key === "Home") goToSlide(0);
  if (event.key === "End") goToSlide(slides.length - 1);
  if (event.key.toLowerCase() === "f") toggleFullscreen();
  if (event.key.toLowerCase() === "o") openOverview();
});

window.addEventListener("hashchange", () => goToSlide(getSlideFromHash(), false));

document.querySelectorAll(".answer").forEach((answer) => {
  answer.addEventListener("click", () => {
    const feedback = document.querySelector("#quiz-feedback");
    document.querySelectorAll(".answer").forEach((item) => {
      item.classList.remove("is-selected", "is-incorrect");
    });

    answer.classList.add(answer.dataset.correct ? "is-selected" : "is-incorrect");
    feedback.textContent = answer.dataset.feedback;
  });
});

let touchStartX = 0;
document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (paperModal.classList.contains("is-open") || overview.classList.contains("is-open")) return;
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) < 60) return;
  goToSlide(currentSlide + (distance < 0 ? 1 : -1));
}, { passive: true });

renderNavigation();
goToSlide(currentSlide, false);
