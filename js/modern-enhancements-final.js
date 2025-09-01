// Modern Enhancements - Essential Features Only

document.addEventListener("DOMContentLoaded", function () {
  initLoadingScreen();
  initParticles();
  initBackToTop();
  initNavigationEnhancements();
});

// Loading Screen Animation - Optimized for Speed
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");

  if (loadingScreen) {
    // Start hiding loading screen as soon as DOM is ready (much faster)
    let isContentReady = false;

    // Check if critical content is loaded
    function checkContentReady() {
      const criticalElements = document.querySelectorAll(
        'img, link[rel="stylesheet"]'
      );
      let loadedCount = 0;
      const totalCount = criticalElements.length;

      if (totalCount === 0) {
        isContentReady = true;
        hideLoadingScreen();
        return;
      }

      criticalElements.forEach((element) => {
        if (element.tagName === "IMG") {
          if (element.complete) {
            loadedCount++;
          } else {
            element.onload = () => {
              loadedCount++;
              if (loadedCount >= totalCount) {
                isContentReady = true;
                hideLoadingScreen();
              }
            };
          }
        } else if (element.tagName === "LINK") {
          loadedCount++; // CSS files are already loaded when DOM is ready
        }
      });

      if (loadedCount >= totalCount) {
        isContentReady = true;
        hideLoadingScreen();
      }
    }

    function hideLoadingScreen() {
      if (!isContentReady) return;

      // Much faster - only 300ms delay instead of 1000ms
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 300); // Faster fade out
      }, 300);
    }

    // Start checking immediately
    setTimeout(checkContentReady, 100);

    // Fallback - force hide after maximum 2 seconds instead of waiting indefinitely
    setTimeout(() => {
      if (!isContentReady) {
        isContentReady = true;
        hideLoadingScreen();
      }
    }, 2000);
  }
}

// Particle Background
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#667eea",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: false,
        },
        size: {
          value: 3,
          random: true,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#667eea",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
      },
      retina_detect: true,
    });
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Enhanced Navigation
function initNavigationEnhancements() {
  // Update active navigation based on scroll position
  function updateActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Apply scroll event with debounce for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  window.addEventListener("scroll", debounce(updateActiveNavigation, 10));
}
