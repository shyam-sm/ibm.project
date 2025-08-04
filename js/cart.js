

  let discount = 0;

  // Function to update the grand total
  function updateGrandTotal() {
    let grandTotal = 0;

    document.querySelectorAll('.cart-item').forEach((item) => {
      const totalText = item.querySelector('.price-total .price:last-child').textContent;
      const totalValue = parseInt(totalText.replace(/[^\d]/g, ''), 10);
      grandTotal += totalValue;
    });

    const shippingValue = document.getElementById("shipping").value;
    const shippingCost = parseInt(shippingValue.replace(/[^\d]/g, ''), 10);
    grandTotal += shippingCost;

    if (discount > 0) {
      grandTotal = Math.floor(grandTotal * (1 - discount));
    }

    document.querySelector(".total-cost h3").textContent = `₹${grandTotal}`;
  }

  // Function to update item total and grand total
  function attachQuantityHandlers(item) {
    const minusBtn = item.querySelector('.quantity button:first-child');
    const plusBtn = item.querySelector('.quantity button:last-child');
    const input = item.querySelector('.quantity input');
    const priceEl = item.querySelector('.price-total .price:first-child');
    const totalEl = item.querySelector('.price-total .price:last-child');

    function updateItemTotal() {
      const unitPrice = parseInt(priceEl.textContent.replace(/[^\d]/g, ''), 10);
      const quantity = parseInt(input.value, 10);
      const totalPrice = unitPrice * quantity;
      totalEl.textContent = `Total: ₹${totalPrice}`;
      updateGrandTotal();
    }

    plusBtn.addEventListener('click', () => {
      input.value = parseInt(input.value, 10) + 1;
      updateItemTotal();
    });

    minusBtn.addEventListener('click', () => {
      const currentVal = parseInt(input.value, 10);
      if (currentVal > 1) {
        input.value = currentVal - 1;
        updateItemTotal();
      }
    });

    // Initial total for item
    updateItemTotal();
  }

  // Initialize all cart items
  document.querySelectorAll('.cart-item').forEach(attachQuantityHandlers);

  // Update total when shipping method changes
  document.getElementById("shipping").addEventListener("change", updateGrandTotal);

  // Promo code apply logic
  document.querySelector(".apply-btn").addEventListener("click", () => {
    const code = document.getElementById("promo").value.trim();
    if (code === "#0#0") {
      discount = 0.5;
      alert("Promo applied! 50% discount");
    } else {
      discount = 0;
      alert("Invalid promo code");
    }
    updateGrandTotal();
  });

  // Ensure total is calculated on first load
  window.addEventListener("DOMContentLoaded", updateGrandTotal);


  document.querySelector(".checkout-btn").addEventListener("click", () => {
    // Disable quantity buttons and inputs
    document.querySelectorAll(".cart-item").forEach((item) => {
      // Set quantity to 0
      const input = item.querySelector(".quantity input");
      input.value = 0;
      input.disabled = true;

      // Disable plus and minus buttons
      const minusBtn = item.querySelector(".quantity button:first-child");
      const plusBtn = item.querySelector(".quantity button:last-child");
      minusBtn.disabled = true;
      plusBtn.disabled = true;

      // Update totals to ₹0
      const totalEl = item.querySelector(".price-total .price:last-child");
      totalEl.textContent = "Total: ₹0";

      const priceEl = item.querySelector(".price-total .price:first-child");
      priceEl.textContent = "Price: ₹0";

      // Disable remove link
      const removeLink = item.querySelector("a");
      removeLink.style.pointerEvents = "none";
      removeLink.style.opacity = 0.5;
    });

    // Reset summary
    document.querySelector(".summary-section span").textContent = "0"; // ITEMS count
    document.querySelector(".total-cost h3").textContent = "₹0"; // Total Cost

    // Disable shipping select and promo
    document.getElementById("shipping").disabled = true;
    document.getElementById("promo").disabled = true;
    document.querySelector(".apply-btn").disabled = true;

    // Optionally disable checkout button itself
    document.querySelector(".checkout-btn").disabled = true;

    // Optional: Show confirmation
    alert("Checkout complete! Your cart is now empty.");
  });

