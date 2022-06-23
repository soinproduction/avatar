import './_vendor';
import vars from './_vars';
// import './_functions';
import './_components';



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

let header = document.querySelector('header');
let headerTop = document.querySelector('.header-top');
let sticky = headerTop.clientHeight;


function setHeaderHeight() { // переменная высоты header
    let headerHeight = header.clientHeight + 'px';
    let headerTopHeight = headerTop.clientHeight + 'px';
    vars.bodyEl.style.setProperty('--header-min-height', headerHeight);
    body.style.setProperty('--header-top-height', headerTopHeight);
}

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
    stickyHeaderFunction();
});

window.addEventListener("resize", () => {
    profileLocation(profile, mobileInner, bottomInner);
    changeLocation(replaceElement, mobileInner, bottomInner);
    changeLocation(replaceNav, mobileInner, topInner);
    setHeaderHeight();
    stickyHeaderFunction();
});

const toggleClassOnClick = function(element, button) {
    element.classList.toggle('active');
    button.classList.toggle('active');
};

burgerBtn.addEventListener('click', function() {
    toggleClassOnClick(vars.mobileInner, burgerBtn)
    body.classList.toggle('menu-open')
});


window.addEventListener('click', function(e) {
    if (e.target.classList.contains('menu-open')) {
        toggleClassOnClick(mobileInner, burgerBtn)
        body.classList.toggle('menu-open')
    }
});


const stickyHeaderFunction = () => {
    window.onscroll = function() { myFunction() };
    let containerWidth = document.documentElement.clientWidth;
    if (containerWidth <= breakpointSecond) {
        sticky = 0
    }

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add('sticky')
        } else {
            header.classList.remove('sticky')
        }
    }

};


const getAccordions = function(dataName = "[data-id]") {
    return document.querySelectorAll(dataName);
}

const accordions = getAccordions();
let openedAccordion = null;

const closeAccordion = function(accordion) {
    accordion.style.maxHeight = 0;
    accordion.classList.remove('open')
};

const openAccordion = function(accordion) {
    accordion.style.maxHeight = accordion.scrollHeight + "px";
    accordion.classList.add('open')
};

const toggleAccordionButton = function(button, className = "active") {
    button.classList.toggle(className);
};

const checkIsAccordionOpen = function(accordion) {
    return accordion.style.maxHeight && accordion.style.maxHeight !== "0px";
}

const accordionClickHandler = function() {

    let curentDataNumber = this.dataset.id

    toggleAccordionButton(this);

    const accordionContent = document.querySelector(`[data-content="${curentDataNumber}"]`);
    const isAccordionOpen = checkIsAccordionOpen(accordionContent);

    if (isAccordionOpen) {
        closeAccordion(accordionContent);
        openedAccordion = null;
    } else {
        if (openedAccordion != null) {
            closeAccordion(openedAccordion);
            const accordionButton = document.querySelector(`[data-id="${openedAccordion.dataset.content}"]`)
            toggleAccordionButton(accordionButton);
        }
        openAccordion(accordionContent);
        openedAccordion = accordionContent;
    }
}

const activateAccordion = function(accordions, handler) {
    for (const accordion of accordions) {
        accordion.addEventListener('click', handler)
    }
}
activateAccordion(accordions, accordionClickHandler);



console.log("работает")
