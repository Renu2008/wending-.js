const products = [
  { id: 1, name: "Coke Cola", price: 40, stock: 15 },
  { id: 2, name: "Chips", price: 30, stock: 15 },
  { id: 3, name: "Milky Bar", price: 25, stock: 15 },
  { id: 4, name: "Water Bottle", price: 20, stock: 15 },
  { id: 5, name: "Fanta", price: 35, stock: 15 },
  { id: 6, name: "Dairy milk", price: 50, stock: 15 },
  { id: 7, name: "Slice", price: 30, stock: 15 },
  { id: 8, name: "Cake", price: 10, stock: 15 },
  { id: 9, name: "Kurkura", price: 45, stock: 15 }
];
const productGrid = document.getElementById("productGrid");
function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(product => {
    productGrid.innerHTML += `
      <div class="product">
        <strong>${product.name}</strong><br/>
        ₹${product.price}<br/>
        Stock: ${product.stock}<br/>
        <input type="number" min="0" max="${product.stock}" id="qty-${product.id}"  placeholder="0" />
      </div>
    `;
  });
}
function calculatetotal() {
  let total = 0;
  let selectedItems = [];
  products.forEach(product => {
    const qty = parseInt(document.getElementById(`qty-${product.id}`).value) ;
    if (qty > 0 && qty <= product.stock) {
      total += qty * product.price;
      selectedItems.push(`${product.name} x ${qty} = ₹${qty * product.price}`);
    }
  });
  if (selectedItems.length === 0) {
    alert("Please select at least one product.");
    return;
  }
  const message = selectedItems.join("\n") + `\nTotal: ₹${total}`;
  alert(message);
  const method = prompt("Choose payment method: 'cash' or 'gpay'").toLowerCase();
  if (method === "gpay") {
    processgpaypayment(total);
  } else if (method === "cash") {
    processcashpayment(total);
  } else {
    alert("Invalid payment method. Please try again.");
  }
}
function processcashpayment(total) {
  alert("Processing cash payment");
  setTimeout(() => {
    const success = Math.random() > 0.1;
    if (success) {
      alert("Payment successful!\nDispatching products");
      updateStock();
      setTimeout(() => {
        alert("Products dispatched successfully.\nThank you for using our vending machine.");
        location.reload();
      }, 100);
    } else {
      alert("Payment failed. Please try again.");
    }
  }, 150);
}
function processgpaypayment(total) {
  const userCode = prompt("Enter your GPay verification code:");
  const correctCode = "2008";
  if (userCode !== correctCode) {
    alert("Incorrect code. Payment cancelled.");
    return;
  }
  alert("Processing GPay payment");
  setTimeout(() => {
    const success = Math.random() > 0.1;
    if (success) {
      alert("GPay payment successful!\nDispatching products...");
      updateStock();
      renderProducts();
       setTimeout(() => {
        alert("Products dispatched successfully.\nThank you for using our vending machine.");
        location.reload();
       }, 100);
    } else {
      alert("Payment failed. Please try again.");
    }
  }, 150);
}
function updateStock() {
  products.forEach(product => {
    const qty = parseInt(document.getElementById(`qty-${product.id}`).value) ;
    if (qty > 0 && qty <= product.stock) {
      product.stock -= qty;
    }
  });
}
renderProducts();