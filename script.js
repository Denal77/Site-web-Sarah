function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}


// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});


// NAVBAR SCROLL EFFECT

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 0 rgba(0,0,0,0.05)';
    }
});

// CLOSE MENU ON OUTSIDE CLICK

document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// INTERSECTION OBSERVER (Animations)

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ANIMATE ELEMENTS ON SCROLL


document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.stat-item, .pillar-card, .benefit-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// COUNTER ANIMATION FOR STATS

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        
        if (start >= target) {
            if (target === Infinity) {
                element.textContent = '∞';
            } else {
                element.textContent = Math.ceil(target) + (target === 100 ? '%' : '');
            }
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start) + (target === 100 ? '%' : '');
        }
    }, 16);
};

// STATS COUNTER OBSERVER

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text === '∞') {
                statNumber.textContent = '0';
                setTimeout(() => {
                    statNumber.textContent = '∞';
                }, 500);
            } else if (text.includes('%')) {
                const target = parseInt(text);
                statNumber.textContent = '0%';
                animateCounter(statNumber, target);
            } else {
                const target = parseInt(text);
                if (!isNaN(target)) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, target);
                }
            }
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// INITIALIZE COUNTER ANIMATION

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-item').forEach(item => {
        statObserver.observe(item);
    });
});

// PREVENT BODY SCROLL WHEN MENU OPEN

const navLinks = document.getElementById('navLinks');

if (navLinks) {
    const menuObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (navLinks.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    menuObserver.observe(navLinks, { attributes: true });
}

// HERO ANIMATION ON LOAD

window.addEventListener('load', () => {
    const heroContainer = document.querySelector('.hero-container');
    
    if (heroContainer) {
        heroContainer.style.opacity = '0';
        heroContainer.style.transform = 'translateY(20px)';
        heroContainer.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContainer.style.opacity = '1';
            heroContainer.style.transform = 'translateY(0)';
        }, 100);
    }
});

// SCROLL TO TOP BUTTON (Optional)

// Uncomment if you want a scroll to top button
/*
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #2d5a3d;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
*/