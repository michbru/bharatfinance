// Main application logic
window.initializeApp = function() {
    // Hide loading overlay — don't wait for video, poster image covers the gap
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            mobileMenuBtn.textContent = isOpen ? '\u2715' : '\u2630';
            mobileMenuBtn.classList.toggle('menu-open', isOpen);
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '\u2630';
                mobileMenuBtn.classList.remove('menu-open');
            });
        });
    }

    // Initialize contact form if present
    window.initContactForm();

    // Video optimization - pause when not in viewport
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(heroVideo);
    }

    // Scroll-triggered fade-in animations
    const animateOnScroll = () => {
        const selectors = [
            '#intro-container section',
            '#team-container section',
            '#expertise-banner-container section',
            '#news-container section',
            '#testimonials-container section',
            '#partners-container section',
            '#contact-container section',
            '[data-animate]'
        ];
        const elements = document.querySelectorAll(selectors.join(','));

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    setTimeout(animateOnScroll, 100);

    // Partner logo carousel - continuous seamless scroll
    const initPartnerCarousel = () => {
        const wrapper = document.querySelector('.partner-carousel-wrapper');
        if (!wrapper) return;
        const track = wrapper.querySelector('.partner-carousel-track');
        if (!track) return;

        const GAP = window.innerWidth < 768 ? 40 : 80;
        const SPEED = 0.5;

        const children = Array.from(track.children);
        const baseItems = children.slice(0, Math.ceil(children.length / 2) || children.length);

        function startAfterImagesLoad() {
            const imgs = track.querySelectorAll('img');
            let loaded = 0;
            const total = imgs.length;
            const onReady = () => { loaded++; if (loaded >= total) startScroll(); };

            if (total === 0) { startScroll(); return; }
            imgs.forEach(img => {
                if (img.complete) loaded++;
                else { img.addEventListener('load', onReady); img.addEventListener('error', onReady); }
            });
            if (loaded >= total) startScroll();
            setTimeout(() => { if (loaded < total) startScroll(); }, 2500);
        }

        let scrollStarted = false;
        function startScroll() {
            if (scrollStarted) return;
            scrollStarted = true;

            const minWidth = wrapper.clientWidth * 3;
            let safety = 0;
            while (track.scrollWidth < minWidth && safety < 50) {
                baseItems.forEach(item => track.appendChild(item.cloneNode(true)));
                safety++;
            }

            let offset = 0;
            let lastTime = null;

            function step(timestamp) {
                if (lastTime === null) lastTime = timestamp;
                const delta = timestamp - lastTime;
                lastTime = timestamp;

                offset += SPEED * (delta / 16.667);

                const first = track.firstElementChild;
                if (first) {
                    const itemWidth = first.offsetWidth + GAP;
                    if (offset >= itemWidth) {
                        offset -= itemWidth;
                        track.appendChild(first);
                    }
                }

                track.style.transform = 'translateX(' + (-offset) + 'px)';
                requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }

        startAfterImagesLoad();
    };

    setTimeout(initPartnerCarousel, 200);

    // Animate stat counters when they come into view
    const animateCounters = () => {
        const counters = document.querySelectorAll('[data-counter]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-counter'));
                    const suffix = target.getAttribute('data-suffix') || '';
                    const prefix = target.getAttribute('data-prefix') || '';

                    if (!isNaN(finalValue)) {
                        let current = 0;
                        const duration = 1500;
                        const step = finalValue / (duration / 30);
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= finalValue) {
                                target.textContent = prefix + finalValue.toLocaleString() + suffix;
                                clearInterval(timer);
                            } else {
                                target.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
                            }
                        }, 30);
                    }
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => observer.observe(el));
    };

    setTimeout(animateCounters, 150);
};

// Contact form setup — called after contact component loads on ANY page
window.initContactForm = function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm || contactForm.dataset.initialized) return;
    contactForm.dataset.initialized = 'true';

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value.trim()
        };

        console.log('Form submitted:', formData);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            alert('Please fill in all required fields.');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        sendNotificationEmail(formData);

        submitToHubSpot(formData)
            .then(function() {
                submitBtn.textContent = 'Thank you! We\'ll be in touch.';
                submitBtn.style.backgroundColor = '#16a34a';
                contactForm.reset();

                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 10000);
            })
            .catch(function(error) {
                console.error('Submission error:', error);
                alert('Something went wrong. Please try again or email us at info@bharatfinance.de');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
};

function submitToHubSpot(formData) {
    const portalId = '26013262';
    const formGuid = 'a7274aa7-578b-4859-aef8-776bb2f15e84';
    const url = 'https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + formGuid;

    const payload = {
        fields: [
            { objectTypeId: "0-1", name: "firstname", value: formData.firstName },
            { objectTypeId: "0-1", name: "lastname", value: formData.lastName },
            { objectTypeId: "0-1", name: "email", value: formData.email },
            { objectTypeId: "0-2", name: "phone", value: formData.phone }
        ],
        context: {
            pageUri: window.location.href,
            pageName: document.title
        }
    };

    if (formData.interest) {
        var interestMapping = {
            'pension': 'Financial Security in Retirement',
            'insurance': 'Check & Improve my existing insurance contracts.',
            'investment': 'Investment Options in Germany',
            'realestate': 'Invest into my own house (homeloan)',
            'tax': 'Reduce my taxes',
            'general': 'Other topic (describe below)'
        };
        payload.fields.push({
            objectTypeId: "0-1",
            name: "what_products_services_are_you_interested_in_",
            value: interestMapping[formData.interest] || formData.interest
        });
    }

    if (formData.message) {
        payload.fields.push({ objectTypeId: "0-1", name: "message", value: formData.message });
    }

    console.log('Sending to HubSpot:', payload);

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(function(response) {
        console.log('HubSpot response status:', response.status);
        return response.json().then(function(data) {
            if (!response.ok) {
                console.error('HubSpot error details:', data);
                throw new Error('HubSpot API error: ' + response.status + ' - ' + JSON.stringify(data));
            }
            console.log('HubSpot response:', data);
            return data;
        });
    });
}

function sendNotificationEmail(formData) {
    console.log('Sending notification email...');
    fetch('https://formsubmit.co/ajax/michael.brusis@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            _subject: 'New Bharat Finance Signup: ' + formData.firstName + ' ' + formData.lastName,
            _template: 'table',
            Name: formData.firstName + ' ' + formData.lastName,
            Email: formData.email,
            Phone: formData.phone,
            Interest: formData.interest || 'Not specified',
            Message: formData.message || 'No message'
        })
    })
    .then(function(response) {
        console.log('FormSubmit response status:', response.status);
        return response.json();
    })
    .then(function(data) {
        console.log('FormSubmit response:', data);
    })
    .catch(function(err) {
        console.error('Notification email error:', err);
    });
}
