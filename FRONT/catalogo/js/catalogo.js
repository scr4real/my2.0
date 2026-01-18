document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`;
    const grid = document.getElementById('products-grid');
    
    if (grid) {
        let state = {
            allProducts: [], filteredProducts: [], currentPage: 1, itemsPerPage: 12, currentView: 'grid',
            filters: { search: '', brand: 'all', category: 'all', price: 'all', sort: 'featured' },
            isLoading: false
        };

        const elements = {
            grid, 
            paginationContainer: document.getElementById('pagination-controls') || document.querySelector('.catalog-footer'),
            searchInput: document.getElementById('searchInput'), 
            searchClear: document.getElementById('searchClear'),
            brandFilter: document.getElementById('brandFilter'), 
            categoryFilter: document.getElementById('categoryFilter'),
            priceFilter: document.getElementById('priceFilter'), 
            sortFilter: document.getElementById('sortFilter'),
            activeFilters: document.getElementById('activeFilters'), 
            loadingState: document.getElementById('loadingState'),
            emptyState: document.getElementById('emptyState'),
            clearFiltersBtn: document.getElementById('clearFiltersBtn'),
            viewButtons: document.querySelectorAll('.view-btn')
        };

        const utils = {
            debounce: (func, wait) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); }; },
            formatPrice: (price) => `R$ ${Number(price).toFixed(2).replace('.', ',')}`,
            getImageUrl: (path) => !path ? 'FRONT/assets/images/placeholder.jpg' : (path.startsWith('http') ? path : `${BASE_URL}/${path.startsWith('/') ? path.substring(1) : path}`),
            generateSkeletons: (count) => Array.from({ length: count }).map((_, i) => `<div class="product-card skeleton-card"><div class="product-image-wrapper skeleton"></div><div class="product-info"><div class="skeleton" style="height:20px"></div><div class="skeleton" style="height:20px;width:50%;margin-top:10px"></div></div></div>`).join(''),
            parsePriceRange: (range) => { if (range === 'all') return { min: 0, max: Infinity }; const [min, max] = range.split('-').map(Number); return { min, max: max || Infinity }; }
        };

        const filterSystem = {
            applyFilters: () => {
                let filtered = [...state.allProducts];
                if (state.filters.search) filtered = filtered.filter(p => p.nome.toLowerCase().includes(state.filters.search.toLowerCase()) || p.marca?.nome.toLowerCase().includes(state.filters.search.toLowerCase()));
                if (state.filters.brand !== 'all') filtered = filtered.filter(p => p.marca?.nome === state.filters.brand);
                if (state.filters.category !== 'all') filtered = filtered.filter(p => p.categoria?.nome === state.filters.category);
                if (state.filters.price !== 'all') { const range = utils.parsePriceRange(state.filters.price); filtered = filtered.filter(p => p.preco >= range.min && p.preco <= range.max); }
                
                if (state.filters.sort === 'price-asc') filtered.sort((a, b) => a.preco - b.preco);
                else if (state.filters.sort === 'price-desc') filtered.sort((a, b) => b.preco - a.preco);
                else if (state.filters.sort === 'newest') filtered.sort((a, b) => new Date(b.createdAt||0) - new Date(a.createdAt||0));

                state.filteredProducts = filtered;
                state.currentPage = 1; 
                filterSystem.updateActiveFilters();
                filterSystem.updateFormElements();
                renderSystem.renderProducts();
            },
            updateActiveFilters: () => {
                if(!elements.activeFilters) return;
                elements.activeFilters.innerHTML = '';
                if(state.filters.search) filterSystem.addTag('search', `Busca: ${state.filters.search}`);
                if(state.filters.brand !== 'all') filterSystem.addTag('brand', `Marca: ${state.filters.brand}`);
                if(state.filters.price !== 'all') filterSystem.addTag('price', 'Preço');
            },
            addTag: (type, label) => {
                elements.activeFilters.innerHTML += `<div class="filter-tag"><span>${label}</span><button onclick="window.catalogRemoveFilter('${type}')"><i class="fas fa-times"></i></button></div>`;
            },
            removeFilter: (type) => {
                state.filters[type] = (type === 'sort') ? 'featured' : (type === 'search' ? '' : 'all');
                if(elements.searchInput && type === 'search') elements.searchInput.value = '';
                filterSystem.applyFilters();
            },
            updateFormElements: () => {
                if(elements.searchInput) elements.searchInput.value = state.filters.search;
                if(elements.brandFilter) elements.brandFilter.value = state.filters.brand;
                if(elements.searchClear) elements.searchClear.style.display = state.filters.search ? 'block' : 'none';
            },
            clearAllFilters: () => {
                state.filters = { search: '', brand: 'all', category: 'all', price: 'all', sort: 'featured' };
                filterSystem.applyFilters();
            }
        };

        const renderSystem = {
            renderProducts: () => {
                if (state.isLoading && state.filteredProducts.length === 0) {
                    elements.grid.innerHTML = utils.generateSkeletons(12);
                    if(elements.loadingState) elements.loadingState.style.display = 'block';
                    if(elements.emptyState) elements.emptyState.style.display = 'none';
                    if(elements.paginationContainer) elements.paginationContainer.innerHTML = '';
                    return;
                }
                
                if(elements.loadingState) elements.loadingState.style.display = 'none';
                
                const start = (state.currentPage - 1) * state.itemsPerPage;
                const productsToShow = state.filteredProducts.slice(start, start + state.itemsPerPage);
                
                if (productsToShow.length === 0) {
                    elements.grid.innerHTML = '';
                    if(elements.emptyState) elements.emptyState.style.display = 'block';
                    if(elements.paginationContainer) elements.paginationContainer.innerHTML = '';
                    return;
                }
                
                if(elements.emptyState) elements.emptyState.style.display = 'none';
                
                elements.grid.innerHTML = productsToShow.map((product, index) => renderSystem.createProductCard(product, index)).join('');
                renderSystem.renderPagination();
            },

            renderPagination: () => {
                if (!elements.paginationContainer) return;
                const totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
                if (totalPages <= 1) { elements.paginationContainer.innerHTML = ''; return; }

                let html = `<div class="pagination-wrapper"><button class="page-btn" ${state.currentPage===1?'disabled':''} onclick="window.catalogPage(${state.currentPage-1})"><i class="fas fa-chevron-left"></i></button>`;
                let start = Math.max(1, state.currentPage - 2);
                let end = Math.min(totalPages, start + 4);
                for (let i = start; i <= end; i++) html += `<button class="page-btn ${i===state.currentPage?'active':''}" onclick="window.catalogPage(${i})">${i}</button>`;
                html += `<button class="page-btn" ${state.currentPage===totalPages?'disabled':''} onclick="window.catalogPage(${state.currentPage+1})"><i class="fas fa-chevron-right"></i></button></div>`;
                elements.paginationContainer.innerHTML = html;
            },

            createProductCard: (product, index) => {
                const hasDiscount = product.precoOriginal > product.preco;
                const discountPercent = hasDiscount ? Math.round((1 - product.preco / product.precoOriginal) * 100) : 0;
                const isCritical = index < 6; // OTIMIZAÇÃO DE CARREGAMENTO
                const loadingAttr = isCritical ? 'eager' : 'lazy';
                const priorityAttr = isCritical ? 'high' : 'auto';

                return `
                    <div class="product-card" data-id="${product.id}">
                        <div class="product-badges">
                            ${product.isNew ? '<span class="badge new">Novo</span>' : ''}
                            ${hasDiscount ? `<span class="badge sale">-${discountPercent}%</span>` : ''}
                        </div>
                        <a href="/FRONT/produto/HTML/produto.html?id=${product.id}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${utils.getImageUrl(product.imagemUrl)}" 
                                     alt="${product.nome}"
                                     loading="${loadingAttr}"
                                     fetchpriority="${priorityAttr}"
                                     decoding="async">
                            </div>
                        </a>
                        <div class="product-info">
                            <h3 class="product-name">${product.nome}</h3>
                            <div class="product-shipping-tag"><i class="fas fa-truck"></i><span>Frete Grátis</span></div>
                            <div class="product-price">
                                <span class="current-price">${utils.formatPrice(product.preco)}</span>
                                ${hasDiscount ? `<span class="original-price">${utils.formatPrice(product.precoOriginal)}</span>` : ''}
                            </div>
                        </div>
                        <div class="product-footer">
                            <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Comprar</button>
                        </div>
                    </div>`;
            }
        };

        window.catalogPage = p => { state.currentPage = p; renderSystem.renderProducts(); grid.scrollIntoView({behavior:'smooth', block:'start'}); };
        window.catalogRemoveFilter = k => filterSystem.removeFilter(k);

        const init = {
            setup: () => {
                if(elements.searchInput) elements.searchInput.addEventListener('input', utils.debounce((e) => { state.filters.search = e.target.value.trim(); filterSystem.applyFilters(); }, 300));
                if(elements.searchClear) elements.searchClear.addEventListener('click', () => { state.filters.search = ''; elements.searchInput.value = ''; filterSystem.applyFilters(); });
                ['brandFilter', 'categoryFilter', 'priceFilter', 'sortFilter'].forEach(id => {
                    if(elements[id]) elements[id].addEventListener('change', (e) => { state.filters[id.replace('Filter', '')] = e.target.value; filterSystem.applyFilters(); });
                });
                if(elements.clearFiltersBtn) elements.clearFiltersBtn.addEventListener('click', filterSystem.clearAllFilters);
                grid.addEventListener('click', e => {
                    if(e.target.closest('.add-to-cart-btn')) {
                        e.preventDefault();
                        const id = e.target.closest('.add-to-cart-btn').dataset.productId;
                        if(window.quickViewApp) window.quickViewApp.openQuickView(id);
                    }
                });
            },
            fetch: async () => {
                state.isLoading = true;
                elements.grid.innerHTML = utils.generateSkeletons(12);
                try {
                    const res = await axios.get(API_URL);
                    state.allProducts = res.data.map(product => ({ 
                        ...product, 
                        isNew: Math.random() > 0.8, 
                        precoOriginal: product.preco * 1.15,
                        marca: product.marca || { nome: 'Japa' },
                        categoria: product.categoria || { nome: 'Geral' }
                    }));
                    filterSystem.applyFilters();
                } catch (error) { 
                    console.error(error);
                    elements.grid.innerHTML = '<div class="error-state">Erro ao carregar produtos.</div>'; 
                } 
                finally { 
                    state.isLoading = false; 
                    if(elements.loadingState) elements.loadingState.style.display = 'none';
                }
            },
            start: () => { init.setup(); init.fetch(); }
        };

        init.start();
    }
});