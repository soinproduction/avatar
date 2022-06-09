
const burgerBtn = document.querySelector(".burger-btn");
const profile = document.querySelectorAll(".profile-links");
const replaceElement = [...document.querySelectorAll(".data-replace")];
const replaceNav = document.querySelectorAll(".replace-navigation");
const topInner = document.querySelector(".top-parrent");
const bottomInner = document.querySelector(".bottom-parrent");
const mobileInner = document.querySelector(".data-mobile-inner");
const breakpoint = 1024;
const breakpointSecond = 767;
const body = document.body;

const changeLocation = (elements, parentMobile, parentDesktop) => { // перемещение необходимых эллементов
  let containerWidth = document.documentElement.clientWidth;
  for (const element of elements) {
    if (containerWidth <= breakpoint) {
      parentMobile.insertAdjacentElement("beforeend", element);
    };
    if (containerWidth > breakpoint) {
      parentDesktop.insertAdjacentElement("beforeend", element);
    }
  }
};

const profileLocation = (elements, parentMobile, parentDesktop) => { // перемещение необходимых эллементов
  let containerWidth = document.documentElement.clientWidth;
  for (const element of elements) {
    if (containerWidth <= breakpointSecond) {
      parentMobile.insertAdjacentElement("beforeend", element);
    };
    if (containerWidth >= breakpointSecond) {
      parentDesktop.insertAdjacentElement("beforeend", element);
    }
  }
};


window.addEventListener("DOMContentLoaded", () => {
  profileLocation(profile, mobileInner, bottomInner);
  changeLocation(replaceElement, mobileInner, bottomInner);
  changeLocation(replaceNav, mobileInner, topInner);
  setHeaderHeight();
});

window.addEventListener("resize", () => {
  profileLocation(profile, mobileInner, bottomInner);
  changeLocation(replaceElement, mobileInner, bottomInner);
  changeLocation(replaceNav, mobileInner, topInner);
  setHeaderHeight();
});

const toggleClassOnClick = function(element,button) {
  element.classList.toggle('active');
  button.classList.toggle('active');
};

burgerBtn.addEventListener('click', function(){
  toggleClassOnClick(mobileInner,burgerBtn)
  body.classList.toggle('menu-open')
});

function setHeaderHeight() { // переменная высоты header
  let header = document.querySelector('header'),
      headerHeight = header.clientHeight + 'px';
  body.style.setProperty('--header-min-height', headerHeight)
}

window.addEventListener('click', function(e){
  if(e.target.classList.contains('menu-open')) {
    toggleClassOnClick(mobileInner,burgerBtn)
    body.classList.toggle('menu-open')
  }
});










