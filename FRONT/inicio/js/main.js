document.addEventListener("DOMContentLoaded", () => {
  /**
   * Módulo de Carregamento (ULTRA RÁPIDO)
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
        hideLoader(); // Remove imediatamente ao ler o JS
        setTimeout(hideLoader, 2000); // Fallback de segurança
      }
    }
    return { init };
  })();

  /**
   * Módulo de Animações com GSAP (CORRIGIDO: BOTÃO VISÍVEL)
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
    const checkoutBtn = document.querySelector('.checkout-btn');

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
        document.querySelector(".cart-count").textContent = cart.reduce((s, i) => s + i.quantity, 0);
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

  const AppModule = (() => {
    function init() {
      LoadingModule.init();
      AnimationModule.init();
      CartModule.init();
      const yearEl = document.getElementById("currentYear");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
    return { init };
  })();
  AppModule.init();
});
