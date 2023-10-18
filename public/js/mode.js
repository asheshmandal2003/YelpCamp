const modeSelect = document.getElementById("mode");

if (localStorage.length === 0) {
  const color = document.body.getAttribute("data-bs-theme");
  localStorage.mode = color;
} else if (
  localStorage.mode === "light" &&
  document.body.getAttribute("data-bs-theme") === "dark"
) {
  document.body.setAttribute("data-bs-theme", "light");
  modeSelect.innerText = "light_mode";
} else if (
  localStorage.mode === "dark" &&
  document.body.getAttribute("data-bs-theme") === "light"
) {
  document.body.setAttribute("data-bs-theme", "dark");
  modeSelect.innerText = "dark_mode";
}

modeSelect.addEventListener("click", () => {
  if (
    (localStorage.mode, document.body.getAttribute("data-bs-theme") === "dark")
  ) {
    localStorage.removeItem({ mode: "dark" });
    localStorage.setItem("mode", "light");
    document.body.setAttribute("data-bs-theme", "light");
    modeSelect.innerText = "light_mode";
  } else if (
    (localStorage.mode, document.body.getAttribute("data-bs-theme") === "light")
  ) {
    localStorage.removeItem({ mode: "light" });
    localStorage.setItem("mode", "dark");
    document.body.setAttribute("data-bs-theme", "dark");
    modeSelect.innerText = "dark_mode";
  }
});
