// Blog System - Reads articles from data/articles.json
class BlogSystem {
    constructor() {
        this.articles = [];
        this.loaded = false;
    }

    async loadArticles() {
        if (this.loaded) return this.articles;
        try {
            const response = await fetch('data/articles.json');
            if (!response.ok) throw new Error('Failed to load articles');
            this.articles = await response.json();
            this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.loaded = true;
            return this.articles;
        } catch (error) {
            console.error('Error loading articles:', error);
            return [];
        }
    }

    getCategories() {
        const cats = new Set(this.articles.map(a => a.category));
        return Array.from(cats).sort();
    }

    filterByCategory(category) {
        if (!category || category === 'All') return this.articles;
        return this.articles.filter(a => a.category === category);
    }

    getArticleById(id) {
        return this.articles.find(a => a.id === id);
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    renderArticleCard(article, featured) {
        if (featured) {
            return `
                <a href="article.html?id=${article.id}" class="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-oatmeal group">
                    <div class="h-80 lg:h-auto overflow-hidden">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    </div>
                    <div class="p-12 lg:p-20 flex flex-col justify-center">
                        <span class="text-accent text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">${article.category}</span>
                        <h2 class="font-display text-3xl md:text-4xl mb-6 leading-tight group-hover:text-primary transition-colors">${article.title}</h2>
                        <p class="text-neutral-600 leading-relaxed mb-6">${article.excerpt}</p>
                        <div class="flex items-center gap-4">
                            <time class="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">${this.formatDate(article.date)}</time>
                        </div>
                    </div>
                </a>
            `;
        }

        return `
            <a href="article.html?id=${article.id}" class="flex flex-col group">
                <div class="aspect-[1/1] overflow-hidden mb-6">
                    <img src="${article.image}" alt="${article.title}" class="object-cover w-full h-full transition-all duration-700 group-hover:scale-105">
                </div>
                <h3 class="font-sans text-lg font-medium leading-snug mb-4 group-hover:text-accent transition-colors">
                    ${article.title}
                </h3>
                <p class="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-3">${article.excerpt}</p>
                <div class="mt-auto">
                    <div class="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                        ${article.tags.map(tag => `<span class="text-[9px] tracking-widest uppercase text-neutral-400 font-bold">${tag}</span>`).join('')}
                    </div>
                    <time class="text-[9px] tracking-widest uppercase text-neutral-400 font-medium">${this.formatDate(article.date)}</time>
                </div>
            </a>
        `;
    }

    renderCategoryFilter(categories, activeCategory) {
        return `
            <div class="flex flex-wrap justify-center gap-3 mb-16">
                <button data-category="All" class="category-btn px-6 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold border transition-all duration-300 ${
                    activeCategory === 'All' ? 'bg-primary text-white border-primary' : 'border-neutral-300 text-neutral-600 hover:border-accent hover:text-accent'
                }">All</button>
                ${categories.map(cat => `
                    <button data-category="${cat}" class="category-btn px-6 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold border transition-all duration-300 ${
                        activeCategory === cat ? 'bg-primary text-white border-primary' : 'border-neutral-300 text-neutral-600 hover:border-accent hover:text-accent'
                    }">${cat}</button>
                `).join('')}
            </div>
        `;
    }

    renderFullArticle(article) {
        return `
            <article class="max-w-3xl mx-auto">
                <div class="mb-12">
                    <a href="insights.html" class="inline-flex items-center text-sm text-neutral-400 hover:text-accent transition-colors mb-8 group">
                        <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to Insights
                    </a>
                    <div class="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                        <span class="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">${article.category}</span>
                        <time class="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">${this.formatDate(article.date)}</time>
                    </div>
                    <h1 class="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">${article.title}</h1>
                    <p class="text-xl text-neutral-500 leading-relaxed font-light italic">${article.excerpt}</p>
                </div>

                <div class="aspect-[16/9] overflow-hidden mb-16">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover">
                </div>

                <div class="prose-content">
                    ${article.content}
                </div>

                <div class="mt-16 pt-8 border-t border-neutral-200 flex flex-wrap gap-3">
                    ${article.tags.map(tag => `<span class="px-4 py-1.5 border border-neutral-200 text-[10px] tracking-widest uppercase text-neutral-500 font-medium">${tag}</span>`).join('')}
                </div>
            </article>
        `;
    }
}

// Make globally available
window.BlogSystem = BlogSystem;
