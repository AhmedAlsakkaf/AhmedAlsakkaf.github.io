/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add('show-sidebar');
  });
}


/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove('show-sidebar');
  });
}


/*=============== SKILLS TABS ===============*/

const tabs = document.querySelectorAll('[data-target]'),
tabContent = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    const target = document.querySelector(tab.dataset.target)

    tabContent.forEach(tabContents => {
      tabContents.classList.remove('skills__active')
    })

    target.classList.add('skills__active')

    tabs.forEach(tab =>{
      tab.classList.remove('skills__active')
    })
      

    tab.classList.add('skills__active')

  })

})




/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixerPortfolio = mixitup('.work__container', {
  selectors: {
      target: '.work__card'
  },
  animation: {
      duration: 300
  }
});


/*===== Link Active Work =====*/

const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
  linkWork.forEach( L=> L.classList.remove('active-work'))
  this.classList.add('active-work')
}


linkWork.forEach(L=> L.addEventListener("click", activeWork))



/*===== Work Popup =====*/


document.addEventListener("click", (e) => {
  if(e.target.classList.contains("work__button")){
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
})


function togglePortfolioPopup(){
  document.querySelector(".portfolio__popup").classList.toggle("open");
}


document.querySelector(".portfolio__popup-close").addEventListener("click", togglePortfolioPopup)


function portfolioItemDetails(portfolioitem){
  document.querySelector(".pp__thumbnail img").src = portfolioitem.querySelector(".work__img").src;
  document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioitem.querySelector(
    ".work__title").innerHTML;

  document.querySelector(".portfolio__popup-body").innerHTML = portfolioitem.querySelector(
    ".portfolio__item-details").innerHTML;
}


/*=============== SERVICES MODAL ===============*/



const modalViews = document.querySelectorAll('.services__modal'),
  modelBtns= document.querySelectorAll('.services__button'),
  modalClose = document.querySelectorAll('.services__modal-close')


let modal = function(modalClick){
  modalViews[modalClick].classList.add('active-modal')
}

modelBtns.forEach((modelBtn, i)=>{
  modelBtn.addEventListener('click', () => {

    modal(i)
    
  })
})


modalClose.forEach((modalClose)=>{
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView)=> {
      modalView.classList.remove('active-modal')
    })
  })
})


/*=============== SWIPER TESTIMONIAL ===============*/


/*=============== INPUT ANIMATION ===============*/


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sectoins = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter()
{
  let scrollY = window.pageYOffset;

  sectoins.forEach(current => {

    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50,
    sectionId = current.getAttribute("id");


    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
    {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add("active-link")
    }
    else
    {
      document.querySelector('.nav__menu a[href*='+sectionId+']').classList.remove("active-link")
    }


  })



}







/*=============== SHOW SCROLL UP ===============*/

