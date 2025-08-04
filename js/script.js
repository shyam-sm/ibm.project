document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsContainer = document.querySelector(".slider-dots");
  const slideCount = slides.length - 1; // last is clone
  let current = 0;
  let isTransitioning = false;
  let autoSlideInterval;

  // Create dots
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("span");
    dot.className = "slider-dot" + (i === 0 ? " active" : "");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll(".slider-dot");

  function goToSlide(idx, animate = true) {
    if (animate)
      track.style.transition = "transform 0.6s cubic-bezier(.77,0,.18,1)";
    else track.style.transition = "none";
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    if (idx === slideCount) dots[0].classList.add("active");
    else if (idx >= 0 && idx < slideCount) dots[idx].classList.add("active");
    current = idx;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    goToSlide(current + 1);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    goToSlide(current - 1);
  }

  track.addEventListener("transitionend", () => {
    if (current === slideCount) {
      // Jump to real first slide without animation
      goToSlide(0, false);
    }
    if (current < 0) {
      // Jump to real last slide without animation
      goToSlide(slideCount - 1, false);
    }
    isTransitioning = false;
  });

  nextBtn.onclick = nextSlide;
  prevBtn.onclick = function () {
    if (current === 0) {
      // Jump to clone, then animate to last
      goToSlide(slideCount, false);
      setTimeout(() => prevSlide(), 20);
    } else {
      prevSlide();
    }
  };

  dots.forEach((dot) => {
    dot.onclick = function () {
      if (isTransitioning) return;
      goToSlide(Number(this.dataset.index));
    };
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 3500);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  track.parentElement.addEventListener("mouseenter", stopAutoSlide);
  track.parentElement.addEventListener("mouseleave", startAutoSlide);

  // Init
  goToSlide(0, false);
  startAutoSlide();
});


document.addEventListener("DOMContentLoaded", () => {
  const scrollAmount = 180;

  document.querySelectorAll(".carousel-container").forEach((container) => {
    const carousel = container.querySelector(".carousel-scroll");
    const leftBtn = container.querySelector(".carousel-nav.left");
    const rightBtn = container.querySelector(".carousel-nav.right");

    // Scroll to left on load
    carousel.scrollLeft = 0;

    function updateLeftArrow() {
      if (carousel.scrollLeft > 20) {
        leftBtn.classList.add("show");
      } else {
        leftBtn.classList.remove("show");
      }
    }

    // Initial update
    updateLeftArrow();

    leftBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(updateLeftArrow, 350);
    });

    rightBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(updateLeftArrow, 350);
    });

    carousel.addEventListener("scroll", updateLeftArrow);

    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "Right") {
        e.preventDefault();
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setTimeout(updateLeftArrow, 350);
      }
      if (e.key === "ArrowLeft" || e.key === "Left") {
        e.preventDefault();
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setTimeout(updateLeftArrow, 350);
      }
    });
  });
});
