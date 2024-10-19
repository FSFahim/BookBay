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
