Perfeito! Vou pegar o seu código JS original e adicionar apenas a lógica de paginação, sem mexer na estrutura que você já tinha.
O que eu fiz:
 * Adicionei currentPage e itemsPerPage: 12 no state.
 * Adicionei a função renderPagination para criar os botões (1, 2, 3...).
 * Modifiquei a função renderProducts para exibir apenas 12 produtos por vez, baseados na página atual.
 * Criei a função goToPage para trocar de página.
 * Mantive todo o seu sistema de filtros, busca e quick view intactos.
Aqui está o código completo do catalogo.js:
document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`;
    const grid = document.getElementById('products-grid');
    
    if (grid) {
        // ===== ESTADO GLOBAL =====
        let state = {
            allProducts: [],
            filteredProducts: [],
            currentPage: 1,      // NOVA VARIAVEL: Página Atual
            itemsPerPage: 12,    // NOVA VARIAVEL: Itens por página
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
            // Alterado de loadMoreBtn para paginationContainer se você mudou o HTML, 
            // senão ele vai procurar onde injetar os números.
            // Recomendo ter um <div id="pagination-controls"></div> no lugar do botão carregar mais.
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

        // ===== QUICK VIEW MODAL (AGORA É O MODAL PRINCIPAL) =====
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

        // ===== FUNÇÕES DE UTILIDADE =====
        const utils = {
            debounce: (func, wait) => {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
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

        // ===== SISTEMA DE FILTROS AVANÇADOS =====
        const filterSystem = {
            applyFilters: () => {
                let filtered = [...state.allProducts];
                
                if (state.filters.search) {
                    const searchTerm = state.filters.search.toLowerCase();
                    filtered = filtered.filter(product => 
                        product.nome.toLowerCase().includes(searchTerm) ||
                        product.marca.nome.toLowerCase().includes(searchTerm) ||
                        product.categoria?.toLowerCase().includes(searchTerm) ||
                        product.descricao?.toLowerCase().includes(searchTerm)
                    );
                }
                
                if (state.filters.brand !== 'all') {
                    filtered = filtered.filter(product => 
                        product.marca.nome === state.filters.brand
                    );
                }
                
                if (state.filters.category !== 'all') {
                    filtered = filtered.filter(product => 
                        product.categoria === state.filters.category
                    );
                }
                
                if (state.filters.price !== 'all') {
                    const priceRange = utils.parsePriceRange(state.filters.price);
                    filtered = filtered.filter(product => 
                        product.preco >= priceRange.min && product.preco <= priceRange.max
                    );
                }
                
                filtered = filterSystem.sortProducts(filtered);
                state.filteredProducts = filtered;
                state.currentPage = 1; // Reseta para página 1 ao filtrar
                
                filterSystem.updateActiveFilters();
                filterSystem.updateFormElements();
            },
            
            sortProducts: (products) => {
                switch (state.filters.sort) {
                    case 'price-asc':
                        return products.sort((a, b) => a.preco - b.preco);
                    case 'price-desc':
                        return products.sort((a, b) => b.preco - b.preco);
                    case 'name-asc':
                        return products.sort((a, b) => a.nome.localeCompare(b.nome));
                    case 'newest':
                        return products.sort((a, b) => new Date(b.dataLancamento || b.createdAt) - new Date(a.dataLancamento || a.createdAt));
                    default:
                        return products;
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
                    if (value && show) {
                        filterSystem.addFilterTag(key, label);
                    }
                });
            },
            
            getPriceFilterLabel: (priceRange) => {
                const labels = {
                    'all': 'Qualquer Preço',
                    '0-200': 'Até R$ 200',
                    '200-500': 'R$ 200 - R$ 500',
                    '500-1000': 'R$ 500 - R$ 1000',
                    '1000-99999': 'Acima de R$ 1000'
                };
                return `Preço: ${labels[priceRange]}`;
            },
            
            getSortFilterLabel: (sort) => {
                const labels = {
                    'featured': 'Em Destaque',
                    'newest': 'Mais Recentes',
                    'price-asc': 'Menor Preço',
                    'price-desc': 'Maior Preço',
                    'name-asc': 'Nome A-Z'
                };
                return `Ordenar: ${labels[sort]}`;
            },
            
            addFilterTag: (type, label) => {
                const tag = document.createElement('div');
                tag.className = 'filter-tag';
                tag.innerHTML = `
                    <span>${label}</span>
                    <button type="button" onclick="catalogApp.removeFilter('${type}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                elements.activeFilters.appendChild(tag);
            },
            
            removeFilter: (type) => {
                const defaultValues = {
                    search: '',
                    brand: 'all',
                    category: 'all',
                    price: 'all',
                    sort: 'featured'
                };
                
                state.filters[type] = defaultValues[type];
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
                state.filters = {
                    search: '',
                    brand: 'all',
                    category: 'all',
                    price: 'all',
                    sort: 'featured'
                };
                filterSystem.applyFilters();
                renderSystem.renderProducts();
            }
        };

        // ===== SISTEMA DE RENDERIZAÇÃO E PAGINAÇÃO =====
        const renderSystem = {
            renderProducts: () => {
                // LÓGICA DE PAGINAÇÃO
                const startIndex = (state.currentPage - 1) * state.itemsPerPage;
                const endIndex = startIndex + state.itemsPerPage;
                const productsToShow = state.filteredProducts.slice(startIndex, endIndex);
                
                if (state.isLoading && state.filteredProducts.length === 0) {
                    elements.grid.innerHTML = utils.generateSkeletons(12);
                    elements.loadingState.style.display = 'block';
                    elements.emptyState.style.display = 'none';
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
                
                // RENDERIZA OS BOTÕES DE PAGINAÇÃO
                renderSystem.renderPagination();
                renderSystem.addProductEventListeners();

                // Scroll suave para o topo do grid ao mudar de página
                // elements.grid.scrollIntoView({ behavior: 'smooth' });
            },

            renderPagination: () => {
                if (!elements.paginationContainer) return;
                
                const totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
                
                if (totalPages <= 1) {
                    elements.paginationContainer.innerHTML = '';
                    return;
                }

                let paginationHtml = `<div class="pagination-wrapper" style="display: flex; gap: 8px; justify-content: center; width: 100%; flex-wrap: wrap;">`;

                // Botão Anterior
                paginationHtml += `
                    <button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} 
                            onclick="catalogApp.renderSystem.goToPage(${state.currentPage - 1})"
                            style="padding: 8px 16px; background: transparent; border: 1px solid #444; color: #fff; cursor: pointer; border-radius: 6px;">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                `;

                // Números das páginas
                for (let i = 1; i <= totalPages; i++) {
                    // Lógica para mostrar ... se tiver muitas páginas
                    if (i === 1 || i === totalPages || (i >= state.currentPage - 1 && i <= state.currentPage + 1)) {
                        paginationHtml += `
                            <button class="page-btn ${i === state.currentPage ? 'active' : ''}" 
                                    onclick="catalogApp.renderSystem.goToPage(${i})"
                                    style="padding: 8px 12px; background: ${i === state.currentPage ? '#FF6600' : 'transparent'}; border: 1px solid ${i === state.currentPage ? '#FF6600' : '#444'}; color: ${i === state.currentPage ? '#000' : '#fff'}; cursor: pointer; border-radius: 6px; font-weight: bold;">
                                ${i}
                            </button>
                        `;
                    } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
                        paginationHtml += `<span style="color: #666; padding: 8px;">...</span>`;
                    }
                }

                // Botão Próximo
                paginationHtml += `
                    <button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} 
                            onclick="catalogApp.renderSystem.goToPage(${state.currentPage + 1})"
                            style="padding: 8px 16px; background: transparent; border: 1px solid #444; color: #fff; cursor: pointer; border-radius: 6px;">
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
                const discountPercent = hasDiscount ? 
                    Math.round((1 - product.preco / product.precoOriginal) * 100) : 0;
                
                const descricaoTexto = product.descricao || "Estilo premium e conforto para o seu dia a dia.";

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
                                     loading="${index < 8 ? 'eager' : 'lazy'}">
                            </div>
                        </a>
                        
                        <div class="product-info">
                            <h3 class="product-name">${product.nome}</h3>
                            <p class="product-description-text">${descricaoTexto}</p>
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
                                <span class="btn-text">
                                    ${product.estoque <= 0 ? 'Esgotado' : 'Comprar'}
                                </span>
                                <span class="btn-loading">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
             