document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Navigation Toggle (Mobile)
       ========================================= */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.header__link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    });


    /* =========================================
       Scroll Animations (Intersection Observer)
       ========================================= */
    // Hero Elements Fade In
    const heroElements = document.querySelectorAll('.animate-el');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('is-visible');
        }, index * 200); // Stagger
    });

    // Scroll Elements Fade Up
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animating once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(el);
    });

    // Add logic to actually trigger the style change
    // Using a class based approach is cleaner, let's inject a CSS rule or modify the class
    // Simple way: Add 'is-visible' class which we define in CSS or inline styles here

    // Let's refine the observer callback to just add a class
    const refinedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => refinedObserver.observe(el));


    /* =========================================
       Parallax Effect for Hero Background
       ========================================= */
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroBg = document.querySelector('.hero__bg');
        if (heroBg && scrollY < window.innerHeight) {
            heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.4}px)`;
        }
    });


    /* =========================================
       Accordion Logic
       ========================================= */
    const accordions = document.querySelectorAll('.accordion__item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion__header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all others (Optionally)
            accordions.forEach(acc => acc.classList.remove('active'));

            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });


    /* =========================================
       Back to Top Button
       ========================================= */
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
