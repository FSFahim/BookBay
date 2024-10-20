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
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", scrollHeader);

/*================ HOME SWIPER ================*/
let swiperHome = new Swiper(".home_swiper", {
  loop: true,
  spaceBetween: 10,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    1220: {
      spaceBetween: 20,
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
      spaceBetween: 20,
    },
  },
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== ACTIVE LINK ===============*/
const navLinks = document.querySelectorAll(".nav_link");
const currentPage1 = window.location.pathname;
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage1) {
    link.classList.add("active");
  }
});

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(`.home_data, .downloaded_container`);
sr.reveal(`.home_images`, { delay: 600 });

let booksData = []; // To store all fetched books
let currentPage = 1;
const pageSize = 8; // Fixed number of books per page (8 books)

// Fetch all books once
async function fetchAllBooks() {
  try {
    const response = await fetch(`https://gutendex.com/books/?sort=ascending`);
    const data = await response.json();
    booksData = data.results;
    console.log(booksData);
    // Display the first page of books
    displayBooks(currentPage);
    displayPagination();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Function to display books for the current page
function displayBooks(page) {
  const bookListContainer = document.getElementById("bookListContainer");
  bookListContainer.innerHTML = ""; // Clear previous book cards

  // Calculate the start and end index of books for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the books data to get only the books for the current page
  const booksToDisplay = booksData.slice(startIndex, endIndex);

  // Loop through the books to display them on the page
  booksToDisplay.forEach((book) => {
    const { title, authors, subjects, id } = book;
    const author = authors.length > 0 ? authors[0].name : "Unknown Author";
    const genre = subjects.length > 0 ? subjects[0] : "Unknown Genre";

    // Create the book card HTML
    const bookCard = `
      <article class="book_card">
        <img src="https://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.medium.jpg" alt="${title}" class="featured_img" />
        <h2 class="downloaded_title">${title}</h2>
        <h3 class="author">${author}</h3>
        <h3 class="genre">${genre}</h3>
        <h3 class="id">ID: ${id}</h3>
        <button class="button">View Book</button>
        <div class="book_actions">
          <button><i class="ri-heart-line"></i></button>
        </div>
      </article>
    `;
    bookListContainer.innerHTML += bookCard;
  });
}

function displayPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = ""; // Clear previous pagination

  // Previous button
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "Previous";
  if (currentPage === 1) {
    prevButton.classList.add("disabled");
  }
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayBooks(currentPage);
      displayPagination();
    }
  };
  paginationContainer.appendChild(prevButton);

  // Calculate the total number of pages
  const totalPages = Math.ceil(booksData.length / pageSize);

  // Page number buttons (1, 2, ..., totalPages)
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerHTML = i;
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.onclick = () => {
      currentPage = i;
      displayBooks(currentPage);
      displayPagination();
    };
    paginationContainer.appendChild(pageButton);
  }

  // Next button
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "Next";
  if (currentPage === totalPages) {
    nextButton.classList.add("disabled");
  }
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayBooks(currentPage);
      displayPagination();
    }
  };
  paginationContainer.appendChild(nextButton);
}

// Initial fetch of all books and pagination setup
fetchAllBooks();
