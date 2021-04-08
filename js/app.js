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
function removeAllActiveSections(){
  for(let i=0; i<sectionsNumber;i++){
    sections[i].classList.remove('your-active-class');
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
  for(section of sections){
    if(isInViewport(section)){
      removeAllActiveSections();
      section.classList.add('your-active-class');
    }
  }
},{passive: true})
