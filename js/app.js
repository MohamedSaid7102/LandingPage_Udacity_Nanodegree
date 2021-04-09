/**
 * 
 * Made by: Mohamed Said Ahmed Mohamed Shlef
 * 
 * Udacity Professional track 1st Project
 * 
*/

/**
 * Define Global Variables
 * 
*/

// get all the sections in the webpage by thair data attribute 
// and convert them from node list to an array using Spread Operator
let sections = [...document.querySelectorAll('[data-nav]')];
//  all the sections links
let sectionsLinks = [];
// count number of sections
let sectionsNumber = sections.length;
var fragment = document.createDocumentFragment(); // to avoid many reflows and repaints

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//  to detect if an element is in the view port or not
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}

// to remove 'your-active-class' class from all of the sections
function removeActives(){
  for(let i=0; i<sectionsNumber;i++){
    sections[i].classList.remove('your-active-class');
    sectionsLinks[i].classList.remove('active--link');
  }
}

// to get corresponding section name for the targeted section link
function correspondingSectionName(section){
  return section.innerText.replace(/\s/g,'').toLowerCase();
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
for(let i=0; i<sectionsNumber; i++){
  let newNavItem = document.createElement("li");; // new nav link
  let sectionHeader = sections[i].dataset.nav;// to save the section heading to use it later
  newNavItem.textContent = sectionHeader;
  newNavItem.classList.add('menu__link');
  sectionsLinks.push(newNavItem); // add this link to the links wrapper
  fragment.appendChild(newNavItem);
}

let navList = document.querySelector('#navbar__list');
navList.appendChild(fragment);


// Add class 'active' to section when near top of viewport

document.addEventListener('scroll',function(){
  for(let i=0; i<sectionsNumber ;i++){
    if(isInViewport(sections[i])){
      removeActives();
      sections[i].classList.add('your-active-class');
      sectionsLinks[i].classList.add('active--link');
    }
  }
},{passive: true})

// Scroll to anchor ID using scrollTO event
for(let i=0; i<sectionsNumber; i++){
  sectionsLinks[i].addEventListener('click',() =>{
    let targetedSection = correspondingSectionName(sectionsLinks[i]);
    document.getElementById(targetedSection).scrollIntoView({ behavior: 'smooth' });
  });
}

// hide nav bar on scrolling
function showNavOnScroll(){
  var timer = null; // this is like a flag to determine if scrolling or not
  window.addEventListener('scroll', function() {
    document.querySelector(".navbar__menu").style.top = "0"; // default state is visability
    if(timer !== null) {
      clearTimeout(timer);      
    }
    timer = setTimeout(function() {
      document.querySelector(".navbar__menu").style.top = "-60px";
      }, 3000);
    }, false);
}

// scroll to top button design
document.querySelector('.scrollTop').addEventListener('click',()=>{
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});

// to show toTop button while scrolling down
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos < currentScrollPos) {
    document.querySelector(".scrollTop").style.opacity = 0;
  } else {
    document.querySelector(".scrollTop").style.opacity = 1;
  }
  prevScrollpos = currentScrollPos;
}

const isHover = e => e.parentElement.querySelector(':hover') === e;    

const myButton = document.getElementById('scrollTop');
document.addEventListener('mousemove', function checkHover() {
  const hovered = isHover(myButton);
  if (hovered !== checkHover.hovered) {
    if(hovered){
      document.querySelector(".scrollTop").style.opacity = 0;
      myButton.classList.remove('fas');
      myButton.classList.add('far');
      document.querySelector(".scrollTop").style.opacity = 0.5;
    }
    else{
      document.querySelector(".scrollTop").style.opacity = 0;
      myButton.classList.remove('far');
      myButton.classList.add('fas');
      document.querySelector(".scrollTop").style.opacity = 1;
    }
    checkHover.hovered = hovered;
  }
});

/**
 * End Main Functions
 * Begin Events
 * 
*/


/**
 * End Events
 * Start invoking functions
 * 
 */
 showNavOnScroll();
