(function () {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".carousel-item"));
  const btnPrev = carousel.parentElement.querySelector(".prev");
  const btnNext = carousel.parentElement.querySelector(".next");

  if (!slides.length) return;

  let currentIndex = slides.findIndex((slide) => slide.classList.contains("active"));
  if (currentIndex === -1) currentIndex = 0;

  const showSlide = (index) => {
    const clamped = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === clamped);
    });
    currentIndex = clamped;
  };

  const prevSlide = () => showSlide(currentIndex - 1);
  const nextSlide = () => showSlide(currentIndex + 1);

  if (btnPrev) btnPrev.addEventListener("click", prevSlide);
  if (btnNext) btnNext.addEventListener("click", nextSlide);

l
  let intervalId = setInterval(nextSlide, 7000);
  carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
  carousel.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 7000);
  });

  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;

  showSlide(currentIndex);
})();
