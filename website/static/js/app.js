const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.scroll-uhidden, .scroll-dhidden, .scroll-lhidden, .scroll-rhidden');
hiddenElements.forEach((element) => {
    observer.observe(element);
});