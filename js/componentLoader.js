// Component Loader - Dynamically loads HTML components
class ComponentLoader {
    constructor() {
        // Cache-busting version - update this when deploying changes
        this.version = '20260226';
        this.components = [
            { id: 'hero-container', file: 'components/hero.html' },
            { id: 'intro-container', file: 'components/intro.html' },
            { id: 'team-container', file: 'components/team.html' },
            { id: 'expertise-banner-container', file: 'components/expertise-banner.html' },
            { id: 'news-container', file: 'components/news.html' },
            { id: 'testimonials-container', file: 'components/testimonials.html' },
            { id: 'partners-container', file: 'components/partners.html' },
            { id: 'contact-container', file: 'components/contact.html' },
            { id: 'footer-container', file: 'components/footer.html' }
        ];
    }

    async loadComponent(id, file) {
        try {
            const response = await fetch(file + '?v=' + this.version);
            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }
            const html = await response.text();
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${file}:`, error);
        }
    }

    async loadHeader() {
        try {
            const response = await fetch('components/header.html?v=' + this.version);
            if (!response.ok) {
                throw new Error('Failed to load header');
            }
            const html = await response.text();
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = html;
            }

            // On the landing page (has hero video), start transparent and transition on scroll
            const heroSection = document.querySelector('.hero-section');
            const header = document.querySelector('.header');
            if (heroSection && header) {
                header.classList.add('header-transparent');

                window.addEventListener('scroll', function() {
                    // Switch to frosted glass once scrolled past the hero
                    if (window.scrollY > 80) {
                        header.classList.remove('header-transparent');
                    } else {
                        header.classList.add('header-transparent');
                    }
                });
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    async loadAll() {
        // Load all components in parallel
        const loadPromises = this.components.map(component =>
            this.loadComponent(component.id, component.file)
        );

        await Promise.all(loadPromises);

        // Load header after hero is loaded
        await this.loadHeader();

    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    const loader = new ComponentLoader();
    await loader.loadAll();

    // Initialize other scripts after components are loaded
    if (window.initializeApp) {
        window.initializeApp();
    }
});
