const hamburger = document.getElementById('mobile-menu')
const hamburgerClose = hamburger.children[0]
const hamburgerLinks = hamburger.children[1].children

function openMenu() {
    hamburger.style.width = '100%'
    hamburgerClose.style.display = 'block'
    setTimeout(() => {
        hamburgerClose.style.opacity = '1'

        // Links
        hamburgerLinks[0].style.opacity = '1'
        setTimeout(() => {
            hamburgerLinks[1].style.opacity = '1'
        }, 240);
        setTimeout(() => {
            hamburgerLinks[2].style.opacity = '1'
        }, 480);
        setTimeout(() => {
            hamburgerLinks[3].style.opacity = '1'
        }, 600);
        setTimeout(() => {
            hamburgerLinks[4].style.opacity = '1'
        }, 720);
    }, 500);
}

function closeMenu() {
    hamburger.style.width = '0%'
    hamburgerClose.style.opacity = '0'
    setTimeout(() => {
        hamburgerClose.style.display = 'none'
    }, 500);

    // Links
    hamburgerLinks[0].style.opacity = '0'
    setTimeout(() => {
        hamburgerLinks[1].style.opacity = '0'
    }, 240);
    setTimeout(() => {
        hamburgerLinks[2].style.opacity = '0'
    }, 480);
    setTimeout(() => {
        hamburgerLinks[3].style.opacity = '0'
    }, 600);
    setTimeout(() => {
        hamburgerLinks[4].style.opacity = '0'
    }, 720);
}