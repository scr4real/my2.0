document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`;
    const grid = document.getElementById('products-grid');
    
    if (grid) {
        let state = {
            allProducts: [], filteredProducts: [], currentPage: 1, itemsPerPage: 12, currentView: 'grid',
            filters: { search: '', brand: 'all', category: 'all', price: 'all', sort: 'featured' },
            isLoading: false
        };

        const elements = {
            grid, paginationContainer: document.getElementById('pagination-controls') || document.querySelector('.catalog-footer'),
            searchInput: document.getElementById('searchInput'), searchClear: document.getElementById('searchClear'),
            brandFilter: document.getElementById('brandFilter'), categoryFilter: document.getElementById('categoryFilter'),
            priceFilter: document.getElementById('priceFilter'), sortFilter: document.getElementById('sortFilter'),
            activeFilters: document.getElementById('activeFilters'), loadingState: document.getElementById('loadingState'),
            emptyState: document.getElementById('emptyState'), clearFiltersBtn: document.getElementById('clearFiltersBtn'),
            viewButtons: document.querySelectorAll('.view-btn')
        };

        const quickViewElements = { overlay: document.getElementById('quickViewModal'), content: document.getElementById('quickViewContent'), closeBtn: document.getElementById('closeQuickViewBtn') };
        let quickViewProduct = null, selectedSize = null;

        const showNotification = (message, type = 'success') => {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `<div class="notification-content"><i class="fas fa-info"></i><span>${message}</span></div>`;
            document.body.appendChild(notification);
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => { notification.classList.remove('show'); setTimeout(() => notification.remove(), 300); }, 3000);
        };

        const utils = {
            debounce: (func, wait) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); }; },
            formatPrice: (price) => `R$ ${price.toFixed(2).replace('.', ',')}`,
            getImageUrl: (path) => !path ? '/assets/images/placeholder.jpg' : (path.startsWith('http') ? path : `${BASE_URL}/${path.startsWith('/') ? path.substring(1) : path}`),
            generateSkeletons: (count) => Array.from({ length: count }).map((_, i) => `<div class="product-card skeleton-card"><div class="product-image-wrapper skeleton"></div><div class="product-info"><div class="skeleton" style="height:20px"></div><div class="skeleton" style="height:20px;width:50%;margin-top:10px"></div></div></div>`).join(''),
            parsePriceRange: (range) => { if (range === 'all') return { min: 0, max: Infinity }; const [min, max] = range.split('-').map(Number); return { min, max }; }
        };

        const filterSystem = {
            applyFilters: () => {
                let filtered = [...state.allProducts];
                if (state.filters.search) filtered = filtered.filter(p => p.nome.toLowerCase().includes(state.filters.search.toLowerCase()));
                if (state.filters.brand !== 'all') filtered = filtered.filter(p => p.marca.nome === state.filters.brand);
                if (state.filters.category !== 'all') filtered = filtered.filter(p => p.categoria === state.filters.category);
                if (state.filters.price !== 'all') { const range = utils.parsePriceRange(state.filters.price); filtered = filtered.filter(p => p.preco >= range.min && p.preco <= range.max); }
                
                if (state.filters.sort === 'price-asc') filtered.sort((a, b) => a.preco - b.preco);
                else if (state.filters.sort === 'price-desc') filtered.sort((a, b) => b.preco - a.preco);
                else if (state.filters.sort === 'newest') filtered.sort((a, b) => new Date(b.createdAt||0) - new Date(a.createdAt||0));

                state.filteredProducts = filtered;
                state.currentPage = 1; 
                filterSystem.updateActiveFilters();
                filterSystem.updateFormElements();
            },
            updateActiveFilters: () => {
                elements.activeFilters.innerHTML = '';
                if(state.filters.search) filterSystem.addTag('search', `Busca: ${state.filters.search}`);
                if(state.filters.brand !== 'all') filterSystem.addTag('brand', `Marca: ${state.filters.brand}`);
                if(state.filters.price !== 'all') filterSystem.addTag('price', 'Preço');
            },
            addTag: (type, label) => {
                elements.activeFilters.innerHTML += `<div class="filter-tag"><span>${label}</span><button onclick="catalogApp.removeFilter('${type}')"><i class="fas fa-times"></i></button></div>`;
            },
            removeFilter: (type) => {
                state.filters[type] = (type === 'price' || type === 'brand' || type === 'category') ? 'all' : '';
                if(type === 'sort') state.filters.sort = 'featured';
                filterSystem.applyFilters();
                renderSystem.renderProducts();
            },
            updateFormElements: () => {
                elements.searchInput.value = state.filters.search;
                elements.brandFilter.value = state.filters.brand;
                elements.searchClear.style.display = state.filters.search ? 'block' : 'none';
            },
            clearAllFilters: () => {
                state.filters = { search: '', brand: 'all', category: 'all', price: 'all', sort: 'featured' };
                filterSystem.applyFilters();
                renderSystem.renderProducts();
            }
        };

        const renderSystem = {
            renderProducts: () => {
                const start = (state.currentPage - 1) * state.itemsPerPage;
                const productsToShow = state.filteredProducts.slice(start, start + state.itemsPerPage);
                
                if (productsToShow.length === 0) {
                    elements.grid.innerHTML = '';
                    elements.emptyState.style.display = 'block';
                    if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
                    return;
                }
                elements.emptyState.style.display = 'none';
                
                // OTIMIZAÇÃO: Concatena string HTML de uma vez para evitar reflows
                elements.grid.innerHTML = productsToShow.map((product, index) => renderSystem.createProductCard(product, index)).join('');
                renderSystem.renderPagination();
            },

            renderPagination: () => {
                if (!elements.paginationContainer) return;
                const totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
                if (totalPages <= 1) { elements.paginationContainer.innerHTML = ''; return; }

                let html = `<div class="pagination-wrapper"><button class="page-btn" ${state.currentPage===1?'disabled':''} onclick="catalogApp.renderSystem.goToPage(${state.currentPage-1})"><i class="fas fa-chevron-left"></i></button>`;
                let start = Math.max(1, state.currentPage - 2);
                let end = Math.min(totalPages, start + 4);
                for (let i = start; i <= end; i++) html += `<button class="page-btn ${i===state.currentPage?'active':''}" onclick="catalogApp.renderSystem.goToPage(${i})">${i}</button>`;
                html += `<button class="page-btn" ${state.currentPage===totalPages?'disabled':''} onclick="catalogApp.renderSystem.goToPage(${state.currentPage+1})"><i class="fas fa-chevron-right"></i></button></div>`;
                elements.paginationContainer.innerHTML = html;
            },

            goToPage: (page) => {
                if (page < 1 || page > Math.ceil(state.filteredProducts.length / state.itemsPerPage)) return;
                state.currentPage = page;
                renderSystem.renderProducts();
                elements.grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            },
            
            createProductCard: (product, index) => {
                const hasDiscount = product.precoOriginal > product.preco;
                const discountPercent = hasDiscount ? Math.round((1 - product.preco / product.precoOriginal) * 100) : 0;
                
                // === OTIMIZAÇÃO: 6 Primeiras imagens carregam IMEDIATAMENTE (Eager) ===
                const isCritical = index < 6;
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

        const quickViewSystem = {
            openQuickView: async (productId) => {
                const product = state.allProducts.find(p => p.id === parseInt(productId));
                if (!product) return;
                quickViewProduct = product;
                quickViewElements.overlay.classList.add('active');
                quickViewElements.content.innerHTML = '<div style="padding:50px;text-align:center"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
                
                // Renderiza direto sem esperar timeout artificial
                const details = { ...product, sizes: { '38':5, '39':5, '40':5, '41':5, '42':0 } };
                quickViewSystem.render(details);
            },
            render: (product) => {
                quickViewElements.content.innerHTML = `
                    <div class="quickview-gallery"><img src="${utils.getImageUrl(product.imagemUrl)}" style="width:100%;height:auto;object-fit:contain"></div>
                    <div class="quickview-details">
                        <h2>${product.nome}</h2>
                        <div class="quickview-price">${utils.formatPrice(product.preco)}</div>
                        <div class="quickview-size-options">${Object.keys(product.sizes).map(s => `<div class="quickview-size-option" onclick="catalogApp.selectSize(this, '${s}')">${s}</div>`).join('')}</div>
                        <button class="btn btn-primary" id="qvAddBtn" disabled onclick="catalogApp.addToCart()">Adicionar</button>
                    </div>`;
            },
            closeQuickView: () => { quickViewElements.overlay.classList.remove('active'); }
        };

        const init = {
            setup: () => {
                elements.searchInput.addEventListener('input', utils.debounce((e) => { state.filters.search = e.target.value.trim(); filterSystem.applyFilters(); }, 300));
                elements.searchClear.addEventListener('click', () => { state.filters.search = ''; elements.searchInput.value = ''; filterSystem.applyFilters(); });
                ['brandFilter', 'categoryFilter', 'priceFilter', 'sortFilter'].forEach(id => elements[id].addEventListener('change', (e) => { state.filters[id.replace('Filter', '')] = e.target.value; filterSystem.applyFilters(); }));
                if(elements.clearFiltersBtn) elements.clearFiltersBtn.addEventListener('click', filterSystem.clearAllFilters);
                if(quickViewElements.closeBtn) quickViewElements.closeBtn.addEventListener('click', quickViewSystem.closeQuickView);
                grid.addEventListener('click', e => {
                    if(e.target.closest('.add-to-cart-btn')) {
                        e.preventDefault();
                        const id = e.target.closest('.add-to-cart-btn').dataset.productId;
                        quickViewSystem.openQuickView(id);
                    }
                });
            },
            fetch: async () => {
                state.isLoading = true;
                elements.grid.innerHTML = utils.generateSkeletons(12);
                try {
                    const response = await axios.get(API_URL);
                    state.allProducts = response.data.map(product => ({ ...product, isNew: Math.random() > 0.8, precoOriginal: product.preco * 1.2 }));
                    filterSystem.applyFilters();
                } catch (error) { elements.grid.innerHTML = '<div class="error-state">Erro.</div>'; } 
                finally { state.isLoading = false; }
            },
            start: () => {
                init.setup();
                init.fetch();
                window.catalogApp = { 
                    renderSystem, quickViewSystem, removeFilter: filterSystem.removeFilter,
                    selectSize: (el, s) => { document.querySelectorAll('.quickview-size-option').forEach(o=>o.classList.remove('selected')); el.classList.add('selected'); selectedSize = s; document.getElementById('qvAddBtn').disabled = false; },
                    addToCart: () => { if(selectedSize && window.addToCart) { window.addToCart({ id: quickViewProduct.id, name: quickViewProduct.nome, price: quickViewProduct.preco, image: utils.getImageUrl(quickViewProduct.imagemUrl), size: selectedSize, quantity: 1 }); quickViewSystem.closeQuickView(); } }
                };
            }
        };

        init.start();
    }
});