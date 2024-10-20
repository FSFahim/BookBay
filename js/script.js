/*================ SEARCH ================*/
const searchButton = document.getElementById("search-button"),
  searchClose = document.getElementById("search-close"),
  searchContent = document.getElementById("search-content");

/*================ SHOW MENU ================*/
if (searchButton) {
  searchButton.addEventListener("click", () => {
    searchContent.classList.add("show_search");
  });
}

/*================ HIDE MENU ================*/
if (searchClose) {
  searchClose.addEventListener("click", () => {
    console.log("search clicked");
    searchContent.classList.remove("show_search");
  });
}

/*=============== ADD SHADOW HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  // Add a class if the bottom offset is greater than 50 of the viewport
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", scrollHeader);

/*================ HOME SWIPER ================*/
let swiperHome = new Swiper(".home_swiper", {
  loop: true,
  spaceBetween: 10, // Adjust this for proper spacing between slides
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: true, // Ensures the center slide is properly centered
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    1220: {
      spaceBetween: 20, // Adjust the space for larger screens
    },
  },
});

/*================ MOST DOWNLOADED SWIPER ================*/
let swiperDownloaded = new Swiper(".downloaded_swiper", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1150: {
      slidesPerView: 4,
      centeredSlides: false,
      spaceBetween: 20, // Adjust the space for larger screens
    },
  },
});
