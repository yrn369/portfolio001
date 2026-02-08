

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

    // ==========================================
    // SECTION 5: BACKGROUND ANIMATION (Space-Time / Neural)
    // ==========================================

    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    let themeColor = 'rgba(0, 255, 136, '; // Default Dark (Green/Cyan)
    
    // Configuration
    const particleCount = window.innerWidth < 768 ? 40 : 80; // Fewer on mobile
    const connectionDistance = 150;
    const waveSpeed = 0.005;
    const waveAmplitude = 20;

    // Handle Resize
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
    resize();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow horizontal drift
            this.vy = (Math.random() - 0.5) * 0.5; // Slow vertical drift
            this.size = Math.random() * 2 + 1;
            this.baseY = this.y; // For wave motion
            this.angle = Math.random() * 6.28; // Random starting angle for wave
        }

        update() {
            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Space-time Wave Effect (Sine wave superimposed)
            // We add a subtle sine wave calculation to the Y position
            this.angle += waveSpeed;
            this.y = this.baseY + Math.sin(this.angle + this.x * 0.01) * waveAmplitude;
            this.baseY += this.vy; // Keep drifting the base

            // Wrap around screen
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.baseY < 0) this.baseY = height;
            if (this.baseY > height) this.baseY = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = themeColor + '0.5)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Check Theme for Colors
    function updateThemeColor() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeColor = 'rgba(0, 255, 136, '; // Neon Green/Cyan
        } else {
            themeColor = 'rgba(37, 99, 235, '; // Blue
        }
    }

    // Observer to watch for theme attribute changes
    const themeObserver = new MutationObserver(updateThemeColor);
    themeObserver.observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });
    updateThemeColor(); // Initial check

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and Draw Particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw Connections (Neural Network)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = themeColor + (1 - distance / connectionDistance) * 0.2 + ')'; // Fade out
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    // Start everything
    initParticles();
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
        animate();
    }

});
