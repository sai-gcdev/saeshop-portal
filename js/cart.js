const cartList = document.getElementById('cart-list');
const emptyMsg = document.getElementById('empty-msg');
const cartSummary = document.getElementById('cart-summary');

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(arr) {
  localStorage.setItem('cart', JSON.stringify(arr));
}

function renderCart() {
  let cart = getCart();
  cartList.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    emptyMsg.style.display = '';
    cartSummary.textContent = '';
    return;
  }
  emptyMsg.style.display = 'none';
  cart.forEach((item, idx) => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Price:</strong> ₹${item.price}</p>
        <div class="cart-controls">
          <button class="decrease-btn">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>
      </div>
      <button class="remove-btn" title="Remove">&#10006;</button>
    `;
    div.querySelector('.remove-btn').onclick = () => {
      let arr = getCart();
      arr.splice(idx, 1);
      setCart(arr);
      renderCart();
    };
    div.querySelector('.increase-btn').onclick = () => {
      let arr = getCart();
      arr[idx].quantity += 1;
      setCart(arr);
      renderCart();
    };
    div.querySelector('.decrease-btn').onclick = () => {
      let arr = getCart();
      if (arr[idx].quantity > 1) {
        arr[idx].quantity -= 1;
        setCart(arr);
        renderCart();
      }
    };
    cartList.appendChild(div);
  });
  cartSummary.textContent = `Total: ₹${total}`;
}

renderCart();