document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://back-production-e565.up.railway.app';
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
            isLoading: false,
            hasMore: true
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
            loadingState: document.getElementById('loadingState'),
            emptyState: document.getElementById('emptyState'),
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
                    <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation' : 'info'}"></i>
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
                return function executedFunction(...args) {
                    const later = () => { clearTimeout(timeout); func(...args); };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);  
                };
            },
            formatPrice: (price) => `R$ ${price.toFixed(2).replace('.', ',')}`,
            getImageUrl: (path) => {
                if (!path) return '/assets/images/placeholder-product.jpg';
                if (path.startsWith('http')) return path;
                const cleanPath = path.startsWith('/') ? path.substring(1) : path;
                return `${BASE_URL}/${cleanPath}`; 
            },
            generateSkeletons: (count) => {
                return Array.from({ length: count }, (_, index) => `
                    <div class="product-card skeleton-card" style="--delay: ${index}">
                        <div class="product-image-wrapper skeleton skeleton-image"></div>
                        <div class="product-info">
                            <div class="skeleton skeleton-text short"></div>
                            <div class="skeleton skeleton-text medium"></div>
                            <div class="skeleton skeleton-text" style="height: 2rem; margin-top: 0.5rem;"></div>
                        </div>
                    </div>
                `).join('');
            },
            parsePriceRange: (range) => {
                if (range === 'all') return { min: 0, max: Infinity };
                const [min, max] = range.split('-').map(Number);
                return { min, max };
            }
        };

        // ===== SISTEMA DE FILTROS =====
        const filterSystem = {
            applyFilters: () => {
                let filtered = [...state.allProducts];
                if (state.filters.search) {
                    const term = state.filters.search.toLowerCase();
                    filtered = filtered.filter(p => p.nome.toLowerCase().includes(term) || p.marca.nome.toLowerCase().includes(term) || p.descricao?.toLowerCase().includes(term));
                }
                if (state.filters.brand !== 'all') filtered = filtered.filter(p => p.marca.nome === state.filters.brand);
                if (state.filters.category !== 'all') filtered = filtered.filter(p => p.categoria === state.filters.category);
                if (state.filters.price !== 'all') {
                    const range = utils.parsePriceRange(state.filters.price);
                    filtered = filtered.filter(p => p.preco >= range.min && p.preco <= range.max);
                }
                filtered = filterSystem.sortProducts(filtered);
                state.filteredProducts = filtered;
                state.currentPage = 1; 
                filterSystem.updateActiveFilters();
                filterSystem.updateFormElements();
            },
            sortProducts: (products) => {
                switch (state.filters.sort) {
                    case 'price-asc': return products.sort((a, b) => a.preco - b.preco);
                    case 'price-desc': return products.sort((a, b) => b.preco - b.preco);
                    case 'name-asc': return products.sort((a, b) => a.nome.localeCompare(b.nome));
                    case 'newest': return products.sort((a, b) => new Date(b.dataLancamento || b.createdAt) - new Date(a.dataLancamento || a.createdAt));
                    default: return products;
                }
            },
            updateActiveFilters: () => {
                elements.activeFilters.innerHTML = '';
                const filters = [
                    { key: 'search', value: state.filters.search, label: `Busca: "${state.filters.search}"` },
                    { key: 'brand', value: state.filters.brand, label: `Marca: ${state.filters.brand}`, show: state.filters.brand !== 'all' },
                    { key: 'category', value: state.filters.category, label: `Categoria: ${state.filters.category}`, show: state.filters.category !== 'all' },
                    { key: 'price', value: state.filters.price, label: filterSystem.getPriceFilterLabel(state.filters.price), show: state.filters.price !== 'all' },
                    { key: 'sort', value: state.filters.sort, label: filterSystem.getSortFilterLabel(state.filters.sort), show: state.filters.sort !== 'featured' }
                ];
                filters.forEach(({ key, value, label, show = true }) => {
                    if (value && show) filterSystem.addFilterTag(key, label);
                });
            },
            getPriceFilterLabel: (r) => ({'all':'Qualquer Preço', '0-200':'Até R$ 200', '200-500':'R$ 200 - 500', '500-1000':'R$ 500 - 1000', '1000-99999':'Acima de R$ 1000'}[r]),
            getSortFilterLabel: (s) => ({'featured':'Destaques', 'newest':'Recentes', 'price-asc':'Menor Preço', 'price-desc':'Maior Preço', 'name-asc':'A-Z'}[s]),
            addFilterTag: (type, label) => {
                const tag = document.createElement('div');
                tag.className = 'filter-tag';
                tag.innerHTML = `<span>${label}</span><button type="button" onclick="catalogApp.removeFilter('${type}')"><i class="fas fa-times"></i></button>`;
                elements.activeFilters.appendChild(tag);
            },
            removeFilter: (type) => {
                state.filters[type] = type === 'price' || type === 'brand' || type === 'category' ? 'all' : '';
                if(type === 'sort') state.filters.sort = 'featured';
                filterSystem.applyFilters();
                renderSystem.renderProducts();
            },
            updateFormElements: () => {
                elements.searchInput.value = state.filters.search;
                elements.brandFilter.value = state.filters.brand;
                elements.categoryFilter.value = state.filters.category;
                elements.priceFilter.value = state.filters.price;
                elements.sortFilter.value = state.filters.sort;
                elements.searchClear.style.display = state.filters.search ? 'block' : 'none';
            },
            clearAllFilters: () => {
                state.filters = { search: '', brand: 'all', category: 'all', price: 'all', sort: 'featured' };
                filterSystem.applyFilters();
                renderSystem.renderProducts();
            }
        };

        // ===== SISTEMA DE RENDERIZAÇÃO E PAGINAÇÃO =====
        const renderSystem = {
            renderProducts: () => {
                const startIndex = (state.currentPage - 1) * state.itemsPerPage;
                const endIndex = startIndex + state.itemsPerPage;
                const productsToShow = state.filteredProducts.slice(startIndex, endIndex);
                
                if (state.isLoading && state.filteredProducts.length === 0) {
                    elements.grid.innerHTML = utils.generateSkeletons(12);
                    elements.loadingState.style.display = 'block';
                    elements.emptyState.style.display = 'none';
                    if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
                    return;
                }
                
                elements.loadingState.style.display = 'none';
                
                if (productsToShow.length === 0) {
                    elements.emptyState.style.display = 'block';
                    elements.grid.innerHTML = '';
                    if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
                    return;
                }
                
                elements.emptyState.style.display = 'none';
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

                let paginationHtml = `<div class="pagination-wrapper">`;

                paginationHtml += `
                    <button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} 
                            onclick="catalogApp.renderSystem.goToPage(${state.currentPage - 1})">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                `;

                let startPage = Math.max(1, state.currentPage - 2);
                let endPage = Math.min(totalPages, startPage + 4);
                if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

                for (let i = startPage; i <= endPage; i++) {
                    paginationHtml += `
                        <button class="page-btn ${i === state.currentPage ? 'active' : ''}" 
                                onclick="catalogApp.renderSystem.goToPage(${i})">
                            ${i}
                        </button>
                    `;
                }

                paginationHtml += `
                    <button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} 
                            onclick="catalogApp.renderSystem.goToPage(${state.currentPage + 1})">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                `;
                
                paginationHtml += `</div>`;
                elements.paginationContainer.innerHTML = paginationHtml;
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
                
                return `
                    <div class="product-card" data-id="${product.id}" style="--delay: ${index}">
                        <div class="product-badges">
                            ${product.isNew ? '<span class="badge new">Novo</span>' : ''}
                            ${hasDiscount ? `<span class="badge sale">-${discountPercent}%</span>` : ''}
                            ${product.isLimited ? '<span class="badge limited">Limited</span>' : ''}
                        </div>
                        
                        <a href="/FRONT/produto/HTML/produto.html?id=${product.id}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${utils.getImageUrl(product.imagemUrl)}" 
                                     alt="${product.nome}"
                                     loading="lazy">
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
                                <span class="btn-loading"><i class="fas fa-spinner fa-spin"></i></span>
                            </button>
                        </div>
                    </div>
                `;
            },
            
            addProductEventListeners: () => {
                document.querySelectorAll('.add-to-cart-btn:not([disabled])').forEach(button => {
                    if (button.dataset.listenerAdded) return;
                    button.addEventListener('click', async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const productId = button.dataset.productId;
                        quickViewSystem.openQuickView(productId);
                        button.dataset.listenerAdded = 'true';
                    });
                });
                if (state.currentView === 'list') {
                    document.querySelectorAll('.product-card').forEach(card => {
                        const link = card.querySelector('.product-card-link');
                        if (link) {
                            card.querySelectorAll('.product-image-wrapper, .product-info').forEach(el => {
                                el.style.cursor = 'pointer';
                                el.addEventListener('click', (e) => {
                                    if (!e.target.closest('.add-to-cart-btn')) window.location.href = link.href;
                                });
                            });
                        }
                    });
                }
            },
            
            loadMoreProducts: () => {
                // Função legada mantida para evitar erros se o botão antigo existir
                if (state.isLoading || !state.hasMore) return;
                state.isLoading = true;
                setTimeout(() => {
                    state.displayedCount += 12;
                    state.hasMore = state.displayedCount < state.filteredProducts.length;
                    state.isLoading = false;
                    renderSystem.renderProducts();
                }, 800);
            }
        };

        // ===== SISTEMA QUICK VIEW =====
        const quickViewSystem = {
            openQuickView: async (productId) => {
                const product = state.allProducts.find(p => p.id === parseInt(productId));
                if (!product) { quickViewSystem.showError('Produto não encontrado.'); return; }
                quickViewProduct = product;
                selectedSize = null;
                quickViewSystem.showSkeleton();
                quickViewElements.overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                try { await quickViewSystem.loadProductDetails(product); } 
                catch (error) { quickViewSystem.showError('Erro ao carregar detalhes.'); }
            },
            showSkeleton: () => { quickViewElements.content.innerHTML = '<div class="quickview-loading"><i class="fas fa-spinner fa-spin fa-2x"></i></div>'; },
            loadProductDetails: async (product) => {
                return new Promise(resolve => setTimeout(() => {
                    const details = {
                        ...product,
                        description: product.descricao || "Tênis premium com tecnologia de amortecimento avançada.",
                        images: [product.imagemUrl, product.imagemUrl, product.imagemUrl],
                        features: [{icon:'fas fa-shoe-prints', text:'Amortecimento React'}, {icon:'fas fa-wind', text:'Respirável'}, {icon:'fas fa-weight-hanging', text:'Leve'}],
                        sizes: quickViewSystem.generateAvailableSizes(product)
                    };
                    quickViewSystem.renderProductDetails(details);
                    resolve(details);
                }, 500));
            },
            renderProductDetails: (product) => {
                const hasDiscount = product.precoOriginal && product.precoOriginal > product.preco;
                const discountPercent = hasDiscount ? Math.round((1 - product.preco / product.precoOriginal) * 100) : 0;
                quickViewElements.content.innerHTML = `
                    <div class="quickview-gallery"><img src="${utils.getImageUrl(product.images[0])}" class="quickview-main-image" id="quickviewMainImage"><div class="quickview-thumbnails">${product.images.map((image, index) => `<img src="${utils.getImageUrl(image)}" class="quickview-thumbnail ${index === 0 ? 'active' : ''}" data-image-index="${index}">`).join('')}</div></div>
                    <div class="quickview-details">
                        <div class="quickview-brand">${product.marca.nome}</div>
                        <h1 class="quickview-title">${product.nome}</h1>
                        <div class="quickview-price"><span class="quickview-current-price">${utils.formatPrice(product.preco)}</span>${hasDiscount ? `<span class="quickview-original-price">${utils.formatPrice(product.precoOriginal)}</span>` : ''}</div>
                        <div class="quickview-shipping"><i class="fas fa-shipping-fast"></i><span>Frete Grátis</span></div>
                        <p class="quickview-description">${product.description}</p>
                        <div class="quickview-size-section"><div class="quickview-size-title">Selecione o Tamanho:</div><div class="quickview-size-options" id="quickviewSizeOptions">${Object.keys(product.sizes).map(s => `<div class="quickview-size-option" data-size="${s}">${s}</div>`).join('')}</div></div>
                        <div class="quickview-actions"><button class="btn btn-primary quickview-add-to-cart" id="quickviewAddToCart" disabled>Adicionar ao Carrinho</button></div>
                    </div>`;
                quickViewSystem.addGalleryEventListeners();
                quickViewSystem.addModalEventListeners();
            },
            addGalleryEventListeners: () => {
                const thumbnails = document.querySelectorAll('.quickview-thumbnail');
                const mainImage = document.getElementById('quickviewMainImage');
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', () => {
                        thumbnails.forEach(t => t.classList.remove('active'));
                        thumb.classList.add('active');
                        mainImage.src = thumb.src;
                    });
                });
            },
            addModalEventListeners: () => {
                document.querySelectorAll('.quickview-size-option:not(.disabled)').forEach(opt => opt.addEventListener('click', () => quickViewSystem.selectSize(opt)));
                const btn = document.getElementById('quickviewAddToCart');
                if(btn) btn.addEventListener('click', quickViewSystem.addToCartFromQuickView);
            },
            selectSize: (el) => {
                document.querySelectorAll('.quickview-size-option').forEach(o => o.classList.remove('selected'));
                el.classList.add('selected');
                selectedSize = el.dataset.size;
                document.getElementById('quickviewAddToCart').disabled = false;
            },
            addToCartFromQuickView: () => {
                if(!selectedSize) { showNotification('Selecione um tamanho', 'error'); return; }
                if(typeof window.addToCart === 'function') {
                    window.addToCart({ id: quickViewProduct.id.toString(), name: quickViewProduct.nome, price: quickViewProduct.preco, image: utils.getImageUrl(quickViewProduct.imagemUrl), size: selectedSize, quantity: 1 });
                    quickViewSystem.closeQuickView();
                    showNotification('Adicionado ao carrinho!');
                }
            },
            closeQuickView: () => {
                quickViewElements.overlay.classList.remove('active');
                document.body.style.overflow = '';
            },
            showError: (msg) => quickViewElements.content.innerHTML = `<div class="quickview-error">${msg}</div>`,
            generateAvailableSizes: (product) => {
                const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
                const av = {};
                sizes.forEach(s => av[s] = Math.floor(Math.random() * 5) + 1);
                return av;
            }
        };

        // ===== SISTEMA DE VIEW =====
        const viewSystem = {
            switchView: (v) => {
                state.currentView = v;
                elements.grid.setAttribute('data-view', v);
                elements.viewButtons.forEach(b => b.classList.toggle('active', b.dataset.view === v));
                setTimeout(() => renderSystem.addProductEventListeners(), 100);
            },
            loadViewPreference: () => viewSystem.switchView('grid')
        };

        // ===== INIT =====
        const init = {
            setupEventListeners: () => {
                elements.searchInput.addEventListener('input', utils.debounce((e) => {
                    state.filters.search = e.target.value.trim();
                    filterSystem.applyFilters();
                    renderSystem.renderProducts();
                }, 300));
                elements.searchClear.addEventListener('click', () => {
                    state.filters.search = '';
                    elements.searchInput.value = '';
                    filterSystem.applyFilters();
                    renderSystem.renderProducts();
                });
                ['brandFilter', 'categoryFilter', 'priceFilter', 'sortFilter'].forEach(id => {
                    elements[id].addEventListener('change', (e) => {
                        state.filters[id.replace('Filter', '')] = e.target.value;
                        filterSystem.applyFilters();
                        renderSystem.renderProducts();
                    });
                });
                elements.viewButtons.forEach(btn => btn.addEventListener('click', () => viewSystem.switchView(btn.dataset.view)));
                if (elements.clearFiltersBtn) elements.clearFiltersBtn.addEventListener('click', filterSystem.clearAllFilters);
                quickViewElements.closeBtn.addEventListener('click', quickViewSystem.closeQuickView);
                quickViewElements.overlay.addEventListener('click', (e) => { if (e.target === quickViewElements.overlay) quickViewSystem.closeQuickView(); });
            },
            fetchProducts: async () => {
                state.isLoading = true;
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
                    filterSystem.applyFilters();
                    renderSystem.renderProducts();
                } catch (error) {
                    console.error('Erro:', error);
                    elements.grid.innerHTML = '<div class="error-state">Erro ao carregar produtos.</div>';
                } finally {
                    state.isLoading = false;
                }
            },
            start: () => {
                init.setupEventListeners();
                viewSystem.loadViewPreference();
                init.fetchProducts();
                window.catalogApp = { state, filterSystem, renderSystem, quickViewSystem, showNotification, removeFilter: filterSystem.removeFilter };
            }
        };

        init.start();
    }
});