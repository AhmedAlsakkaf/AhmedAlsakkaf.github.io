// js/main.js

function initPortfolio() {
  /*=============== Changing Text ===============*/

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const phrases = [
    "Software Engineer",
    "Frontend Developer",
    "UI/UX Designer",
    "Backend Developer",
    "Digital Marketer",
  ];
  const el = document.getElementById("typewriter");

  let sleepTime = 60;

  let curPhraseIndex = 0;

  const writeLoop = async () => {
    while (true) {
      let curWord = phrases[curPhraseIndex];

      for (let i = 0; i < curWord.length; i++) {
        el.innerText = curWord.substring(0, i + 1);
        await sleep(sleepTime);
      }

      await sleep(sleepTime * 10);

      for (let i = curWord.length; i > 0; i--) {
        el.innerText = curWord.substring(0, i - 1);
        await sleep(sleepTime);
      }

      await sleep(sleepTime * 5);

      if (curPhraseIndex === phrases.length - 1) {
        curPhraseIndex = 0;
      } else {
        curPhraseIndex++;
      }
    }
  };

  writeLoop();

  /*=============== SHOW SIDEBAR ===============*/
  const navMenu = document.getElementById("sidebar"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

  /*===== SIDEBAR SHOW =====*/
  /* Validate If Constant Exists */
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-sidebar");
    });
  }

  /*===== SIDEBAR HIDDEN =====*/
  /* Validate If Constant Exists */
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-sidebar");
    });
  }

  /*=============== SKILLS TABS ===============*/

  const tabs = document.querySelectorAll("[data-target]"),
    tabContent = document.querySelectorAll("[data-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.target);

      tabContent.forEach((tabContents) => {
        tabContents.classList.remove("skills__active");
      });

      target.classList.add("skills__active");

      tabs.forEach((tab) => {
        tab.classList.remove("skills__active");
      });

      tab.classList.add("skills__active");
    });
  });

  /*=============== MIXITUP FILTER PORTFOLIO ===============*/

  let mixerPortfolio = mixitup(".work__container", {
    selectors: {
      target: ".work__card",
    },
    animation: {
      duration: 300,
    },
  });

  /*===== Link Active Work =====*/

  const linkWork = document.querySelectorAll(".work__item");

  function activeWork() {
    linkWork.forEach((L) => L.classList.remove("active-work"));
    this.classList.add("active-work");
  }

  linkWork.forEach((L) => L.addEventListener("click", activeWork));

  /*===== Load More Work Cards =====*/

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const hiddenCards = document.querySelectorAll(".work__card--hidden");
  const loadMoreSection = document.querySelector(".work__load-more");

  if (loadMoreBtn && hiddenCards.length > 0) {
    loadMoreBtn.addEventListener("click", function () {
      // Update button text during loading
      const btnText = loadMoreBtn.querySelector(".load-btn-text");
      const btnIcon = loadMoreBtn.querySelector(".load-btn-icon");

      btnText.textContent = "Loading...";
      btnIcon.classList.remove("uil-arrow-down");
      btnIcon.classList.add("uil-spinner-alt");
      btnIcon.style.animation = "spin 1s linear infinite";

      // Show all hidden cards with animation
      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove("work__card--hidden");
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";

          // Animate the card in
          setTimeout(() => {
            card.style.transition = "all 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        }, index * 100);
      });

      // Update MixItUp to include new cards and hide load more button
      setTimeout(() => {
        if (mixerPortfolio) {
          mixerPortfolio.destroy();
          mixerPortfolio = mixitup(".work__container", {
            selectors: {
              target: ".work__card",
            },
            animation: {
              duration: 300,
            },
          });
        }

        // Hide the load more button
        loadMoreSection.classList.add("hidden");
      }, hiddenCards.length * 100 + 500);
    });
  }

  /*===== Work Popup =====*/

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("work__button")) {
      togglePortfolioPopup();
      // Find the closest work card container
      const workCard = e.target.closest(".work__card");
      portfolioItemDetails(workCard);
    }
  });

  function togglePortfolioPopup() {
    document.querySelector(".portfolio__popup").classList.toggle("open");
  }

  document
    .querySelector(".portfolio__popup-close")
    .addEventListener("click", togglePortfolioPopup);

  function portfolioItemDetails(portfolioitem) {
    document.querySelector(".pp__thumbnail img").src =
      portfolioitem.querySelector(".work__img").src;
    document.querySelector(".portfolio__popup-subtitle span").innerHTML =
      portfolioitem.querySelector(".work__title").innerHTML;

    document.querySelector(".portfolio__popup-body").innerHTML =
      portfolioitem.querySelector(".portfolio__item-details").innerHTML;
  }

  /*=============== SERVICES MODAL ===============*/

  const modalViews = document.querySelectorAll(".services__modal"),
    modelBtns = document.querySelectorAll(".services__button"),
    modalClose = document.querySelectorAll(".services__modal-close");

  let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
  };

  modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener("click", () => {
      modal(i);
    });
  });

  modalClose.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
      modalViews.forEach((modalView) => {
        modalView.classList.remove("active-modal");
      });
    });
  });

  /*=============== SWIPER TESTIMONIAL ===============*/

  /*=============== INPUT ANIMATION ===============*/

  const inputs = document.querySelectorAll(".input");

  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }

  function blurFunc() {
    let parent = this.parentnode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
  });

  /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

  const sectoins = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", navHighlighter);

  function navHighlighter() {
    let scrollY = window.pageYOffset;

    sectoins.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".nav__menu a[href*=" + sectionId + "]")
          .classList.add("active-link");
      } else {
        document
          .querySelector(".nav__menu a[href*=" + sectionId + "]")
          .classList.remove("active-link");
      }
    });
  }

  /*=============== SHOW SCROLL UP ===============*/

  initShare();
  // Show the linked is copied.
}

function initShare() {
  const shareBtn = document.getElementById("share-btn");
  const toast = document.getElementById("copy-toast");

  const linkToCopy = "https://ahmedalsakkaf.github.io"; // Update if needed

  if (shareBtn && toast) {
    shareBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(linkToCopy).then(() => {
        // Show toast
        toast.classList.add("show");

        // Animate icon
        shareBtn.classList.add("share-animate");

        // Remove animation after it ends
        setTimeout(() => {
          toast.classList.remove("show");
          shareBtn.classList.remove("share-animate");
        }, 600); // Slightly longer than animation duration
      });
    });
  }
}
