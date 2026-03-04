/**
 * JAPA UNIVERSE - CATALOGO JS (COM LÓGICA DE PREÇO PARA CONJUNTOS)
 */

(function() {
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`;
    const CACHE_KEY = "japa_products_cache";

    let allProducts = [];
    let filteredProducts = [];
    let currentPage = 1;
    const itemsPerPage = 12;
    
    // ESTADO ATUAL: 'sneakers' (Tênis) ou 'clothing' (Roupas)
    let currentTab = 'sneakers'; 

    const grid = document.getElementById('products-grid');

    const Utils = {
        formatPrice: (p) => `R$ ${Number(p).toFixed(2).replace('.', ',')}`,
        getImageUrl: (path) => {
            if (!path) return '/FRONT/assets/images/placeholder.jpg';
            if (path.startsWith('http')) return path;
            const cleanPath = path.startsWith('/') ? path.slice(1) : path;
            return `${BASE_URL}/${cleanPath}`;
        }
    };

    const Render = {
        products: () => {
            if (!grid) return;

            const start = (currentPage - 1) * itemsPerPage;
            const toShow = filteredProducts.slice(start, start + itemsPerPage);

            // --- LÓGICA DE ESTADO VAZIO ---
            if (toShow.length === 0) {
                const container = document.getElementById('pagination-controls');
                if(container) container.innerHTML = '';

                grid.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-search"></i>
                        <h3>Nenhum produto encontrado</h3>
                        <p>Tente ajustar os filtros da busca.</p>
                        <button class="btn btn-outline" onclick="location.reload()">Limpar Filtros</button>
                    </div>`;
                return;
            }
            // ------------------------------------------

            let html = '';
            toShow.forEach((p, idx) => {
                const isCritical = idx < 4; 
                
                // --- LÓGICA DE PREÇO (SÓ A PARTE DE CIMA PARA MARCAS ESPECÍFICAS) ---
                const marcaId = p.marca?.id || 0;
                // Apenas: Corteiz (13), Trapstar (14), Syna (15), Denim Tears (17)
                const marcasComConjunto = [13, 14, 15, 17]; 
                const isConjunto = marcasComConjunto.includes(marcaId);
                
                // Se for uma destas marcas, o preço base na vitrine é 65%
                const precoExibicao = isConjunto ? (p.preco * 0.65) : p.preco;
                // -----------------------------------------------------------

                html += `
                    <div class="product-card" data-id="${p.id}">
                        <a href="/FRONT/produto/HTML/produto.html?id=${p.id}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${Utils.getImageUrl(p.imagemUrl)}" 
                                     alt="${p.nome}"
                                     loading="${isCritical ? 'eager' : 'lazy'}"
                                     fetchpriority="${isCritical ? 'high' : 'low'}"
                                     decoding="async"
                                     style="opacity: 1">
                            </div>
                        </a>
                        <div class="product-info">
                            <h3 class="product-name">${p.nome}</h3>
                            <div class="product-shipping-tag"><i class="fas fa-truck"></i><span>Frete Grátis</span></div>
                            <div class="product-price">
                                <span class="current-price">${Utils.formatPrice(precoExibicao)}</span>
                            </div>
                        </div>
                        <div class="product-footer">
                            <button class="btn btn-primary add-to-cart-btn" onclick="event.preventDefault(); window.location.href='/FRONT/produto/HTML/produto.html?id=${p.id}'">Ver Detalhes</button>
                        </div>
                    </div>`;
            });

            grid.innerHTML = html;
            Render.pagination();
        },

        pagination: () => {
            const container = document.getElementById('pagination-controls');
            if (!container) return;
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            if (totalPages <= 1) { container.innerHTML = ''; return; }

            let html = `<div class="pagination-wrapper">`;
            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.setCatalogPage(${i})">${i}</button>`;
            }
            html += `</div>`;
            container.innerHTML = html;
        },

        updateBrandOptions: (type) => {
            const select = document.getElementById('brandFilter');
            if (!select) return;

            const relevantProducts = allProducts.filter(p => {
                const catId = p.categoria?.id || 0;
                return type === 'sneakers' ? catId < 45 : catId >= 45;
            });

            const uniqueBrands = [...new Set(relevantProducts.map(p => p.marca?.nome).filter(Boolean))].sort();

            let html = `<option value="all">Todas as Marcas</option>`;
            uniqueBrands.forEach(brand => {
                html += `<option value="${brand}">${brand}</option>`;
            });

            select.innerHTML = html;
        }
    };

    const Logic = {
        sortProducts: (list) => {
            return list.sort((a, b) => {
                const catA = (a.categoria?.nome || "").toString().toUpperCase();
                const catB = (b.categoria?.nome || "").toString().toUpperCase();
                if (catA < catB) return -1;
                if (catA > catB) return 1;
                return a.nome.localeCompare(b.nome);
            });
        },

        filter: () => {
            const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase();
            const brand = document.getElementById('brandFilter')?.value || 'all';
            const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';

            filteredProducts = allProducts.filter(p => {
                const matchesSearch = p.nome.toLowerCase().includes(searchTerm);
                const matchesBrand = brand === 'all' || (p.marca?.nome === brand);
                
                const catId = p.categoria?.id || 0;
                let matchesType = false;

                if (currentTab === 'sneakers') {
                    matchesType = catId < 45;
                } else if (currentTab === 'clothing') {
                    matchesType = catId >= 45;
                }

                return matchesSearch && matchesBrand && matchesType;
            });

            Logic.sortProducts(filteredProducts);
            currentPage = 1;
            Render.products();
        },

        switchTab: (type) => {
            currentTab = type;
            
            document.querySelectorAll('.type-tab').forEach(btn => {
                if (btn.dataset.type === type) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            Render.updateBrandOptions(type);
            
            const brandSelect = document.getElementById('brandFilter');
            if(brandSelect) brandSelect.value = 'all';

            Logic.filter();
        }
    };

    const Init = async () => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            allProducts = JSON.parse(cached);
            Logic.sortProducts(allProducts);
            Render.updateBrandOptions(currentTab);
            Logic.filter();
        }

        const loader = document.getElementById('loadingState');
        if (loader) loader.style.display = 'none';

        try {
            const res = await axios.get(API_URL);
            const freshData = res.data;
            
            if (JSON.stringify(freshData) !== cached) {
                allProducts = freshData;
                Logic.sortProducts(allProducts);
                localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
                Render.updateBrandOptions(currentTab);
                Logic.filter();
            }
        } catch (err) {
            console.error("Erro API:", err);
            if (!cached && grid) grid.innerHTML = '<p>Erro ao carregar catálogo.</p>';
        }
    };

    window.setCatalogPage = (p) => {
        currentPage = p;
        Render.products();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    document.getElementById('searchInput')?.addEventListener('input', () => {
        clearTimeout(window.searchTimer);
        window.searchTimer = setTimeout(Logic.filter, 300);
    });

    document.getElementById('brandFilter')?.addEventListener('change', Logic.filter);
    document.getElementById('categoryFilter')?.addEventListener('change', Logic.filter);

    document.querySelectorAll('.type-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.currentTarget.dataset.type;
            Logic.switchTab(type);
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Init);
    } else {
        Init();
    }
})();