const routes = [
  "inicio",
  "estudios",
  "pasatiempos",
  "proyectos",
  "contacto",
];

function setActiveRoute(route) {
  const sections = document.querySelectorAll(".route");
  sections.forEach((section) => {
    section.classList.toggle("d-none", section.id !== route);
  });

  const navLinks = document.querySelectorAll("nav .nav-link");
  navLinks.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", target === route);
  });
}

function parseHash() {
  const hash = window.location.hash.replace("#", "");
  return hash && routes.includes(hash) ? hash : "inicio";
}

function onHashChange() {
  setActiveRoute(parseHash());
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) {
    console.warn(" Formulario no encontrado");
    return;
  }

  console.log(" Formulario encontrado, inicializando validación...");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(" Formulario enviado");

    let isValid = true;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const terminos = document.getElementById("terminos");
    
    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorMensaje = document.getElementById("error-mensaje");
    const errorTerminos = document.getElementById("error-terminos");
    const messageBox = document.getElementById("formMessage");

    [errorNombre, errorEmail, errorMensaje, errorTerminos].forEach(el => {
      if (el) el.textContent = "";
    });
    if (messageBox) {
      messageBox.textContent = "";
      messageBox.className = "";
    }

    if (!nombre || nombre.value.trim().length < 3) {
      if (errorNombre) errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
      isValid = false;
      console.log("Nombre inválido");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value)) {
      if (errorEmail) errorEmail.textContent = "Ingresa un correo electrónico válido.";
      isValid = false;
      console.log(" Email inválido");
    }

    if (!mensaje || mensaje.value.trim().length < 10) {
      if (errorMensaje) errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
      isValid = false;
      console.log("Mensaje inválido");
    }

    if (terminos && !terminos.checked) {
      if (errorTerminos) errorTerminos.textContent = "Debes aceptar los términos.";
      isValid = false;
      console.log(" Términos no aceptados");
    }

    if (!isValid) {
      console.log(" Validación fallida");
      if (messageBox) {
        messageBox.textContent = "Por favor corrige los errores del formulario.";
        messageBox.className = "alert alert-danger";
      }
      return;
    }

    console.log(" Validación exitosa");
    
    setTimeout(() => {
      if (messageBox) {
        messageBox.textContent = "¡Gracias! Tu mensaje ha sido enviado correctamente.";
        messageBox.className = "alert alert-success";
      }
      form.reset();
      console.log(" Formulario reiniciado");
    }, 500);
  });
}

window.addEventListener("hashchange", onHashChange);
window.addEventListener("DOMContentLoaded", () => {
  onHashChange();
  initContactForm();
  initCarousel();
});

function initCarousel() {
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

  let intervalId = setInterval(nextSlide, 7000);
  carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
  carousel.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 7000);
  });

  window.prevSlide = prevSlide;
  window.nextSlide = nextSlide;

  showSlide(currentIndex);
}
