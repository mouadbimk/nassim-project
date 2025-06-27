'use strict';
const sectionsEl = document.querySelectorAll('.section');
const nav = document.querySelector('.nav');
class Slider {
  constructor({
    container,
    nextBtn,
    prevBtn,
    dotsContainer,
    interval = 5000,
    autoPlay = true,
  }) {
    this.container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;
    this.nextBtn =
      typeof nextBtn === 'string'
        ? this.container.querySelector(nextBtn)
        : nextBtn;
    this.prevBtn =
      typeof prevBtn === 'string'
        ? this.container.querySelector(prevBtn)
        : prevBtn;
    this.dotsContainer =
      typeof dotsContainer === 'string'
        ? this.container.querySelector(dotsContainer)
        : dotsContainer;
    this.slides = this.container.querySelectorAll('.slide');
    this.curSlide = 0;
    this.maxSlide = this.slides.length;
    this.intervalTime = interval;
    this.autoPlay = autoPlay;
    this.autoChange = null;
    this.timeoutId = null;
    this.init();
  }
  _goToSlide(slide) {
    this.slides.forEach((s, i) => {
      i === slide ? s.classList.add('active') : s.classList.remove('active');
    });
  }
  _nextSlide() {
    this.curSlide = (this.curSlide + 1) % this.maxSlide;
    this._goToSlide(this.curSlide);
    this._activateDot(this.curSlide);
  }
  _prevSlide() {
    this.curSlide = (this.curSlide - 1 + this.maxSlide) % this.maxSlide;
    this._goToSlide(this.curSlide);
    this._activateDot(this.curSlide);
  }
  _createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    this.slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dots__dot');
      dot.dataset.slide = i;
      this.dotsContainer.appendChild(dot);
    });
  }
  _activateDot(slide) {
    if (!this.dotsContainer) return;
    this.dotsContainer.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.toggle('dots__dot--active', +dot.dataset.slide === slide);
    });
  }
  _startAutoChange() {
    if (!this.autoPlay) return;
    this.autoChange = setInterval(() => {
      this._nextSlide();
    }, this.intervalTime);
  }
  _resetAutoChange() {
    if (!this.autoPlay) return;
    clearInterval(this.autoChange);
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this._startAutoChange();
    }, this.intervalTime + 4000);
  }
  _addEventListeners() {
    if (this.prevBtn)
      this.prevBtn.addEventListener('click', () => {
        this._prevSlide();
        this._resetAutoChange();
      });
    if (this.nextBtn)
      this.nextBtn.addEventListener('click', () => {
        this._nextSlide();
        this._resetAutoChange();
      });
    if (this.dotsContainer)
      this.dotsContainer.addEventListener('click', e => {
        if (!e.target.classList.contains('dots__dot')) return;
        const slide = +e.target.dataset.slide;
        this._goToSlide(slide);
        this._activateDot(slide);
        this._resetAutoChange();
        this.curSlide = slide;
      });
    this.container.addEventListener('mouseenter', () =>
      clearInterval(this.autoChange)
    );
    this.container.addEventListener('mouseleave', () =>
      this._resetAutoChange()
    );
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        this._prevSlide();
        this._resetAutoChange();
      } else if (e.key === 'ArrowRight') {
        this._nextSlide();
        this._resetAutoChange();
      }
    });
  }
  init() {
    this._goToSlide(0);
    this._createDots();
    this._activateDot(0);
    this._addEventListeners();
    this._startAutoChange();
  }
}
const animation = function () {};
// slider();
const mainSlider = new Slider({
  container: '.slider',
  nextBtn: '.btn-slider--left',
  prevBtn: '.btn-slider--right',
  dotsContainer: '.dots',
});
// sticky nav bar
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const navHeight = nav.getBoundingClientRect().height;
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(document.querySelector('.header'));

// Reveal Sections
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.4,
  rootMargin: '200px',
});
sectionsEl.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

// Lazy Load Image
const allImages = document.querySelectorAll('.features__img');
const lazyImage = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // replace src with
    entry.target.src = entry.target.dataset.src;
    // remove blur effect
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};
const ImageObserver = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 1,
});
allImages.forEach(img => {
  ImageObserver.observe(img);
});
