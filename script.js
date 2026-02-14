/* LOADING */
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

/* SCROLL SUAVE */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* PROGRESS BAR */
window.addEventListener("scroll", () => {
  const scroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (scroll / height) * 100 + "%";
});

/* DARK / LIGHT */
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

if (localStorage.theme === "light") {
  root.classList.add("light");
  toggle.textContent = "☀️";
}

toggle.onclick = () => {
  root.classList.toggle("light");
  const light = root.classList.contains("light");
  toggle.textContent = light ? "☀️" : "🌙";
  localStorage.theme = light ? "light" : "dark";
};

/* REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
