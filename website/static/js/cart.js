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