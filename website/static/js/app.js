// ----------------- Background -----------------
// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;
  
    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
      
      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) { 
        cancelAnimationFrame(frame);
      }
  
      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {
        
        // Call our function and pass any params we received
        fn(...params);
      });
  
    } 
  };
  
  
  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
  }
  
  // Listen for new scroll events, here we debounce our `storeScroll` function
  document.addEventListener('scroll', debounce(storeScroll), { passive: true });
  
  // Update scroll position for first time
  storeScroll();

// ----------------- Based on Elements -----------------
  // Select the target and the element to change styles
  const targets = document.getElementsByClassName("scroll-target");
  const background = document.body;
  console.log(targets[1]);

  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        background.style.backdropFilter = "brightness(0%)";
        console.log('In view');
      }
      else {
        background.removeAttribute("style");
        console.log('Out of view');
      }
  });

  // Observe the target
  for (let target of targets) {
    observer.observe(target);
  }
  // ----------------- Shopping Bag -----------------
  const shoppingBag = document.getElementById("shopping-bag");
  const cartBlur = document.getElementById("cart-blur");
  function openShoppingBag() {
    shoppingBag.classList.toggle("hidden");
    cartBlur.classList.toggle("hidden");
    shoppingBag.style.animation = "openCart 0.5s ease-in-out";
  }