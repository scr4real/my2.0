document.addEventListener("DOMContentLoaded", () => {
  /**
   * Módulo de Carregamento (ULTRA RÁPIDO)
   * Libera a tela assim que a estrutura carrega, sem esperar imagens pesadas.
   */
  const LoadingModule = (() => {
    const loadingOverlay = document.querySelector(".loading-overlay");
    
    function hideLoader() {
      if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        loadingOverlay.style.opacity = "0";
        loadingOverlay.classList.add('hidden'); // Marca para não rodar 2x
        setTimeout(() => {
          loadingOverlay.style.display = "none";
        }, 500);
      }
    }

    function init() {
      if (loadingOverlay) {
        // Remove o loader assim que o DOM estiver interativo (muito antes das imagens)
        // Adiciona um timeout de segurança de 2s caso algo trave
        const safetyTimeout = setTimeout(hideLoader, 2000);

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            hideLoader();
            clearTimeout(safetyTimeout);
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                hideLoader();
                clearTimeout(safetyTimeout);
            });
            window.addEventListener('load', () => {
                hideLoader();
                clearTimeout(safetyTimeout);
            });
        }
      }
    }
    return { init };
  })();

  /**
   * Módulo de Interação do Header
   */
  const HeaderModule = (() => {
    function init() {
      const header = document.querySelector(".main-header");
      if (header) {
        const handleScroll = () => {
          header.classList.toggle("scrolled", window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
      }
    }
    return { init };
  })();

  /**
   * Módulo de Animações com GSAP
   */
  const AnimationModule = (() => {
    function init() {
      if (typeof gsap === "undefined") return;
      
      const elementsToAnimate = document.querySelectorAll(".gsap-fade-up");
      if (elementsToAnimate.length > 0) {
          gsap.from(".gsap-fade-up", {
              duration: 0.8, // Mais rápido
              y: 30,
              opacity: 0,
              delay: 0.1, 
              ease: "power2.out",
              stagger: 0.1,
          });
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
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("japaUniverseCart")) || [];
    } catch (e) {
        cart = [];
    }

    const saveCart = () => localStorage.setItem("japaUniverseCart", JSON.stringify(cart));
    
    const formatPrice = (price) => {
        const numericPrice = Number(price);
        if (isNaN(numericPrice)) return "R$ --,--";
        return `R$ ${numericPrice.toFixed(2).replace('.', ',')}`;
    };

    const toggleModal = () => {
        if (cartModal) {
            if (!cartModal.classList.contains("active")) updateCart();
            cartModal.classList.toggle("active");
        }
    };

    const updateCart = () => {
        renderCartItems();
        updateCartInfo();
    };

    const renderCartItems = () => {
        if (!cartItemsContainer) return;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }
        if (checkoutBtn) checkoutBtn.disabled = false;
         
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                <img src="${item.image || 'placeholder.png'}" alt="${item.name}" class="cart-item-image" loading="lazy">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Tam: ${item.size}</p>
                    <p class="price">${formatPrice(item.price)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn quantity-decrease">-</button>
                            <input class="quantity-input" type="number" value="${item.quantity || 1}" min="1">
                            <button class="quantity-btn quantity-increase">+</button>
                        </div>
                        <button class="remove-item-btn">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const updateCartInfo = () => {
        const cartCountEl = document.querySelector(".cart-count");
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
        
        if (cartCountEl) {
             cartCountEl.textContent = totalItems;
             if (totalItems > 0) {
                 cartCountEl.classList.add('updated');
                 setTimeout(() => cartCountEl.classList.remove('updated'), 300);
             }
        }
        if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
    };

    const addToCart = (product) => {
        if (!product || !product.id || !product.size) return;
        
        const existing = cart.findIndex(item => item.id === product.id && item.size === product.size);
        if (existing > -1) cart[existing].quantity = (cart[existing].quantity || 0) + 1;
        else cart.push({ ...product, quantity: 1 });
        
        saveCart();
        updateCart();
        
        if (cartModal && !cartModal.classList.contains('active')) toggleModal();
        else updateCartInfo();
    };
    
    const handleCartActions = (e) => {
        const target = e.target;
        const cartItemEl = target.closest('.cart-item');
        if (!cartItemEl) return;

        const id = cartItemEl.dataset.id;
        const size = cartItemEl.dataset.size;
        const idx = cart.findIndex(item => item.id === id && item.size === size);
        
        if (idx === -1) return;

        if (target.classList.contains('quantity-increase')) cart[idx].quantity++;
        else if (target.classList.contains('quantity-decrease')) {
            if (cart[idx].quantity > 1) cart[idx].quantity--;
            else cart.splice(idx, 1);
        } 
        else if (target.classList.contains('remove-item-btn')) cart.splice(idx, 1);
        else if (target.classList.contains('quantity-input')) {
             const val = parseInt(target.value, 10);
             if (!isNaN(val) && val >= 1) cart[idx].quantity = val;
             else target.value = cart[idx].quantity || 1; 
        }

        saveCart();
        renderCartItems(); 
        updateCartInfo(); 
    };
    
    const init = () => {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#cartButton')) toggleModal();
        });
        
        if (closeButton) closeButton.addEventListener("click", toggleModal);
        if (overlay) overlay.addEventListener("click", toggleModal);
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', handleCartActions);
            cartItemsContainer.addEventListener('input', (e) => { 
                if (e.target.classList.contains('quantity-input')) handleCartActions(e);
            });
        }
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                const basePath = document.querySelector('header.main-header')?.dataset?.basepath || '';
                const cleanPath = basePath === '.' ? '' : basePath;
                window.location.href = `${cleanPath}/FRONT/checkout/HTML/checkout.html`;
            });
        }
        
        window.addToCart = addToCart;
        window.updateCartCounter = updateCartInfo; 
        updateCartInfo(); 
    }

    return { init, formatPrice, getImageUrl: (path) => {
        if (!path) return '/FRONT/assets/images/placeholder-product.jpg';
        if (path.startsWith('http')) return path;
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://back-production-e565.up.railway.app';
        return `${baseUrl}/${path.startsWith('/') ? path.substring(1) : path}`;
    }};
  })();

  /**
   * Módulo Quick View
   */
  const QuickViewModule = (() => {
    const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8080/api' : 'https://back-production-e565.up.railway.app/api';
    
    const elements = {
        overlay: document.getElementById('quickViewModal'),
        content: document.getElementById('quickViewContent'),
        closeBtn: document.getElementById('closeQuickViewBtn')
    };

    let selectedSize = null;
    let currentProduct = null;
    const { formatPrice, getImageUrl } = CartModule;

    const quickView = {
        open: async (id) => {
            if (!elements.overlay) return;
            
            elements.overlay.classList.add('quickview-modal-overlay', 'active');
            document.body.style.overflow = 'hidden';
            quickView.renderSkeleton();

            try {
                const res = await axios.get(`${API_BASE}/produtos/${id}`);
                currentProduct = res.data;
                quickView.render(currentProduct);
            } catch (e) {
                console.error(e);
                elements.content.innerHTML = `<div class="quickview-error"><p>Erro ao carregar.</p><button class="btn" onclick="window.quickViewApp.close()">Fechar</button></div>`;
            }
        },

        renderSkeleton: () => {
            elements.content.innerHTML = '<div class="quickview-loading" style="display:flex;justify-content:center;align-items:center;height:300px;"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
        },

        render: (p) => {
            const hasDiscount = p.precoOriginal > p.preco;
            const discount = hasDiscount ? Math.round((1 - p.preco/p.precoOriginal)*100) : 0;
            const sizes = ['38','39','40','41','42','43']; 

            elements.content.innerHTML = `
                <div class="quickview-gallery">
                    <img src="${getImageUrl(p.imagemUrl)}" class="quickview-main-image" id="qvMainImg" loading="eager">
                </div>
                <div class="quickview-details">
                    <div class="quickview-brand">${p.marca?.nome || 'Japa Universe'}</div>
                    <h1 class="quickview-title">${p.nome}</h1>
                    <div class="quickview-price">
                        <span class="quickview-current-price">${formatPrice(p.preco)}</span>
                        ${hasDiscount ? `<span class="quickview-original-price">${formatPrice(p.precoOriginal)}</span>` : ''}
                    </div>
                    <div class="quickview-size-section">
                        <div class="quickview-size-title">Tamanho:</div>
                        <div class="quickview-size-options">
                            ${sizes.map(s => `<div class="quickview-size-option" onclick="window.quickViewApp.selectSize(this, '${s}')">${s}</div>`).join('')}
                        </div>
                    </div>
                    <div class="quickview-actions">
                        <button class="btn btn-primary quickview-add-to-cart" id="qvAddBtn" disabled onclick="window.quickViewApp.add()">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            `;
        },

        close: () => {
            if (elements.overlay) elements.overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { if(elements.content) elements.content.innerHTML = ''; }, 300);
        }
    };

    const init = () => {
        if (elements.closeBtn) elements.closeBtn.addEventListener('click', quickView.close);
        if (elements.overlay) {
            elements.overlay.addEventListener('click', (e) => {
                if (e.target === elements.overlay || e.target.classList.contains('quickview-modal-overlay')) quickView.close();
            });
        }
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') quickView.close(); });

        window.quickViewApp = {
            openQuickView: quickView.open,
            close: quickView.close,
            selectSize: (el, size) => {
                document.querySelectorAll('.quickview-size-option').forEach(o => o.classList.remove('selected'));
                el.classList.add('selected');
                selectedSize = size;
                const btn = document.getElementById('qvAddBtn');
                if(btn) btn.disabled = false;
            },
            add: () => {
                if(!selectedSize || !currentProduct) return;
                window.addToCart({
                    id: currentProduct.id.toString(),
                    name: currentProduct.nome,
                    price: currentProduct.preco,
                    image: getImageUrl(currentProduct.imagemUrl),
                    size: selectedSize,
                    quantity: 1
                });
                quickView.close();
            }
        };
    };

    return { init };
  })();

  const AppModule = (() => {
    function init() {
      LoadingModule.init(); // OTIMIZADO: Roda imediatamente
      HeaderModule.init();
      window.addEventListener("load", AnimationModule.init);
      CartModule.init();
      QuickViewModule.init();
      const yearEl = document.getElementById("currentYear");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
    return { init };
  })();

  AppModule.init();
});