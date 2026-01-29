/**
 * JAPA UNIVERSE - MAIN JS (VERSÃO FINAL SEM BUGS)
 * Animações suaves sem piscadas ou reexecução
 */
(function() {
    const API_BASE = window.location.hostname.includes('localhost') 
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';

    // Controle global de animações executadas
    const animationTracker = {
        heroAnimated: false,
        priceAnimations: new Set(),
        scrollAnimations: new Set(),
        
        markHeroAnimated: function() {
            this.heroAnimated = true;
            document.body.classList.add('hero-animation-complete');
        },
        
        isHeroAnimated: function() {
            return this.heroAnimated;
        },
        
        markPriceAnimated: function(id) {
            this.priceAnimations.add(id);
        },
        
        isPriceAnimated: function(id) {
            return this.priceAnimations.has(id);
        },
        
        markScrollAnimated: function(id) {
            this.scrollAnimations.add(id);
        },
        
        isScrollAnimated: function(id) {
            return this.scrollAnimations.has(id);
        }
    };

    // Expõe para outros arquivos JS
    window.animationTracker = animationTracker;

    /**
     * Módulo de Carregamento Otimizado
     */
    const LoadingModule = {
        hide: function() {
            const loader = document.querySelector(".loading-overlay");
            if (!loader) {
                this.startHeroAnimation();
                return;
            }

            // Garante que o loader cubra tudo até animações terminarem
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--background);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            // Espera recursos críticos carregarem
            const startTime = Date.now();
            const minLoadTime = 800; // Tempo mínimo de loading
            
            const checkResources = () => {
                const resourcesLoaded = document.readyState === 'complete';
                const elapsedTime = Date.now() - startTime;
                
                if (resourcesLoaded && elapsedTime >= minLoadTime) {
                    this.fadeOutLoader(loader);
                } else if (elapsedTime >= 1500) { // Timeout de segurança
                    this.fadeOutLoader(loader);
                } else {
                    setTimeout(checkResources, 100);
                }
            };
            
            checkResources();
        },
        
        fadeOutLoader: function(loader) {
            loader.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.style.display = 'none';
                }
                this.startHeroAnimation();
            }, 600);
        },
        
        startHeroAnimation: function() {
            // Pequeno delay para garantir estabilidade após loader
            setTimeout(() => {
                if (!animationTracker.isHeroAnimated()) {
                    EpicHeroAnimations.init();
                }
            }, 50);
        }
    };

    /**
     * MÓDULO DE ANIMAÇÕES DO HERO (SEM PISCADA)
     */
    const EpicHeroAnimations = {
        init: function() {
            if (this.initializing || animationTracker.isHeroAnimated()) {
                return;
            }
            
            this.initializing = true;
            
            // Garante que elementos estão invisíveis antes de animar
            this.hideHeroElements();
            
            // Pequeno delay para sincronizar com render
            requestAnimationFrame(() => {
                setTimeout(() => {
                    this.animateHeroSection();
                }, 50);
            });
        },
        
        hideHeroElements: function() {
            const selectors = [
                '.hero-bg-image',
                '.hero-title', 
                '.hero-subtitle',
                '.hero-content .btn',
                '.hero-socials a'
            ];
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    // Aplica estilos diretamente para garantir invisibilidade
                    el.style.opacity = '0';
                    el.style.willChange = 'opacity, transform, filter';
                    
                    // Configurações específicas por elemento
                    if (selector === '.hero-bg-image') {
                        el.style.transform = 'scale(1.1)';
                        el.style.filter = 'brightness(1.3) blur(8px)';
                    } else if (selector === '.hero-title') {
                        el.style.transform = 'translateY(30px)';
                    } else if (selector === '.hero-subtitle') {
                        el.style.transform = 'translateY(20px)';
                    } else if (selector === '.hero-content .btn') {
                        el.style.transform = 'translateY(15px)';
                    } else if (selector === '.hero-socials a') {
                        el.style.transform = 'translateY(10px)';
                    }
                });
            });
        },
        
        animateHeroSection: function() {
            if (!window.gsap) {
                this.showHeroElementsDirectly();
                return;
            }
            
            const heroBg = document.querySelector('.hero-bg-image');
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButton = document.querySelector('.hero-content .btn');
            const heroSocials = document.querySelector('.hero-socials');
            
            if (!heroBg || !heroTitle) {
                this.showHeroElementsDirectly();
                return;
            }
            
            // Cria timeline com configurações seguras
            const masterTL = gsap.timeline({
                defaults: { 
                    ease: "power3.out",
                    overwrite: 'auto'
                },
                onComplete: () => {
                    animationTracker.markHeroAnimated();
                    this.initializing = false;
                    
                    // Limpa will-change após animação
                    [heroBg, heroTitle, heroSubtitle, heroButton].forEach(el => {
                        if (el) el.style.willChange = 'auto';
                    });
                }
            });
            
            // 1. ANIMAÇÃO DO BACKGROUND
            masterTL.to(heroBg, {
                opacity: 1,
                scale: 1,
                filter: 'brightness(1) blur(0px)',
                duration: 1.6,
                ease: "power2.out"
            }, 0);
            
            // 2. ANIMAÇÃO DO TÍTULO
            masterTL.to(heroTitle, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "back.out(1.5)"
            }, 0.2);
            
            // 3. ANIMAÇÃO DO SUBTÍTULO
            masterTL.to(heroSubtitle, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out"
            }, 0.6);
            
            // 4. ANIMAÇÃO DO BOTÃO
            if (heroButton) {
                masterTL.to(heroButton, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "back.out(1.3)"
                }, 0.9);
            }
            
            // 5. ANIMAÇÃO DAS REDES SOCIAIS
            if (heroSocials) {
                const socialIcons = heroSocials.querySelectorAll('a');
                masterTL.to(socialIcons, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out"
                }, 1.1);
            }
            
            // Efeito de brilho final no título
            masterTL.to(heroTitle, {
                textShadow: '0 0 15px rgba(255, 102, 0, 0.4)',
                duration: 0.4,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut"
            }, 1.3);
        },
        
        showHeroElementsDirectly: function() {
            const elements = [
                '.hero-bg-image',
                '.hero-title', 
                '.hero-subtitle',
                '.hero-content .btn',
                '.hero-socials a'
            ];
            
            elements.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                    el.style.filter = 'none';
                    el.style.transition = 'none';
                }
            });
            
            animationTracker.markHeroAnimated();
            this.initializing = false;
        },
        
        initializing: false
    };

    /**
     * Módulo de Animações de Preço (SEM REANIMAÇÃO)
     */
    const PriceAnimationsModule = {
        init: function() {
            // Aguarda carregamento completo e Hero animado
            const checkAndInit = () => {
                if (document.readyState === 'complete' && animationTracker.isHeroAnimated()) {
                    this.setupPriceAnimations();
                } else {
                    setTimeout(checkAndInit, 100);
                }
            };
            
            setTimeout(checkAndInit, 500);
        },
        
        setupPriceAnimations: function() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                return;
            }
            
            // Encontra todos os containers de produto
            const productContainers = [
                '#products-95',
                '#products-dn', 
                '#products-tn',
                '.collection-swiper .swiper-slide',
                '.product-card'
            ];
            
            let allProductCards = [];
            
            productContainers.forEach(selector => {
                if (selector.startsWith('#')) {
                    const container = document.querySelector(selector);
                    if (container) {
                        const cards = container.querySelectorAll('.product-card');
                        cards.forEach(card => allProductCards.push(card));
                    }
                } else {
                    const cards = document.querySelectorAll(selector);
                    cards.forEach(card => allProductCards.push(card));
                }
            });
            
            // Remove duplicados
            allProductCards = [...new Set(allProductCards)];
            
            if (!allProductCards.length) {
                // Tenta novamente mais tarde
                setTimeout(() => this.setupPriceAnimations(), 500);
                return;
            }
            
            allProductCards.forEach((card, index) => {
                this.setupCardAnimation(card, index);
            });
        },
        
        setupCardAnimation: function(card, index) {
            // ID único para este card
            const cardId = card.id || `price-card-${index}-${Date.now()}`;
            
            // Verifica se já foi animado
            if (animationTracker.isPriceAnimated(cardId) || card.dataset.priceAnimated === 'true') {
                return;
            }
            
            const priceElement = card.querySelector('.product-price');
            if (!priceElement) return;
            
            // Extrai valor do preço
            const priceText = this.extractPriceValue(priceElement.textContent);
            if (priceText === null) return;
            
            // Marca como sendo processado
            card.dataset.priceAnimated = 'processing';
            animationTracker.markPriceAnimated(cardId);
            
            // Configura animação com ScrollTrigger
            ScrollTrigger.create({
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                once: true, // EXECUTA APENAS UMA VEZ
                markers: false, // Desative em produção
                onEnter: () => this.animatePrice(priceElement, priceText, card),
                onEnterBack: () => {}, // Não faz nada ao voltar
                onLeave: () => {}, // Não faz nada ao sair
                onLeaveBack: () => {} // Não faz nada ao voltar para trás
            });
        },
        
        extractPriceValue: function(priceText) {
            try {
                const cleanText = priceText
                    .replace('R$', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
                    .trim();
                
                const value = parseFloat(cleanText);
                return isNaN(value) ? null : value;
            } catch (e) {
                return null;
            }
        },
        
        animatePrice: function(priceElement, finalValue, card) {
            if (card.dataset.priceAnimated === 'completed') {
                return;
            }
            
            const counter = { value: 0 };
            const originalText = priceElement.textContent;
            
            // Animação do contador
            gsap.to(counter, {
                value: finalValue,
                duration: 1.2,
                ease: "power2.out",
                overwrite: true,
                onUpdate: () => {
                    priceElement.textContent = this.formatPrice(counter.value);
                },
                onComplete: () => {
                    // Garante valor final exato
                    priceElement.textContent = this.formatPrice(finalValue);
                    card.dataset.priceAnimated = 'completed';
                    
                    // Limpa evento após conclusão
                    priceElement.style.willChange = 'auto';
                },
                onInterrupt: () => {
                    // Se interrompido, garante valor final
                    priceElement.textContent = this.formatPrice(finalValue);
                    card.dataset.priceAnimated = 'completed';
                }
            });
            
            // Prepara para animação
            priceElement.style.willChange = 'contents';
        },
        
        formatPrice: function(value) {
            return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
        }
    };

    /**
     * Módulo de Animações Scroll (Newsletter)
     */
    const ScrollAnimationsModule = {
        init: function() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                return;
            }
            
            this.setupNewsletterAnimation();
        },
        
        setupNewsletterAnimation: function() {
            const newsletterContainer = document.querySelector(".newsletter .container");
            if (!newsletterContainer || animationTracker.isScrollAnimated('newsletter')) {
                return;
            }
            
            // Pré-configuração
            gsap.set(newsletterContainer, {
                opacity: 0,
                y: 40
            });
            
            // Animação com ScrollTrigger
            ScrollTrigger.create({
                trigger: ".newsletter",
                start: "top 80%",
                once: true, // Executa apenas uma vez
                onEnter: () => {
                    animationTracker.markScrollAnimated('newsletter');
                    
                    gsap.to(newsletterContainer, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                        overwrite: true
                    });
                }
            });
        }
    };

    /**
     * Módulo do Carrinho
     */
    const CartModule = (function() {
        let cart = null;
        
        const getCart = () => {
            if (!cart) {
                const saved = localStorage.getItem("japaUniverseCart");
                cart = saved ? JSON.parse(saved) : [];
            }
            return cart;
        };
        
        const saveCart = (newCart) => {
            cart = newCart;
            localStorage.setItem("japaUniverseCart", JSON.stringify(cart));
        };
        
        const formatPrice = (p) => `R$ ${Number(p).toFixed(2).replace('.', ',')}`;
        
        return {
            updateUI: function() {
                const currentCart = getCart();
                const container = document.getElementById("cartItemsContainer");
                const countEl = document.querySelector(".cart-count");
                const subtotalEl = document.getElementById("cartSubtotal");
                
                // Atualiza itens do carrinho
                if (container) {
                    if (currentCart.length === 0) {
                        container.innerHTML = '<p class="empty-cart">Carrinho vazio.</p>';
                    } else {
                        container.innerHTML = currentCart.map(item => `
                            <div class="cart-item">
                                <img src="${item.image}" class="cart-item-image" loading="lazy" alt="${item.name}">
                                <div class="cart-item-details">
                                    <h4>${item.name}</h4>
                                    <p>Tam: ${item.size} - ${formatPrice(item.price)}</p>
                                    <p class="item-quantity">Quantidade: ${item.quantity}</p>
                                </div>
                            </div>
                        `).join('');
                    }
                }
                
                // Calcula totais
                const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const count = currentCart.reduce((sum, item) => sum + item.quantity, 0);
                
                // Atualiza UI
                if (subtotalEl) subtotalEl.textContent = formatPrice(total);
                if (countEl) countEl.textContent = count;
            },
            
            init: function() {
                this.updateUI();
                
                // Configura eventos do modal do carrinho
                const closeBtn = document.getElementById("closeCartBtn");
                const overlay = document.getElementById("modalOverlay");
                const modal = document.getElementById("cartModal");
                
                if (closeBtn) {
                    closeBtn.onclick = () => {
                        if (modal) modal.classList.remove("active");
                    };
                }
                
                if (overlay) {
                    overlay.onclick = () => {
                        if (modal) modal.classList.remove("active");
                    };
                }
                
                // Função global para adicionar ao carrinho
                window.addToCart = (product) => {
                    const currentCart = getCart();
                    const existingIndex = currentCart.findIndex(
                        item => item.id === product.id && item.size === product.size
                    );
                    
                    if (existingIndex > -1) {
                        currentCart[existingIndex].quantity++;
                    } else {
                        currentCart.push({
                            ...product,
                            quantity: 1,
                            addedAt: Date.now()
                        });
                    }
                    
                    saveCart(currentCart);
                    this.updateUI();
                    
                    // Mostra modal do carrinho
                    if (modal) {
                        modal.classList.add("active");
                        
                        // Fecha automaticamente após 5 segundos
                        setTimeout(() => {
                            if (modal.classList.contains("active")) {
                                modal.classList.remove("active");
                            }
                        }, 5000);
                    }
                };
            }
        };
    })();

    /**
     * Módulo de Vídeo
     */
    const VideoEffectsModule = {
        init: function() {
            // Aguarda um pouco para não competir com animações principais
            setTimeout(() => {
                this.setupVideoObservers();
            }, 1000);
        },
        
        setupVideoObservers: function() {
            const container = document.querySelector('.crew-video-container');
            const video = document.querySelector('.crew-video-element');
            
            if (!container || !video) return;
            
            // Carrega vídeo apenas quando visível
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Carrega vídeo se tiver data-src
                        if (video.dataset.src) {
                            video.src = video.dataset.src;
                            video.load();
                            delete video.dataset.src;
                        }
                        
                        this.setupVideoInteractions(container, video);
                        observer.unobserve(container);
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });
            
            observer.observe(container);
        },
        
        setupVideoInteractions: function(container, video) {
            let animationFrame = null;
            
            // Efeito 3D no hover
            container.addEventListener('mousemove', (e) => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                
                animationFrame = requestAnimationFrame(() => {
                    const rect = container.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
                    
                    container.style.transform = `
                        perspective(1000px) 
                        rotateX(${y}deg) 
                        rotateY(${x}deg) 
                        translateZ(5px)
                    `;
                });
            });
            
            // Reset ao sair
            container.addEventListener('mouseleave', () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                
                container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                
                // Pausa vídeo
                if (!video.paused) {
                    video.pause();
                }
            });
            
            // Play no hover
            container.addEventListener('mouseenter', () => {
                video.play().catch(e => {
                    console.log('Autoplay não permitido:', e);
                });
            });
            
            // Suporte a touch para mobile
            container.addEventListener('touchstart', () => {
                video.play().catch(e => {
                    console.log('Autoplay não permitido:', e);
                });
            });
        }
    };

    /**
     * Inicialização Principal
     */
    const init = () => {
        // 1. Inicializa funcionalidades críticas primeiro
        CartModule.init();
        
        // 2. Inicia loading (que por sua vez inicia as animações do Hero)
        LoadingModule.hide();
        
        // 3. Inicializa módulos de animação com delay
        setTimeout(() => {
            // Animações de scroll (newsletter)
            if (typeof gsap !== 'undefined') {
                ScrollAnimationsModule.init();
            }
            
            // Animações de preço
            PriceAnimationsModule.init();
        }, 800);
        
        // 4. Efeitos de vídeo (baixa prioridade)
        setTimeout(() => {
            VideoEffectsModule.init();
        }, 1500);
        
        // 5. Atualiza ano no footer
        const yearEl = document.getElementById("currentYear");
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
        
        // 6. Remove classe de não-JS se necessário
        document.documentElement.classList.remove('no-js');
    };

    // Estratégia de inicialização robusta
    const startApp = () => {
        // Espera um pouco para garantir DOM estável
        const startDelay = document.readyState === 'loading' ? 100 : 50;
        
        setTimeout(() => {
            try {
                init();
            } catch (error) {
                console.error('Erro na inicialização:', error);
                
                // Fallback: mostra conteúdo mesmo com erro
                const fallbackElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-bg-image');
                fallbackElements.forEach(el => {
                    if (el) {
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                        el.style.filter = 'none';
                    }
                });
            }
        }, startDelay);
    };

    // Inicia quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startApp);
    } else {
        startApp();
    }

    // Utilitários para debug (remover em produção)
    window.debugAnimations = {
        resetPriceAnimations: () => {
            animationTracker.priceAnimations.clear();
            document.querySelectorAll('[data-price-animated]').forEach(el => {
                el.removeAttribute('data-price-animated');
            });
            PriceAnimationsModule.init();
            console.log('Animações de preço resetadas');
        },
        
        getAnimationStatus: () => {
            return {
                heroAnimated: animationTracker.isHeroAnimated(),
                priceAnimationsCount: animationTracker.priceAnimations.size,
                scrollAnimationsCount: animationTracker.scrollAnimations.size
            };
        }
    };
})();