/**
 * JAPA UNIVERSE - CATÁLOGO INSTANTÂNEO
 */
(function() {
    const grid = document.getElementById('products-grid');
    const loadingState = document.getElementById('loadingState');
    const CACHE_KEY = "japa_products_cache";
    const API_URL = 'https://back-production-e565.up.railway.app/api/produtos';

    const render = (products) => {
        if (!grid) return;
        
        // Renderiza tudo de uma vez para evitar travamentos
        grid.innerHTML = products.map((p, idx) => {
            const isCritical = idx < 6;
            const imgUrl = p.imagemUrl.replace('.png', '.webp').replace('.jfif', '.webp');
            
            return `
                <div class="product-card">
                    <a href="/FRONT/produto/HTML/produto.html?id=${p.id}">
                        <div class="product-image-wrapper">
                            <img src="${imgUrl}" 
                                 fetchpriority="${isCritical ? 'high' : 'low'}" 
                                 loading="${isCritical ? 'eager' : 'lazy'}"
                                 decoding="async">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${p.nome}</h3>
                            <div class="product-price">
                                <span class="current-price">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>
                    </a>
                </div>`;
        }).join('');

        // ESCONDE O "CARREGANDO" ASSIM QUE A PRIMEIRA RENDERIZAÇÃO OCORRE
        if (loadingState) loadingState.style.display = 'none';
    };

    const init = async () => {
        // 1. TENTA CARREGAR DO CACHE (VELOCIDADE DE MILISSEGUNDOS)
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            render(JSON.parse(cachedData));
        }

        // 2. BUSCA DADOS ATUALIZADOS EM SEGUNDO PLANO
        try {
            const response = await fetch(API_URL);
            const freshData = await response.json();
            
            // Salva para a próxima visita
            localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
            
            // Se não tinha cache, renderiza agora
            if (!cachedData) {
                render(freshData);
            }
        } catch (error) {
            console.error("Erro ao sincronizar produtos:", error);
            if (!cachedData && loadingState) {
                loadingState.innerHTML = "<p>Erro ao carregar produtos.</p>";
            }
        }
    };

    init();
})();