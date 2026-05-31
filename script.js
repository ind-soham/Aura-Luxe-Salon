document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initial Loader & Hero Stagger Animation
    const loader = document.getElementById('loader');
    const loaderLine = document.querySelector('.loader-line');
    const heroStaggers = document.querySelectorAll('.stagger-up');
    const heroMeta = document.querySelector('.hero-meta');
    
    // Simulate loading progress
    setTimeout(() => { loaderLine.style.width = '100%'; }, 100);

    setTimeout(() => {
        loader.style.transform = 'translateY(-100%)'; // Slide loader up
        
        // Trigger Hero text reveal with stagger
        heroStaggers.forEach((title, index) => {
            setTimeout(() => {
                title.style.transition = 'transform 1.2s cubic-bezier(0.7, 0, 0.3, 1)';
                title.style.transform = 'translateY(0)';
            }, 400 + (index * 150));
        });

        // Show buttons and meta text
        setTimeout(() => {
            heroMeta.style.opacity = '1';
            heroMeta.style.transform = 'translateY(0)';
        }, 1200);
    }, 1800);

    // 2. Custom Cursor Logic (Desktop only)
    if (window.innerWidth > 992) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        const hoverTargets = document.querySelectorAll('.hover-target, a, button, input, select');

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Direct mapping for small dot
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follow effect for larger circle
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover states to expand cursor
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => follower.classList.add('active'));
            target.addEventListener('mouseleave', () => follower.classList.remove('active'));
        });
    }

    // 3. Fullscreen Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        menuOverlay.classList.toggle('active');
    });

    // Close menu when a link is clicked
    menuLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            menuOverlay.classList.remove('active');
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', // Trigger when element is 15% from bottom
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Run once for performance
            }
        });
    }, observerOptions);

    // Elements to observe
    const revealElements = document.querySelectorAll('.fade-in, .text-mask, .img-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));

    // 5. Lightweight Parallax Effect on specific images
    const parallaxImages = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 992) { // Only on desktop
            let scrolled = window.pageYOffset;
            parallaxImages.forEach(img => {
                let speed = 0.07;
                let rect = img.getBoundingClientRect();
                
                // Only animate if image is in viewport to save memory
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    let yPos = -(scrolled * speed);
                    // Combine with the base scale(1.2) defined in CSS
                    img.style.transform = `scale(1.2) translateY(${yPos}px)`;
                }
            });
        }
    });
});
