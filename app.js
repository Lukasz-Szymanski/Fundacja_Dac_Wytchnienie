document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");

  // Add loading state
  function showLoading() {
    contentDiv.innerHTML = `
      <div class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    `;
  }

  // Add smooth transition between sections
  function fadeOut() {
    contentDiv.style.opacity = "0";
    contentDiv.style.transition = "opacity 0.3s ease-out";
  }

  function fadeIn() {
    contentDiv.style.opacity = "1";
    contentDiv.style.transition = "opacity 0.3s ease-in";
  }

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const navMenu = document.getElementById("nav-menu");

  mobileMenuButton.addEventListener("click", function () {
    navMenu.classList.toggle("hidden");
    // Add animation for mobile menu
    if (!navMenu.classList.contains("hidden")) {
      navMenu.style.animation = "slideDown 0.3s ease-out";
    }
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

  // Handle active navigation state
  function updateActiveNav(sectionId) {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.classList.remove("text-blue-600", "font-semibold");
      link.classList.add("text-gray-700");
    });
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.remove("text-gray-700");
      activeLink.classList.add("text-blue-600", "font-semibold");
    }
  }

  // Funkcja do ładowania zawartości
  function loadContent(sectionId) {
    const template = document.getElementById(`${sectionId}-template`);
    if (template) {
      fadeOut();
      setTimeout(() => {
        showLoading();
        setTimeout(() => {
          contentDiv.innerHTML = "";
          contentDiv.appendChild(template.content.cloneNode(true));
          updateActiveNav(sectionId);
          fadeIn();

          // Jeśli to sekcja kontaktowa, przewiń do niej
          if (sectionId === "kontakt") {
            const kontaktSection = contentDiv.querySelector("section");
            if (kontaktSection) {
              kontaktSection.scrollIntoView({ behavior: "smooth" });
            }
          } else {
            // Dla innych sekcji przewiń do góry
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }, 300);
      }, 300);
    }
  }

  // Handle navigation
  const navLinks = document.querySelectorAll("nav a");

  // Delegacja zdarzeń dla wszystkich linków z hashem
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a[href^='#']");
    if (link) {
      e.preventDefault();
      const sectionId = link.getAttribute("href").substring(1);
      loadContent(sectionId);
      history.pushState({ section: sectionId }, "", link.getAttribute("href"));
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", function (e) {
    if (e.state && e.state.section) {
      loadContent(e.state.section);
    } else {
      loadContent("home");
    }
  });

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      navMenu.classList.add("hidden");
    }
  });

  // Załaduj domyślną sekcję (home) lub sekcję z URL
  const initialSection = window.location.hash.substring(1) || "home";
  loadContent(initialSection);
});
