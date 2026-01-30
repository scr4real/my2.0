/**
 * JAPA UNIVERSE - RECENTES JS (VERSÃO CORRIGIDA)
 * Animações de preço sem piscadas ou reexecução
 */
document.addEventListener("DOMContentLoaded", () => {
    // Inicializa tracker global se não existir
    if (!window.animationTracker) {
        window.animationTracker = {
            priceAnimations: new Set(),
            scrollAnimations: new Set(),
            heroAnimated: false,
            
            isPriceAnimated: function(id) {
                return this.priceAnimations.has(id);
            },
            
            markPriceAnimated: function(id) {
                this.priceAnimations.add(id);
            },
            
            isScrollAnimated: function(id) {
                return this.scrollAnimations.has(id);
            },
            
            markScrollAnimated: function(id) {
                this.scrollAnimations.add(id);
            },
            
            isHeroAnimated: function() {
                return this.heroAnimated;
            },
            
            markHeroAnimated: function() {
                this.heroAnimated = true;
            }
        };
    }

    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';
    const API_URL = `${BASE_URL}/api/produtos`; 

    const sectionsToBuild = [
        { categoryName: "Air Max TN", containerId: "products-95", swiperClass: ".collection-swiper-95", prev: ".collection-prev-95", next: ".collection-next-95" },
        { categoryName: "Asics Gel NYC", containerId: "products-dn", swiperClass: ".collection-swiper-dn", prev: ".collection-prev-dn", next: ".collection-next-dn" },
        { categoryName: "Bape Sta", containerId: "products-tn", swiperClass: ".collection-swiper-tn", prev: ".collection-prev-tn", next: ".collection-next-tn" },
    ];

    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return `R$ ${price.toFixed(2).replace('.', ',')}`;
        }
        return 'R$ --,--';
    };

    const getImageUrl = (path) => {
        if (!path) return 'FRONT/assets/images/placeholder-product.jpg';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${BASE_URL}/${cleanPath}`;
    };

    /**
     * ANIMAÇÃO DE PREÇO CORRIGIDA (SEM PISCADA)
     */
    const animatePriceCounter = (containerId) => {
        const container = document.getElementById(containerId);
        const cards = container?.querySelectorAll(".product-card");
        
        if (!cards?.length || typeof gsap === "undefined") {
            // Se GSAP não estiver disponível, garante que preços estão visíveis
            cards?.forEach(card => {
                const priceElement = card.querySelector(".product-price");
                if (priceElement) {
                    priceElement.style.opacity = "1";
                    priceElement.style.transform = "none";
                }
            });
            return;
        }

        // Aguarda ScrollTrigger estar disponível
        const checkScrollTrigger = () => {
            if (typeof ScrollTrigger !== 'undefined') {
                setupPriceAnimations(containerId, cards);
            } else {
                setTimeout(checkScrollTrigger, 100);
            }
        };
        
        checkScrollTrigger();
    };

    /**
     * Configura animações de preço com ScrollTrigger
     */
    const setupPriceAnimations = (containerId, cards) => {
        cards.forEach((card, index) => {
            const priceElement = card.querySelector(".product-price");
            if (!priceElement) return;

            // ID único para tracking
            const cardId = `price-${containerId}-${index}-${card.dataset.id || Date.now()}`;
            
            // Verifica se já foi animado
            if (window.animationTracker.isPriceAnimated(cardId) || 
                priceElement.dataset.priceAnimated === "true" ||
                priceElement.dataset.priceAnimated === "completed") {
                return;
            }

            // Marca como sendo processado
            priceElement.dataset.priceAnimated = "processing";
            window.animationTracker.markPriceAnimated(cardId);

            // Extrai valor do preço
            const priceText = extractPriceValue(priceElement.textContent);
            if (priceText === null) {
                priceElement.dataset.priceAnimated = "completed";
                return;
            }

            // Configura ScrollTrigger com once: true
            ScrollTrigger.create({
                trigger: card,
                start: "top 85%",
                once: true, // EXECUTA APENAS UMA VEZ
                markers: false,
                onEnter: () => {
                    executePriceAnimation(priceElement, priceText, card, cardId);
                },
                onEnterBack: () => {}, // Não faz nada
                onLeave: () => {}, // Não faz nada
                onLeaveBack: () => {} // Não faz nada
            });
        });
    };

    /**
     * Extrai valor numérico do texto do preço
     */
    const extractPriceValue = (priceText) => {
        try {
            const cleanText = priceText
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim();
            
            const value = parseFloat(cleanText);
            return isNaN(value) ? null : value;
        } catch (e) {
            console.warn('Erro ao extrair valor do preço:', e);
            return null;
        }
    };

    /**
     * Executa animação do preço
     */
    const executePriceAnimation = (priceElement, finalValue, card, cardId) => {
        if (priceElement.dataset.priceAnimated === "completed") {
            return;
        }

        // Guarda texto original para fallback
        const originalText = priceElement.textContent;
        const counter = { value: 0 };
        
        // Otimização para animação
        priceElement.style.willChange = "contents";
        priceElement.style.backfaceVisibility = "hidden";
        priceElement.style.webkitFontSmoothing = "antialiased";

        // Animação do contador
        const animation = gsap.to(counter, {
            value: finalValue,
            duration: 1.2,
            ease: "power2.out",
            overwrite: true, // Previne múltiplas animações
            onUpdate: () => {
                priceElement.textContent = formatPrice(counter.value);
            },
            onComplete: () => {
                // Garante valor final exato
                priceElement.textContent = formatPrice(finalValue);
                priceElement.dataset.priceAnimated = "completed";
                
                // Limpa otimizações
                priceElement.style.willChange = "auto";
                priceElement.style.backfaceVisibility = "";
                priceElement.style.webkitFontSmoothing = "";
                
                // Marca como concluído no tracker
                if (window.animationTracker) {
                    window.animationTracker.markPriceAnimated(cardId);
                }
            },
            onInterrupt: () => {
                // Se interrompido, garante valor final
                priceElement.textContent = formatPrice(finalValue);
                priceElement.dataset.priceAnimated = "completed";
                priceElement.style.willChange = "auto";
            }
        });

        // Adiciona referência para possível cancelamento
        card._priceAnimation = animation;
    };

    /**
     * Renderiza produtos em uma seção
     */
    const renderProductRow = (productsToRender, containerId, categoryName) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (productsToRender && productsToRender.length > 0) {
            const limitedProducts = productsToRender.slice(0, 4);
            let htmlContent = limitedProducts.map((product, index) => {
                const isPriority = index < 2; 
                const productId = product.id || `product-${categoryName}-${index}`;
                
                return `
                <div class="swiper-slide">
                    <div class="product-card" data-id="${productId}" data-category="${categoryName}">
                        <a href="/FRONT/produto/HTML/produto.html?id=${product.id || productId}" class="product-card-link">
                            <div class="product-image-wrapper">
                                <img src="${getImageUrl(product.imagemUrl)}" 
                                     alt="${product.nome}"
                                     loading="${isPriority ? 'eager' : 'lazy'}"
                                     fetchpriority="${isPriority ? 'high' : 'auto'}"
                                     decoding="async"
                                     width="300" 
                                     height="300">
                            </div>
                            <div class="product-info">
                                <span class="product-brand">${product.marca?.nome || 'Japa Universe'}</span>
                                <h3 class="product-name">${product.nome || 'Produto'}</h3>
                                <div class="product-shipping-tag">
                                    <i class="fas fa-truck"></i>
                                    <span>Frete Grátis</span>
                                </div>
                                <p class="product-price" data-original-price="${product.preco || 0}">
                                    ${formatPrice(product.preco)}
                                </p>
                            </div>
                        </a>
                        <button class="add-to-cart-btn" data-product-id="${product.id || productId}">
                            Comprar
                        </button>
                    </div>
                </div>`;
            }).join("");

            const seeAllLink = `/FRONT/catalogo/HTML/catalogo.html?search=${encodeURIComponent(categoryName)}`;
            htmlContent += `
                <div class="swiper-slide">
                    <a href="${seeAllLink}" class="see-all-card">
                        <span>Ver Todos</span>
                        <h3>${categoryName}</h3>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>`;
            
            container.innerHTML = htmlContent;
            
            // Configura eventos dos botões
            setupAddToCartButtons(container);
            
            // Inicia animações de preço com delay
            setTimeout(() => {
                animatePriceCounter(containerId);
            }, 300);
            
        } else {
            container.innerHTML = `
                <div class="swiper-slide">
                    <div class="no-products-message">
                        <p>Nenhum produto disponível no momento.</p>
                        <a href="/FRONT/catalogo/HTML/catalogo.html" class="btn btn-outline">
                            Ver todos os produtos
                        </a>
                    </div>
                </div>`;
        }
    };

    /**
     * Configura eventos dos botões "Comprar"
     */
    const setupAddToCartButtons = (container) => {
        const buttons = container.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = button.dataset.productId;
                const productCard = button.closest('.product-card');
                
                if (!productCard) return;
                
                // Coleta dados do produto
                const productName = productCard.querySelector('.product-name')?.textContent || 'Produto';
                const productPrice = parseFloat(
                    productCard.querySelector('.product-price')?.dataset.originalPrice || '0'
                );
                const productImage = productCard.querySelector('img')?.src || '';
                
                // Cria objeto do produto
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    size: '41', // Tamanho padrão
                    category: productCard.dataset.category || 'Geral'
                };
                
                // Adiciona ao carrinho (função global do main.js)
                if (typeof window.addToCart === 'function') {
                    window.addToCart(product);
                    
                    // Feedback visual
                    const originalText = button.textContent;
                    button.textContent = '✓ Adicionado!';
                    button.style.backgroundColor = 'var(--success-color, #28a745)';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                    }, 2000);
                } else {
                    console.error('Função addToCart não disponível');
                    alert('Erro ao adicionar ao carrinho. Recarregue a página.');
                }
            });
        });
    };

    /**
     * Inicializa Swiper para uma seção
     */
    const initSwiper = (containerClass, navPrevClass, navNextClass) => {
        const swiperEl = document.querySelector(containerClass);
        if (!swiperEl || swiperEl.swiper) return;
        
        try {
            new Swiper(containerClass, {
                slidesPerView: "auto",
                spaceBetween: 24,
                freeMode: true,
                grabCursor: true,
                resistance: true,
                resistanceRatio: 0.5,
                navigation: {
                    nextEl: navNextClass,
                    prevEl: navPrevClass,
                    disabledClass: 'swiper-button-disabled'
                },
                scrollbar: {
                    el: '.swiper-scrollbar',
                    draggable: true,
                    hide: false
                },
                breakpoints: {
                    320: {
                        spaceBetween: 15,
                        slidesOffsetBefore: 16,
                        slidesOffsetAfter: 16
                    },
                    640: {
                        spaceBetween: 20,
                        slidesOffsetBefore: 20,
                        slidesOffsetAfter: 20
                    },
                    1024: {
                        spaceBetween: 24,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0
                    }
                },
                on: {
                    init: function() {
                        // Marca como inicializado
                        this.el.dataset.swiperInitialized = "true";
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao inicializar Swiper:', error);
        }
    };

    /**
     * Distribui produtos pelas seções
     */
    const distributeProducts = (products) => {
        if (!products || !Array.isArray(products)) {
            console.error('Dados de produtos inválidos:', products);
            return;
        }

        sectionsToBuild.forEach((section) => {
            // Filtra produtos por categoria
            const filteredProducts = products.filter(p => {
                if (!p || !p.categoria) return false;
                return p.categoria.nome === section.categoryName || 
                       p.nome?.toLowerCase().includes(section.categoryName.toLowerCase());
            });
            
            // Renderiza a seção
            renderProductRow(filteredProducts, section.containerId, section.categoryName);
            
            // Inicializa Swiper com delay para garantir DOM renderizado
            setTimeout(() => {
                initSwiper(section.swiperClass, section.prev, section.next);
            }, 100);
        });
    };

    /**
     * Busca e distribui produtos
     */
    const fetchAndDistributeProducts = async () => {
        // Tenta usar cache primeiro para resposta mais rápida
        const cachedData = localStorage.getItem("japa_products_cache");
        const cacheTimestamp = localStorage.getItem("japa_products_cache_timestamp");
        const now = Date.now();
        const cacheValid = cacheTimestamp && (now - parseInt(cacheTimestamp)) < (5 * 60 * 1000); // 5 minutos
        
        if (cachedData && cacheValid) {
            try {
                const parsedData = JSON.parse(cachedData);
                distributeProducts(parsedData);
            } catch (e) {
                console.warn('Cache inválido, buscando da API...');
                localStorage.removeItem("japa_products_cache");
                localStorage.removeItem("japa_products_cache_timestamp");
            }
        }

        // Busca dados atualizados da API
        try {
            const response = await axios.get(API_URL, {
                timeout: 10000, // 10 segundos timeout
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            const allProducts = response.data;
            
            if (allProducts && Array.isArray(allProducts)) {
                // Atualiza cache
                localStorage.setItem("japa_products_cache", JSON.stringify(allProducts));
                localStorage.setItem("japa_products_cache_timestamp", now.toString());
                
                // Distribui produtos
                distributeProducts(allProducts);
            } else {
                console.error('Formato de dados inválido da API:', allProducts);
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            
            // Se falhar e não tiver cache, mostra mensagem de erro
            if (!cachedData || !cacheValid) {
                sectionsToBuild.forEach(section => {
                    const container = document.getElementById(section.containerId);
                    if (container) {
                        container.innerHTML = `
                            <div class="swiper-slide">
                                <div class="error-message">
                                    <p>Erro ao carregar produtos.</p>
                                    <button onclick="fetchAndDistributeProducts()" class="btn btn-outline">
                                        Tentar novamente
                                    </button>
                                </div>
                            </div>`;
                    }
                });
            }
        }
    };

    /**
     * Configura observador para lazy loading de imagens
     */
    const setupImageObservers = () => {
        if (!('IntersectionObserver' in window)) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px',
            threshold: 0.1
        });
        
        // Observa imagens após um tempo
        setTimeout(() => {
            document.querySelectorAll('.product-image-wrapper img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }, 1000);
    };

    /**
     * Inicialização principal
     */
    const init = () => {
        // Verifica se GSAP está disponível
        if (typeof gsap === 'undefined') {
            console.warn('GSAP não carregado. Animações de preço desativadas.');
            
            // Fallback: mostra preços normalmente
            setTimeout(() => {
                document.querySelectorAll('.product-price').forEach(priceEl => {
                    priceEl.style.opacity = '1';
                    priceEl.style.transform = 'none';
                });
            }, 500);
        }
        
        // Busca e distribui produtos
        fetchAndDistributeProducts();
        
        // Configura observadores de imagem
        setupImageObservers();
        
        // Configura botões de navegação
        setupNavigationButtons();
        
        // Adiciona classes para controle
        document.body.classList.add('recentes-loaded');
    };

    /**
     * Configura eventos dos botões de navegação
     */
    const setupNavigationButtons = () => {
        sectionsToBuild.forEach(section => {
            const prevBtn = document.querySelector(section.prev);
            const nextBtn = document.querySelector(section.next);
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    const swiper = document.querySelector(section.swiperClass)?.swiper;
                    if (swiper) swiper.slidePrev();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    const swiper = document.querySelector(section.swiperClass)?.swiper;
                    if (swiper) swiper.slideNext();
                });
            }
        });
    };

    /**
     * Funções utilitárias para debug
     */
    window.recentesDebug = {
        resetPriceAnimations: () => {
            if (window.animationTracker) {
                window.animationTracker.priceAnimations.clear();
            }
            
            document.querySelectorAll('[data-price-animated]').forEach(el => {
                el.removeAttribute('data-price-animated');
            });
            
            sectionsToBuild.forEach(section => {
                animatePriceCounter(section.containerId);
            });
            
            console.log('Animações de preço resetadas');
        },
        
        getAnimationStatus: () => {
            if (!window.animationTracker) return { error: 'Tracker não inicializado' };
            
            return {
                priceAnimations: window.animationTracker.priceAnimations.size,
                scrollAnimations: window.animationTracker.scrollAnimations.size,
                heroAnimated: window.animationTracker.heroAnimated
            };
        },
        
        forcePriceAnimation: (containerId) => {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error('Container não encontrado:', containerId);
                return;
            }
            
            const cards = container.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                const priceElement = card.querySelector('.product-price');
                if (!priceElement) return;
                
                const priceText = extractPriceValue(priceElement.textContent);
                if (priceText === null) return;
                
                const cardId = `forced-${containerId}-${index}`;
                executePriceAnimation(priceElement, priceText, card, cardId);
            });
        }
    };

    // Aguarda um pouco antes de iniciar para não competir com outras inicializações
    const startDelay = window.animationTracker?.isHeroAnimated() ? 300 : 800;
    
    setTimeout(() => {
        // Verifica se o DOM está estável
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }, startDelay);
});