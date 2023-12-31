'use strict';

///////////////////////////////////////
// Responsive Mobile Navigation
const header = document.querySelector('.header');
const navBtn = document.querySelector('.btn-mobile-nav');

navBtn.addEventListener('click', () => {
  header.classList.toggle('nav-open');
});

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  header.classList.remove('nav-open');
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
  ) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });

    header.classList.toggle('nav-open');
  }
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
// const s1IntitalCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', () => {
//   if (window.scrollY >= s1IntitalCoords.y) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

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

///////////////////////////////////////
// Reveal Sections

const sections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////
// Lazy Loading images

const lazyImgs = document.querySelectorAll('img[data-src]');

const lazyLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src; // behind the scene will emmit the load event

  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});

lazyImgs.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

// Functions
const setActiveDot = function (activeNum) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${activeNum}"]`)
    .classList.add('dots__dot--active');
};

const gotToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
  setActiveDot(slide);
};

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;
  gotToSlide(currentSlide);
};
const previousSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;
  gotToSlide(currentSlide);
};

// Initial function
const initSlider = function () {
  const createDots = function () {
    slides.forEach((_, i) =>
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      )
    );
  };

  createDots();

  // inital 0% 100% 200% 300%      => current slide 0%
  gotToSlide(0);
};

initSlider();

// Event Listeners

// Next slide -100% 0% 100% 200%
btnRight.addEventListener('click', nextSlide);
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide(currentSlide);
});

// Previous slide 0% 100% 200% 300%
btnLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', e => {
  e.key === 'ArrowLeft' && previousSlide();
});

dotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot'))
    gotToSlide(e.target.dataset.slide);

  currentSlide = e.target.dataset.slide;
});
