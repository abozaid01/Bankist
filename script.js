'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Cookie Msg

// const header = document.querySelector('.header');

// const cookieMsg = document.createElement('div');
// cookieMsg.classList.add('cookie-message');
// cookieMsg.innerHTML = `We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// header.append(cookieMsg);

// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   cookieMsg.remove();
// });

// cookieMsg.style.backgroundColor = '#333';
// console.log(cookieMsg.style.backgroundColor);
// console.log(cookieMsg.style.display);
// console.log('======');
// console.log(getComputedStyle(cookieMsg).display);

///////////////////////////////////////
// 'learn more' Button scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  // const s1Coords = section1.getBoundingClientRect();

  //scrolling
  // current position + current scroll
  // window.scrollTo({
  //   left: s1Coords.x + window.scrollX,
  //   top: s1Coords.y + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Smooth Scrolling for Navigation links - Event delegation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     document
//       .querySelector(`${this.getAttribute('href')}`)
//       .scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    e.target.getAttribute('href') !== '#'
  )
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// NavBar fade Animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const activelink = e.target;
    const siblingLinks = e.target
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');

    siblingLinks.forEach(link => {
      if (link !== activelink) link.style.opacity = `${this}`;
    });
    logo.style.opacity = `${this}`;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky Nav
const s1IntitalCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', () => {
  if (window.scrollY >= s1IntitalCoords.y) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

///////////////////////////////////////
// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// let active = 1;

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  // Deactivate All tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // Deactivate All content
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate clicked tab
  document
    .querySelector(`.operations__tab--${clicked.dataset.tab}`)
    .classList.add('operations__tab--active');
  // Activate clicked contnet
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  // // Remove active Btn
  // tabs[active - 1].classList.remove('operations__tab--active');
  // // Remove active content
  // tabsContent[active - 1].classList.remove('operations__content--active');

  // active = +clicked.dataset.tab;

  // // Add new active Btn
  // tabs[active - 1].classList.add('operations__tab--active');
  // // Add new active content
  // tabsContent[active - 1].classList.add('operations__content--active');
});
