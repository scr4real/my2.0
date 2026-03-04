document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');
    
    // URL Base
    const BASE_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://localhost:8080'
        : 'https://back-production-e565.up.railway.app';

    const API_URL = `${BASE_URL}/api/produtos`;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // Variáveis globais para controlar a opção de conjunto
    let precoOriginalBase = 0;
    let formatoSelecionado = 'Conjunto Completo';
    let precoAtualCalculado = 0;

    if (!productId) {
        productDetailContainer.innerHTML = '<p class="loading-message">Produto inválido ou não encontrado.</p>';
        return;
    }

    const formatPrice = (price) => `R$ ${price.toFixed(2).replace('.', ',')}`;

    const getImageUrl = (path) => {
        if (!path) return '/FRONT/assets/images/placeholder.jpg';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${BASE_URL}/${cleanPath}`;
    };

    // --- BUSCA DADOS DO PRODUTO ---
    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${API_URL}/${productId}`);
            const product = response.data;
            
            // Busca variações
            let variations = [];
            if (product.codigoModelo) {
                try {
                    const varResponse = await axios.get(`${API_URL}/${productId}/variacoes`);
                    variations = varResponse.data;
                } catch (e) {}
            }

            renderProduct(product, variations);
            
            if (product.categoria && product.categoria.id) {
                fetchRelatedProducts(product.categoria.id, product.id);
            }
            
        } catch (error) {
            console.error('Erro:', error);
            productDetailContainer.innerHTML = '<p class="loading-message">Erro ao carregar o produto.</p>';
        }
    };

    // --- RENDERIZA PÁGINA PRINCIPAL DO PRODUTO ---
    const renderProduct = (product, variations) => {
        document.title = `${product.nome} | Japa Universe`;

        // Inicializa variáveis de preço
        precoOriginalBase = product.preco;
        precoAtualCalculado = product.preco;

        const originalPriceHTML = product.precoOriginal ? `<span class="price-original">${formatPrice(product.precoOriginal)}</span>` : '';
        const discount = product.precoOriginal ? Math.round(((product.precoOriginal - product.preco) / product.precoOriginal) * 100) : 0;
        const discountTagHTML = discount > 0 ? `<span class="discount-tag">-${discount}%</span>` : '';
        const imageUrl = getImageUrl(product.imagemUrl);

        // Galeria de imagens
        const images = [product.imagemUrl, product.imagemUrl2, product.imagemUrl3, product.imagemUrl4].filter(img => img);
        let thumbnailsHTML = '';
        if (images.length > 1) {
            thumbnailsHTML = images.map((img, index) => {
                const fullUrl = getImageUrl(img);
                const activeClass = index === 0 ? 'active' : '';
                return `
                    <div class="thumbnail-item ${activeClass}" onmouseover="updateMainImage('${fullUrl}', this)">
                        <img src="${fullUrl}" alt="Foto ${index + 1}" loading="lazy">
                    </div>
                `;
            }).join('');
        }

        // Variações de cor
        let variationsHTML = '';
        if (variations && variations.length > 1) {
            const variationsList = variations.map(v => {
                const isActive = v.id == product.id ? 'active-variant' : '';
                const vImage = getImageUrl(v.imagemUrl);
                return `<a href="?id=${v.id}" class="variant-option ${isActive}" title="${v.nome}"><img src="${vImage}" alt="${v.nome}" loading="lazy"></a>`;
            }).join('');
            variationsHTML = `<div class="variations-selector"><h3>Outras Cores:</h3><div class="variations-list">${variationsList}</div></div>`;
        }

        // --- LÓGICA DE TAMANHOS E TIPO DE COMPRA ---
        const catId = product.categoria ? product.categoria.id : 0;
        const marcaId = product.marca ? product.marca.id : 0;
        let sizes = [];
        let tipoCompraHTML = '';

        // SE o ID for 45 ou maior, é ROUPA. Senão, é TÊNIS.
        if (catId >= 45) {
            sizes = ['P', 'M', 'G', 'GG', 'XG'];
            
            // Verifica se é uma marca que vende conjunto (Nike, Corteiz, Trapstar, Syna) ou a categoria 47 (Conjuntos)
            const marcasComConjunto = [1, 13, 14, 15]; 
            const isConjunto = catId === 47 || (catId === 46 && marcasComConjunto.includes(marcaId));

            if(isConjunto) {
                tipoCompraHTML = `
                    <div id="tipo-compra-container" class="detail-section">
                        <h3>Opção de Compra:</h3>
                        <div class="tipo-grid">
                            <button class="tipo-btn active" data-tipo="Conjunto Completo" data-fator="1">Conjunto (Calça + Blusa)</button>
                            <button class="tipo-btn" data-tipo="Só a Parte de Cima" data-fator="0.65">Só a Parte de Cima</button>
                        </div>
                    </div>
                `;
            } else {
                formatoSelecionado = 'Padrão'; // Para jaquetas normais ou camisetas
            }

        } else {
            sizes = ['38', '39', '40', '41', '42', '43'];
            formatoSelecionado = 'Par'; // Para tênis
        }

        const sizeButtonsHTML = sizes.map(s => `<button class="size-btn">${s}</button>`).join('');
        // ----------------------------------------------

        const productHTML = `
            <div class="product-detail-grid">
                <div class="product-images">
                    <div class="thumbnail-gallery">${thumbnailsHTML}</div>
                    <div class="main-image-container">
                        <img src="${imageUrl}" 
                             alt="${product.nome}" 
                             id="main-product-image"
                             loading="eager"
                             fetchpriority="high"
                             decoding="async">
                    </div>
                </div>

                <div class="product-info">
                    <div class="breadcrumbs">
                        <a href="/">Início</a> / <a href="/FRONT/catalogo/HTML/catalogo.html">Catálogo</a> / <span>${product.nome}</span>
                    </div>
                    <h1>${product.nome}</h1>

                    <div class="price-box">
                        ${originalPriceHTML}
                        <div class="price-container">
                            <span class="price-current" id="preco-principal-tela">${formatPrice(product.preco)}</span>
                            ${discountTagHTML}
                        </div>
                        <span class="price-installments" id="preco-parcelado-tela">10x de ${formatPrice(product.preco / 10)} sem juros</span>
                    </div>

                    <div class="product-page-shipping">
                        <i class="fas fa-truck"></i> Frete Grátis para todo o Brasil
                    </div>

                    ${variationsHTML}

                    ${tipoCompraHTML} <div class="size-selector">
                        <h3>Tamanho:</h3>
                        <div class="size-options">
                            ${sizeButtonsHTML}
                        </div>
                    </div>

                    <button class="buy-button">Adicionar ao Carrinho</button>
                </div>
            </div>
            
            <div class="product-description">
                <h2>Descrição</h2>
                <p>${product.descricao || 'Produto original com garantia de qualidade Japa Universe.'}</p>
            </div>
        `;
        productDetailContainer.innerHTML = productHTML;

        // Função global troca de imagem
        window.updateMainImage = (url, element) => {
            const mainImg = document.getElementById('main-product-image');
            if(mainImg) mainImg.src = url;
            document.querySelectorAll('.thumbnail-item').forEach(el => el.classList.remove('active'));
            if(element) element.classList.add('active');
        };

        addEventListeners(product);
    };

    // --- BUSCA PRODUTOS RELACIONADOS ---
    const fetchRelatedProducts = async (categoryId, currentProductId) => {
        try {
            const response = await axios.get(`${API_URL}?categoriaId=${categoryId}`);
            // Filtra o próprio produto e limita a 8
            const relatedProducts = response.data.filter(p => p.id != currentProductId).slice(0, 8);
            renderRelatedProducts(relatedProducts);
        } catch (error) {
            console.error('Erro ao buscar relacionados:', error);
        }
    };

    // --- RENDERIZA CARD RELACIONADO ---
    const renderRelatedProducts = (products) => {
        const grid = document.getElementById('related-products-grid');
        const section = document.querySelector('.related-products-section');
        
        if (!products || products.length === 0) {
            if(section) section.style.display = 'none';
            return;
        }
        if(section) section.style.display = 'block';

        grid.innerHTML = products.map((product, index) => {
            const hasDiscount = product.precoOriginal && product.precoOriginal > product.preco;
            const discountPercentage = hasDiscount ? Math.round(((product.precoOriginal - product.preco) / product.precoOriginal) * 100) : 0;
            const imageUrl = getImageUrl(product.imagemUrl);
            const productUrl = `/FRONT/produto/HTML/produto.html?id=${product.id}`;

            const isPriority = index < 4;
            const loadingMode = isPriority ? 'eager' : 'lazy';

            return `
            <div class="swiper-slide">
                <a href="${productUrl}" class="related-product-card">
                    <div class="related-product-image-wrapper">
                        <img src="${imageUrl}" 
                             alt="${product.nome}"
                             loading="${loadingMode}"
                             decoding="async">
                        ${hasDiscount ? `<div class="related-discount-badge">-${discountPercentage}%</div>` : ''}
                    </div>
                    
                    <div class="related-product-info">
                        <p class="related-product-name">${product.nome}</p>
                        
                        <div class="related-shipping-tag">
                            <i class="fas fa-truck"></i> Frete Grátis
                        </div>
                        
                        <div class="related-price-line">
                            <span class="related-price-current">${formatPrice(product.preco)}</span>
                        </div>
                    </div>
                </a>
            </div>
            `;
        }).join('');

        if(window.relatedSwiper) window.relatedSwiper.destroy(true, true);
        window.relatedSwiper = new Swiper('.related-products-swiper', {
            slidesPerView: "auto",
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: { slidesPerView: 1.3, spaceBetween: 15 },
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 25 }
            }
        });
    };

    // --- LÓGICA DE EVENTOS (TAMANHOS, FORMATO E COMPRAR) ---
    const addEventListeners = (productData) => {
        // Eventos para Botões de Tamanho
        const sizeBtns = document.querySelectorAll('.size-btn');
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Eventos para Botões de Formato (Conjunto vs Só Parte de Cima)
        const tipoBtns = document.querySelectorAll('.tipo-btn');
        const precoElemento = document.getElementById('preco-principal-tela');
        const parcelaElemento = document.getElementById('preco-parcelado-tela');

        tipoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Atualiza classes ativas
                tipoBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Captura escolha
                formatoSelecionado = this.getAttribute('data-tipo');
                const fatorPreco = parseFloat(this.getAttribute('data-fator'));

                // Calcula novo preço e atualiza a tela
                precoAtualCalculado = precoOriginalBase * fatorPreco;
                
                if (precoElemento) precoElemento.innerText = formatPrice(precoAtualCalculado);
                if (parcelaElemento) parcelaElemento.innerText = `10x de ${formatPrice(precoAtualCalculado / 10)} sem juros`;
            });
        });

        // Botão de Adicionar ao Carrinho
        const buyButton = document.querySelector('.buy-button');
        if(buyButton) {
            buyButton.addEventListener('click', () => {
                const selectedSizeEl = document.querySelector('.size-btn.active');
                if (!selectedSizeEl) {
                    alert('Por favor, selecione um tamanho.');
                    return;
                }
                
                // Formata o nome para o carrinho (ex: "Nike Tech Fleece - Só a Parte de Cima")
                let nomeNoCarrinho = productData.nome;
                if (formatoSelecionado === 'Só a Parte de Cima') {
                    nomeNoCarrinho += ' (Só a Parte de Cima)';
                } else if (formatoSelecionado === 'Conjunto Completo') {
                    nomeNoCarrinho += ' (Conjunto)';
                }

                const productToAdd = {
                    id: productData.id.toString(), // Usa string para manter consistência no front
                    name: nomeNoCarrinho, 
                    price: precoAtualCalculado, // Manda o preço alterado (100% ou 65%)
                    image: getImageUrl(productData.imagemUrl),
                    size: selectedSizeEl.textContent,
                    formato: formatoSelecionado, // Manda a opção pro carrinho
                    quantity: 1
                };
    
                if (window.addToCart) {
                    window.addToCart(productToAdd);
                    const originalText = buyButton.textContent;
                    buyButton.textContent = "Adicionado!";
                    buyButton.style.background = "#00e676";
                    buyButton.style.color = "#fff";
                    buyButton.style.border = "none";
                    
                    setTimeout(() => {
                        buyButton.textContent = originalText;
                        buyButton.style.background = "";
                        buyButton.style.color = "";
                        buyButton.style.border = "";
                    }, 2000);
                } else {
                    console.error("Função addToCart não encontrada.");
                }
            });
        }
    };

    fetchProductData();
});