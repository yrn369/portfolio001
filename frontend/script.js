// =======================================================
// PORTFOLIO MAIN SCRIPT
// Author: Yogesh Nyaupane
// Description: Handles theme toggle, navigation, animations,
//              interactions, and UI effects
// =======================================================

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       SECTION 1: THEME TOGGLE (DARK / LIGHT MODE)
    ===================================================== */

    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme or default to dark mode
    const initialTheme = savedTheme || 'dark';
    html.setAttribute('data-theme', initialTheme);
    localStorage.setItem('theme', initialTheme);
    updateThemeIcon(initialTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Update theme icon based on current mode
    function updateThemeIcon(theme) {
        themeIcon.classList.toggle('ph-sun', theme === 'dark');
        themeIcon.classList.toggle('ph-moon', theme === 'light');
    }

    /* =====================================================
       SECTION 2: SMOOTH SCROLLING FOR NAVIGATION LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =====================================================
       SECTION 3: SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        revealObserver.observe(section);
    });

    /* =====================================================
       SECTION 4: MOBILE NAVIGATION MENU
    ===================================================== */

    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');

    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        logo.classList.toggle('active');
        document.body.style.overflow =
            navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Open menu on logo click (mobile only)
    logo.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !logo.contains(e.target)
        ) {
            toggleMobileMenu();
        }
    });

    /* =====================================================
       SECTION 5: HEADER SCROLL & GLOW EFFECTS
    ===================================================== */

    const navbar = document.querySelector('.navbar');

    // Header background on scroll
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Glow animation for cards when section enters viewport
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const cards = entry.target.querySelectorAll('.project-card, .skill-card');

            if (entry.isIntersecting) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('glow-active');
                    }, index * 100);
                });
            } else {
                cards.forEach(card => card.classList.remove('glow-active'));
            }
        });
    }, { threshold: 0.3 });

    document
        .querySelectorAll('#projects, #education, #skills')
        .forEach(section => glowObserver.observe(section));

    // Click intensity effect on cards
    const interactiveCards = document.querySelectorAll('.project-card, .skill-card');

    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            interactiveCards.forEach(c => c.classList.remove('glow-intensify'));
            card.classList.add('glow-intensify');

            setTimeout(() => {
                card.classList.remove('glow-intensify');
            }, 1000);
        });
    });

    /* =====================================================
       SECTION 6: BACK TO TOP ROCKET BUTTON 🚀
    ===================================================== */

    const backToTopBtn = document.getElementById('back-to-top');

    // Show / hide button on scroll
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    });

    // Scroll to top with launch animation
    backToTopBtn.addEventListener('click', () => {
        backToTopBtn.classList.add('launch');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            backToTopBtn.classList.remove('launch');
        }, 1000);
    });

});
