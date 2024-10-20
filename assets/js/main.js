
// burger
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__content');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const overlay = document.querySelector('.header__overlay');
  const body = document.body;

  function closeNav() {
    toggleButton.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
  }

  toggleButton.addEventListener('click', function () {
    const isActive = toggleButton.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    if (isActive) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  });

  document.addEventListener('click', function(event) {
    if (!nav.contains(event.target) && !toggleButton.contains(event.target) && !overlay.contains(event.target)) {
      closeNav();
    }
  });

  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && nav.classList.contains('active')) {
      closeNav();
    }
  });

  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function() {
      closeNav();
    });
  });
});



// reviews__slider
const splide = new Splide('.reviews__slider', {
   perPage: 3, 
   perMove: 1,
   pagination: false,
   arrows: false,
   gap: '13px',
});

splide.mount();

const prevButton = document.querySelector('.reviews__slider-nav-arrow--prev');
const nextButton = document.querySelector('.reviews__slider-nav-arrow--next');

prevButton.addEventListener('click', () => splide.go('<'));
nextButton.addEventListener('click', () => splide.go('>'));

updateArrowState();

splide.on('move', updateArrowState);
splide.on('updated', updateArrowState); 

function updateArrowState() {
  if (splide.index === 0) {
    prevButton.classList.add('reviews__slider-nav-arrow--is-disabled');
  } else {
    prevButton.classList.remove('reviews__slider-nav-arrow--is-disabled');
  }

  const lastSlideIndex = splide.Components.Controller.getEnd();

  if (splide.index === lastSlideIndex) {
    nextButton.classList.add('reviews__slider-nav-arrow--is-disabled');
  } else {
    nextButton.classList.remove('reviews__slider-nav-arrow--is-disabled');
  }
}


// range input
const rangeInput = document.querySelector('.prise__form-range');
const sumDisplay = document.querySelector('.prise__form-sum'); 
const max = parseInt(rangeInput.max, 10);
const step = parseInt(rangeInput.step, 10);

rangeInput.value = 0;
updateRangeValue();

function updateRangeValue() {
  const value = rangeInput.value;
  sumDisplay.textContent = `${value}`; 

  const percent = (value / max) * 100;

  rangeInput.style.background = `linear-gradient(to right, #2b71e3 ${percent}%, #ddd ${percent}%)`;

  const sliderWidth = rangeInput.offsetWidth;
  const positionInPx = (percent / 100) * sliderWidth;

  sumDisplay.style.left = `${positionInPx}px`;
}

rangeInput.addEventListener('input', updateRangeValue);