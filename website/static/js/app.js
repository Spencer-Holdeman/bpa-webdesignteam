// Create a new IntersectionObserver instance to observe visibility changes of target elements
const observer = new IntersectionObserver((entries) => {
  // Loop through each entry (observed element)
  entries.forEach((entry) => {
    // If the element is intersecting (visible in the viewport)
    if (entry.isIntersecting) {
      // Add the 'scroll-show' class to the element
      entry.target.classList.add('scroll-show');
    }
    // If the element is not intersecting and has the 'scroll-redo' class
    else if (!entry.isIntersecting && entry.target.classList.contains('scroll-redo')) {
      // Remove the 'scroll-show' class from the element
      entry.target.classList.remove('scroll-show');
    }
  });
});

// Select all elements with the 'scroll-ani' class
const hiddenElements = document.querySelectorAll('.scroll-ani');
// Observe each selected element with the IntersectionObserver instance
hiddenElements.forEach((element) => {
  observer.observe(element);
});


// ----------------- Scroll -----------------
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


  // ----------------- Scroll -----------------
  function scrollFunction() {
    const SwagItem = document.getElementById('swagItem');
    if (document.documentElement.dataset.scroll > 2250 && document.documentElement.dataset.scroll < 2700) {
      console.log('Front Hat');
      SwagItem.src = '../static/img/swag/hat/hat-f.png';
    }
    else if (document.documentElement.dataset.scroll > 2700 && document.documentElement.dataset.scroll < 3000) {
      console.log('Front Right Hat');
      SwagItem.src = '../static/img/swag/hat/hat-fr.png';
    }
    else if (document.documentElement.dataset.scroll > 3000 && document.documentElement.dataset.scroll < 3300) {
      console.log('Right Hat');
      SwagItem.src = '../static/img/swag/hat/hat-r.png';
    }
    else if (document.documentElement.dataset.scroll > 3300) {
      console.log('Back Hat');
      SwagItem.src = '../static/img/swag/hat/hat-b.png';
    }
    setTimeout(scrollFunction, 100);
  }
  scrollFunction()