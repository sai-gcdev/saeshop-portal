const cartList = document.getElementById('cart-list');
const emptyMsg = document.getElementById('empty-msg');
const cartSummary = document.getElementById('cart-summary');

// Add checkout button and form container
let checkoutBtn = document.getElementById('checkout-btn');
if (!checkoutBtn) {
  checkoutBtn = document.createElement('button');
  checkoutBtn.id = 'checkout-btn';
  checkoutBtn.textContent = 'Checkout';
  checkoutBtn.style = 'display:none;margin-top:20px;';
  cartSummary.parentNode.insertBefore(checkoutBtn, cartSummary.nextSibling);
}
let checkoutFormContainer = document.getElementById('checkout-form-container');
if (!checkoutFormContainer) {
  checkoutFormContainer = document.createElement('div');
  checkoutFormContainer.id = 'checkout-form-container';
  cartSummary.parentNode.insertBefore(checkoutFormContainer, checkoutBtn.nextSibling);
}

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
    checkoutBtn.style.display = 'none';
    checkoutFormContainer.innerHTML = '';
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
          <p><strong>Qty:</strong></p>
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
  checkoutBtn.style.display = '';
  checkoutFormContainer.innerHTML = '';
}

checkoutBtn.onclick = function() {
  renderCheckoutForm();
  window.scrollTo(0, document.body.scrollHeight);
};

function renderCheckoutForm() {
  checkoutFormContainer.innerHTML = `
    <form id="checkout-form" style="margin-top:30px;max-width:700px;">
      <h3>Billing Information</h3>
      <label><input type="radio" name="personType" value="Private person" checked> Private person</label>
      <label style="margin-left:20px;"><input type="radio" name="personType" value="Company"> Company</label>
      <br><br>
      <label>Email *<br><input type="email" name="email" required></label><br>
      <label>Phone Number *<br><input type="tel" name="phone" required pattern="^[0-9]{10,15}$"></label><br>
      <label>First Name *<br><input type="text" name="firstName" required></label><br>
      <label>Last Name *<br><input type="text" name="lastName" required></label><br>
      <label>Address *<br><input type="text" name="address" required></label><br>
      <label>City *<br><input type="text" name="city" required></label><br>
      <label>Post Code *<br><input type="text" name="postcode" required></label><br>
      <label>Country *<br><input type="text" name="country" required></label><br>
      <label>Region<br><input type="text" name="region"></label><br>
      <label>
        <input type="checkbox" name="sameDelivery" checked> Same as billing information
      </label>
      <br><br>
      <label>Order Comments<br>
        <textarea name="comments" rows="3" style="width:100%;"></textarea>
      </label>
      <br>
      <button type="submit" style="margin-top:10px;background:#4CAF50;color:#fff;padding:10px 30px;border:none;border-radius:4px;font-size:1.1rem;">Next Step</button>
    </form>
    <div id="checkout-error" style="color:red;margin-top:10px;"></div>
  `;

  document.getElementById('checkout-form').onsubmit = handleCheckoutSubmit;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const errorDiv = document.getElementById('checkout-error');
  errorDiv.textContent = '';

  // Validation
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const address = form.address.value.trim();
  const city = form.city.value.trim();
  const postcode = form.postcode.value.trim();
  const country = form.country.value.trim();

  if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    errorDiv.textContent = "Please enter a valid email address.";
    return false;
  }
  if (!phone.match(/^[0-9]{10,15}$/)) {
    errorDiv.textContent = "Please enter a valid phone number (10-15 digits).";
    return false;
  }
  if (!firstName) {
    errorDiv.textContent = "First Name is required.";
    return false;
  }
  if (!lastName) {
    errorDiv.textContent = "Last Name is required.";
    return false;
  }
  if (!address) {
    errorDiv.textContent = "Address is required.";
    return false;
  }
  if (!city) {
    errorDiv.textContent = "City is required.";
    return false;
  }
  if (!postcode) {
    errorDiv.textContent = "Post Code is required.";
    return false;
  }
  if (!country) {
    errorDiv.textContent = "Country is required.";
    return false;
  }

  // Delivery info
  let deliveryInfo = {};
  if (form.sameDelivery.checked) {
    deliveryInfo = {
      address, city, postcode, country, region: form.region.value.trim()
    };
  } else {
    deliveryInfo = {
      address: '', city: '', postcode: '', country: '', region: ''
    };
  }

  // Show summary and payment method
  showOrderSummary({
    personType: form.personType.value,
    email, phone, firstName, lastName, address, city, postcode, country, region: form.region.value.trim(),
    deliveryInfo,
    comments: form.comments.value.trim()
  });

  return false;
}

function showOrderSummary(data) {
  const cart = getCart();
  let total = 0;
  cart.forEach(item => total += item.price * item.quantity);

  checkoutFormContainer.innerHTML = `
    <h3>Order Summary</h3>
    <div style="margin-bottom:10px;">
      <strong>Billing Information:</strong><br>
      ${data.personType}<br>
      ${data.firstName} ${data.lastName}<br>
      ${data.address}, ${data.city}, ${data.postcode}, ${data.country} ${data.region ? ', ' + data.region : ''}<br>
      Email: ${data.email}<br>
      Phone: ${data.phone}
    </div>
    <div style="margin-bottom:10px;">
      <strong>Delivery Information:</strong><br>
      ${data.deliveryInfo.address || data.address}, ${data.deliveryInfo.city || data.city}, ${data.deliveryInfo.postcode || data.postcode}, ${data.deliveryInfo.country || data.country} ${data.deliveryInfo.region || data.region ? ', ' + (data.deliveryInfo.region || data.region) : ''}
    </div>
    <div style="margin-bottom:10px;">
      <strong>Total Cost:</strong> ₹${total}
    </div>
    <div style="margin-bottom:10px;">
      <strong>Choose Payment Method:</strong><br>
      <div id="payment-methods" style="margin-top:10px;">
        <button disabled style="margin-right:10px;">UPI</button>
        <button disabled style="margin-right:10px;">Credit Card</button>
        <button disabled>Net Banking</button>
      </div>
    </div>
  `;
}

renderCart();