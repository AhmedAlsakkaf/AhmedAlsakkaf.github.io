// js/loadSections.js

const sections = [
  { id: "sidebar-container", file: "sidebar.html" },
  { id: "home-container", file: "home.html" },
  { id: "about-container", file: "about.html" },
  { id: "qualification-container", file: "qualification.html" },
  { id: "skills-container", file: "skills.html" },
  { id: "work-container", file: "work.html" },
  { id: "portfolioPopup-container", file: "portfolioPop.html" },
  { id: "services-container", file: "services.html" },
  { id: "contact-container", file: "contact.html" },
  { id: "footer-container", file: "footer.html" },
  { id: "cv-viewer-container", file: "cv-viewer.html" },
];

// Load all sections in parallel
const loadPromises = sections.map((section) =>
  fetch(`html/${section.file}`)
    .then((res) => res.text())
    .then((html) => {
      const el = document.getElementById(section.id);
      if (el) el.innerHTML = html;
    })
    .catch((err) => console.error(`Failed to load ${section.file}:`, err))
);

// Once all sections are injected: hide loading screen + init JS + scroll reveal
Promise.all(loadPromises).then(() => {
  // Hide loading screen as soon as HTML is ready
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 250);
  }

  if (typeof initPortfolio === "function") initPortfolio();

  // ── Scroll Reveal ──────────────────────────────────────────────
  initScrollReveal();
});

function initScrollReveal() {
  // Skip for users who prefer reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sr-visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  // Observe every direct child inside each section
  // This covers: headings, containers, images, forms, buttons
  const targets = document.querySelectorAll(
    [
      // section titles
      ".section__title",
      // about
      ".about__img",
      ".about__data",
      ".about__info",
      // qualification
      ".qualification__tabs",
      ".qualification__item",
      // skills
      ".skill__item",
      ".skills__load-more",
      // work
      ".work__filters",
      ".work__card",
      ".work__load-more",
      // contact
      ".contact__form-wrapper",
      // footer
      ".footer__container",
    ].join(", ")
  );

  targets.forEach((el, i) => {
    // stagger siblings of the same type
    const delay = computeDelay(el, i);
    el.style.transitionDelay = delay + "ms";
    el.classList.add("sr-hidden");
    observer.observe(el);
  });
}

// Give sibling elements a small staggered delay so they cascade in
function computeDelay(el, globalIndex) {
  const parent = el.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.children).filter((c) =>
    c.classList.contains(el.classList[0])
  );
  const siblingIndex = siblings.indexOf(el);
  // max 400ms total stagger so it never feels slow
  return Math.min(siblingIndex * 80, 400);
}
