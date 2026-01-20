document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`;
    const grid = document.getElementById('products-grid');
    
    if (grid) {
        let state = {
            allProducts: [], 
            filteredProducts: [], 
            currentPage: 1, 
            itemsPerPage: 10, // MUDANÇA AQUI: Agora são 10 produtos por página
            currentView: 'grid',
            filters: { search: '', brand: 'all', category: 'all', price: 'all', sort: 'featured' },
            isLoading: false
        };

        const elements = {
            grid, 
            paginationContainer: document.getElementById('pagination-controls'),
            searchInput: document.getElementById('searchInput'), 
            activeFilters: document.getElementById('activeFilters'), 
            loadingState: document.getElementById('loadingState'),
            emptyState: document.getElementById('emptyState')
        };

        const utils = {
            formatPrice: (price) => `R$ ${Number(price).toFixed(2).replace('.', ',')}`,
            getImageUrl: (path) => !path ? 'FRONT/assets/images/placeholder.jpg' : (path.startsWith('http') ? path : `${BASE_URL}/${path.startsWith('/') ? path.substring(1) : path}`),
            generateSkeletons: (count) => Array.from({ length: count }).map(() => `<div class="product-card skeleton-card"><div class="product-image-wrapper skeleton"></div></div>`).join('')
        };

        const renderSystem = {
            renderProducts: () => {
                const start = (state.currentPage - 1) * state.itemsPerPage;
                const productsToShow = state.filteredProducts.slice(start, start + state.itemsPerPage);
                
                if (productsToShow.length === 0) {
                    elements.grid.innerHTML = '';
                    if(elements.emptyState) elements.emptyState.style.display = 'block';
                    return;
                }
                if(elements.emptyState) elements.emptyState.style.display = 'none';
                if(elements.loadingState) elements.loadingState.style.display = 'none';
                
                elements.grid.innerHTML = productsToShow.map((product, index) => {
                    const isPriority = index < 4; // Prioriza os primeiros do grid
                    return `
                        <div class="product-card" data-id="${product.id}">
                            <a href="/FRONT/produto/HTML/produto.html?id=${product.id}" class="product-card-link">
                                <div class="product-image-wrapper">
                                    <img src="${utils.getImageUrl(product.imagemUrl)}" 
                                         loading="${isPriority ? 'eager' : 'lazy'}"
                                         fetchpriority="${isPriority ? 'high' : 'auto'}"
                                         decoding="async">
                                </div>
                            </a>
                            <div class="product-info">
                                <h3 class="product-name">${product.nome}</h3>
                                <div class="product-price">
                                    <span class="current-price">${utils.formatPrice(product.preco)}</span>
                                </div>
                            </div>
                            <div class="product-footer">
                                <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Comprar</button>
                            </div>
                        </div>`;
                }).join('');
                renderSystem.renderPagination();
            },

            renderPagination: () => {
                if (!elements.paginationContainer) return;
                const totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
                if (totalPages <= 1) { elements.paginationContainer.innerHTML = ''; return; }

                let html = `<div class="pagination-wrapper">`;
                for (let i = 1; i <= totalPages; i++) {
                    html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" onclick="window.catalogPage(${i})">${i}</button>`;
                }
                html += `</div>`;
                elements.paginationContainer.innerHTML = html;
            }
        };

        window.catalogPage = p => { state.currentPage = p; renderSystem.renderProducts(); window.scrollTo({top: 0, behavior: 'smooth'}); };

        const fetchProducts = async () => {
            state.isLoading = true;
            elements.grid.innerHTML = utils.generateSkeletons(10);
            try {
                const res = await axios.get(API_URL);
                state.allProducts = res.data;
                state.filteredProducts = res.data;
                renderSystem.renderProducts();
            } catch (error) { 
                elements.grid.innerHTML = 'Erro ao carregar.'; 
            } finally {
                state.isLoading = false;
            }
        };

        fetchProducts();
    }
});
