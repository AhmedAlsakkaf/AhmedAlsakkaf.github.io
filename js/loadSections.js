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

// Once all sections are injected: hide loading screen + init JS
Promise.all(loadPromises).then(() => {
  // Hide loading screen as soon as HTML is ready — no artificial delay
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 250);
  }

  if (typeof initPortfolio === "function") initPortfolio();
});
