const background = document.getElementById("background-img");

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
  const target = document.getElementsByClassName("scroll-target")[0];
  const merchItems = document.getElementsByClassName("merch-target");
  const merchImg = document.getElementById("swagItem");

  // Create an Intersection Observer
  const scrollObs = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) { 
        background.style.filter = "brightness(0%)";
       }
      else { 
        background.removeAttribute("style");
       }});

  const merchObs1 = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) { merchImg.src = "../static/img/swag/hat/hat-fr.png"; }
       else { console.log("not visible"); }});
  const merchObs2 = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) { merchImg.src = "../static/img/swag/hoodie/hoodie-f.png"; }
      else { console.log("not visible"); }});
  const merchObs3 = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) { merchImg.src = "../static/img/swag/jacket/jacket-f.png"; }
      else { console.log("not visible"); }});
  const merchObs4 = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) { merchImg.src = "../static/img/swag/cup/cup-f.png"; }
      else { console.log("not visible"); }});
  const merchObs5 = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) { merchImg.src = "../static/img/swag/hat/hat-l.png"; }
      else { console.log("not visible"); }});

  // Observe the target
  scrollObs.observe(target);
  merchObs1.observe(merchItems[0]);
  merchObs2.observe(merchItems[1]);
  merchObs3.observe(merchItems[2]);
  merchObs4.observe(merchItems[3]);
  merchObs5.observe(merchItems[4]);

  // ----------------- Shopping Bag -----------------
  const shoppingBag = document.getElementById("shopping-bag");
  const cartBlur = document.getElementById("cart-blur");
  function openShoppingBag() {
    shoppingBag.classList.toggle("hidden");
    cartBlur.classList.toggle("hidden");
    shoppingBag.style.animation = "openCart 0.5s alternate infinite ease-in-out";
    setTimeout(() => {
      shoppingBag.style.animationPlayState = "paused";
    }, 500);
  }
  function closeShoppingBag() {
    shoppingBag.style.animationPlayState = "running";
    setTimeout(() => {
      shoppingBag.classList.toggle("hidden");
    }, 500);
    cartBlur.classList.toggle("hidden");
  }