"use strict";
const sectionsEl = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");
const yearEl = document.querySelector(".year");
const date = new Date();
yearEl.textContent = date.getFullYear();
const btnCloseProduct = document.querySelector(".close");
// test products
const products = [
  {
    id: 1,
    title: "Filter Water",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, voluptatum necessitatibus maiores voluptates nostrum voluptas architecto et ullam dolorem accusantium excepturi? Vero commodi repellendus incidunt ad quos officia tempora.",
    imageMain: {
      compresse: "./images/compressed/filtrage-min.jpg",
      origin: "./images/filtrage.jpg",
      alt: "Image 4 filter water",
    },
    model: 2025,
    status: "New",
    tags: ["Filtrage", "Pompage"],
  },
  {
    id: 2,
    title: "Chart Material",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, voluptatum necessitatibus maiores voluptates nostrum voluptas architecto et ullam dolorem accusantium excepturi? Vero commodi repellendus incidunt ad quos officia tempora.",
    imageMain: {
      compresse: "./images/compressed/chart_material-min.jpg",
      origin: "./images/chart_material.jpg",
      alt: "Image Chart Material",
    },
    model: 2024,
    status: "New",
    tags: ["Equipment"],
  },
  {
    id: 3,
    title: "blood sugar meter",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, voluptatum necessitatibus maiores voluptates nostrum voluptas architecto et ullam dolorem accusantium excepturi? Vero commodi repellendus incidunt ad quos officia tempora.",
    imageMain: {
      compresse: "./images/compressed/blood-suger-meter-min.jpg",
      origin: "./images/blood-suger-meter.jpg",
      alt: "Image Blood Suger meter",
    },
    model: 2025,
    status: "Popular",
    tags: ["Pompage"],
  },
  {
    id: 4,
    title: "panneau solaire",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, voluptatum necessitatibus maiores voluptates nostrum voluptas architecto et ullam dolorem accusantium excepturi? Vero commodi repellendus incidunt ad quos officia tempora.",
    imageMain: {
      compresse: "./images/compressed/pompage-min.jpg",
      origin: "./images/pompage.jpg",
      alt: "image water",
    },
    model: 2025,
    status: "New",
    tags: ["Energie"],
  },
  {
    id: 4,
    title: "Installation Pompe Piscine",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, voluptatum necessitatibus maiores voluptates nostrum voluptas architecto et ullam dolorem accusantium excepturi? Vero commodi repellendus incidunt ad quos officia tempora.",
    imageMain: {
      compresse: "./images/compressed/pompage-min.jpg",
      origin: "./images/pompage.jpg",
      alt: "image water",
    },
    model: 2025,
    status: "New",
    tags: ["Energie", "Pompage"],
  },
];
const productsPage = [
  {
    id: 1,
    title: "Blood sugar measure High quality",
    imageMain: {
      compresse: "./images/compressed/blood-suger-meter-min.jpg",
      origin: "./images/blood-suger-meter.jpg",
      alt: "Blood sugar measure High quality",
    },
    tags: ["Matrials"],
  },
  {
    id: 2,
    title: "STATION DE DEMINERALISATION JRAIFIA",
    imageMain: {
      compresse: "./images/compressed/chart_material-min.jpg",
      origin: "./images/chart_material.jpg",
      alt: "STATION DE DEMINERALISATION JRAIFIA",
    },
    tags: ["Matrials"],
  },
  {
    id: 3,
    title: "STATION DE traitement Water",
    imageMain: {
      compresse: "./images/compressed/filtrage-min.jpg",
      origin: "./images/filtrage.jpg",
      alt: "STATION DE traitement Water",
    },
    tags: ["filtrage", "Pompage"],
  },
  {
    id: 4,
    title: "Installation Scanner Colonoghraphy",
    imageMain: {
      compresse: "./images/compressed/hospital room-min.jpg",
      origin: "./images/hospital room.jpg",
      alt: "Installation Scanner Colonoghraphy",
    },
    tags: ["matrials", "medical"],
  },
  {
    id: 5,
    title: "Installation kidney filtration device",
    imageMain: {
      compresse: "./images/compressed/kednly-min.jpg",
      origin: "./images/kednly.jpg",
      alt: "Installation kidney filtration device",
    },
    tags: ["matrials", "medical"],
  },
];
class Slider {
  constructor({
    container,
    nextBtn,
    prevBtn,
    dotsContainer,
    interval = 5000,
    autoPlay = true,
  }) {
    if (document.querySelector(container)) {
      this.container =
        typeof container === "string"
          ? document.querySelector(container)
          : container;
      this.nextBtn =
        typeof nextBtn === "string"
          ? this.container.querySelector(nextBtn)
          : nextBtn;
      this.prevBtn =
        typeof prevBtn === "string"
          ? this.container.querySelector(prevBtn)
          : prevBtn;
      this.dotsContainer =
        typeof dotsContainer === "string"
          ? this.container.querySelector(dotsContainer)
          : dotsContainer;
      this.slides = this.container.querySelectorAll(".slide");
      this.curSlide = 0;
      this.maxSlide = this.slides.length;
      this.intervalTime = interval;
      this.autoPlay = autoPlay;
      this.autoChange = null;
      this.timeoutId = null;
      this.init();
    }
  }
  _goToSlide(slide) {
    this.slides.forEach((s, i) => {
      i === slide ? s.classList.add("active") : s.classList.remove("active");
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
    this.dotsContainer.innerHTML = "";
    this.slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("dots__dot");
      dot.dataset.slide = i;
      this.dotsContainer.appendChild(dot);
    });
  }
  _activateDot(slide) {
    if (!this.dotsContainer) return;
    this.dotsContainer.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.toggle("dots__dot--active", +dot.dataset.slide === slide);
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
      this.prevBtn.addEventListener("click", () => {
        this._prevSlide();
        this._resetAutoChange();
      });
    if (this.nextBtn)
      this.nextBtn.addEventListener("click", () => {
        this._nextSlide();
        this._resetAutoChange();
      });
    if (this.dotsContainer)
      this.dotsContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("dots__dot")) return;
        const slide = +e.target.dataset.slide;
        this._goToSlide(slide);
        this._activateDot(slide);
        this._resetAutoChange();
        this.curSlide = slide;
      });
    this.container.addEventListener("mouseenter", () =>
      clearInterval(this.autoChange)
    );
    this.container.addEventListener("mouseleave", () =>
      this._resetAutoChange()
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this._prevSlide();
        this._resetAutoChange();
      } else if (e.key === "ArrowRight") {
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

const mainSlider = new Slider({
  container: ".slider",
  nextBtn: ".btn-slider--left",
  prevBtn: ".btn-slider--right",
  dotsContainer: ".dots",
});

// create carousel

class Carousel {
  constructor({
    sliderTrack,
    nextBtn = null,
    prevBtn = null,
    dotsContainer = null,
    itemPerSlide,
    itemShow,
    autoPlay = false,
    autoPlayDelay,
  }) {
    if (document.querySelector(sliderTrack)) {
      this.sliderTrack =
        typeof sliderTrack === "string"
          ? document.querySelector(sliderTrack)
          : sliderTrack;
      this.nextBtn =
        typeof nextBtn === "string" ? document.querySelector(nextBtn) : nextBtn;
      this.prevBtn =
        typeof prevBtn === "string" ? document.querySelector(prevBtn) : prevBtn;
      this.dotsContainer =
        typeof dotsContainer === "string"
          ? document.querySelector(dotsContainer)
          : dotsContainer;
      this.itemPerSlide = itemPerSlide || 1;
      this.itemShow = itemShow || 3;
      this.items = this.sliderTrack.children;
      this.totalSlides = this.items.length - this.itemShow + 1;
      this.currentSlide = 0;
      this.autoPlay = autoPlay;
      this.autoPlayDelay = autoPlayDelay;
      this.init();
    }
  }
  _goToSlide(slide) {
    this.currentSlide = slide;
    this._updateSlider();
  }
  _restartAutoPlay() {
    this._stopAutoPlay();
    this.autoPlayTimeout = setTimeout(() => {
      this._autoPlay();
    }, 5000);
  }
  _updateSlider() {
    const itemWidth = 100 / this.itemShow;
    const translateX = -this.currentSlide * itemWidth;
    this.sliderTrack.style.transform = `translateX(${translateX}%)`;
    // update dots
    const dots = this.dotsContainer.children;
    // dots.forEach((dot, i) => {
    //   dot.classList.toggle('active', i === this.currentSlide);
    // });
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("active", i === this.currentSlide);
    }
    // update buttons
    this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    this.prevBtn.disabled = this.currentSlide === 0;
  }
  _updateItemsPerSlide() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      this.itemPerSlide = 1;
      this.itemShow = 1;
    } else if (screenWidth <= 768) {
      this.itemPerSlide = 1;
      this.itemShow = 2;
    } else {
      this.itemPerSlide = 1;
      this.itemShow = this.itemShow || 3;
    }

    //
    this.totalSlides = this.items.length - this.itemShow + 1;
    if (this.currentSlide >= this.totalSlides)
      this.currentSlide = this.totalSlides - 1;

    if (this.currentSlide < 0) this.currentSlide = 0;
  }
  _autoPlay() {
    this._stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      if (this.currentSlide < this.totalSlides - 1) {
        this._nextSlide();
      } else {
        this._goToSlide(0);
      }
    }, this.autoPlayDelay || 5000);
  }
  _stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  _createDots() {
    this.dotsContainer.innerHTML = "";
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.dataset.index = i;
      if (i === this.currentSlide) dot.classList.add("active");
      this.dotsContainer.appendChild(dot);
    }
  }

  _bindEvents() {
    this.prevBtn.addEventListener("click", () => {
      this._prevSlide();
      this._restartAutoPlay();
    });
    this.nextBtn.addEventListener("click", () => {
      this._nextSlide();
      this._restartAutoPlay();
    });
    this.dotsContainer.addEventListener("click", (e) => {
      if (!e.target.classList.contains("dot")) return;
      const slider = e.target.dataset.index;
      this._goToSlide(+slider);
    });

    // support arrow keys
    document.addEventListener("keydown", (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      )
        return;
      if (e.key === "ArrowRight") this._nextSlide();
      if (e.key === "ArrowLeft") this._prevSlide();
    });
    this.sliderTrack.addEventListener("mouseenter", () => {
      clearInterval(this.autoPlayInterval);
    });
    this.sliderTrack.addEventListener("mouseleave", () => {
      this._autoPlay();
    });

    //support touch on mobile
    // إضافة دعم اللمس للهواتف
    let startX = 0;
    let endX = 0;

    this.sliderTrack.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.sliderTrack.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    this.sliderTrack.addEventListener(
      "touchend",
      (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
          // الحد الأدنى للمسافة
          if (diff > 0) {
            this._nextSlide();
          } else {
            this._prevSlide();
          }
        }
      },
      { passive: true }
    );
  }
  _nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this._updateSlider();
    }
  }
  _prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this._updateSlider();
    }
  }
  updateItemsPerShow() {
    const items = this.items;
    for (let item of items) {
      item.style.flex = `0 0 calc(${100 / this.itemShow}%)`;
    }
  }
  init() {
    this.updateItemsPerShow();
    this._updateItemsPerSlide();
    this._createDots();
    this._updateSlider();
    this._bindEvents();
    if (this.autoPlay) this._autoPlay();
    window.addEventListener("resize", () => {
      this.updateItemsPerShow();
      this._updateItemsPerSlide();
      this._createDots();
      this._updateSlider();
    });
  }
}
class CarouselInfinity extends Carousel {
  constructor({ sliderTrack, itemPerSlide, itemShow }) {
    super({
      sliderTrack,
      itemPerSlide,
      itemShow,
      autoPlay: true,
      autoPlayDelay: 4000,
    });
    if (document.querySelector(sliderTrack)) {
      this._cloneItems();
      this.currentSlide = this.itemShow;
      this._updateSlider();
    }
  }
  _cloneItems() {
    const itemsArray = Array.from(this.items);
    const startClones = itemsArray
      .slice(0, this.itemShow)
      .map((el) => el.cloneNode(true));
    const endClones = itemsArray
      .slice(-this.itemShow)
      .map((el) => el.cloneNode(true));
    // append clones
    endClones
      .reverse()
      .forEach((clone) =>
        this.sliderTrack.insertBefore(clone, this.sliderTrack.firstChild)
      );
    startClones.forEach((clone) => this.sliderTrack.appendChild(clone));

    this.items = this.sliderTrack.children;
    this.totalSlides = this.items.length;
  }

  _bindEvents() {
    this.sliderTrack.addEventListener("mouseenter", () => {
      this._stopAutoPlay();
    });
    this.sliderTrack.addEventListener("mouseleave", () => {
      this._autoPlay();
    });
  }

  _updateSlider(animate = true) {
    const itemWidth = 100 / this.itemShow;
    const translateX = -this.currentSlide * itemWidth;
    if (!animate) {
      this.sliderTrack.style.transition = "none";
    } else {
      this.sliderTrack.style.transition = "transform 0.5s ease";
    }
    this.sliderTrack.style.transform = `translateX(${translateX}%)`;
  }
  _autoPlay() {
    this._stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.currentSlide++;
      this._updateSlider();

      if (this.currentSlide === this.totalSlides - this.itemShow) {
        setTimeout(() => {
          this.currentSlide = this.itemShow;
          this._updateSlider(false);
        }, 600);
      }
    }, this.autoPlayDelay || 1500);
  }
  _createDots() {}
}

// sticky nav bar
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const navHeight = nav.getBoundingClientRect().height;
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
observer.observe(document.querySelector(".header"));

// Reveal Sections
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
  rootMargin: "200px 0px 0px 0px",
});
sectionsEl.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// event change product list
// Products Box
const changeProductsBox = function () {
  const boxProducts = document.querySelector(".products-box--products");

  if (!boxProducts) return;

  const product = function (item) {
    const product = `
          <article class="product animate-on-insert">
                <div class="tags">
                  <span class="product-model">${item.model}</span>
                  <span class="product-status ${item.status.toLowerCase()}">${item.status.toUpperCase()}</span>
                  <span class="product-status tag">${item.tags[0]}</span>
                </div>
                <div class="product-img">
                  <img
                    class="features__img lazy-img"
                    src="${item.imageMain.compresse}"
                    alt="Image 4 filter water"
                    data-src="${item.imageMain.origin}"
                  />
                </div>
                <div class="content-product">
                  <h4 class="product-title">${item.title}</h4>
                  <p class="product-des">
                    ${item.description}
                  </p>
                </div>
                <div class="overlay-product"></div>
                <button class="btn btn--product">Buy Now</button>
              </article>
        `;
    return product;
  };
  boxProducts.innerHTML = "";
  products.forEach((item) => {
    boxProducts.insertAdjacentHTML("beforeend", product(item));
  });
  const btnsProducts = document.querySelector(".products--box-buttons");
  btnsProducts.addEventListener("click", function (e) {
    if (!e.target.classList.contains("product-button")) return;
    const btn = e.target;
    boxProducts.innerHTML = "";
    let filtredProducts = [];
    let filter = e.target.dataset.tag;
    document
      .querySelectorAll(".product-button")
      .forEach((btn) => btn.classList.remove("active"));
    btn.classList.toggle("active", btn.dataset.tag === filter);
    if (filter === "all") filtredProducts = products;
    else {
      filter = filter.charAt(0).toUpperCase() + filter.slice(1);
      filtredProducts = products.filter((p) => p.tags.includes(filter));
    }
    if (filtredProducts.length === 0) {
      boxProducts.insertAdjacentHTML(
        "beforeend",
        '<p class="no-product">Not Products Found?</p>'
      );
    } else {
      filtredProducts.forEach((item) => {
        boxProducts.insertAdjacentHTML("beforeend", product(item));
      });
      lazyImageLoad();
    }
  });
};

// Lazy Load Image
const lazyImageLoad = function () {
  const allImages = document.querySelectorAll(".lazy-img");
  const lazyImage = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // replace src with
      entry.target.src = entry.target.dataset.src;
      // remove blur effect
      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
      });
      observer.unobserve(entry.target);
    });
  };
  const ImageObserver = new IntersectionObserver(lazyImage, {
    root: null,
    threshold: 0.7,
  });
  allImages.forEach((img) => {
    ImageObserver.observe(img);
  });
};
const init = function () {
  changeProductsBox();
  lazyImageLoad();
  filterItems();
  checkWidth();
  navMenuMobile();
};
// carousel project
const sliderProject = new Carousel({
  sliderTrack: ".slider-projects",
  nextBtn: ".btn-slider__pro--right",
  prevBtn: ".btn-slider__pro--left",
  dotsContainer: ".dots_carousel",
  itemPerSlide: 1,
  itemShow: 3,
  autoPlay: true,
});

const partenarSlide = new CarouselInfinity({
  sliderTrack: ".slider-partenar",
  itemShow: 5,
  itemPerSlide: 1,
  autoPlay: true,
  autoPlayDelay: 4000,
});
const filterItems = function () {
  const filterContainer = document.querySelector(".box-filter");
  if (!filterContainer) return;
  const boxContainer = document.querySelector(".cards-project");
  const loader = document.createElement("div");
  loader.className = "loader";
  boxContainer.prepend(loader);
  let debounceTimer;

  let pro = function (item) {
    const product = `
    <div class="card-project animate-on-insert">
                <div class="image-card">
                  <img src="${item.imageMain.compresse}" class="card-img lazy-img" alt="${item.imageMain.alt}" data-src="${item.imageMain.origin}">
                </div>
                <div class="content-card">
                  <h3 class="tag-card">${item.tags[0]}</h3>
                  <h2 class="title-project">
                   <a href="./projectPage.html">${item.title}</a> 
                  </h2>
                </div>
                <button class="btn-project">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"></path>
                  </svg>
                </button>
              </div>
    `;
    return product;
  };
  filterContainer.addEventListener("click", (e) => {
    const item = e.target.closest(".filter-item");
    if (!item) return;
    boxContainer.innerHTML = "";
    boxContainer.prepend(loader);
    loader.style.display = "block";

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      let filterProducts = [];
      document
        .querySelectorAll(".filter-item")
        .forEach((it) => it.classList.remove("active"));
      const { filter } = item.dataset;

      item.classList.toggle("active", filter);
      if (filter === "all") {
        filterProducts = productsPage;
      } else {
        filterProducts = productsPage.filter((product) =>
          product.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase())
        );
      }

      if (filterProducts.length !== 0) {
        filterProducts.forEach((item) =>
          boxContainer.insertAdjacentHTML("beforeend", pro(item))
        );
      } else {
        boxContainer.insertAdjacentHTML(
          "beforeend",
          '<p class="no-product">Not Project Found?</p>'
        );
      }
      loader.style.display = "none";

      lazyImageLoad();
    }, 300);
  });
  let timer = 0;
  productsPage.forEach((product) => {
    setTimeout(() => {
      boxContainer.insertAdjacentHTML("beforeend", pro(product));
      lazyImageLoad();
      timer++;
      if (timer === productsPage.length) {
        loader.style.display = "none";
        clearInterval(timerInterval);
      }
    }, 100 * timer);
  });
};
const closeMenuProduct = function () {
  const productContainer = document.querySelector(".products--boxes");
  if (!productContainer) return;
  const buttonsContainer = productContainer.querySelector(
    ".buttons-productSection"
  );
  productContainer.classList.toggle("close-product");
  buttonsContainer.classList.toggle("hidden");
};
if (btnCloseProduct) {
  btnCloseProduct.addEventListener("click", closeMenuProduct);
}

const navMenuMobile = function () {
  const open = document.querySelector(".openbtn");
  if (!open) return;
  const navContainer = document.querySelector(".nav__links");
  open.addEventListener("click", () => {
    navContainer.classList.toggle("showMenu");
    navContainer.classList.contains("showMenu")
      ? (open.innerHTML = "&#10006;")
      : (open.innerHTML = "&#9776;");
  });
};
const checkWidth = function () {
  const productContainer = document.querySelector(".products--boxes");
  if (!productContainer) return;
  const buttonsContainer = productContainer.querySelector(
    ".buttons-productSection"
  );
  if (window.innerWidth < 1200) {
    productContainer.classList.add("close-product");
    buttonsContainer.classList.add("hidden");
  } else {
    productContainer.classList.remove("close-product");
    buttonsContainer.classList.remove("hidden");
  }
};
window.addEventListener("resize", checkWidth);
init();
