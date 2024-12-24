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
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Update the displayed value of nums
        document.getElementById('nums-value').innerText = data.num_cart_items;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
