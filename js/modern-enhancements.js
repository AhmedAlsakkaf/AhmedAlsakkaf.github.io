// Enhanced Portfolio JavaScript with Modern Features

// Initialize all enhancements when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initLoadingScreen();
  initParticles();
  initScrollReveal();
  initSmoothScrolling();
  initModernEffects();
  initBackToTop();

  // Initialize existing portfolio functionality after a short delay
  setTimeout(() => {
    if (typeof initPortfolio === "function") {
      initPortfolio();
    }
  }, 500);
});

// Loading Screen Animation
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");

  // Hide loading screen after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1000); // Show loader for at least 1 second
  });
}

// Particle Background
function initParticles() {
  if (window.particlesJS) {
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
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
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
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
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
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Animate skill bars
        if (entry.target.classList.contains("skills__data")) {
          const percentage = entry.target.querySelector(".skills__percentage");
          const width = percentage.getAttribute("data-width");
          if (width) {
            setTimeout(() => {
              percentage.style.width = width + "%";
            }, 200);
          }
        }
      }
    });
  }, observerOptions);

  // Observe all elements with reveal class
  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}

// Enhanced Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Update active link
        document
          .querySelectorAll(".nav__link")
          .forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Smooth scroll to target
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Modern Interactive Effects
function initModernEffects() {
  // Enhanced hover effects for cards
  document.querySelectorAll(".glass-card, .work__card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Enhanced button effects
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Parallax effect for floating elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll(".floating");

    parallax.forEach((element) => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Dynamic navigation highlighting
  window.addEventListener("scroll", updateActiveNavigation);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

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

// Enhanced Typewriter Effect (if original doesn't exist)
function initEnhancedTypewriter() {
  const phrases = [
    "Software Engineer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Backend Developer",
    "Digital Marketer",
    "Problem Solver",
  ];

  const typewriterElement = document.getElementById("typewriter");
  const cursor = document.getElementById("cursor");

  if (!typewriterElement) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typewriter effect
  type();

  // Animate cursor
  setInterval(() => {
    if (cursor) {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }
  }, 500);
}

// Enhanced Copy Link Functionality
function initCopyToClipboard() {
  const shareBtn = document.getElementById("share-btn");
  const copyToast = document.getElementById("copy-toast");

  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyToast.style.opacity = "1";
        copyToast.style.transform = "translateY(0)";

        setTimeout(() => {
          copyToast.style.opacity = "0";
          copyToast.style.transform = "translateY(-20px)";
        }, 2000);
      });
    });
  }
}

// Enhanced Contact Form
function initContactForm() {
  // Wait for the contact form to be loaded
  setTimeout(() => {
    const form = document.querySelector(".contact__form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector(".contact__submit-btn");
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="uil uil-spinner-alt"></i> Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          showToast("✅ Message sent successfully!", "success");
          form.reset();
          // Reset labels
          form.querySelectorAll(".contact__form-label").forEach((label) => {
            label.style.transform = "";
            label.style.color = "";
          });
        } else {
          showToast("❌ Failed to send message. Please try again.", "error");
        }
      } catch (error) {
        showToast("⚠️ Network error. Please check your connection.", "error");
      } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Enhanced input animations
    const inputs = form.querySelectorAll(".contact__form-input");
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentElement.classList.remove("focused");
        }
      });
    });
  }, 1000);
}

// Toast notification function
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 100);

  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Initialize copy functionality
document.addEventListener("DOMContentLoaded", () => {
  initCopyToClipboard();
  initContactForm();
});

// Performance optimization for animations
function optimizeAnimations() {
  // Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty(
      "--transition-medium",
      "0.2s ease"
    );
    document.documentElement.style.setProperty(
      "--transition-slow",
      "0.3s ease"
    );
  }

  // Disable animations if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty("--transition-fast", "0s");
    document.documentElement.style.setProperty("--transition-medium", "0s");
    document.documentElement.style.setProperty("--transition-slow", "0s");
  }
}

// Initialize performance optimizations
optimizeAnimations();

// Debounce function for performance
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

// Apply debounce to scroll events
window.addEventListener("scroll", debounce(updateActiveNavigation, 10));
