document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.getElementById('contact');
    const popup = document.getElementById('popup');
    //const closeButton = document.getElementById('popupClose');
    const body = document.body;

    const togglePopup = (isActive) => {
        popup.classList.toggle('active', isActive);
        body.classList.toggle('lock', isActive);
    };

    window.addEventListener('scroll', () => {
        contactBtn.classList.toggle('visible', window.scrollY > 0);
    });

    contactBtn.addEventListener('click', () => togglePopup(true));

    //closeButton.addEventListener('click', () => togglePopup(false));

    popup.addEventListener('click', (e) => {
        if (e.target === popup) togglePopup(false);
    });
});

//Price
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 1 });

const elements = document.querySelectorAll('.section__best-price-old');

elements.forEach(element => {
    observer.observe(element);
});