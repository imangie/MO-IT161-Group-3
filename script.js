// Get the current page filename (example: "menu.html")
const currentPage = window.location.pathname.split("/").pop();

// Select all navigation links
const navLinks = document.querySelectorAll("nav a");

// Loop through each link
navLinks.forEach(link => {
  // If the link matches the current page, add "active"
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }

  // Special case: homepage (index.html or just "/")
  if ((currentPage === "" || currentPage === "index.html") && link.getAttribute("href") === "index.html") {
    link.classList.add("active");
  }
});
