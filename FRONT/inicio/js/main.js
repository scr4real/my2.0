/**
 * JAPA UNIVERSE - MAIN JS (ULTRA OPTIMIZED VERSION)
 * Foco: Performance Máxima e Carregamento em Milissegundos
 */

// Execução imediata para funções que não dependem do DOM completo
(function() {
    // Pré-carregamento de lógica de API e Constantes
    const API_BASE = window.location.hostname.includes('localhost') 
        ? 'http://localhost:8080' 
        : 'https://back-production-e565.up.railway.app';

    /**
     * Módulo de Carregamento (INSTANTÂNEO)
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
     * Módulo de Animações (GPU ACCELERATED)
     */
    const AnimationModule = {
        init: () => {
            if (typeof gsap === "undefined") {
                document.querySelectorAll(".gsap-fade-up").forEach(el => el.style.opacity = "1");
                return;
            }
            // Batching de animações para evitar layout thrashing
            gsap.to(".gsap-fade-up", {
                duration: 0.6,
                y: 0,
                opacity: 1,
                stagger: 0.05,
                ease: "power2.out",
                clearProps: "all",
                overwrite: true
            });
        }
    };

    /**
     * Módulo do Carrinho (LOCAL STORAGE OPTIMIZED)
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
            },
            getImg: (path) => {
                if (!path) return '/FRONT/assets/images/placeholder.jpg';
                return path.startsWith('http') ? path : `${API_BASE}/${path.replace(/^\//, '')}`;
            }
        };
    })();

    /**
     * Módulo de Vídeo (DEFERRED & LIGHTWEIGHT)
     */
    const VideoEffectsModule = {
        init: () => {
            const container = document.querySelector('.crew-video-container');
            const video = document.querySelector('.crew-video-element');
            if (!container || !video) return;

            // Só carrega o vídeo quando estiver perto da tela (Lazy Video)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.dataset.src) {
                            video.src = video.dataset.src;
                            video.removeAttribute('data-src');
                        }
                        
                        // Lógica de Interação 3D (Otimizada com rAF)
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
        // 1. Esconde o loader e mostra o conteúdo base imediatamente
        LoadingModule.hide();
        
        // 2. Prioridade máxima: UI do Carrinho e Header
        CartModule.init();
        
        // 3. Prioridade média: Animações visuais (GSAP)
        requestAnimationFrame(() => {
            AnimationModule.init();
        });

        // 4. Prioridade baixa: Vídeos e Recursos Pesados
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => VideoEffectsModule.init());
        } else {
            setTimeout(VideoEffectsModule.init, 200);
        }

        // 5. Update Year
        const yearEl = document.getElementById("currentYear");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    };

    // Trigger de inicialização mais rápido que DOMContentLoaded
    if (document.readyState === "interactive" || document.readyState === "complete") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }
})();