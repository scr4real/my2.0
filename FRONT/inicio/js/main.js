/**
 * JAPA UNIVERSE - MAIN JS (F1 ANIMATION EDITION)
 * Foco: Performance Máxima + Efeitos de Alto Impacto GSAP
 */

(function() {
    const API_BASE = window.location.hostname.includes('localhost') 
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';

    /**
     * Módulo de Carregamento
     */
    const LoadingModule = {
        hide: () => {
            const loader = document.querySelector(".loading-overlay");
            if (loader) {
                loader.style.transition = "opacity 0.3s ease";
                loader.style.opacity = "0";
                setTimeout(() => loader.style.display = "none", 300);
            }
        }
    };

    /**
     * Módulo de Animações (ESTILO F1 / GSAP)
     */
    const AnimationModule = {
        init: () => {
            if (typeof gsap === "undefined") return;

            // Registra o plugin de Scroll
            gsap.registerPlugin(ScrollTrigger);

            // 1. ENTRADA CINEMATOGRÁFICA DO HERO (KINETIC TYPOGRAPHY)
            const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
            
            // Força visibilidade antes de iniciar
            gsap.set(".hero-title, .hero-subtitle, .hero-content .btn", { visibility: "visible", opacity: 1 });

            heroTl.from(".hero-title", {
                duration: 1.8,
                y: 100,
                skewY: 7,
                stagger: 0.1,
                opacity: 0
            })
            .from(".hero-subtitle", {
                duration: 1.2,
                opacity: 0,
                y: 30,
            }, "-=1.2")
            .from(".hero-content .btn", {
                duration: 1,
                scale: 0.8,
                opacity: 0,
                ease: "back.out(1.7)"
            }, "-=0.8")
            .from(".hero-socials a", {
                duration: 1,
                x: -30,
                opacity: 0,
                stagger: 0.1
            }, "-=0.5");

            // 2. REVELAÇÃO MAGNÉTICA DAS BADGES (ZERO TAXAS / ÍCONES)
            gsap.utils.toArray(".section-titleRECEM").forEach(badge => {
                gsap.from(badge, {
                    scrollTrigger: {
                        trigger: badge,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    x: -80,
                    skewX: -15,
                    opacity: 0,
                    duration: 1.2,
                    ease: "expo.out"
                });
            });

            // 3. ANIMAÇÃO DE FADE-UP PADRÃO (Para outros elementos)
            gsap.utils.toArray(".gsap-fade-up").forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }
    };

    /**
     * Módulo do Carrinho
     */
    const CartModule = (function() {
        let cart = null;
        const getCart = () => {
            if (!cart) cart = JSON.parse(localStorage.getItem("japaUniverseCart")) || [];
            return cart;
        };
        const saveCart = (newCart) => {
            cart = newCart;
            localStorage.setItem("japaUniverseCart", JSON.stringify(cart));
        };
        const formatPrice = (p) => `R$ ${Number(p).toFixed(2).replace('.', ',')}`;

        return {
            updateUI: () => {
                const currentCart = getCart();
                const container = document.getElementById("cartItemsContainer");
                const countEl = document.querySelector(".cart-count");
                const subtotalEl = document.getElementById("cartSubtotal");

                if (container) {
                    container.innerHTML = currentCart.length === 0 
                        ? '<p>Carrinho vazio.</p>' 
                        : currentCart.map(item => `
                            <div class="cart-item">
                                <img src="${item.image}" class="cart-item-image" loading="lazy">
                                <div class="cart-item-details">
                                    <h4>${item.name}</h4>
                                    <p>Tam: ${item.size} - ${formatPrice(item.price)}</p>
                                </div>
                            </div>`).join('');
                }

                const total = currentCart.reduce((s, i) => s + (i.price * i.quantity), 0);
                const count = currentCart.reduce((s, i) => s + i.quantity, 0);

                if (subtotalEl) subtotalEl.textContent = formatPrice(total);
                if (countEl) countEl.textContent = count;
            },
            init: function() {
                this.updateUI();
                const closeBtn = document.getElementById("closeCartBtn");
                const overlay = document.getElementById("modalOverlay");
                const modal = document.getElementById("cartModal");

                if (closeBtn) closeBtn.onclick = () => modal.classList.remove("active");
                if (overlay) overlay.onclick = () => modal.classList.remove("active");

                window.addToCart = (product) => {
                    const currentCart = getCart();
                    const idx = currentCart.findIndex(i => i.id === product.id && i.size === product.size);
                    if (idx > -1) currentCart[idx].quantity++; 
                    else currentCart.push({...product, quantity: 1});
                    
                    saveCart(currentCart);
                    this.updateUI();
                    if (modal) modal.classList.add("active");
                };
            }
        };
    })();

    /**
     * Módulo de Vídeo
     */
    const VideoEffectsModule = {
        init: () => {
            const container = document.querySelector('.crew-video-container');
            const video = document.querySelector('.crew-video-element');
            if (!container || !video) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.dataset.src) {
                            video.src = video.dataset.src;
                            video.removeAttribute('data-src');
                        }
                        this.setupInteractions(container, video);
                        observer.unobserve(container);
                    }
                });
            }, { rootMargin: '100px' });

            observer.observe(container);
        },
        setupInteractions: (container, video) => {
            let ticking = false;
            container.addEventListener('mousemove', (e) => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const rect = container.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
                        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
                        container.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(5px)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            container.addEventListener('mouseleave', () => {
                container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                video.pause();
            });
            container.addEventListener('mouseenter', () => {
                video.play().catch(() => {});
            });
        }
    };

    /**
     * Inicialização Orquestrada
     */
    const init = () => {
        LoadingModule.hide();
        CartModule.init();
        
        // As animações iniciam após o loader sair
        requestAnimationFrame(() => {
            AnimationModule.init();
        });

        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => VideoEffectsModule.init());
        } else {
            setTimeout(VideoEffectsModule.init, 200);
        }

        const yearEl = document.getElementById("currentYear");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    };

    if (document.readyState === "interactive" || document.readyState === "complete") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }
})();