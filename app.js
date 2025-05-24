document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");

  // Funkcja do ładowania zawartości
  function loadContent(sectionId) {
    const template = document.getElementById(`${sectionId}-template`);
    if (template) {
      contentDiv.innerHTML = "";
      contentDiv.appendChild(template.content.cloneNode(true));
    }
  }

  // Obsługa kliknięć w nawigacji
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("href").substring(1);

      // Aktualizuj URL bez przeładowania strony
      history.pushState(null, "", `#${sectionId}`);

      // Załaduj odpowiednią sekcję
      loadContent(sectionId);
    });
  });

  // Obsługa przycisków wstecz/dalej
  window.addEventListener("popstate", () => {
    const sectionId = window.location.hash.substring(1) || "home";
    loadContent(sectionId);
  });

  // Załaduj domyślną sekcję (home) lub sekcję z URL
  const initialSection = window.location.hash.substring(1) || "home";
  loadContent(initialSection);
});
