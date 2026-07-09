// Mobile nav toggle + Lucide icon init. No build step, no framework.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Brand Guidelines v1.0: Lucide line icons only, no emoji, no filled icons.
  // lucide.min.js is loaded (deferred) via <script> in <head>; render any
  // <i data-lucide="..."> tags on the page once it's available.
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
});
