// script.js

const products = [
  { id: 1, name: 'Product 1', price: 10.00 },
  { id: 2, name: 'Product 2', price: 15.00 },
  { id: 3, name: 'Product 3', price: 20.00 }
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
          <span>${product.name} - $${product.price.toFixed(2)}</span>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsContainer.appendChild(productElement);
  });
}

function renderCart() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '';
  cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
          <span>${product.name} - $${product.price.toFixed(2)} (x${item.quantity})</span>
          <button onclick="removeFromCart(${product.id})">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
  });
}

function addToCart(productId) {
  const productInCart = cart.find(item => item.id === productId);
  if (productInCart) {
      productInCart.quantity += 1;
  } else {
      cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);
  if (productIndex > -1) {
      cart[productIndex].quantity -= 1;
      if (cart[productIndex].quantity === 0) {
          cart.splice(productIndex, 1);
      }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
  }
  alert('Checkout successful!');
  cart.length = 0;
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
});
