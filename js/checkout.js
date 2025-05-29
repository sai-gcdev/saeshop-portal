document.addEventListener('DOMContentLoaded', function () {
  const sameAsBilling = document.getElementById('same-as-billing');
  const deliveryFormContainer = document.getElementById('delivery-form-container');
  const billingForm = document.getElementById('billing-form');
  const summarySection = document.getElementById('summary-section');

  // Show/hide delivery form
  sameAsBilling.addEventListener('change', function () {
    deliveryFormContainer.style.display = this.checked ? 'none' : 'block';
    // Set required fields
    Array.from(deliveryFormContainer.querySelectorAll('input')).forEach(input => {
      input.required = !this.checked;
    });
  });

  // On form submit, show summary
  billingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get billing info
    const billing = {
      name: document.getElementById('billing-name').value,
      email: document.getElementById('billing-email').value,
      address: document.getElementById('billing-address').value,
      city: document.getElementById('billing-city').value,
      zip: document.getElementById('billing-zip').value,
      country: document.getElementById('billing-country').value
    };

    // Get delivery info
    let delivery;
    if (sameAsBilling.checked) {
      delivery = { ...billing };
      delete delivery.email; // Email not needed for delivery
    } else {
      delivery = {
        name: document.getElementById('delivery-name').value,
        address: document.getElementById('delivery-address').value,
        city: document.getElementById('delivery-city').value,
        zip: document.getElementById('delivery-zip').value,
        country: document.getElementById('delivery-country').value
      };
    }

    // Get total cost from localStorage (set by cart.js)
    let totalCost = localStorage.getItem('cartTotal') || '0.00';
    totalCost = parseFloat(totalCost).toFixed(2); // Ensure it's a number with 2 decimals

    // Build summary HTML
    summarySection.innerHTML = `
      <h2>Order Summary</h2>
      <div class="summary-item"><strong>Billing Information</strong><br>
        ${billing.name}<br>
        ${billing.email}<br>
        ${billing.address}, ${billing.city}, ${billing.zip}, ${billing.country}
      </div>
      <div class="summary-item"><strong>Delivery Information</strong><br>
        ${delivery.name}<br>
        ${delivery.address}, ${delivery.city}, ${delivery.zip}, ${delivery.country}
      </div>
      <div class="summary-item"><strong>Total Cost:</strong> Rs ${totalCost}</div>
      <button id="proceed-payment-btn" class="proceed-btn">Proceed to Payment</button>
    `;
    billingForm.style.display = 'none';
    summarySection.style.display = 'block';

    document.getElementById('proceed-payment-btn').onclick = function () {
      alert('Proceeding to payment gateway...');
      // Redirect or handle payment here
    };
  });
});