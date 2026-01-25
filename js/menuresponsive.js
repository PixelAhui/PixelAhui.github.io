const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector("nav");

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
    }
});