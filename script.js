

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

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileIcon = mobileMenuBtn.querySelector('i');

    function toggleMobileMenu() {
        navLinksContainer.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');

        // Toggle icon between List and X
        if (navLinksContainer.classList.contains('active')) {
            mobileIcon.classList.remove('ph-list');
            mobileIcon.classList.add('ph-x');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
        } else {
            mobileIcon.classList.remove('ph-x');
            mobileIcon.classList.add('ph-list');
            document.body.style.overflow = 'auto';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

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
            !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });

});
