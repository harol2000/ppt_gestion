const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const slideCounter = document.getElementById("slideCounter");
const progressBar = document.getElementById("progressBar");

let currentSlide = 0;

const totalSlides = slides.length;

function formatCounter(value) {
    return String(value).padStart(2, "0");
}

function updateHash(index) {
    history.replaceState(null, "", `#slide-${index + 1}`);
}

function renderSlide(index) {
    currentSlide = index;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;

        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === totalSlides - 1;
    slideCounter.textContent = `${formatCounter(currentSlide + 1)} / ${formatCounter(totalSlides)}`;
    progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

    updateHash(currentSlide);
}

function goToSlide(index) {
    const nextIndex = Math.max(0, Math.min(index, totalSlides - 1));

    if (nextIndex === currentSlide) {
        return;
    }

    renderSlide(nextIndex);
}

function getInitialSlide() {
    const hash = window.location.hash.match(/slide-(\d+)/);

    if (!hash) {
        return 0;
    }

    const parsed = Number(hash[1]) - 1;

    if (Number.isNaN(parsed)) {
        return 0;
    }

    return Math.max(0, Math.min(parsed, totalSlides - 1));
}

prevButton.addEventListener("click", () => goToSlide(currentSlide - 1));
nextButton.addEventListener("click", () => goToSlide(currentSlide + 1));

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        goToSlide(currentSlide + 1);
    }

    if (event.key === "ArrowLeft") {
        goToSlide(currentSlide - 1);
    }

    if (event.key === "Home") {
        goToSlide(0);
    }

    if (event.key === "End") {
        goToSlide(totalSlides - 1);
    }
});

renderSlide(getInitialSlide());
