document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const navMenu = document.getElementById("nav-menu");

  mobileMenuButton.addEventListener("click", function () {
    navMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !navMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      navMenu.classList.add("hidden");
    }
  });

  // Close mobile menu when window is resized to desktop view
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      // md breakpoint
      navMenu.classList.remove("hidden");
    }
  });

  // Funkcja do ładowania zawartości
  function loadContent(sectionId) {
    const template = document.getElementById(`${sectionId}-template`);
    if (template) {
      contentDiv.innerHTML = "";
      contentDiv.appendChild(template.content.cloneNode(true));
    }
  }

  // Handle navigation
  const navLinks = document.querySelectorAll("nav a");

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("href").substring(1);
      loadContent(sectionId);
      history.pushState({ section: sectionId }, "", this.getAttribute("href"));
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", function (e) {
    if (e.state && e.state.section) {
      loadContent(e.state.section);
    } else {
      loadContent("home");
    }
  });

  // Załaduj domyślną sekcję (home) lub sekcję z URL
  const initialSection = window.location.hash.substring(1) || "home";
  loadContent(initialSection);
});
