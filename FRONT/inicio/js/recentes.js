document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`; 

    const sectionsToBuild = [
        { categoryName: "Air Max TN", containerId: "products-95", swiperClass: ".collection-swiper-95", prev: ".collection-prev-95", next: ".collection-next-95" },
        { categoryName: "Asics Gel NYC", containerId: "products-dn", swiperClass: ".collection-swiper-dn", prev: ".collection-prev-dn", next: ".collection-next-dn" },
        { categoryName: "Bape Sta", containerId: "products-tn", swiperClass: ".collection-swiper-tn", prev: ".collection-prev-tn", next: ".collection-next-tn" },
    ];

    const formatPrice = (price) => typeof price === 'number' ? `R$ ${price.toFixed(2).replace('.', ',')}` : 'R$ --,--';

    const getImageUrl = (path) => {
        if (!path) return 'FRONT/assets/images/placeholder-product.jpg';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${BASE_URL}/${cleanPath}`;
    };

    /**
     * Configura os eventos de clique nos botões "Comprar"
     */
    const setupBuyButtons = () => {
        const buyButtons = document.querySelectorAll('.add-to-cart-btn');
        buyButtons.forEach(button => {
            // Remove ouvintes antigos para evitar duplicidade ao atualizar a seção
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.currentTarget.dataset.productId;
                
                // Tenta abrir o Quick View global (definido no main.js/header.js)
                if (window.quickViewApp && typeof window.quickViewApp.openQuickView === 'function') {
                    window.quickViewApp.openQuickView(productId);
                } else {
                    // Backup: Redireciona para a página do produto se o quickview falhar
                    window.location.href = `/FRONT/produto/HTML/produto.html?id=${productId}`;
                }
            });
        });
    };

    const renderProductRow = (productsToRender, containerId, categoryName) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (productsToRender && productsToRender.length > 0) {
            const limitedProducts = productsToRender.slice(0, 4);
            let htmlContent = limitedProducts.map((product, index) => {
                const isPriority = index < 2; 
                // Note que o imagemUrl é ajustado para .webp dinamicamente se necessário no seu back
                return `
                <div class="swiper-slide">
                    <div class="product-card" data-id="${product.id}">
                        <a href="/FRONT/produto/HTML/produto.html?id=${product.id}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${getImageUrl(product.imagemUrl)}" 
                                     alt="${product.nome}"
                                     loading="${isPriority ? 'eager' : 'lazy'}"
                                     fetchpriority="${isPriority ? 'high' : 'auto'}"
                                     decoding="async"
                                     width="300" height="300">
                            </div>
                            <div class="product-info">
                                <span class="product-brand">${product.marca?.nome || 'Japa Universe'}</span>
                                <h3 class="product-name">${product.nome || 'Produto'}</h3>
                                <div class="product-shipping-tag"><i class="fas fa-truck"></i><span>Frete Grátis</span></div>
                                <p class="product-price">${formatPrice(product.preco)}</p>
                            </div>
                        </a>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">Comprar</button>
                    </div>
                </div>`}).join("");

            const seeAllLink = `/FRONT/catalogo/HTML/catalogo.html?search=${encodeURIComponent(categoryName)}`;
            htmlContent += `
                <div class="swiper-slide">
                    <a href="${seeAllLink}" class="see-all-card">
                        <span>Ver Todos</span><h3>${categoryName}</h3><i class="fas fa-arrow-right"></i>
                    </a>
                </div>`;
            container.innerHTML = htmlContent;
        } else {
            container.innerHTML = `<div class="swiper-slide"><p style="padding: 20px; text-align: center; color: #666;">Indisponível.</p></div>`;
        }
    };

    const initSwiper = (containerClass, navPrevClass, navNextClass) => {
        const swiperEl = document.querySelector(containerClass);
        if (!swiperEl || swiperEl.swiper) return;
        try {
            new Swiper(containerClass, {
                slidesPerView: "auto", spaceBetween: 24, freeMode: true, grabCursor: true,
                navigation: { nextEl: navNextClass, prevEl: navPrevClass },
                breakpoints: { 320: { spaceBetween: 15 }, 640: { spaceBetween: 20 }, 1024: { spaceBetween: 24 } }
            });
        } catch (e) { console.error(e); }
    };

    const distribute = (products) => {
        sectionsToBuild.forEach((section) => {
            const filteredProducts = products.filter(p => p.categoria?.nome === section.categoryName);
            renderProductRow(filteredProducts, section.containerId, section.categoryName);
            initSwiper(section.swiperClass, section.prev, section.next);
        });
        // Após injetar no DOM, ativa os botões
        setupBuyButtons();
    };

    const fetchAndDistributeProducts = async () => {
        const cachedData = localStorage.getItem("japa_products_cache");
        if (cachedData) {
            distribute(JSON.parse(cachedData));
        }

        try {
            const response = await axios.get(API_URL);
            const allProducts = response.data; 
            localStorage.setItem("japa_products_cache", JSON.stringify(allProducts));
            
            // Re-distribui se os dados da API forem diferentes ou se não houver cache
            requestAnimationFrame(() => distribute(allProducts));
        } catch (error) { 
            console.error("Erro API:", error); 
        }
    };

    fetchAndDistributeProducts();
});