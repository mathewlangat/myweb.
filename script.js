
// ========================================
// MATHEW KIPTOO LANG'AT - PORTFOLIO
// ========================================

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

function closeMenu() {
  navLinks.classList.remove("show");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close the mobile menu when a link is clicked
navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the mobile menu when Escape is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Automatically display the current year
const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isCurrent);

            if (isCurrent) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// Keep the navigation usable if the window is resized
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});
