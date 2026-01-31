/**
 * JAPA UNIVERSE - MAIN JS (COM REMOÇÃO DE ITEM NO CARRINHO)
 * - Animações suaves
 * - Carrinho completo (Adicionar, Remover, Checkout)
 * - Integração com Recentes.js
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

            const startTime = Date.now();
            const minLoadTime = 800; 
            
            const checkResources = () => {
                const resourcesLoaded = document.readyState === 'complete';
                const elapsedTime = Date.now() - startTime;
                
                if (resourcesLoaded && elapsedTime >= minLoadTime) {
                    this.fadeOutLoader(loader);
                } else if (elapsedTime >= 1500) { 
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
            setTimeout(() => {
                if (!animationTracker.isHeroAnimated()) {
                    EpicHeroAnimations.init();
                }
            }, 50);
        }
    };

    /**
     * MÓDULO DE ANIMAÇÕES DO HERO
     */
    const EpicHeroAnimations = {
        init: function() {
            if (this.initializing || animationTracker.isHeroAnimated()) {
                return;
            }
            this.initializing = true;
            this.hideHeroElements();
            requestAnimationFrame(() => {
                setTimeout(() => {
                    this.animateHeroSection();
                }, 50);
            });
        },
        
        hideHeroElements: function() {
            const selectors = ['.hero-bg-image', '.hero-title', '.hero-subtitle', '.hero-content .btn', '.hero-socials a'];
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.willChange = 'opacity, transform, filter';
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
            
            const masterTL = gsap.timeline({
                defaults: { ease: "power3.out", overwrite: 'auto' },
                onComplete: () => {
                    animationTracker.markHeroAnimated();
                    this.initializing = false;
                    [heroBg, heroTitle, heroSubtitle, heroButton].forEach(el => {
                        if (el) el.style.willChange = 'auto';
                    });
                }
            });
            
            masterTL.to(heroBg, { opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)', duration: 1.6, ease: "power2.out" }, 0);
            masterTL.to(heroTitle, { opacity: 1, y: 0, duration: 1.1, ease: "back.out(1.5)" }, 0.2);
            masterTL.to(heroSubtitle, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0.6);
            if (heroButton) masterTL.to(heroButton, { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.9);
            if (heroSocials) {
                const socialIcons = heroSocials.querySelectorAll('a');
                masterTL.to(socialIcons, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 1.1);
            }
            masterTL.to(heroTitle, { textShadow: '0 0 15px rgba(255, 102, 0, 0.4)', duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.3);
        },
        
        showHeroElementsDirectly: function() {
            const elements = ['.hero-bg-image', '.hero-title', '.hero-subtitle', '.hero-content .btn', '.hero-socials a'];
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
     * Módulo de Animações de Preço
     */
    const PriceAnimationsModule = {
        init: function() {
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
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            
            const productContainers = ['#products-95', '#products-dn', '#products-tn', '.collection-swiper .swiper-slide', '.product-card'];
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
            
            allProductCards = [...new Set(allProductCards)];
            if (!allProductCards.length) return;
            
            allProductCards.forEach((card, index) => {
                this.setupCardAnimation(card, index);
            });
        },
        
        setupCardAnimation: function(card, index) {
            const cardId = card.id || `price-card-${index}-${Date.now()}`;
            if (animationTracker.isPriceAnimated(cardId) || card.dataset.priceAnimated === 'true') return;
            
            const priceElement = card.querySelector('.product-price');
            if (!priceElement) return;
            
            const priceText = this.extractPriceValue(priceElement.textContent);
            if (priceText === null) return;
            
            card.dataset.priceAnimated = 'processing';
            animationTracker.markPriceAnimated(cardId);
            
            ScrollTrigger.create({
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                once: true,
                markers: false,
                onEnter: () => this.animatePrice(priceElement, priceText, card)
            });
        },
        
        extractPriceValue: function(priceText) {
            try {
                const cleanText = priceText.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
                const value = parseFloat(cleanText);
                return isNaN(value) ? null : value;
            } catch (e) { return null; }
        },
        
        animatePrice: function(priceElement, finalValue, card) {
            if (card.dataset.priceAnimated === 'completed') return;
            const counter = { value: 0 };
            
            gsap.to(counter, {
                value: finalValue,
                duration: 1.2,
                ease: "power2.out",
                overwrite: true,
                onUpdate: () => { priceElement.textContent = this.formatPrice(counter.value); },
                onComplete: () => {
                    priceElement.textContent = this.formatPrice(finalValue);
                    card.dataset.priceAnimated = 'completed';
                    priceElement.style.willChange = 'auto';
                },
                onInterrupt: () => {
                    priceElement.textContent = this.formatPrice(finalValue);
                    card.dataset.priceAnimated = 'completed';
                }
            });
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
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            this.setupNewsletterAnimation();
        },
        
        setupNewsletterAnimation: function() {
            const newsletterContainer = document.querySelector(".newsletter .container");
            if (!newsletterContainer || animationTracker.isScrollAnimated('newsletter')) return;
            
            gsap.set(newsletterContainer, { opacity: 0, y: 40 });
            ScrollTrigger.create({
                trigger: ".newsletter",
                start: "top 80%",
                once: true,
                onEnter: () => {
                    animationTracker.markScrollAnimated('newsletter');
                    gsap.to(newsletterContainer, { y: 0, opacity: 1, duration: 1, ease: "power2.out", overwrite: true });
                }
            });
        }
    };

    /**
     * MÓDULO DO CARRINHO (ATUALIZADO COM BOTÃO DE REMOVER)
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
                
                if (container) {
                    if (currentCart.length === 0) {
                        container.innerHTML = '<p class="empty-cart">Carrinho vazio.</p>';
                    } else {
                        container.innerHTML = currentCart.map(item => `
                            <div class="cart-item">
                                <img src="${item.image}" class="cart-item-image" loading="lazy" alt="${item.name}">
                                <div class="cart-item-details">
                                    <div class="cart-item-header">
                                        <h4>${item.name}</h4>
                                        <button class="remove-item-btn" onclick="window.removeFromCart('${item.id}', '${item.size}')" aria-label="Remover item">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <p class="cart-item-price">Tam: ${item.size} - ${formatPrice(item.price)}</p>
                                    <div class="cart-item-quantity">
                                        <span>Qtd: ${item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('');
                    }
                }
                
                const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const count = currentCart.reduce((sum, item) => sum + item.quantity, 0);
                
                if (subtotalEl) subtotalEl.textContent = formatPrice(total);
                if (countEl) countEl.textContent = count;
            },
            
            init: function() {
                this.updateUI();
                
                const closeBtn = document.getElementById("closeCartBtn");
                const overlay = document.getElementById("modalOverlay");
                const modal = document.getElementById("cartModal");
                const checkoutBtn = document.querySelector(".checkout-btn");

                if (checkoutBtn) {
                    checkoutBtn.addEventListener("click", () => {
                        const currentCart = getCart();
                        if (currentCart.length === 0) {
                            alert("O seu carrinho está vazio!");
                            return;
                        }
                        window.location.href = "/FRONT/checkout/HTML/checkout.html";
                    });
                }
                
                if (closeBtn) closeBtn.onclick = () => { if (modal) modal.classList.remove("active"); };
                if (overlay) overlay.onclick = () => { if (modal) modal.classList.remove("active"); };
                
                // --- FUNÇÕES GLOBAIS ---

                // Remover do Carrinho
                window.removeFromCart = (id, size) => {
                    let currentCart = getCart();
                    // Filtra removendo o item que bate ID e Tamanho (converte para string pra garantir)
                    currentCart = currentCart.filter(item => !(String(item.id) === String(id) && String(item.size) === String(size)));
                    saveCart(currentCart);
                    this.updateUI();
                };

                // Adicionar ao Carrinho
                window.addToCart = (product) => {
                    const currentCart = getCart();
                    const existingIndex = currentCart.findIndex(
                        item => item.id === product.id && item.size === product.size
                    );
                    
                    if (existingIndex > -1) {
                        currentCart[existingIndex].quantity++;
                    } else {
                        currentCart.push({ ...product, quantity: 1, addedAt: Date.now() });
                    }
                    
                    saveCart(currentCart);
                    this.updateUI();
                    
                    if (modal) {
                        modal.classList.add("active");
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
            setTimeout(() => { this.setupVideoObservers(); }, 1000);
        },
        setupVideoObservers: function() {
            const container = document.querySelector('.crew-video-container');
            const video = document.querySelector('.crew-video-element');
            if (!container || !video) return;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.dataset.src) {
                            video.src = video.dataset.src;
                            video.load();
                            delete video.dataset.src;
                        }
                        this.setupVideoInteractions(container, video);
                        observer.unobserve(container);
                    }
                });
            }, { rootMargin: '50px', threshold: 0.1 });
            observer.observe(container);
        },
        setupVideoInteractions: function(container, video) {
            let animationFrame = null;
            container.addEventListener('mousemove', (e) => {
                if (animationFrame) cancelAnimationFrame(animationFrame);
                animationFrame = requestAnimationFrame(() => {
                    const rect = container.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
                    container.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(5px)`;
                });
            });
            container.addEventListener('mouseleave', () => {
                if (animationFrame) cancelAnimationFrame(animationFrame);
                container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                if (!video.paused) video.pause();
            });
            container.addEventListener('mouseenter', () => {
                video.play().catch(e => { console.log('Autoplay não permitido:', e); });
            });
            container.addEventListener('touchstart', () => {
                video.play().catch(e => { console.log('Autoplay não permitido:', e); });
            });
        }
    };

    /**
     * Inicialização Principal
     */
    const init = () => {
        CartModule.init();
        LoadingModule.hide();
        setTimeout(() => {
            if (typeof gsap !== 'undefined') ScrollAnimationsModule.init();
            PriceAnimationsModule.init();
        }, 800);
        setTimeout(() => { VideoEffectsModule.init(); }, 1500);
        const yearEl = document.getElementById("currentYear");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        document.documentElement.classList.remove('no-js');
    };

    const startApp = () => {
        const startDelay = document.readyState === 'loading' ? 100 : 50;
        setTimeout(() => {
            try { init(); } catch (error) {
                console.error('Erro na inicialização:', error);
                const fallbackElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-bg-image');
                fallbackElements.forEach(el => {
                    if (el) { el.style.opacity = '1'; el.style.transform = 'none'; el.style.filter = 'none'; }
                });
            }
        }, startDelay);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startApp);
    } else {
        startApp();
    }

    window.initPriceAnimations = () => {
        PriceAnimationsModule.init();
    };

    window.debugAnimations = {
        resetPriceAnimations: () => {
            animationTracker.priceAnimations.clear();
            document.querySelectorAll('[data-price-animated]').forEach(el => { el.removeAttribute('data-price-animated'); });
            PriceAnimationsModule.init();
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