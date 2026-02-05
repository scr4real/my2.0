/**
 * JAPA UNIVERSE - CATALOGO JS (ORDENAÇÃO POR CATEGORIA)
 * Foco: Agrupar produtos por tipo (95, TN, Jordan, etc.)
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

            if (toShow.length === 0) {
                grid.innerHTML = '<div class="empty-state">Nenhum tênis encontrado.</div>';
                return;
            }

            let html = '';
            toShow.forEach((p, idx) => {
                const isCritical = idx < 4; 
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
                                <span class="current-price">${Utils.formatPrice(p.preco)}</span>
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
        }
    };

    const Logic = {
        // Função de ordenação por Categoria (Nome)
        sortProducts: (list) => {
            return list.sort((a, b) => {
                // Acede ao nome da categoria (ex: "Air Max 95")
                const catA = (a.categoria?.nome || "").toString().toUpperCase();
                const catB = (b.categoria?.nome || "").toString().toUpperCase();
                
                if (catA < catB) return -1;
                if (catA > catB) return 1;
                
                // Se for a mesma categoria, ordena pelo nome do produto
                return a.nome.localeCompare(b.nome);
            });
        },

        filter: () => {
            const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase();
            const brand = document.getElementById('brandFilter')?.value || 'all';

            filteredProducts = allProducts.filter(p => {
                const matchesSearch = p.nome.toLowerCase().includes(searchTerm);
                const matchesBrand = brand === 'all' || (p.marca?.nome === brand);
                return matchesSearch && matchesBrand;
            });

            Logic.sortProducts(filteredProducts);

            currentPage = 1;
            Render.products();
        }
    };

    const Init = async () => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            allProducts = JSON.parse(cached);
            Logic.sortProducts(allProducts);
            filteredProducts = [...allProducts];
            Render.products();
        }

        const loader = document.getElementById('loadingState');
        if (loader) loader.style.display = 'none';

        try {
            const res = await axios.get(API_URL);
            const freshData = res.data;
            
            Logic.sortProducts(freshData);

            if (JSON.stringify(freshData) !== cached) {
                allProducts = freshData;
                filteredProducts = [...allProducts];
                localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
                Render.products();
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Init);
    } else {
        Init();
    }
})();