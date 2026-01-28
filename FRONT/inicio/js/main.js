/**
 * JAPA UNIVERSE - MAIN JS (ATUALIZADO COM ANIMAÇÕES ÉPICAS)
 * Revisado com efeitos GSAP premium no Hero
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
     * MÓDULO DE ANIMAÇÕES ÉPICAS DO HERO
     */
    const EpicHeroAnimations = {
        init: function() {
            // Aguarda o carregamento completo e um pequeno delay
            setTimeout(() => {
                this.animateHeroSection();
            }, 100);
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

            // Cria uma timeline master para controle preciso
            const masterTL = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            // 1. ANIMAÇÃO DA IMAGEM DE FUNDO - EFEITO "REVEAL GLITCH"
            // Pré-configuração
            gsap.set(heroBg, {
                opacity: 0,
                scale: 1.15,
                filter: 'brightness(1.3) blur(8px)'
            });

            // Animação principal do background
            masterTL.to(heroBg, {
                opacity: 1,
                scale: 1,
                filter: 'brightness(1) blur(0px)',
                duration: 2.2,
                ease: "power4.out"
            }, 0);

            // 2. ANIMAÇÃO DO TÍTULO "IMPORTE SEM TAXAS" - EFEITO SPLIT TEXT GLITCH
            const animateTitle = () => {
                const originalText = heroTitle.textContent;
                const lines = originalText.split('<br>').map(line => line.trim());
                
                // Limpa e recria o título com estrutura para animação
                heroTitle.innerHTML = '';
                
                lines.forEach((line, lineIndex) => {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'hero-title-line';
                    lineDiv.style.cssText = `
                        overflow: hidden;
                        line-height: 0.9;
                        margin-bottom: ${lineIndex === 0 ? '0.1em' : '0'};
                    `;
                    
                    const words = line.split(' ');
                    words.forEach((word, wordIndex) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.className = 'hero-title-word';
                        wordSpan.textContent = word + (wordIndex < words.length - 1 ? ' ' : '');
                        wordSpan.style.cssText = `
                            display: inline-block;
                            opacity: 0;
                            transform: translateY(100%);
                            will-change: transform, opacity;
                        `;
                        lineDiv.appendChild(wordSpan);
                    });
                    
                    heroTitle.appendChild(lineDiv);
                });

                // Anima cada palavra com stagger aleatório
                const titleWords = heroTitle.querySelectorAll('.hero-title-word');
                masterTL.to(titleWords, {
                    y: 0,
                    opacity: 1,
                    duration: 1.4,
                    stagger: {
                        each: 0.08,
                        from: "random",
                        grid: "auto",
                        ease: "back.out(1.8)"
                    },
                    onStart: () => {
                        // Efeito sonoro visual (glitch rápido)
                        gsap.to(titleWords, {
                            duration: 0.1,
                            x: () => gsap.utils.random(-15, 15),
                            y: () => gsap.utils.random(-10, 10),
                            repeat: 3,
                            yoyo: true,
                            ease: "none"
                        });
                    }
                }, 0.5);

                // Efeito de brilho final nas palavras
                masterTL.to(titleWords, {
                    duration: 0.8,
                    textShadow: '0 0 30px rgba(255, 102, 0, 0.5)',
                    yoyo: true,
                    repeat: 1,
                    ease: "sine.inOut"
                }, 1.8);
            };

            // 3. ANIMAÇÃO DO SUBTÍTULO - EFEITO "TYPING" MODERNO
            const animateSubtitle = () => {
                const originalText = heroSubtitle.textContent;
                heroSubtitle.innerHTML = '';
                heroSubtitle.style.cssText = `
                    opacity: 1;
                    overflow: hidden;
                `;

                // Divide em spans para animação de digitação
                const chars = originalText.split('');
                chars.forEach((char, index) => {
                    const span = document.createElement('span');
                    span.className = 'hero-subtitle-char';
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.cssText = `
                        display: inline;
                        opacity: 0;
                        will-change: opacity;
                    `;
                    
                    // Destaque palavras-chave
                    if (['Japa', 'Universe', 'exclusivos', 'fit'].some(keyword => 
                        originalText.toLowerCase().includes(keyword.toLowerCase()) && 
                        originalText.indexOf(char) >= originalText.toLowerCase().indexOf(keyword.toLowerCase()) &&
                        originalText.indexOf(char) < originalText.toLowerCase().indexOf(keyword.toLowerCase()) + keyword.length
                    )) {
                        span.style.color = 'var(--primary)';
                        span.style.fontWeight = '600';
                    }
                    
                    heroSubtitle.appendChild(span);
                });

                const subtitleChars = heroSubtitle.querySelectorAll('.hero-subtitle-char');
                
                // Efeito de digitação com cursor
                const cursor = document.createElement('span');
                cursor.innerHTML = '▌';
                cursor.style.cssText = `
                    display: inline;
                    animation: blink 1s infinite;
                    color: var(--primary);
                    font-weight: bold;
                    opacity: 0;
                `;
                heroSubtitle.appendChild(cursor);

                masterTL.to(cursor, {
                    opacity: 1,
                    duration: 0.3
                }, 1.5);

                masterTL.to(subtitleChars, {
                    opacity: 1,
                    duration: 0.03,
                    stagger: {
                        each: 0.03,
                        from: "start"
                    },
                    onComplete: () => {
                        if (cursor.parentNode) cursor.remove();
                    }
                }, 1.6);

                // Remove cursor ao finalizar
                setTimeout(() => {
                    if (cursor.parentNode) cursor.remove();
                }, (chars.length * 0.03 * 1000) + 2000);
            };

            // 4. ANIMAÇÃO DO BOTÃO - EFEITO "PULSE ATRAENTE"
            const animateButton = () => {
                if (!heroButton) return;
                
                gsap.set(heroButton, {
                    opacity: 0,
                    y: 30,
                    scale: 0.9
                });

                masterTL.to(heroButton, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                }, 2.2);

                // Efeito de brilho pulsante contínuo
                const pulseAnimation = () => {
                    gsap.to(heroButton, {
                        boxShadow: '0 0 0 0 rgba(255, 102, 0, 0.7)',
                        duration: 0.01,
                        onComplete: () => {
                            gsap.to(heroButton, {
                                boxShadow: '0 0 0 10px rgba(255, 102, 0, 0)',
                                duration: 1.5,
                                ease: "power2.out",
                                repeat: -1,
                                delay: 1
                            });
                        }
                    });
                };

                // Inicia o pulso após a entrada
                masterTL.call(pulseAnimation, null, 2.5);

                // Efeitos de hover
                heroButton.addEventListener('mouseenter', () => {
                    gsap.to(heroButton, {
                        scale: 1.05,
                        y: -2,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });

                heroButton.addEventListener('mouseleave', () => {
                    gsap.to(heroButton, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            };

            // 5. ANIMAÇÃO DAS REDES SOCIAIS
            const animateSocials = () => {
                if (!heroSocials) return;
                
                const socialIcons = heroSocials.querySelectorAll('a');
                gsap.set(socialIcons, { opacity: 0, y: 20 });
                
                masterTL.to(socialIcons, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, 2.8);
            };

            // Executa todas as animações
            animateTitle();
            animateSubtitle();
            animateButton();
            animateSocials();

            // 6. OTIMIZAÇÕES DE PERFORMANCE
            this.optimizeAnimations();
        },

        optimizeAnimations: function() {
            // Reduz FPS em dispositivos móveis para economia de bateria
            const isMobile = window.innerWidth <= 768;
            if (isMobile && gsap.ticker) {
                gsap.ticker.fps(50); // Reduz para 50fps no mobile
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