document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Simple Intersection Observer for Fade-in effects
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    // Add animation classes to elements
    sections.forEach(section => {
        // Simple reveal animation for section elements
        const elements = section.querySelectorAll('h2, .service-card, .stat-item, .contact-form, .materials-text');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            revealOnScroll.observe(el);
        });
    });

    // Override the reveal styles in the observer
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });

    document.querySelectorAll('h2, .service-card, .stat-item, .contact-form, .materials-text, .materials-img').forEach(el => {
        sectionObserver.observe(el);
    });

    // Form submission simulation
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = leadForm.querySelector('button');
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.textContent = 'Отправка...';

            // Simulate API call
            setTimeout(() => {
                btn.textContent = 'Заявка отправлена!';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.color = 'white';
                leadForm.reset();

                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksList = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinksList.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Scroll to section with offset for header
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinksList.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinksList.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }

            const targetId = document.querySelector(link.getAttribute('href'));
            if (targetId) {
                const headerOffset = 80;
                const elementPosition = targetId.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
