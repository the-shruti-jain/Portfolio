// Shruti's Portfolio - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Create floating elements
    createFloatingElements();

    // Smooth scroll for navigation
    initSmoothScroll();

    // Form handling
    initContactForm();

    // Scroll animations
    initScrollAnimations();

    // Theme toggle
    initThemeToggle();

    // Navbar scroll effect
    initNavbarScroll();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Default to dark mode unless explicitly set to light
    if (localStorage.theme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }

    // Toggle button click handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');

            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    }
}

// Create floating hearts and sparkles
function createFloatingElements() {
    const container = document.querySelector('.floating-hearts');
    const emojis = ['💖', '✨', '💕', '🦋', '⭐', '💫', '🌸'];

    for (let i = 0; i < 15; i++) {
        const element = document.createElement('span');
        element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        element.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: floatRandom ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        container.appendChild(element);
    }

    // Add keyframes for random floating
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatRandom {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(90deg);
            }
            50% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(180deg);
            }
            75% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;

            // Show sending state
            button.innerHTML = '<span class="loader"></span> Sending...';
            button.disabled = true;

            // Simulate sending
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success
            button.innerHTML = '✨ Message Sent! 💕';
            button.style.background = 'linear-gradient(to right, #10b981, #34d399)';

            // Reset form
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Make hero section visible immediately
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.add('shadow-barbie-pink/10');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.remove('shadow-barbie-pink/10');
        }
    });
}

// Cursor sparkle effect (optional - for desktop)
if (window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            createSparkle(e.clientX, e.clientY);
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.textContent = ['✨', '💖', '⭐'][Math.floor(Math.random() * 3)];
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 16px;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleUp 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ========== PARALLAX EFFECTS ==========

// Initialize parallax on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
        initParallax();
        initMouseParallax();
        initProfileCardTilt();
    }
    initStaggerAnimations();
});

// Scroll-based Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');

    // Create parallax orbs in hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        createParallaxOrbs(heroSection);
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Move orbs on scroll
        document.querySelectorAll('.parallax-orb').forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });

        // Parallax for hero elements
        const profileCard = document.querySelector('#home .relative.flex');
        if (profileCard && scrollY < window.innerHeight) {
            profileCard.style.transform = `translateY(${scrollY * 0.15}px)`;
        }

        // Floating emojis parallax
        document.querySelectorAll('.animate-float').forEach((emoji, index) => {
            const speed = 0.05 + (index * 0.02);
            emoji.style.transform = `translateY(${-scrollY * speed}px)`;
        });
    });
}

// Create decorative parallax orbs
function createParallaxOrbs(container) {
    const orbCount = 3;
    const colors = [
        'rgba(255, 105, 180, 0.2)',
        'rgba(218, 112, 214, 0.15)',
        'rgba(255, 20, 147, 0.1)'
    ];

    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = `parallax-orb parallax-orb-${i + 1}`;
        orb.style.cssText = `
            position: absolute;
            width: ${200 + i * 100}px;
            height: ${200 + i * 100}px;
            background: radial-gradient(circle, ${colors[i]}, transparent);
            border-radius: 50%;
            filter: blur(60px);
            pointer-events: none;
            z-index: 0;
            top: ${20 + i * 25}%;
            left: ${10 + i * 30}%;
        `;
        container.appendChild(orb);
    }
}

// Mouse-based Parallax for interactive effect
function initMouseParallax() {
    const hero = document.querySelector('#home');
    if (!hero) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    });

    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        // Move orbs based on mouse
        document.querySelectorAll('.parallax-orb').forEach((orb, index) => {
            const depth = (index + 1) * 20;
            orb.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
        });

        // Move floating emojis
        document.querySelectorAll('#home .animate-float').forEach((emoji, index) => {
            const depth = (index + 1) * 10;
            emoji.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Profile card 3D tilt effect
function initProfileCardTilt() {
    const profileCard = document.querySelector('#home .relative.w-80');
    if (!profileCard) return;

    profileCard.classList.add('tilt-card');

    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        profileCard.style.setProperty('--rotateX', `${rotateX}deg`);
        profileCard.style.setProperty('--rotateY', `${rotateY}deg`);
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Staggered animations for grid items
function initStaggerAnimations() {
    const skillCards = document.querySelectorAll('#skills .group');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Console easter egg 💕
console.log('%c💖 Welcome to Shruti\'s Portfolio! ✨',
    'color: #ff69b4; font-size: 20px; font-weight: bold;');
console.log('%cJust a girl with dreams... and code! 🦋',
    'color: #da70d6; font-size: 14px;');
