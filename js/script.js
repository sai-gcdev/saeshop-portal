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
const modal = document.getElementById('product-modal');
const modalName = document.getElementById('modal-name');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const modalImage = document.getElementById('modal-image');

function renderProducts(filter) {
  productList.innerHTML = '';
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);
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
  modalName.textContent = product.name;
  modalCategory.textContent = product.category;
  modalPrice.textContent = `₹${product.price}`;
  modalImage.src = product.image;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

categoryFilter.addEventListener('change', () => {
  renderProducts(categoryFilter.value);
});

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

renderProducts('All');
