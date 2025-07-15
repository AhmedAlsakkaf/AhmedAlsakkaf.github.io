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
];

// Load all sections and return a promise for each
const loadPromises = sections.map((section) =>
  fetch(`html/${section.file}`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(section.id).innerHTML = html;
    })
    .catch((err) => console.error(`Failed to load ${section.file}:`, err))
);

// Once all sections are loaded, then call main.js logic
Promise.all(loadPromises).then(() => {
  if (typeof initPortfolio === "function") initPortfolio(); // You’ll define this in main.js
});
