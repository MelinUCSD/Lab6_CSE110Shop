// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    self = super();
    // Attach a shadow root to <product-item>
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./styles/styles.css" />
      <li class="product" id="curr">
          <img
            id="image"
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
          />
          <p class="title" id="title">
            "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
          </p>
          <p class="price" id="price">"$109.95</p>
          <button id="button" onclick="alert('Added to Cart!')">Add to Cart</button>
      </li>
    `;
  }
}

customElements.define('product-item', ProductItem);