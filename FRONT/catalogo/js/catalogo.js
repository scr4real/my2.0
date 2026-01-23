/**
 * JAPA UNIVERSE - CATALOGO JS (ULTRA OPTIMIZED)
 * Foco: Carregamento instantâneo de imagens e renderização em milissegundos.
 */

(function() {
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`;
    const CACHE_KEY = "japa_products_cache";

    // Estado da aplicação (Privado para performance)
    let allProducts = [];
    let filteredProducts = [];
    let currentPage = 1;
    const itemsPerPage = 12;

    const grid = document.getElementById('products-grid');

    /**
     * Utilitários de Performance
     */
    const Utils = {
        formatPrice: (p) => `R$ ${Number(p).toFixed(2).replace('.', ',')}`,
        // Otimização de URL de Imagem: Garante que o navegador não se perca em caminhos relativos
        getImageUrl: (path) => {
            if (!path) return '/FRONT/assets/images/placeholder.jpg';
            if (path.startsWith('http')) return path;
            const cleanPath = path.startsWith('/') ? path.slice(1) : path;
            return `${BASE_URL}/${cleanPath}`;
        },
        // Gera esqueletos CSS puros (sem imagens) para ocupação de espaço imediata
        getSkeleton: () => `<div class="product-card skeleton-card"><div class="product-image-wrapper skeleton"></div><div class="product-info"><div class="skeleton" style="height:20px;width:70%"></div><div class="skeleton" style="height:20px;width:40%"></div></div></div>`.repeat(6)
    };

    /**
     * Renderização de Alta Velocidade
     */
    const Render = {
        products: () => {
            if (!grid) return;

            const start = (currentPage - 1) * itemsPerPage;
            const toShow = filteredProducts.slice(start, start + itemsPerPage);

            if (toShow.length === 0) {
                grid.innerHTML = '<div class="empty-state">Nenhum tênis encontrado.</div>';
                return;
            }

            // Fragmento de string para evitar múltiplos Reflows no DOM
            let html = '';
            toShow.forEach((p, idx) => {
                const isCritical = idx < 4; // As 4 primeiras fotos são prioridade máxima
                html += `
                    <div class="product-card" data-id="${p.id}">
                        <a href="/FRONT/produto/HTML/produto.html?id=${p.id}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${Utils.getImageUrl(p.imagemUrl)}" 
                                     alt="${p.nome}"
                                     loading="${isCritical ? 'eager' : 'lazy'}"
                                     fetchpriority="${isCritical ? 'high' : 'low'}"
                                     decoding="async"
                                     onload="this.style.opacity='1'">
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

    /**
     * Lógica de Busca e Filtro (Sem travamento de UI)
     */
    const Logic = {
        filter: () => {
            const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase();
            const brand = document.getElementById('brandFilter')?.value || 'all';

            filteredProducts = allProducts.filter(p => {
                const matchesSearch = p.nome.toLowerCase().includes(searchTerm);
                const matchesBrand = brand === 'all' || (p.marca?.nome === brand);
                return matchesSearch && matchesBrand;
            });

            currentPage = 1;
            Render.products();
        }
    };

    /**
     * Orquestração de Carregamento
     */
    const Init = async () => {
        // 1. Mostrar Skeletons IMEDIATAMENTE
        if (grid) grid.innerHTML = Utils.getSkeleton();

        // 2. Tentar Cache (Instantâneo)
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            allProducts = JSON.parse(cached);
            filteredProducts = [...allProducts];
            Render.products();
        }

        // 3. Buscar na API em Background (Stale-While-Revalidate)
        try {
            const res = await axios.get(API_URL);
            const freshData = res.data;
            
            // Só re-renderiza se os dados mudaram
            if (JSON.stringify(freshData) !== cached) {
                allProducts = freshData;
                filteredProducts = [...allProducts];
                localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
                Render.products();
            }
        } catch (err) {
            console.error("Erro API:", err);
            if (!cached) grid.innerHTML = '<p>Erro ao carregar catálogo. Verifique sua conexão.</p>';
        }

        // Ocultar spinner de loading se existir
        const loader = document.getElementById('loadingState');
        if (loader) loader.style.display = 'none';
    };

    // Global para os botões de paginação
    window.setCatalogPage = (p) => {
        currentPage = p;
        Render.products();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Event Listeners Otimizados
    document.getElementById('searchInput')?.addEventListener('input', () => {
        clearTimeout(window.searchTimer);
        window.searchTimer = setTimeout(Logic.filter, 300);
    });

    document.getElementById('brandFilter')?.addEventListener('change', Logic.filter);

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Init);
    } else {
        Init();
    }
})();