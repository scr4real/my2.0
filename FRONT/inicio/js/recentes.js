document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`; 

    // Mapeamento das seções - ATUALIZADO PARA AS CATEGORIAS SOLICITADAS
    const sectionsToBuild = [
        { categoryName: "Air Max TN", containerId: "products-95", swiperClass: ".collection-swiper-95", prev: ".collection-prev-95", next: ".collection-next-95" },
        { categoryName: "Asics Gel NYC", containerId: "products-dn", swiperClass: ".collection-swiper-dn", prev: ".collection-prev-dn", next: ".collection-next-dn" },
        { categoryName: "Bape Sta", containerId: "products-tn", swiperClass: ".collection-swiper-tn", prev: ".collection-prev-tn", next: ".collection-next-tn" },
    ];

    let allProducts = [];

    // Funções utilitárias
    const formatPrice = (price) => {
        if (typeof price !== 'number') return 'R$ --,--';
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }

    const getImageUrl = (path) => {
        if (!path) return 'FRONT/assets/images/placeholder-product.jpg';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${BASE_URL}/${cleanPath}`;
    };

    // Renderiza os cards de produto (OTIMIZADO)
    const renderProductRow = (productsToRender, containerId, categoryName) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container com ID '${containerId}' não encontrado.`);
            return;
        }

        if (productsToRender && productsToRender.length > 0) {
            // LIMITAÇÃO: 5 Produtos
            const limitedProducts = productsToRender.slice(0, 5);

            let htmlContent = limitedProducts.map((product, index) => {
                // OTIMIZAÇÃO DE PERFORMANCE:
                // As 4 primeiras imagens carregam instantaneamente com prioridade alta.
                // Isso elimina o "piscar" ou demora no carregamento inicial.
                const isPriority = index < 4;
                const loadingAttr = isPriority ? 'eager' : 'lazy';
                const priorityAttr = isPriority ? 'high' : 'auto';

                return `
                <div class="swiper-slide">
                    <div class="product-card" data-id="${product.id}">
                        <a href="/FRONT/produto/HTML/produto.html?id=${product.id}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${getImageUrl(product.imagemUrl)}" 
                                     alt="${product.nome || 'Nome do produto'}"
                                     loading="${loadingAttr}"
                                     fetchpriority="${priorityAttr}"
                                     decoding="async"
                                     width="300" height="300">
                            </div>
                            <div class="product-info">
                                <span class="product-brand">${product.marca?.nome || 'Japa Universe'}</span>
                                <h3 class="product-name">${product.nome || 'Produto sem nome'}</h3>
                                <div class="product-shipping-tag">
                                    <i class="fas fa-truck"></i>
                                    <span>Frete Grátis</span>
                                </div>
                                <p class="product-price">${formatPrice(product.preco)}</p>
                            </div>
                        </a>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            Comprar
                        </button>
                    </div>
                </div>
            `}).join("");

            // BOTÃO VER TODOS
            const seeAllLink = `/FRONT/catalogo/HTML/catalogo.html?search=${encodeURIComponent(categoryName)}`;
            
            htmlContent += `
                <div class="swiper-slide">
                    <a href="${seeAllLink}" class="see-all-card">
                        <span>Ver Todos</span>
                        <h3>${categoryName}</h3>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;

            container.innerHTML = htmlContent;

        } else {
            container.innerHTML = `<div class="swiper-slide"><p style="padding: 20px; text-align: center; color: #666;">Nenhum produto encontrado nesta categoria.</p></div>`;
        }
    };

    // Inicializa o Swiper
    const initSwiper = (containerClass, navPrevClass, navNextClass) => {
        const swiperEl = document.querySelector(containerClass);
        if (!swiperEl || swiperEl.swiper) return;

        try {
            new Swiper(containerClass, {
                slidesPerView: "auto", 
                spaceBetween: 24, 
                freeMode: true, 
                grabCursor: true,
                scrollbar: {
                    el: `${containerClass} .swiper-scrollbar`, 
                    draggable: true, 
                },
                navigation: {
                    nextEl: navNextClass, 
                    prevEl: navPrevClass, 
                },
                breakpoints: { 
                    320: { spaceBetween: 15 },
                    640: { spaceBetween: 20 },
                    1024: { spaceBetween: 24 }
                }
            });
        } catch (e) {
            console.error(`Erro ao inicializar Swiper para ${containerClass}:`, e);
        }
    };

    // Listeners dos botões
    const addCartButtonListeners = () => {
        document.querySelectorAll('.add-to-cart-btn:not([data-listener-added="true"])').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation(); 

                const productId = e.currentTarget.dataset.productId;

                if (window.quickViewApp && typeof window.quickViewApp.openQuickView === 'function') {
                    window.quickViewApp.openQuickView(productId);
                } else if (window.catalogApp && window.catalogApp.quickViewSystem) {
                    window.catalogApp.quickViewSystem.openQuickView(productId);
                } else {
                    const product = allProducts.find(p => p.id == productId);
                    if(product && window.addToCart) {
                         window.addToCart({
                            id: product.id.toString(),
                            name: product.nome,
                            price: product.preco,
                            image: getImageUrl(product.imagemUrl),
                            size: 'Único',
                            quantity: 1
                        });
                        alert(`${product.nome} adicionado ao carrinho!`);
                    } else {
                        window.location.href = `/FRONT/produto/HTML/produto.html?id=${productId}`;
                    }
                }
            });
            button.dataset.listenerAdded = 'true';
        });
    };

    // Busca principal
    const fetchAndDistributeProducts = async () => {
        // Skeleton Loading
        sectionsToBuild.forEach(section => {
             const container = document.getElementById(section.containerId);
             if (container) {
                 container.innerHTML = Array(4).fill(0).map(() => `
                    <div class="swiper-slide">
                        <div class="product-card" style="background: #1a1a1a; border-color: #333;">
                             <div class="product-image-wrapper" style="opacity: 0.5;"></div>
                             <div class="product-info">
                                 <div style="height: 20px; background: #333; margin-bottom: 10px; width: 80%; border-radius: 4px;"></div>
                                 <div style="height: 15px; background: #333; width: 60%; border-radius: 4px;"></div>
                             </div>
                        </div>
                     </div>
                 `).join('');
             }
        });

        try {
            const response = await axios.get(API_URL);
            allProducts = response.data; 

            sectionsToBuild.forEach((section) => {
                const filteredProducts = allProducts.filter(p => p.categoria?.nome === section.categoryName);
                // Passamos o categoryName para criar o link correto do botão "Ver Todos"
                renderProductRow(filteredProducts, section.containerId, section.categoryName);
                initSwiper(section.swiperClass, section.prev, section.next);
            });

            addCartButtonListeners();

        } catch (error) {
            console.error("Falha ao carregar produtos:", error);
            sectionsToBuild.forEach(section => {
                 const container = document.getElementById(section.containerId);
                 if (container) {
                     container.innerHTML = `<p style="padding: 20px; text-align: center; color: #ff4444;">Erro de conexão.</p>`;
                 }
            });
        }
    };

    fetchAndDistributeProducts();
});