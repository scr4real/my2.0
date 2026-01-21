document.addEventListener("DOMContentLoaded", () => {
  /**
   * Módulo de Carregamento (OTIMIZADO)
   */
  const LoadingModule = (() => {
    const loadingOverlay = document.querySelector(".loading-overlay");
    function hideLoader() {
      if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        loadingOverlay.style.opacity = "0";
        loadingOverlay.classList.add('hidden'); 
        setTimeout(() => { loadingOverlay.style.display = "none"; }, 500);
      }
    }
    function init() {
      if (loadingOverlay) {
        hideLoader(); // Remove imediatamente ao carregar
      }
    }
    return { init };
  })();

  /**
   * Módulo de Animações com GSAP
   */
  const AnimationModule = (() => {
    function init() {
      if (typeof gsap === "undefined") {
          document.querySelectorAll(".gsap-fade-up").forEach(el => el.style.opacity = "1");
          return;
      }
      const elementsToAnimate = document.querySelectorAll(".gsap-fade-up");
      if (elementsToAnimate.length > 0) {
          gsap.fromTo(".gsap-fade-up", 
            { y: 30, opacity: 0 }, 
            { duration: 0.8, y: 0, opacity: 1, delay: 0.1, ease: "power2.out", stagger: 0.1, clearProps: "transform" }
          );
      }
    }
    return { init };
  })();

  /**
   * Módulo do Carrinho de Compras
   */
  const CartModule = (() => {
    const cartModal = document.getElementById("cartModal");
    const closeButton = document.getElementById("closeCartBtn");
    const overlay = document.getElementById("modalOverlay");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const cartSubtotalEl = document.getElementById("cartSubtotal");

    let cart = JSON.parse(localStorage.getItem("japaUniverseCart")) || [];
    const saveCart = () => localStorage.setItem("japaUniverseCart", JSON.stringify(cart));
    const formatPrice = (p) => `R$ ${Number(p).toFixed(2).replace('.', ',')}`;

    const updateCart = () => {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cart.length === 0 ? '<p>Carrinho vazio.</p>' : 
            cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Tam: ${item.size} - ${formatPrice(item.price)}</p>
                    </div>
                </div>`).join('');
        }
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(total);
        const countEl = document.querySelector(".cart-count");
        if (countEl) countEl.textContent = cart.reduce((s, i) => s + i.quantity, 0);
    };

    return { 
        init: () => {
            updateCart();
            if (closeButton) closeButton.onclick = () => cartModal.classList.remove("active");
            if (overlay) overlay.onclick = () => cartModal.classList.remove("active");
            window.addToCart = (product) => {
                const idx = cart.findIndex(i => i.id === product.id && i.size === product.size);
                if (idx > -1) cart[idx].quantity++; else cart.push({...product, quantity: 1});
                saveCart(); updateCart(); cartModal.classList.add("active");
            };
        },
        formatPrice,
        getImg: (path) => {
            if (!path) return '/FRONT/assets/images/placeholder.jpg';
            const base = window.location.hostname.includes('localhost') ? 'http://localhost:8080' : 'https://back-production-e565.up.railway.app';
            return path.startsWith('http') ? path : `${base}/${path.startsWith('/') ? path.slice(1) : path}`;
        }
    };
  })();

  /**
   * Módulo de Efeitos do Vídeo (OTIMIZADO PARA PERFORMANCE)
   */
  const VideoEffectsModule = (() => {
    // Debounce para otimizar performance
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Throttle para otimizar mousemove
    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }

    function init() {
      const videoContainer = document.querySelector('.crew-video-container');
      const videoElement = document.querySelector('.crew-video-element');
      
      // Verifica se os elementos existem na página
      if (!videoContainer || !videoElement) return;

      // Otimização: Espera um pouco para não bloquear o carregamento inicial
      setTimeout(() => {
        // 1. Criar overlay interativo (somente se não existir)
        if (!videoContainer.querySelector('.video-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'video-overlay';
          overlay.innerHTML = `
            <i class="fas fa-expand-alt"></i>
            <span>Passe o mouse para explorar</span>
          `;
          videoContainer.appendChild(overlay);
        }

        // 2. Criar partículas (somente se não existirem)
        const particlesContainer = videoContainer.parentElement.querySelector('.crew-particles');
        if (!particlesContainer) {
          const newParticlesContainer = document.createElement('div');
          newParticlesContainer.className = 'crew-particles';
          videoContainer.parentElement.appendChild(newParticlesContainer);
          
          // Gerar partículas com quantidade reduzida para performance
          for (let i = 0; i < 15; i++) { // Reduzido de 20 para 15
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--tx', `${Math.random() * 150 - 75}px`); // Reduzido alcance
            particle.style.setProperty('--ty', `${Math.random() * 150 - 75}px`);
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 1.5}s`; // Reduzido delay máximo
            newParticlesContainer.appendChild(particle);
          }
        }

        const overlay = videoContainer.querySelector('.video-overlay');
        
        // 3. Efeito 3D no hover (com throttle para performance)
        const handleMouseMove = throttle((e) => {
          if (!videoContainer.classList.contains('paused-state')) {
            const rect = videoContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduzido o efeito 3D para menos processamento
            const rotateY = ((x - centerX) / centerX) * 3; // De 5 para 3
            const rotateX = ((centerY - y) / centerY) * 3; // De 5 para 3
            
            // Usa transform3d para GPU acceleration
            videoContainer.style.transform = `
              perspective(1000px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateZ(5px)
            `;
            
            if (overlay) {
              overlay.style.transform = `
                translate(-50%, -50%)
                translateX(${rotateY * 1.5}px)
                translateY(${rotateX * 1.5}px)
              `;
            }
          }
        }, 16); // ~60fps

        videoContainer.addEventListener('mousemove', handleMouseMove);
        
        // 4. Reset na saída do mouse
        videoContainer.addEventListener('mouseleave', () => {
          videoContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
          if (overlay) {
            overlay.style.transform = 'translate(-50%, -50%)';
            overlay.style.opacity = '0';
          }
          videoElement.style.transform = 'scale(1.01)';
          videoElement.style.filter = 'brightness(1) contrast(1.05) saturate(1.1)';
        });
        
        // 5. Clique para expandir (deferido para não bloquear)
        videoContainer.addEventListener('click', () => {
          // Usa requestIdleCallback para não bloquear a thread principal
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen();
              } else if (videoElement.webkitRequestFullscreen) {
                videoElement.webkitRequestFullscreen();
              } else if (videoElement.mozRequestFullScreen) {
                videoElement.mozRequestFullScreen();
              }
            });
          } else {
            setTimeout(() => {
              if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen();
              }
            }, 100);
          }
        });
        
        // 6. Controle de play/pause otimizado
        let hoverTimeout;
        let isPlaying = false;
        
        videoContainer.addEventListener('mouseenter', () => {
          // Limpa timeout anterior para evitar múltiplas execuções
          clearTimeout(hoverTimeout);
          
          hoverTimeout = setTimeout(() => {
            if (!isPlaying) {
              videoElement.play().then(() => {
                isPlaying = true;
                videoContainer.classList.remove('paused-state');
              }).catch(e => {
                // Silencia erro de autoplay (comum em navegadores)
                console.debug('Autoplay não permitido:', e.name);
              });
            }
          }, 400); // Aumentado delay para 400ms
        });
        
        videoContainer.addEventListener('mouseleave', () => {
          clearTimeout(hoverTimeout);
          if (isPlaying) {
            videoElement.pause();
            isPlaying = false;
            videoContainer.classList.add('paused-state');
          }
        });
        
        // 7. Detectar saída do modo tela cheia
        const handleFullscreenChange = debounce(() => {
          if (!document.fullscreenElement && !document.webkitFullscreenElement && 
              !document.mozFullScreenElement && !document.msFullscreenElement) {
            videoContainer.style.transform = '';
            if (overlay) overlay.style.opacity = '0';
          }
        }, 100);
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
        
        // 8. Cleanup para evitar memory leaks
        window.addEventListener('beforeunload', () => {
          videoContainer.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
          document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
          document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
          document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        });
      }, 500); // Delay de 500ms para não bloquear o carregamento inicial
    }

    return { 
      init,
      // Função para limpar recursos se necessário
      cleanup: () => {
        const videoContainer = document.querySelector('.crew-video-container');
        if (videoContainer) {
          videoContainer.style.transform = '';
        }
      }
    };
  })();

  /**
   * Módulo Principal da Aplicação
   */
  const AppModule = (() => {
    function init() {
      LoadingModule.init();
      AnimationModule.init();
      CartModule.init();
      
      // Inicializa efeitos do vídeo de forma não-bloqueante
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          VideoEffectsModule.init();
        }, { timeout: 2000 }); // Timeout de 2 segundos
      } else {
        // Fallback para navegadores mais antigos
        setTimeout(() => {
          VideoEffectsModule.init();
        }, 1000);
      }
      
      // Atualiza o ano no footer
      const yearEl = document.getElementById("currentYear");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
    
    return { 
      init,
      // Exporta módulos para debug se necessário
      modules: {
        LoadingModule,
        AnimationModule,
        CartModule,
        VideoEffectsModule
      }
    };
  })();

  // Inicializa a aplicação
  AppModule.init();
});
