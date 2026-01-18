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

    let allProducts = [];

    const formatPrice = (price) => typeof price === 'number' ? `R$ ${price.toFixed(2).replace('.', ',')}` : 'R$ --,--';

    const getImageUrl = (path) => {
        if (!path) return 'FRONT/assets/images/placeholder-product.jpg';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${BASE_URL}/${cleanPath}`;
    };

    const renderProductRow = (productsToRender, containerId, categoryName) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (productsToRender && productsToRender.length > 0) {
            const limitedProducts = productsToRender.slice(0, 5);

            let htmlContent = limitedProducts.map((product, index) => {
                // OTIMIZAÇÃO: Prioridade alta para os primeiros itens
                const isPriority = index < 4;
                const loadingAttr = isPriority ? 'eager' : 'lazy';
                const priorityAttr = isPriority ? 'high' : 'auto';

                return `
                <div class="swiper-slide">
                    <div class="product-card" data-id="${product.id}">
                        <a href="/FRONT/produto/HTML/produto.html?id=${product.id}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${getImageUrl(product.imagemUrl)}" 
                                     alt="${product.nome}"
                                     loading="${loadingAttr}"
                                     fetchpriority="${priorityAttr}"
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
                </div>
            `}).join("");

            const seeAllLink = `/FRONT/catalogo/HTML/catalogo.html?search=${encodeURIComponent(categoryName)}`;
            htmlContent += `
                <div class="swiper-slide">
                    <a href="${seeAllLink}" class="see-all-card">
                        <span>Ver Todos</span><h3>${categoryName}</h3><i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
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
                scrollbar: { el: `${containerClass} .swiper-scrollbar`, draggable: true },
                navigation: { nextEl: navNextClass, prevEl: navPrevClass },
                breakpoints: { 320: { spaceBetween: 15 }, 640: { spaceBetween: 20 }, 1024: { spaceBetween: 24 } }
            });
        } catch (e) { console.error(e); }
    };

    const addCartButtonListeners = () => {
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                e.preventDefault(); e.stopPropagation();
                const btn = e.target.closest('.add-to-cart-btn');
                const productId = btn.dataset.productId;

                if (window.quickViewApp?.openQuickView) {
                    window.quickViewApp.openQuickView(productId);
                } else if (window.catalogApp?.quickViewSystem?.openQuickView) {
                    window.catalogApp.quickViewSystem.openQuickView(productId);
                } else {
                    const product = allProducts.find(p => p.id == productId);
                    if(product && window.addToCart) {
                         window.addToCart({
                            id: product.id.toString(), name: product.nome, price: product.preco,
                            image: getImageUrl(product.imagemUrl), size: 'Único', quantity: 1
                        });
                        alert(`${product.nome} adicionado!`);
                    } else {
                        window.location.href = `/FRONT/produto/HTML/produto.html?id=${productId}`;
                    }
                }
            }
        });
    };

    const fetchAndDistributeProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            allProducts = response.data; 

            // Renderiza rápido no próximo frame
            requestAnimationFrame(() => {
                sectionsToBuild.forEach((section) => {
                    const filteredProducts = allProducts.filter(p => p.categoria?.nome === section.categoryName);
                    renderProductRow(filteredProducts, section.containerId, section.categoryName);
                    initSwiper(section.swiperClass, section.prev, section.next);
                });
                addCartButtonListeners();
            });

        } catch (error) {
            console.error("Falha API:", error);
        }
    };

    fetchAndDistributeProducts();
});