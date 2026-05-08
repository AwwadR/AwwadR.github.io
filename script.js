const toggleButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const header = document.querySelector(".site-header");

/* Mobile menu */
if (toggleButton && nav) {
  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.textContent = "☰";
    });
  });
}

/* Header style on scroll */
window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* Reveal animation */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

/* Active nav link while scrolling */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

/* Professional card glow effect */
const cards = document.querySelectorAll(
  ".project-card, .contact-card, .about-card, .skill-card, .roadmap-card, .profile-card, .hero-copy"
);

cards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});