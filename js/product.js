const toast = document.getElementById("cart-toast");
const header = document.querySelector("header");
const buttons = document.querySelectorAll(".buy-cart-button"); // Note the dot (.)

function showToast() {
  const headerRect = header.getBoundingClientRect();
  const topOffset = headerRect.bottom > 0 ? headerRect.bottom + 10 : 20;

  toast.style.top = `${topOffset}px`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Attach listener to all buttons
buttons.forEach(btn => {
  btn.addEventListener("click", showToast);
});

