/**
 * JAPA UNIVERSE - MAIN JS (ATUALIZADO COM ANIMAÇÕES ÉPICAS FUNCIONAIS)
 * Revisado com efeitos GSAP premium que não quebram layout
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
     * MÓDULO DE ANIMAÇÕES ÉPICAS DO HERO (VERSÃO FUNCIONAL)
     */
    const EpicHeroAnimations = {
        init: function() {
            // Aguarda o carregamento completo
            setTimeout(() => {
                this.animateHeroSection();
            }, 300);
        },

        animateHeroSection: function() {
            const heroBg = document.querySelector('.hero-bg-image');
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButton = document.querySelector('.hero-content .btn');
            const heroSocials = document.querySelector('.hero-socials');

            // Se GSAP não estiver disponível ou elementos não existirem
            if (typeof gsap === 'undefined' || !heroBg || !heroTitle) {
                console.warn('GSAP não disponível para animações do Hero');
                return;
            }

            // Cria uma timeline master para controle
            const masterTL = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            // SALVA OS CONTEÚDOS ORIGINAIS
            const originalTitleHTML = heroTitle.innerHTML;
            const originalSubtitleHTML = heroSubtitle.innerHTML;

            // 1. ANIMAÇÃO DA IMAGEM DE FUNDO - EFEITO SUAVE
            gsap.set(heroBg, {
                opacity: 0,
                scale: 1.1,
                filter: 'brightness(1.2) blur(5px)'
            });

            masterTL.to(heroBg, {
                opacity: 1,
                scale: 1,
                filter: 'brightness(1) blur(0px)',
                duration: 1.8,
                ease: "power3.out"
            }, 0);

            // 2. ANIMAÇÃO DO TÍTULO - VERSÃO SIMPLES QUE NÃO QUEBRA LAYOUT
            const animateTitle = () => {
                // Define estado inicial invisível
                gsap.set(heroTitle, {
                    opacity: 0,
                    y: 30
                });

                // Anima o título completo
                masterTL.to(heroTitle, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "back.out(1.7)"
                }, 0.3);

                // Efeito adicional: pulso sutil no texto
                masterTL.to(heroTitle, {
                    textShadow: '0 0 20px rgba(255, 102, 0, 0.4)',
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "sine.inOut"
                }, 1.0);
            };

            // 3. ANIMAÇÃO DO SUBTÍTULO - VERSÃO SIMPLES
            const animateSubtitle = () => {
                // Define estado inicial invisível
                gsap.set(heroSubtitle, {
                    opacity: 0,
                    y: 20
                });

                // Anima o subtítulo completo
                masterTL.to(heroSubtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: "power2.out"
                }, 0.8);

                // Efeito de digitação simplificado (sem quebrar layout)
                const subtitleText = heroSubtitle.textContent;
                const words = subtitleText.split(' ');
                
                // Cria um efeito visual de palavras aparecendo
                words.forEach((word, index) => {
                    const delay = 1.0 + (index * 0.05);
                    masterTL.to(heroSubtitle, {
                        duration: 0.01,
                        onStart: () => {
                            // Efeito visual sutil
                            heroSubtitle.style.textShadow = '0 0 10px rgba(255, 102, 0, 0.3)';
                        },
                        onComplete: () => {
                            heroSubtitle.style.textShadow = 'none';
                        }
                    }, delay);
                });
            };

            // 4. ANIMAÇÃO DO BOTÃO
            const animateButton = () => {
                if (!heroButton) return;
                
                gsap.set(heroButton, {
                    opacity: 0,
                    y: 15,
                    scale: 0.95
                });

                masterTL.to(heroButton, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: "back.out(1.5)"
                }, 1.5);

                // Efeito de pulso sutil
                masterTL.to(heroButton, {
                    boxShadow: '0 0 0 5px rgba(255, 102, 0, 0.3)',
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "sine.inOut"
                }, 1.8);

                // Efeitos de hover
                heroButton.addEventListener('mouseenter', () => {
                    gsap.to(heroButton, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                });

                heroButton.addEventListener('mouseleave', () => {
                    gsap.to(heroButton, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                });
            };

            // 5. ANIMAÇÃO DAS REDES SOCIAIS
            const animateSocials = () => {
                if (!heroSocials) return;
                
                const socialIcons = heroSocials.querySelectorAll('a');
                gsap.set(socialIcons, { opacity: 0, y: 10 });
                
                masterTL.to(socialIcons, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.5)"
                }, 1.8);
            };

            // Executa todas as animações
            animateTitle();
            animateSubtitle();
            animateButton();
            animateSocials();

            // Restaura conteúdos originais após um tempo para garantir
            setTimeout(() => {
                heroTitle.innerHTML = originalTitleHTML;
                heroSubtitle.innerHTML = originalSubtitleHTML;
                
                // Remove qualquer estilo inline problemático
                heroTitle.removeAttribute('style');
                heroSubtitle.removeAttribute('style');
            }, 3000);

            // 6. OTIMIZAÇÕES DE PERFORMANCE
            this.optimizeAnimations();
        },

        optimizeAnimations: function() {
            // Reduz FPS em dispositivos móveis
            const isMobile = window.innerWidth <= 768;
            if (isMobile && gsap.ticker) {
                gsap.ticker.fps(50);
            }

            // Pausa animações quando a aba não está visível
            document.addEventListener('visibilitychange', () => {
                if (document.hidden && gsap.globalTimeline) {
                    gsap.globalTimeline.pause();
                } else if (gsap.globalTimeline) {
                    gsap.globalTimeline.resume();
                }
            });

            // Respeita preferência por redução de movimento
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                if (gsap.globalTimeline) {
                    gsap.globalTimeline.timeScale(3); // Acelera tudo
                }
            }
        }
    };

    /**
     * Módulo de Animações (GSAP) - EXISTENTE
     */
    const AnimationModule = {
        init: () => {
            if (typeof gsap === "undefined") return;

            gsap.registerPlugin(ScrollTrigger);

            // CORREÇÃO: EFEITO FADE-UP NA NEWSLETTER
            const newsletterContainer = document.querySelector(".newsletter .container");
            
            if (newsletterContainer) {
                gsap.set(newsletterContainer, { opacity: 0, y: 50 });

                gsap.to(newsletterContainer, {
                    scrollTrigger: {
                        trigger: ".newsletter",
                        start: "top 85%",
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
     * Módulo do Carrinho - EXISTENTE
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
     * Módulo de Vídeo - EXISTENTE
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
     * Inicialização Orquestrada - ATUALIZADA
     */
    const init = () => {
        // 1. Esconde loading
        LoadingModule.hide();
        
        // 2. Inicia Carrinho (funcionalidade crítica primeiro)
        CartModule.init();
        
        // 3. ANIMAÇÕES ÉPICAS DO HERO (imediatamente após carregamento)
        EpicHeroAnimations.init();
        
        // 4. Animações scroll-based (após um frame)
        requestAnimationFrame(() => {
            AnimationModule.init();
        });

        // 5. Efeitos de vídeo (baixa prioridade)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => VideoEffectsModule.init());
        } else {
            setTimeout(VideoEffectsModule.init, 500);
        }

        // 6. Atualiza ano no footer
        const yearEl = document.getElementById("currentYear");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    };

    // Inicialização
    if (document.readyState === "interactive" || document.readyState === "complete") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }
})();