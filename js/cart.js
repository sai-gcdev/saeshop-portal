document.addEventListener('DOMContentLoaded', function () {
  const cartList = document.getElementById('cart-list');
  const emptyMsg = document.getElementById('empty-msg');
  const cartSummary = document.getElementById('cart-summary');
  const checkoutBtn = document.getElementById('checkout-btn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartDisplay() {
    cartList.innerHTML = ''; // Clear existing cart items

    if (cart.length === 0) {
      emptyMsg.style.display = 'block';
      cartSummary.style.display = 'none';
      checkoutBtn.style.display = 'none';
      localStorage.removeItem('cartTotal'); // Clear total if cart is empty
      return;
    }

    emptyMsg.style.display = 'none';
    cartSummary.style.display = 'block';
    checkoutBtn.style.display = 'block';

    let total = 0;

    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <div class="cart-controls">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">×</button>
      `;
      cartList.appendChild(cartItemDiv);
      total += item.price * item.quantity;
    });

    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('cartTotal', total.toFixed(2)); // Store total in localStorage
  }

  // Example functions (you might already have these)
  window.increaseQuantity = function (index) {
    cart[index].quantity++;
    updateCart();
  };

  window.decreaseQuantity = function (index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      updateCart();
    }
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  updateCartDisplay(); // Initial cart display
});