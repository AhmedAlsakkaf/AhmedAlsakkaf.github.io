
// /*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
      target: '.work__card'
  },
  animation: {
      duration: 300
  }
});


// /*===== Link Active Work =====*/

const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
  linkWork.forEach( L=> l.classList.remove('active-work'))
  this.classList.add('active-work')
}


linkWork.forEach(L=> l.addEventListener("click", activeWork))



alert('Fuck You')


