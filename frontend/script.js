

document.addEventListener('DOMContentLoaded', () => {



    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // 1.1 Check Local Storage for saved preference
    const savedTheme = localStorage.getItem('theme');

    // Theme Logic: Default to Dark Mode if no preference is saved
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', 'dark'); // Default
        updateIcon('dark');
        localStorage.setItem('theme', 'dark');
    }

    // 1.2 Event Listener for Toggle Button
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Update HTML attribute
        htmlElement.setAttribute('data-theme', newTheme);

        // Save to Local Storage
        localStorage.setItem('theme', newTheme);

        // Update Icon
        updateIcon(newTheme);
    });

    // 1.3 Helper Function to Update Icon
    function updateIcon(theme) {
        if (theme === 'dark') {
            // In Dark Mode, show Sun icon (to switch to light)
            icon.classList.remove('ph-moon');
            icon.classList.add('ph-sun');
        } else {
            // In Light Mode, show Moon icon (to switch to dark)
            icon.classList.remove('ph-sun');
            icon.classList.add('ph-moon');
        }
    }


    // ==========================================
    // SECTION 2: SMOOTH SCROLLING
    // ==========================================
    // Ensures clicking nav links scrolls smoothly to the section.

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll with offset for fixed navbar
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // SECTION 3: SCROLL REVEAL ANIMATIONS
    // ==========================================
    // Uses IntersectionObserver to fade in elements as they scroll into view.

    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in'); // Add base class (opacity 0)
        observer.observe(section);        // Start watching
    });

    // ==========================================
    // SECTION 4: MOBILE NAVIGATION
    // ==========================================

    // const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); // Removed
    const navLinksContainer = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo'); // Trigger

    function toggleMobileMenu() {
        navLinksContainer.classList.toggle('active');
        logo.classList.toggle('active'); // Add active class to logo

        // Toggle overflow
        if (navLinksContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Logo Click Event (Only on Mobile)
    logo.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent scrolling to top
            toggleMobileMenu();
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinksContainer.classList.contains('active') &&
            !navLinksContainer.contains(e.target) &&
            !logo.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // ==========================================
    // SECTION 5: Header Scroll & Glow Effects
    // ==========================================

    // 5.1 Header Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5.2 Section Glow Effects (Intersection Observer)
    const glowObserverOptions = {
        threshold: 0.3 // Trigger when 30% visible
    };

    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all project and skill cards
                const cards = entry.target.querySelectorAll('.project-card, .skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('glow-active');
                    }, index * 100); // Staggered effect
                });
            } else {
                // Remove glow when scrolling away
                const cards = entry.target.querySelectorAll('.project-card, .skill-card');
                cards.forEach(card => card.classList.remove('glow-active'));
            }
        });
    }, glowObserverOptions);

    // Observe specific sections
    const glowSections = document.querySelectorAll('#projects, #education, #skills');
    glowSections.forEach(section => glowObserver.observe(section));

    // 5.3 Click Intensity Effect (Projects & Skills only)
    const interactiveCards = document.querySelectorAll('.project-card, .skill-card');
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove from others
            interactiveCards.forEach(c => c.classList.remove('glow-intensify'));
            
            // Add to clicked
            card.classList.add('glow-intensify');
            
            // Remove after 1 second
            setTimeout(() => {
                card.classList.remove('glow-intensify');
            }, 1000);
        });
        // ==========================================
    // SECTION 6: BACK TO TOP BUTTON
    // ==========================================
    
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        // 1. Add Launch Class (Fly up animation)
        backToTopBtn.classList.add('launch');

        // 2. Smooth Scroll to Top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 3. Reset after animation/scroll completes
        setTimeout(() => {
            backToTopBtn.classList.remove('launch');
        }, 1000);
    });

});

});
