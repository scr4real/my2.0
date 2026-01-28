/**
 * JAPA UNIVERSE - MAIN JS (REVISADO)
 * Foco: Newsletter com efeito fade-up e Carrinho
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
     * Módulo de Animações (GSAP)
     */
    const AnimationModule = {
        init: () => {
            if (typeof gsap === "undefined") return;

            // Registra o plugin de Scroll
            gsap.registerPlugin(ScrollTrigger);

            // CORREÇÃO: EFEITO FADE-UP NA NEWSLETTER
            // Usamos .newsletter diretamente para garantir que o trigger funcione
            const newsletterContainer = document.querySelector(".newsletter .container");
            
            if (newsletterContainer) {
                // Forçamos a visibilidade inicial via JS para evitar conflitos com CSS
                gsap.set(newsletterContainer, { opacity: 0, y: 50 });

                gsap.to(newsletterContainer, {
                    scrollTrigger: {
                        trigger: ".newsletter",
                        start: "top 85%", // Dispara um pouco antes para garantir que o usuário veja
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.out"
                });
            }
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