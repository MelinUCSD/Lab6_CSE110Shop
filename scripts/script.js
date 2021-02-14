// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // Local storage 
  let myStorage = window.localStorage;
  if (myStorage.getItem('cart') == null) {
    myStorage.setItem('cart', String(0));
  }

  // Item dictionary
  let items = JSON.parse(myStorage.getItem('items'));
  if (items == null) {
    items = {};
    myStorage.setItem('items', JSON.stringify(items));
  }

  let expandingList = document.getElementById('product-list');
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json()
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (localStorage.getItem(String(data[i].title)) == null) {
              myStorage.setItem(String(data[i].title), JSON.stringify(data[i]));
            }
            // Create product-item element
            let currItem = document.createElement('product-item');
            currItem.shadowRoot.getElementById('image').src = data[i].image;
            currItem.shadowRoot.getElementById('title').innerHTML = data[i].title;
            currItem.shadowRoot.getElementById('price').innerHTML = '$' + data[i].price;
            if (items[data[i].title] != null) {
              currItem.shadowRoot.getElementById('button').innerHTML = 'Remove from Cart';
              currItem.shadowRoot.getElementById('button').onclick = () => { alert('Removed from Cart')};
            }
            currItem.shadowRoot.getElementById('button').addEventListener('click', this.clickEvent.bind(this, currItem));
            expandingList.appendChild(currItem);
        }
        updateCart(myStorage.getItem('cart')); // Use this to remember the number of elements in cart. 
      }
    ));
});

// Button event handler
var clickEvent = function(currItem) {
  let myStorage = window.localStorage;
  let items = JSON.parse(myStorage.getItem('items'));
  // console.log(currItem.shadowRoot.getElementById('title').innerHTML);
  let status = currItem.shadowRoot.getElementById('button').innerHTML;
  if (status == 'Add to Cart') {
    updateCart(1);
    currItem.shadowRoot.getElementById('button').innerHTML = 'Remove from Cart';
    currItem.shadowRoot.getElementById('button').onclick = () => { alert('Removed from Cart')};
    items[String(currItem.shadowRoot.getElementById('title').innerHTML)] = '';
  } else {
    updateCart(-1);
    currItem.shadowRoot.getElementById('button').innerHTML = 'Add to Cart';
    currItem.shadowRoot.getElementById('button').onclick = () => { alert('Add to Cart')};
    delete items[String(currItem.shadowRoot.getElementById('title').innerHTML)];
  }
  myStorage.setItem('items', JSON.stringify(items));
};

// Updating cart count
var updateCart = function(count) {
  let myStorage = window.localStorage;
  let currCount = document.getElementsByClassName('nav-link')[0].querySelector('#cart-count').innerHTML;
  let sum = String(parseInt(currCount) + parseInt(count));
  document.getElementsByClassName('nav-link')[0].querySelector('#cart-count').innerHTML = sum;
  myStorage.setItem('cart', sum);
};