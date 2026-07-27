const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const navLinks = document.querySelectorAll(".desktop-nav a");
const sections = document.querySelectorAll("main section[id]");

const savedTheme = localStorage.getItem("zohaib-theme");
if (savedTheme === "dark") root.dataset.theme = "dark";

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("zohaib-theme", nextTheme);
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme === "dark" ? "light" : "dark"} theme`);
});

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  if (mobileMenu) mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  if (mobileMenu) mobileMenu.hidden = open;
  document.body.classList.toggle("menu-open", !open);
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -58% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".timeline-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".timeline-item");
    const wasOpen = item?.classList.contains("is-open");

    document.querySelectorAll(".timeline-item").forEach((timelineItem) => {
      timelineItem.classList.remove("is-open");
      timelineItem.querySelector(".timeline-trigger")?.setAttribute("aria-expanded", "false");
    });

    if (!wasOpen && item) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const publications = [...document.querySelectorAll(".publication")];
const publicationSearch = document.querySelector("[data-publication-search]");
const noResults = document.querySelector("[data-no-results]");
let activeFilter = "all";

const filterPublications = () => {
  const query = publicationSearch?.value.trim().toLowerCase() || "";
  let visible = 0;

  publications.forEach((publication) => {
    const matchesCategory = activeFilter === "all" || publication.dataset.category === activeFilter;
    const matchesQuery = !query || publication.dataset.search?.includes(query) || publication.textContent.toLowerCase().includes(query);
    publication.hidden = !(matchesCategory && matchesQuery);
    if (!publication.hidden) visible += 1;
  });

  if (noResults) noResults.hidden = visible !== 0;
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
    filterPublications();
  });
});

publicationSearch?.addEventListener("input", filterPublications);

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
