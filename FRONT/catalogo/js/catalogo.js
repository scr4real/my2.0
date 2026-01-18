document.addEventListener('DOMContentLoaded', () => {
    // URL Base robusta para Localhost e Produção
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
        
    const API_URL = `${BASE_URL}/api/produtos`;
    const grid = document.getElementById('products-grid');
    
    if (grid) {
        // ===== ESTADO GLOBAL =====
        let state = {
            allProducts: [],
            filteredProducts: [],
            currentPage: 1,
            itemsPerPage: 12,
            currentView: 'grid',
            filters: {
                search: '',
                brand: 'all',
                category: 'all',
                price: 'all',
                sort: 'featured'
            },
            isLoading: false
        };

        // ===== ELEMENTOS DO DOM =====
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
            loadingState: document.getElementById('loadingState'), // Pode ser null
            emptyState: document.getElementById('emptyState'),     // Pode ser null
            clearFiltersBtn: document.getElementById('clearFiltersBtn'),
            viewButtons: document.querySelectorAll('.view-btn')
        };

        // ===== QUICK VIEW MODAL =====
        const quickViewElements = {
            overlay: document.getElementById('quickViewModal'),
            content: document.getElementById('quickViewContent'),
            closeBtn: document.getElementById('closeQuickViewBtn')
        };

        let quickViewProduct = null;
        let selectedSize = null;

        // ===== SISTEMA DE NOTIFICAÇÕES =====
        const showNotification = (message, type = 'success') => {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
                    <span>${message}</span>
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        };

        // ===== UTILITÁRIOS =====
        const utils = {
            debounce: (func, wait) => {
                let timeout;
                return function (...args) {
                    const later = () => { clearTimeout(timeout); func(...args); };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);  
                };
            },
            formatPrice: (price) => `R$ ${Number(price).toFixed(2).replace('.', ',')}`,
            getImageUrl: (path) => {
                if (!path) return 'FRONT/assets/images/placeholder-product.jpg';
                if (path.startsWith('http')) return path;
                const cleanPath = path.startsWith('/') ? path.substring(1) : path;
                return `${BASE_URL}/${cleanPath}`; 
            },
            generateSkeletons: (count) => {
                return Array.from({ length: count }).map((_, index) => `
                    <div class="product-card skeleton-card" style="--delay: ${index}">
                        <div class="product-image-wrapper skeleton"></div>
                        <div class="product-info">
                            <div class="skeleton" style="height: 1rem; width: 60%; margin-bottom: 0.5rem;"></div>
                            <div class="skeleton" style="height: 1rem; width: 80%;"></div>
                            <div class="skeleton" style="height: 2rem; margin-top: 1rem;"></div>
                        </div>
                    </div>
                `).join('');
            },
            parsePriceRange: (range) => {
                if (range === 'all') return { min: 0, max: Infinity };
                const [min, max] = range.split('-').map(Number);
                return { min, max: max || Infinity };
            }
        };

        // ===== SISTEMA DE FILTROS =====
        const filterSystem = {
            applyFilters: () => {
                let filtered = [...state.allProducts];
                
                if (state.filters.search) {
                    const term = state.filters.search.toLowerCase();
                    filtered = filtered.filter(p => 
                        p.nome.toLowerCase().includes(term) || 
                        p.marca?.nome.toLowerCase().includes(term) || 
                        p.descricao?.toLowerCase().includes(term)
                    );
                }
                if (state.filters.brand !== 'all') filtered = filtered.filter(p => p.marca?.nome === state.filters.brand);
                if (state.filters.category !== 'all') filtered = filtered.filter(p => p.categoria?.nome === state.filters.category);
                if (state.filters.price !== 'all') {
                    const range = utils.parsePriceRange(state.filters.price);
                    filtered = filtered.filter(p => p.preco >= range.min && p.preco <= range.max);
                }
                
                filtered = filterSystem.sortProducts(filtered);
                state.filteredProducts = filtered;
                state.currentPage = 1; 
                filterSystem.updateActiveFilters();
                filterSystem.updateFormElements();
                renderSystem.renderProducts(); // Renderiza após filtrar
            },
            
            sortProducts: (products) => {
                switch (state.filters.sort) {
                    case 'price-asc': return products.sort((a, b) => a.preco - b.preco);
                    case 'price-desc': return products.sort((a, b) => b.preco - a.preco);
                    case 'name-asc': return products.sort((a, b) => a.nome.localeCompare(b.nome));
                    case 'newest': return products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                    default: return products;
                }
            },

            updateActiveFilters: () => {
                if (!elements.activeFilters) return;
                elements.activeFilters.innerHTML = '';
                const addTag = (key, label) => {
                    elements.activeFilters.innerHTML += `
                        <div class="filter-tag">
                            <span>${label}</span>
                            <button onclick="window.catalogApp.removeFilter('${key}')"><i class="fas fa-times"></i></button>
                        </div>`;
                };

                if (state.filters.search) addTag('search', `Busca: "${state.filters.search}"`);
                if (state.filters.brand !== 'all') addTag('brand', `Marca: ${state.filters.brand}`);
                if (state.filters.category !== 'all') addTag('category', `Cat: ${state.filters.category}`);
                if (state.filters.price !== 'all') addTag('price', 'Preço');
            },

            removeFilter: (type) => {
                state.filters[type] = (type === 'sort') ? 'featured' : (type === 'search' ? '' : 'all');
                filterSystem.applyFilters();
            },

            updateFormElements: () => {
                if(elements.searchInput) elements.searchInput.value = state.filters.search;
                if(elements.brandFilter) elements.brandFilter.value = state.filters.brand;
                if(elements.categoryFilter) elements.categoryFilter.value = state.filters.category;
                if(elements.priceFilter) elements.priceFilter.value = state.filters.price;
                if(elements.sortFilter) elements.sortFilter.value = state.filters.sort;
                if(elements.searchClear) elements.searchClear.style.display = state.filters.search ? 'block' : 'none';
            },

            clearAllFilters: () => {
                state.filters = { search: '', brand: 'all', category: 'all', price: 'all', sort: 'featured' };
                filterSystem.applyFilters();
            }
        };

        // ===== SISTEMA DE RENDERIZAÇÃO =====
        const renderSystem = {
            renderProducts: () => {
                // Se estiver carregando, mostra skeletons
                if (state.isLoading && state.filteredProducts.length === 0) {
                    elements.grid.innerHTML = utils.generateSkeletons(12);
                    if (elements.loadingState) elements.loadingState.style.display = 'block';
                    if (elements.emptyState) elements.emptyState.style.display = 'none';
                    if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
                    return;
                }
                
                // Remove estado de loading
                if (elements.loadingState) elements.loadingState.style.display = 'none';
                
                const start = (state.currentPage - 1) * state.itemsPerPage;
                const productsToShow = state.filteredProducts.slice(start, start + state.itemsPerPage);
                
                // Se não houver produtos após filtro
                if (productsToShow.length === 0) {
                    elements.grid.innerHTML = '';
                    if (elements.emptyState) elements.emptyState.style.display = 'block';
                    if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
                    return;
                }
                
                if (elements.emptyState) elements.emptyState.style.display = 'none';
                
                // Renderiza HTML
                elements.grid.innerHTML = productsToShow.map((product, index) => 
                    renderSystem.createProductCard(product, index)
                ).join('');
                
                renderSystem.renderPagination();
                renderSystem.addProductEventListeners();
            },

            renderPagination: () => {
                if (!elements.paginationContainer) return;
                const totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
                
                if (totalPages <= 1) {
                    elements.paginationContainer.innerHTML = '';
                    return;
                }

                let html = `<div class="pagination-wrapper">
                    <button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} onclick="window.catalogApp.renderSystem.goToPage(${state.currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;

                let start = Math.max(1, state.currentPage - 2);
                let end = Math.min(totalPages, start + 4);
                if (end - start < 4) start = Math.max(1, end - 4);

                for (let i = start; i <= end; i++) {
                    html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" onclick="window.catalogApp.renderSystem.goToPage(${i})">${i}</button>`;
                }

                html += `<button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="window.catalogApp.renderSystem.goToPage(${state.currentPage + 1})"><i class="fas fa-chevron-right"></i></button></div>`;
                
                elements.paginationContainer.innerHTML = html;
            },

            goToPage: (page) => {
                if (page < 1 || page > Math.ceil(state.filteredProducts.length / state.itemsPerPage)) return;
                state.currentPage = page;
                renderSystem.renderProducts();
                elements.grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            },
            
            createProductCard: (product, index) => {
                const hasDiscount = product.precoOriginal && product.precoOriginal > product.preco;
                const discountPercent = hasDiscount ? Math.round((1 - product.preco / product.precoOriginal) * 100) : 0;
                
                // OTIMIZAÇÃO: 6 Primeiras imagens carregam RÁPIDO
                const isCritical = index < 6;
                const loadingAttr = isCritical ? 'eager' : 'lazy';
                const priorityAttr = isCritical ? 'high' : 'auto';

                return `
                    <div class="product-card" data-id="${product.id}" style="--delay: ${index}">
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
                            <button class="btn btn-primary add-to-cart-btn" 
                                    data-product-id="${product.id}" 
                                    data-product-name="${product.nome}"
                                    ${product.estoque <= 0 ? 'disabled' : ''}>
                                <span class="btn-text">${product.estoque <= 0 ? 'Esgotado' : 'Comprar'}</span>
                            </button>
                        </div>
                    </div>
                `;
            },
            
            addProductEventListeners: () => {
                // Event Delegation no Grid para melhor performance
            }
        };

        // Event Delegation Global para o Grid (Cart & Links)
        elements.grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart-btn');
            if (btn && !btn.disabled) {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.dataset.productId;
                if (window.quickViewApp) window.quickViewApp.openQuickView(id);
                return;
            }
        });

        // ===== SISTEMA QUICK VIEW (Reduzido para integração) =====
        // A lógica pesada está no main.js, aqui apenas chamamos se necessário
        
        // ===== SISTEMA DE VIEW =====
        const viewSystem = {
            switchView: (v) => {
                state.currentView = v;
                elements.grid.setAttribute('data-view', v);
                elements.viewButtons.forEach(b => b.classList.toggle('active', b.dataset.view === v));
            },
            loadViewPreference: () => viewSystem.switchView('grid')
        };

        // ===== INIT =====
        const init = {
            setupEventListeners: () => {
                if(elements.searchInput) elements.searchInput.addEventListener('input', utils.debounce((e) => {
                    state.filters.search = e.target.value.trim();
                    filterSystem.applyFilters();
                }, 300));
                
                if(elements.searchClear) elements.searchClear.addEventListener('click', () => {
                    state.filters.search = '';
                    elements.searchInput.value = '';
                    filterSystem.applyFilters();
                });

                ['brandFilter', 'categoryFilter', 'priceFilter', 'sortFilter'].forEach(id => {
                    if(elements[id]) elements[id].addEventListener('change', (e) => {
                        state.filters[id.replace('Filter', '')] = e.target.value;
                        filterSystem.applyFilters();
                    });
                });

                if (elements.viewButtons) elements.viewButtons.forEach(btn => btn.addEventListener('click', () => viewSystem.switchView(btn.dataset.view)));
                if (elements.clearFiltersBtn) elements.clearFiltersBtn.addEventListener('click', filterSystem.clearAllFilters);
                
                if (quickViewElements.closeBtn) quickViewElements.closeBtn.addEventListener('click', () => {
                    if (window.quickViewApp) window.quickViewApp.closeQuickView();
                });
            },

            fetchProducts: async () => {
                state.isLoading = true;
                // Renderiza Skeletons imediatamente
                elements.grid.innerHTML = utils.generateSkeletons(12);
                
                try {
                    const response = await axios.get(API_URL);
                    state.allProducts = response.data.map(product => ({
                        ...product,
                        isNew: Math.random() > 0.7,
                        isLimited: Math.random() > 0.8,
                        categoria: product.categoria?.nome || 'Casual',
                        precoOriginal: product.preco * 1.2
                    }));
                    filterSystem.applyFilters(); // Isso chama renderProducts() e limpa o loading
                } catch (error) {
                    console.error('Erro:', error);
                    elements.grid.innerHTML = '<div class="error-state">Erro ao carregar produtos. Verifique sua conexão.</div>';
                } finally {
                    state.isLoading = false;
                    // Garante que o loading saia mesmo se algo falhar
                    if(elements.loadingState) elements.loadingState.style.display = 'none';
                }
            },

            start: () => {
                init.setupEventListeners();
                viewSystem.loadViewPreference();
                init.fetchProducts();
                // Expor para o HTML
                window.catalogApp = { 
                    renderSystem, 
                    filterSystem, 
                    removeFilter: filterSystem.removeFilter 
                };
            }
        };

        init.start();
    }
});