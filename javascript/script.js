// ========== Theme Switcher ==========
const themeToggle = document.getElementById("theme-toggle");
const rootElement = document.documentElement;

function setTheme(theme) {
  if (theme === "dark") {
    rootElement.classList.add("dark");
  } else {
    rootElement.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = rootElement.classList.contains("dark") ? "dark" : "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// ========== Hamburger Menu ==========
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// ========== Dynamic Projects ==========
const projects = [
  {
    title: "Project One",
    description: "Description of project one.",
    image: "images/project1.jpg"
  },
  {
    title: "Project Two",
    description: "Description of project two.",
    image: "images/project2.jpg"
  },
  {
    title: "Project Three",
    description: "Description of project three.",
    image: "images/project3.jpg"
  }
];

const gallery = document.getElementById("project-gallery");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title} Screenshot" />
    <h3>${project.title}</h3>
    <p>${project.description}</p>
  `;
  gallery.appendChild(card);
});

// ========== Contact Form Submission ==========
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.textContent = "Thanks for your message!";
      status.className = "success";
      form.reset();
    } else {
      const data = await response.json();
      status.textContent = data.errors ? data.errors.map(err => err.message).join(", ") : "Oops! Something went wrong.";
      status.className = "error";
    }
  } catch (error) {
    status.textContent = "Network error. Please try again later.";
    status.className = "error";
  }
});
