document.addEventListener('DOMContentLoaded', () => {
    //Feedback rating stars
    const stars = document.querySelectorAll('.form__rating-star');
    const ratingResult = document.getElementById('ratingResult');

    let selectedRating = 0;

    stars.forEach(star => {
        ['mouseover', 'mouseout', 'click'].forEach(eventType => {
            star.addEventListener(eventType, handleStarEvent);
        });
    });

    function handleStarEvent(event) {
        const star = event.target;
        const rate = star.dataset.rate;

        switch (event.type) {
            case 'mouseover':
                updateStars(rate, 'hover');
                break;
            case 'mouseout':
                updateStars(selectedRating, 'selected');
                break;
            case 'click':
                selectedRating = rate;
                ratingResult.value = rate;
                updateStars(selectedRating, 'selected');
                break;
        }
    }

    function updateStars(rate, className) {
        stars.forEach(star => {
            star.classList.remove('hover', 'selected');
            if (star.dataset.rate <= rate) {
                star.classList.add(className);
            }
        });
    }

    const body = document.body;
    const buttons = {
        contactBtn: {
            element: document.getElementById('contactBtn'),
            popup: document.getElementById('popupContactUs'),
        },
        feedbackBtn: {
            element: document.getElementById('feedbackBtn'),
            popup: document.getElementById('popupFeedback'),
        },
    };

    //Floating button
    window.addEventListener('scroll', () => {
        buttons.contactBtn.element.classList.toggle('visible', window.scrollY > 0);
    });

    //Switch popup
    const togglePopup = (popup, isActive) => {
        popup.classList.toggle('active', isActive);
        body.classList.toggle('lock', isActive);
    };

    // Buttons & popups
    Object.values(buttons).forEach(({ element, popup }) => {
        element.addEventListener('click', () => togglePopup(popup, true));

        popup.addEventListener('click', (e) => {
            if (e.target === popup) togglePopup(popup, false);

            stars.forEach(star => star.classList.remove('hover', 'selected'));
        });

        const closeButton = popup.querySelector('.form__close');

        if (closeButton) {
            closeButton.addEventListener('click', () => togglePopup(popup, false));

            stars.forEach(star => star.classList.remove('hover', 'selected'));
        }
    });

    //Animations
    const setupIntersectionObserver = (selector, callback, options = { threshold: 1 }) => {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);

                    observer.unobserve(entry.target);
                }
            });
        }, options);

        elements.forEach(element => observer.observe(element));
    };

    //Animation for .section__best-price-old
    setupIntersectionObserver('.section__best-price-old', (element) => {
        element.classList.add('visible');
    });

    //Animation for .section__reasons-icon
    setupIntersectionObserver(
        '.section__reasons-icon',
        () => addVisibleClasses('.section__reasons-icon'),
        { threshold: 0.1 }
    );

    const addVisibleClasses = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => el.classList.add('visible'), index * 600);
        });
    };
});

