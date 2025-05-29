const products = [
  { category: "Clothing", name: "T-shirt", price: 499, image: "images/Tshirt.jpg" },
  { category: "Clothing", name: "Jeans", price: 999, image: "images/Jeans.jpg" },
  { category: "Clothing", name: "Hoodie", price: 1299, image: "images/Hoodie.jpg" },
  { category: "Clothing", name: "Socks", price: 199, image: "images/Socks.jpg" },
  { category: "Clothing", name: "Jacket", price: 1999, image: "images/Jacket.jpg" },
  { category: "Footwear", name: "Sneakers", price: 1499, image: "images/Sneakers.jpg" },
  { category: "Footwear", name: "Flip flops", price: 299, image: "images/Flipflops.webp" },
  { category: "Footwear", name: "Boots", price: 1899, image: "images/Boots.jpg" },
  { category: "Footwear", name: "Sandals", price: 499, image: "images/Sandals.jpg" },
  { category: "Footwear", name: "Slippers", price: 399, image: "images/Slippers.jpg" },
  { category: "Electronics", name: "Phone charger", price: 699, image: "images/Phonecharger.jpg" },
  { category: "Electronics", name: "Earphones", price: 799, image: "images/Earphones.webp" },
  { category: "Electronics", name: "Power bank", price: 1099, image: "images/Powerbank.webp" },
  { category: "Electronics", name: "USB flash drive", price: 599, image: "images/USBFlashDrive.webp" },
  { category: "Electronics", name: "Bluetooth speaker", price: 1299, image: "images/BluetoothSpeaker.jpg" },
  { category: "Kitchen", name: "Frying pan", price: 899, image: "images/FryingPan.webp" },
  { category: "Kitchen", name: "Water bottle", price: 399, image: "images/WaterBottle.webp" },
  { category: "Kitchen", name: "Coffee mug", price: 299, image: "images/CoffeeMug.webp" },
  { category: "Kitchen", name: "Lunch box", price: 599, image: "images/LunchBox.webp" },
  { category: "Kitchen", name: "Cutting board", price: 349, image: "images/CuttingBoard.webp" },
  { category: "Personal Care", name: "Toothbrush", price: 99, image: "images/ToothBrush.webp" },
  { category: "Personal Care", name: "Shampoo", price: 249, image: "images/Shampoo.webp" },
  { category: "Personal Care", name: "Hairbrush", price: 199, image: "images/Hairbrush.webp" },
  { category: "Personal Care", name: "Face wash", price: 299, image: "images/FaceWash.webp" },
  { category: "Personal Care", name: "Hand sanitizer", price: 149, image: "images/HandSanitizer.webp" }
];

const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('category');
const priceFrom = document.getElementById('price-from');
const priceTo = document.getElementById('price-to');
const filterBtn = document.getElementById('filter-btn');
const modal = document.getElementById('product-modal');
const modalName = document.getElementById('modal-name');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const modalImage = document.getElementById('modal-image');
const wishlistBtn = document.getElementById('wishlist-btn');
const addCartBtn = document.getElementById('add-cart-btn');

let currentProduct = null;

function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}
function setWishlist(arr) {
  localStorage.setItem('wishlist', JSON.stringify(arr));
}
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(arr) {
  localStorage.setItem('cart', JSON.stringify(arr));
}

function renderProducts(filterCategory, from, to) {
  productList.innerHTML = '';
  let filtered = products;
  if (filterCategory && filterCategory !== 'All') {
    filtered = filtered.filter(p => p.category === filterCategory);
  }
  if (from !== '' && !isNaN(from)) {
    filtered = filtered.filter(p => p.price >= Number(from));
  }
  if (to !== '' && !isNaN(to)) {
    filtered = filtered.filter(p => p.price <= Number(to));
  }
  if (filtered.length === 0) {
    productList.innerHTML = '<p>No products found.</p>';
    return;
  }
  filtered.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
    `;
    div.onclick = () => openModal(p);
    productList.appendChild(div);
  });
}

function openModal(product) {
  currentProduct = product;
  modalName.textContent = product.name;
  modalCategory.textContent = product.category;
  modalPrice.textContent = `₹${product.price}`;
  modalImage.src = product.image;

  // Wishlist heart
  const wishlist = getWishlist();
  const inWishlist = wishlist.some(p => p.name === product.name);
  wishlistBtn.innerHTML = inWishlist ? '&#10084;' : '&#9825;';
  wishlistBtn.className = 'heart-btn ' + (inWishlist ? 'red' : 'white');
  wishlistBtn.disabled = false;

  // Add to cart button
  const cart = getCart();
  const inCart = cart.some(p => p.name === product.name);
  addCartBtn.disabled = inWishlist || inCart;
  addCartBtn.textContent = inCart ? 'Added to Cart' : 'Add to Cart';

  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
  currentProduct = null;
}

wishlistBtn.onclick = function(e) {
  e.stopPropagation();
  if (!currentProduct) return;
  let wishlist = getWishlist();
  const idx = wishlist.findIndex(p => p.name === currentProduct.name);
  if (idx === -1) {
    wishlist.push(currentProduct);
  } else {
    wishlist.splice(idx, 1);
  }
  setWishlist(wishlist);
  openModal(currentProduct);
};

addCartBtn.onclick = function(e) {
  e.stopPropagation();
  if (!currentProduct) return;
  let cart = getCart();
  if (!cart.some(p => p.name === currentProduct.name)) {
    cart.push({ ...currentProduct, quantity: 1 });
    setCart(cart);
    openModal(currentProduct);
  }
};

categoryFilter.addEventListener('change', () => {
  renderProducts(
    categoryFilter.value,
    priceFrom.value.trim(),
    priceTo.value.trim()
  );
});

filterBtn.addEventListener('click', () => {
  renderProducts(
    categoryFilter.value,
    priceFrom.value.trim(),
    priceTo.value.trim()
  );
});

[priceFrom, priceTo].forEach(input => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      renderProducts(
        categoryFilter.value,
        priceFrom.value.trim(),
        priceTo.value.trim()
      );
    }
  });
});

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Initial render
renderProducts('All', '', '');