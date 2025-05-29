document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart");
  const cartModal = document.getElementById("cartModal");
  const closeBtn = document.querySelector(".close-cart");
  const cartItems = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const clearCartBtn = document.getElementById("clear-cart");

  let cart = [];

  // Додаємо товар до кошика
  document.querySelectorAll(".buy_btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title");
      const price = parseFloat(btn.getAttribute("data-price"));

      const existing = cart.find(item => item.title === title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ title, price, quantity: 1 });
      }

      updateCart();
    });
  });

  // Відкрити кошик
  cartIcon.addEventListener("click", () => {
    cartModal.style.display = "block";
  });

  // Закрити кошик
  closeBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  // Клік поза вікном — закрити
  window.addEventListener("click", e => {
    if (e.target == cartModal) cartModal.style.display = "none";
  });

  // Очистити кошик
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
  });

  // Оновлення відображення кошика
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.title} — $${item.price} × 
        <button class="decrease-btn" data-index="${index}">➖</button>
        ${item.quantity}
        <button class="increase-btn" data-index="${index}">➕</button>
        <button class="remove-btn" data-index="${index}">❌</button>
      `;
      cartItems.appendChild(li);
    });

    totalPriceEl.textContent = `Загальна сума: $${total}`;

    // Видалити товар
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
      });
    });

    // Зменшити кількість
    document.querySelectorAll(".decrease-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });
    });

    // Збільшити кількість
    document.querySelectorAll(".increase-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart[index].quantity += 1;
        updateCart();
      });
    });
  }
});
