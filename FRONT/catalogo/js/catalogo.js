/**
 * JAPA UNIVERSE - CATALOGO JS (COM ABAS TÊNIS/ROUPAS)
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

            if (toShow.length === 0) {
                // Mensagem personalizada dependendo da aba
                const itemType = currentTab === 'sneakers' ? 'tênis' : 'roupas';
                grid.innerHTML = `<div class="empty-state">Nenhum item de ${itemType} encontrado.</div>`;
                
                // Limpa a paginação
                const container = document.getElementById('pagination-controls');
                if(container) container.innerHTML = '';
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
            const categoryFilter = document.getElementById('categoryFilter')?.value || 'all'; // Filtro dropdown

            filteredProducts = allProducts.filter(p => {
                // 1. Filtro de Texto e Marca e Categoria (Dropdown)
                const matchesSearch = p.nome.toLowerCase().includes(searchTerm);
                const matchesBrand = brand === 'all' || (p.marca?.nome === brand);
                
                // 2. FILTRO DE TIPO (ABAS) - AQUI ESTÁ A LÓGICA DE ID
                // Tênis: ID < 45
                // Roupas: ID >= 45
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

        // Função para mudar a aba (Chamada ao clicar nos botões)
        switchTab: (type) => {
            currentTab = type;
            
            // Atualiza visual dos botões
            document.querySelectorAll('.type-tab').forEach(btn => {
                if (btn.dataset.type === type) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Re-aplica filtros para mostrar os produtos certos
            Logic.filter();
        }
    };

    const Init = async () => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            allProducts = JSON.parse(cached);
            Logic.sortProducts(allProducts);
            // Aplica filtro inicial (Tênis por padrão)
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

    // Event Listeners
    document.getElementById('searchInput')?.addEventListener('input', () => {
        clearTimeout(window.searchTimer);
        window.searchTimer = setTimeout(Logic.filter, 300);
    });

    document.getElementById('brandFilter')?.addEventListener('change', Logic.filter);
    document.getElementById('categoryFilter')?.addEventListener('change', Logic.filter); // Adicionado listener de categoria

    // EVENTOS DOS BOTÕES DE ABA (TÊNIS / ROUPAS)
    document.querySelectorAll('.type-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.currentTarget.dataset.type; // 'sneakers' ou 'clothing'
            Logic.switchTab(type);
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Init);
    } else {
        Init();
    }
})();