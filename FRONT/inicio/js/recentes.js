document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`;
    const CACHE_KEY = "japa_products_cache";
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

    const sectionsToBuild = [
        { 
            categoryName: "Air Max TN", 
            containerId: "products-95", 
            swiperClass: ".collection-swiper-95", 
            prev: ".collection-prev-95", 
            next: ".collection-next-95" 
        },
        { 
            categoryName: "Asics Gel NYC", 
            containerId: "products-dn", 
            swiperClass: ".collection-swiper-dn", 
            prev: ".collection-prev-dn", 
            next: ".collection-next-dn" 
        },
        { 
            categoryName: "Bape Sta", 
            containerId: "products-tn", 
            swiperClass: ".collection-swiper-tn", 
            prev: ".collection-prev-tn", 
            next: ".collection-next-tn" 
        },
    ];

    const formatPrice = (price) => {
        if (typeof price !== 'number' || isNaN(price)) {
            return 'R$ --,--';
        }
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    };

    const getImageUrl = (path) => {
        if (!path) return '/FRONT/assets/images/placeholder-product.jpg';
        if (path.startsWith('http')) return path;
        
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${BASE_URL}/${cleanPath}`;
    };

    const isCacheValid = () => {
        const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
        if (!cachedTimestamp) return false;
        
        const now = Date.now();
        return (now - parseInt(cachedTimestamp)) < CACHE_DURATION;
    };

    const getCachedData = () => {
        if (!isCacheValid()) {
            localStorage.removeItem(CACHE_KEY);
            localStorage.removeItem(`${CACHE_KEY}_timestamp`);
            return null;
        }
        
        const cachedData = localStorage.getItem(CACHE_KEY);
        return cachedData ? JSON.parse(cachedData) : null;
    };

    const setCacheData = (data) => {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
        } catch (e) {
            console.warn("Falha ao salvar cache:", e);
            // Limpa cache antigo se storage estiver cheio
            localStorage.clear();
        }
    };

    /**
     * Efeito velocímetro nos preços
     */
    const animatePriceCounter = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const cards = container.querySelectorAll(".product-card");
        if (!cards.length || typeof gsap === "undefined") return;

        cards.forEach(card => {
            const priceElement = card.querySelector(".product-price");
            if (!priceElement || priceElement.dataset.animated === "true") return;

            const priceText = priceElement.textContent.replace('R$', '').trim();
            const finalValue = parseFloat(priceText.replace('.', '').replace(',', '.'));
            
            if (isNaN(finalValue)) return;

            const counter = { value: 0 };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && priceElement.dataset.animated !== "true") {
                        priceElement.dataset.animated = "true";
                        
                        gsap.to(counter, {
                            value: finalValue,
                            duration: 1.5,
                            ease: "power2.out",
                            onUpdate: () => {
                                priceElement.textContent = formatPrice(counter.value);
                            },
                            onComplete: () => {
                                priceElement.textContent = formatPrice(finalValue);
                                observer.disconnect();
                            }
                        });
                    }
                });
            }, { threshold: 0.1, rootMargin: "50px" });

            observer.observe(card);
        });
    };

    const renderProductRow = (productsToRender, containerId, categoryName) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} não encontrado`);
            return;
        }

        // Limpa o container antes de renderizar
        container.innerHTML = '';

        if (!productsToRender || productsToRender.length === 0) {
            container.innerHTML = `
                <div class="swiper-slide">
                    <div class="empty-product-card">
                        <p>Nenhum produto disponível na categoria ${categoryName}</p>
                    </div>
                </div>`;
            return;
        }

        // Ordena por mais recente (assumindo que há campo de data)
        const sortedProducts = [...productsToRender]
            .sort((a, b) => new Date(b.dataCriacao || 0) - new Date(a.dataCriacao || 0))
            .slice(0, 4);

        let htmlContent = sortedProducts.map((product, index) => {
            const isPriority = index < 2;
            const productName = product.nome || 'Produto sem nome';
            const brandName = product.marca?.nome || 'Japa Universe';
            const price = product.preco ? formatPrice(product.preco) : 'R$ --,--';
            const imageUrl = getImageUrl(product.imagemUrl);
            const productUrl = `/FRONT/produto/HTML/produto.html?id=${product.id}`;

            return `
            <div class="swiper-slide">
                <div class="product-card" data-id="${product.id}">
                    <a href="${productUrl}" class="product-card-link" aria-label="${productName} - ${brandName}">
                        <div class="product-image-wrapper">
                            <img src="${imageUrl}" 
                                 alt="${productName}"
                                 loading="${isPriority ? 'eager' : 'lazy'}"
                                 width="300" 
                                 height="300"
                                 onerror="this.src='/FRONT/assets/images/placeholder-product.jpg'">
                        </div>
                        <div class="product-info">
                            <span class="product-brand">${brandName}</span>
                            <h3 class="product-name">${productName}</h3>
                            <div class="product-shipping-tag">
                                <i class="fas fa-truck" aria-hidden="true"></i>
                                <span>Frete Grátis</span>
                            </div>
                            <p class="product-price" data-price="${product.preco || 0}">${price}</p>
                        </div>
                    </a>
                    <button class="add-to-cart-btn" 
                            data-product-id="${product.id}"
                            aria-label="Adicionar ${productName} ao carrinho">
                        Comprar
                    </button>
                </div>
            </div>`;
        }).join("");

        const seeAllLink = `/FRONT/catalogo/HTML/catalogo.html?search=${encodeURIComponent(categoryName)}`;
        htmlContent += `
            <div class="swiper-slide">
                <a href="${seeAllLink}" class="see-all-card" aria-label="Ver todos os ${categoryName}">
                    <span>Ver Todos</span>
                    <h3>${categoryName}</h3>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
            </div>`;

        container.innerHTML = htmlContent;

        // Adiciona event listeners aos botões de compra
        container.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });

        // Inicia animação dos preços
        requestAnimationFrame(() => {
            setTimeout(() => animatePriceCounter(containerId), 50);
        });
    };

    const handleAddToCart = (event) => {
        event.preventDefault();
        const button = event.currentTarget;
        const productId = button.dataset.productId;
        
        if (!productId) {
            console.warn("ID do produto não encontrado");
            return;
        }

        // Adiciona feedback visual
        const originalText = button.textContent;
        button.textContent = "Adicionando...";
        button.disabled = true;

        // Simula adição ao carrinho (substitua pela sua lógica real)
        setTimeout(() => {
            console.log(`Produto ${productId} adicionado ao carrinho`);
            button.textContent = "✓ Adicionado";
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        }, 500);
    };

    const initSwiper = (containerClass, navPrevClass, navNextClass) => {
        const swiperEl = document.querySelector(containerClass);
        if (!swiperEl || swiperEl.swiper) return;
        
        try {
            const swiper = new Swiper(containerClass, {
                slidesPerView: 'auto',
                spaceBetween: 24,
                freeMode: true,
                grabCursor: true,
                resistanceRatio: 0.5,
                navigation: {
                    nextEl: navNextClass,
                    prevEl: navPrevClass,
                    disabledClass: 'swiper-button-disabled'
                },
                breakpoints: {
                    320: {
                        spaceBetween: 12,
                        slidesOffsetBefore: 16,
                        slidesOffsetAfter: 16
                    },
                    640: {
                        spaceBetween: 16,
                        slidesOffsetBefore: 24,
                        slidesOffsetAfter: 24
                    },
                    1024: {
                        spaceBetween: 24,
                        slidesOffsetBefore: 32,
                        slidesOffsetAfter: 32
                    }
                }
            });

            // Adiciona classe quando Swiper estiver no início/fim
            swiper.on('reachEnd', () => {
                swiperEl.classList.add('is-end');
                swiperEl.classList.remove('is-beginning');
            });

            swiper.on('reachBeginning', () => {
                swiperEl.classList.add('is-beginning');
                swiperEl.classList.remove('is-end');
            });

            swiper.on('fromEdge', () => {
                swiperEl.classList.remove('is-end', 'is-beginning');
            });

        } catch (error) {
            console.error(`Erro ao inicializar Swiper ${containerClass}:`, error);
        }
    };

    const distributeProducts = (products) => {
        if (!Array.isArray(products)) {
            console.error("Dados de produtos inválidos");
            return;
        }

        sectionsToBuild.forEach((section) => {
            const filteredProducts = products.filter(p => 
                p.categoria?.nome === section.categoryName
            );
            
            renderProductRow(filteredProducts, section.containerId, section.categoryName);
            
            // Inicializa Swiper após um pequeno delay para garantir que o DOM foi renderizado
            setTimeout(() => {
                initSwiper(section.swiperClass, section.prev, section.next);
            }, 100);
        });
    };

    const fetchProducts = async () => {
        let products = getCachedData();
        
        // Se tem cache válido, usa ele
        if (products) {
            console.log("Usando dados do cache");
            distributeProducts(products);
        }

        try {
            console.log("Buscando dados da API...");
            const response = await axios.get(API_URL, {
                timeout: 10000, // 10 segundos timeout
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            if (response.status === 200 && Array.isArray(response.data)) {
                const freshProducts = response.data;
                setCacheData(freshProducts);
                
                // Atualiza a interface com os dados frescos
                if (!products || JSON.stringify(products) !== JSON.stringify(freshProducts)) {
                    distributeProducts(freshProducts);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            
            // Se não há cache e a API falhou, mostra mensagem de erro
            if (!products) {
                sectionsToBuild.forEach(section => {
                    const container = document.getElementById(section.containerId);
                    if (container) {
                        container.innerHTML = `
                            <div class="swiper-slide">
                                <div class="error-card">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <p>Erro ao carregar produtos</p>
                                    <button onclick="window.location.reload()" class="retry-btn">
                                        Tentar novamente
                                    </button>
                                </div>
                            </div>`;
                    }
                });
            }
        }
    };

    const init = () => {
        // Verifica se todas as dependências estão carregadas
        if (typeof Swiper === 'undefined') {
            console.error("Swiper não carregado");
            return;
        }

        if (typeof axios === 'undefined') {
            console.error("Axios não carregado");
            return;
        }

        // Inicia o carregamento dos produtos
        fetchProducts();

        // Atualiza automaticamente a cada 5 minutos
        setInterval(fetchProducts, CACHE_DURATION);
    };

    // Inicializa quando o DOM estiver pronto
    init();
});