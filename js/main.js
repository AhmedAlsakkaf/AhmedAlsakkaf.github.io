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

  /*=============== MIXITUP FILTER PORTFOLIO - DISABLED ===============*/
  // MixItUp disabled to prevent conflicts with load more functionality
  // Using custom filtering system instead

  /*===== Link Active Work - DISABLED =====*/
  // Original filter system disabled, using custom implementation below

  // const linkWork = document.querySelectorAll(".work__item");

  // function activeWork() {
  //   linkWork.forEach((L) => L.classList.remove("active-work"));
  //   this.classList.add("active-work");
  // }

  // linkWork.forEach((L) => L.addEventListener("click", activeWork));

  /*===== Load More Work Cards =====*/

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const allCards = document.querySelectorAll(".work__card");
  const loadMoreSection = document.querySelector(".work__load-more");
  const INITIAL_CARDS = 8; // Show first 8 cards initially

  let currentFilter = "all";
  let allCardsVisible = false; // Track if all cards are currently visible

  // Initialize: Show first 8 cards
  function initializeCards() {
    allCards.forEach((card, index) => {
      card.style.transition = "all 0.4s ease";

      if (index < INITIAL_CARDS) {
        card.style.display = "block";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.classList.remove("work__card--hidden");
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.classList.add("work__card--hidden");
      }
    });

    allCardsVisible = false;
    updateLoadMoreButton();
  }

  // Show more cards for current filter
  function showMoreCards() {
    const btnText = loadMoreBtn.querySelector(".load-btn-text");
    const btnIcon = loadMoreBtn.querySelector(".load-btn-icon");

    // Update button text during loading
    btnText.textContent = "Loading...";
    btnIcon.classList.remove("uil-arrow-down");
    btnIcon.classList.add("uil-spinner-alt");
    btnIcon.style.animation = "spin 1s linear infinite";

    // Get all cards that match current filter but are hidden
    const hiddenMatchingCards = Array.from(allCards).filter((card) => {
      const matchesFilter =
        currentFilter === "all" ||
        card.className.includes(currentFilter.replace(".", ""));
      const isHidden = card.classList.contains("work__card--hidden");
      return matchesFilter && isHidden;
    });

    // Show hidden matching cards with staggered animation
    hiddenMatchingCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove("work__card--hidden");
        card.style.display = "block";

        // Animate in
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      }, index * 100);
    });

    // Mark that all cards are now visible and hide load more button
    setTimeout(() => {
      allCardsVisible = true;
      loadMoreSection.classList.add("hidden");
    }, hiddenMatchingCards.length * 100 + 300);
  }

  // Update load more button visibility
  function updateLoadMoreButton() {
    const hasHiddenMatchingCards = Array.from(allCards).some((card) => {
      const matchesFilter =
        currentFilter === "all" ||
        card.className.includes(currentFilter.replace(".", ""));
      const isHidden = card.classList.contains("work__card--hidden");
      return matchesFilter && isHidden;
    });

    if (hasHiddenMatchingCards && !allCardsVisible) {
      loadMoreSection.classList.remove("hidden");

      // Reset button text
      const btnText = loadMoreBtn.querySelector(".load-btn-text");
      const btnIcon = loadMoreBtn.querySelector(".load-btn-icon");
      btnText.textContent = "Load More Projects";
      btnIcon.classList.remove("uil-spinner-alt");
      btnIcon.classList.add("uil-arrow-down");
      btnIcon.style.animation = "";
    } else {
      loadMoreSection.classList.add("hidden");
    }
  }

  // Enhanced filter function
  function customFilter(filterValue) {
    currentFilter = filterValue;

    // Reset the "all cards visible" state when changing filters
    allCardsVisible = false;

    allCards.forEach((card, index) => {
      const matchesFilter =
        filterValue === "all" ||
        card.className.includes(filterValue.replace(".", ""));

      if (matchesFilter) {
        // Show cards that match filter
        if (index < INITIAL_CARDS) {
          // Always show first 8 matching cards
          card.style.display = "block";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          card.classList.remove("work__card--hidden");
        } else {
          // Hide cards beyond initial count until load more is clicked
          card.style.display = "none";
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          card.classList.add("work__card--hidden");
        }
      } else {
        // Hide cards that don't match filter
        card.style.display = "none";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
      }
    });

    // Update load more button based on new filter
    setTimeout(() => {
      updateLoadMoreButton();
    }, 100);
  }

  // Initialize the cards on page load
  initializeCards();

  // Add event listener for load more button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", showMoreCards);
  }

  // Override the filter click handlers
  const workItems = document.querySelectorAll(".work__item");
  workItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      workItems.forEach((i) => i.classList.remove("active-work"));
      // Add active class to clicked item
      this.classList.add("active-work");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Apply custom filter
      customFilter(filterValue);
    });
  });

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

      const navLink = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

      if (navLink) {
        // Check if nav link exists before accessing classList
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active-link");
        } else {
          navLink.classList.remove("active-link");
        }
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

  /*=============== Skills Load More ===============*/
  function initSkillsLoadMore() {
    const loadMoreBtn = document.getElementById("skillsLoadMore");
    const hiddenSkills = document.querySelectorAll(".skill__hidden");

    if (loadMoreBtn && hiddenSkills.length > 0) {
      loadMoreBtn.addEventListener("click", () => {
        // Show all hidden skills with animation
        hiddenSkills.forEach((skill, index) => {
          setTimeout(() => {
            skill.style.display = "flex";
            skill.classList.remove("skill__hidden");
            // Add fade-in animation
            skill.style.opacity = "0";
            skill.style.transform = "translateY(20px)";

            setTimeout(() => {
              skill.style.transition = "all 0.3s ease";
              skill.style.opacity = "1";
              skill.style.transform = "translateY(0)";
            }, 50);
          }, index * 100); // Stagger the animations
        });

        // Hide the load more button
        setTimeout(() => {
          loadMoreBtn.style.transform = "scale(0)";
          loadMoreBtn.style.opacity = "0";
          setTimeout(() => {
            loadMoreBtn.style.display = "none";
          }, 300);
        }, hiddenSkills.length * 100 + 200);
      });
    }
  }

  /*=============== Qualification Tabs ===============*/
  function initQualificationTabs() {
    const tabs = document.querySelectorAll("[data-target]");
    const tabContents = document.querySelectorAll("[data-content]");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("qualification__active"));
        tabContents.forEach((tc) =>
          tc.classList.remove("qualification__active")
        );

        // Add active class to clicked tab and corresponding content
        tab.classList.add("qualification__active");
        target.classList.add("qualification__active");
      });
    });
  }

  // Initialize all functions
  initSkillsLoadMore();
  initQualificationTabs();
}
