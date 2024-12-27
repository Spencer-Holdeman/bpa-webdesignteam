  // ----------------- Shopping Bag -----------------
  const shoppingBag = document.getElementById("shopping-bag");
  const cartBlur = document.getElementById("cart-blur");
  function openShoppingBag() {
    shoppingBag.classList.toggle("hidden");
    cartBlur.classList.toggle("hidden");
    shoppingBag.style.animation = "openCart 0.3s alternate infinite ease-in-out";
    setTimeout(() => {
      shoppingBag.style.animationPlayState = "paused";
    }, 300);
  }
  function closeShoppingBag() {
    shoppingBag.style.animationPlayState = "running";
    setTimeout(() => {
      shoppingBag.classList.toggle("hidden");
      cartBlur.classList.toggle("hidden");
    }, 300);
  }

// Spencer
function incrementCartItems() {
    // Send a POST request to increment the nums variable
    fetch('/increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain'
        }
    })
    .then(response => response.text())
    .then(data => {
        // Update the displayed value of nums
        var div_element = document.createElement('div');
        div_element.setAttribute('class', 'cart-item');
        div_element.innerText = data;
        document.getElementById('nums-value').innerText = data;
        document.getElementById('cart-message').innerText = `you have ${data} items in your cart`;
        document.getElementById('cart-items').appendChild(div_element);
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function removeCartItems() {
    // Send a POST request to remove the nums variable
    fetch('/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain'
        }
    })
    .then(response => response.text())
    .then(data => {
        // Update the displayed value of nums
        function removeCartItemsByClass(parent_selector, class_name) {
            var parent_element = document.getElementById(parent_selector);
            var child_elements = document.getElementsByClassName(class_name);
            while(child_elements.length > 0) {
                parent_element.removeChild(child_elements[0]);
            }
        }
        removeCartItemsByClass('cart-items', 'cart-item');
        document.getElementById('nums-value').innerText = data;
        document.getElementById('cart-message').innerText = 'You currently have no items in your cart!';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}