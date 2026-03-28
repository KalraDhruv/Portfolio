const checkbox = document.getElementById("checkbox")

window.addEventListener("DOMContentLoaded", () => {
    checkbox.checked = false; // uncheck by default
});

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.getElementById('switch').classList.toggle("dark");
  document.getElementById('switch-pyramid').classList.toggle("dark");
})