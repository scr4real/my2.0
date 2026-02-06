// Atualiza visual dos cards de seleção (Frete/Caixa)
window.updatePreferenceUI = function(input) {
    const name = input.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
        radio.closest('.radio-card').classList.remove('selected');
    });
    input.closest('.radio-card').classList.add('selected');
    input.dispatchEvent(new Event('change', { bubbles: true }));
}

document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTOS ===
    const cartItemsContainer = document.getElementById('cart-items-container');
    const checkoutButton = document.getElementById('checkout-button');
    const token = localStorage.getItem('jwtToken');

    // Totais e Resumo
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTotal = document.getElementById('summary-total');
    const taxaCaixaEl = document.getElementById('taxaCaixa');
    const taxaPrioritariaEl = document.getElementById('taxaPrioritaria');
    const rowTaxaCaixa = document.getElementById('row-taxa-caixa');
    const rowTaxaPrioridade = document.getElementById('row-taxa-prioridade');
    const prazoCorreiosEl = document.getElementById('prazoCorreios');
    const prazoResidenciaEl = document.getElementById('prazoResidencia');

    // === NOVOS ELEMENTOS DO CUPOM (ADICIONADOS) ===
    const couponInput = document.getElementById('coupon-input');
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const couponMessage = document.getElementById('coupon-message');
    const rowDescontoCupom = document.getElementById('row-desconto-cupom');
    const valorDescontoCupomEl = document.getElementById('valorDescontoCupom');
    let cupomAtivo = null;

    // Formulário
    const addressSelectionContainer = document.getElementById('address-selection');
    const nomeEl = document.getElementById('nomeCompleto');
    const cpfEl = document.getElementById('cpfDestinatario');
    const emailEl = document.getElementById('email');
    const telefoneEl = document.getElementById('telefone');
    const confirmTelEl = document.getElementById('confirmacaoTelefone');
    const obsEl = document.getElementById('observacoes');
    
    // Checkboxes Obrigatórios
    const confirmaEnderecoCheckbox = document.getElementById('confirmaEndereco');
    const confirmaMaioridadeCheckbox = document.getElementById('confirmaMaioridade');

    let selectedAddressId = null;
    let currentSubtotal = 0;

    // Definição da URL da API
    const BASE_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
        ? 'http://localhost:8080/api'
        : 'https://back-production-e565.up.railway.app/api';

    // Redireciona se não estiver logado
    if (!token) {
        window.location.href = '../../login/HTML/login.html';
        return;
    }

    const apiClient = axios.create({
        baseURL: BASE_URL,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    // Cliente público para validação de cupom
    const publicApiClient = axios.create({ baseURL: BASE_URL });

    const getCart = () => JSON.parse(localStorage.getItem('japaUniverseCart')) || [];
    
    const PRAZO = {
        PRIORITARIA: { BR: '10-15 dias', CASA: '18-23 dias' },
        PADRAO: { BR: '15-20 dias', CASA: '23-28 dias' }
    };

    // === FUNÇÃO DE VALIDAÇÃO FORTE DE CPF (MÓDULO 11) ===
    const validarCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); // Limpa pontos e traços
        
        if (cpf == '') return false;
        
        // Bloqueia CPFs com todos os números iguais (ex: 111.111.111-11)
        if (cpf.length != 11 || 
            /^(\d)\1{10}$/.test(cpf))
                return false;
        
        // Valida 1º Dígito
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
        
        // Valida 2º Dígito
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;
        
        return true;
    };

<<<<<<< HEAD
    // === VALIDAÇÃO DE CNPJ ===
    const validarCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        
        if (cnpj == '' || cnpj.length != 14) return false;
        
        if (/^(\d)\1{13}$/.test(cnpj)) return false;
        
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(cpf.charAt(tamanho - i)) * (10 - i);
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
        
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;
        
        return true;
    };

    // === NOVA LÓGICA: APLICAÇÃO DE CUPOM (ADICIONADA) ===
    const handleApplyCoupon = async () => {
        const codigo = couponInput.value.trim().toUpperCase();
        if (!codigo) return;

        applyCouponBtn.disabled = true;
        applyCouponBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            const res = await publicApiClient.get(`/public/validar-cupom?codigo=${codigo}`);
            cupomAtivo = res.data;
            couponMessage.textContent = "Cupom aplicado!";
            couponMessage.style.color = "var(--success)";
            updateSummary();
        } catch (err) {
            cupomAtivo = null;
            couponMessage.textContent = "Cupom inválido ou expirado.";
            couponMessage.style.color = "var(--error)";
            updateSummary();
        } finally {
            applyCouponBtn.disabled = false;
            applyCouponBtn.textContent = "Aplicar";
        }
    };

    // === ATUALIZAÇÃO DE RESUMO DE VALORES (MODIFICADA PARA CUPOM) ===
=======
    // === ATUALIZAÇÃO DE RESUMO DE VALORES ===
>>>>>>> 406e9ffd7cbab16cf4fd694d0ec5ede54454179a
    const updateSummary = () => {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let total = subtotal;

        // --- CÁLCULO DO DESCONTO (ADICIONADO) ---
        let valorDesconto = 0;
        if (cupomAtivo) {
            if (cupomAtivo.tipoDesconto === 'PERCENTUAL') {
                valorDesconto = subtotal * (cupomAtivo.desconto / 100);
            } else {
                valorDesconto = cupomAtivo.desconto;
            }
            total -= valorDesconto;
            valorDescontoCupomEl.textContent = `- R$ ${valorDesconto.toFixed(2).replace('.', ',')}`;
            rowDescontoCupom.classList.remove('hidden');
        } else {
            rowDescontoCupom.classList.add('hidden');
        }

        const comCaixa = document.querySelector('input[name="opcaoCaixa"]:checked')?.value === 'true';
        if (comCaixa) {
            const val = subtotal * 0.05;
            total += val;
            taxaCaixaEl.textContent = `R$ ${val.toFixed(2).replace('.', ',')}`;
            rowTaxaCaixa.classList.remove('hidden');
        } else {
            rowTaxaCaixa.classList.add('hidden');
        }

        const prioritaria = document.querySelector('input[name="opcaoPrioritaria"]:checked')?.value === 'true';
        if (prioritaria) {
            const val = subtotal * 0.05;
            total += val;
            taxaPrioritariaEl.textContent = `R$ ${val.toFixed(2).replace('.', ',')}`;
            rowTaxaPrioridade.classList.remove('hidden');
        } else {
            rowTaxaPrioridade.classList.add('hidden');
        }

        summarySubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        summaryTotal.textContent = `R$ ${Math.max(0, total).toFixed(2).replace('.', ',')}`;
        
        const p = prioritaria ? PRAZO.PRIORITARIA : PRAZO.PADRAO;
        prazoCorreiosEl.textContent = `Brasil: ${p.BR}`;
        prazoResidenciaEl.textContent = `Sua Casa: ${p.CASA}`;

        currentSubtotal = subtotal;
    };

    const renderCart = () => {
        const cart = getCart();
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="color:#aaa">Carrinho vazio.</p>';
            checkoutButton.disabled = true;
            updateSummary();
            return;
        }

        checkoutButton.disabled = false;
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="info">
                    <h4>${item.name}</h4>
                    <p>Tam: ${item.size} | Qtd: ${item.quantity}</p>
                    <p>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        `).join('');
        updateSummary();
    };

    // === MÁSCARAS DE INPUT ===
    
    const mascaraCPF = (value) => {
        return value
            .replace(/\D/g, '') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') 
            .replace(/(-\d{2})\d+?$/, '$1'); 
    };

    const mascaraTelefone = (value) => {
        return value
            .replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, '($1) $2') 
            .replace(/(\d{5})(\d)/, '$1-$2') 
            .replace(/(-\d{4})\d+?$/, '$1'); 
    };

    // Eventos de Input (Formatação enquanto digita)
    if (cpfEl) {
        cpfEl.addEventListener('input', (e) => {
            e.target.value = mascaraCPF(e.target.value);
        });

        // CORREÇÃO DO BUG "FUNDO BRANCO": 
        // Agora usamos cores escuras transparentes para não sumir com o texto branco
        cpfEl.addEventListener('blur', (e) => {
            const valorLimpo = e.target.value.replace(/\D/g, '');
            if (valorLimpo.length === 11) {
                if (validarCPF(valorLimpo)) {
                    // CPF Válido: Borda Verde, Fundo Verde Escuro Transparente
                    cpfEl.style.borderColor = '#28a745';
                    cpfEl.style.backgroundColor = 'rgba(40, 167, 69, 0.1)'; 
                } else {
                    // CPF Inválido: Borda Vermelha, Fundo Vermelho Escuro Transparente
                    cpfEl.style.borderColor = '#dc3545';
                    cpfEl.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                }
            } else {
                // Reseta se estiver incompleto
                cpfEl.style.borderColor = '';
                cpfEl.style.backgroundColor = '';
            }
        });
    }

    if (telefoneEl) {
        telefoneEl.addEventListener('input', (e) => {
            e.target.value = mascaraTelefone(e.target.value);
            validatePhone(); 
        });
    }

    if (confirmTelEl) {
        confirmTelEl.addEventListener('input', (e) => {
            e.target.value = mascaraTelefone(e.target.value);
            validatePhone(); 
        });
    }

    const loadAddresses = async () => {
        try {
            const res = await apiClient.get('/usuario/meus-dados');
            const addresses = res.data.enderecos || [];
            
            if (res.data.nome) nomeEl.value = res.data.nome;
            if (res.data.cpf) cpfEl.value = mascaraCPF(res.data.cpf);
            if (res.data.email) emailEl.value = res.data.email;
            if (res.data.telefone) telefoneEl.value = mascaraTelefone(res.data.telefone);

            if (addresses.length === 0) {
                addressSelectionContainer.innerHTML = `<p>Nenhum endereço. <a href="../../perfil/HTML/perfil.html" style="color:var(--primary)">Cadastrar agora</a></p>`;
                return;
            }

            addressSelectionContainer.innerHTML = addresses.map((addr, idx) => `
                <label class="address-option">
                    <input type="radio" name="selectedAddress" value="${addr.id}" ${idx === 0 ? 'checked' : ''}>
                    <div class="address-details">
                        <strong>${addr.rua}, ${addr.numero} ${addr.complemento || ''}</strong>
                        <p>${addr.bairro} - ${addr.cidade}/${addr.estado}</p>
                        <p>CEP: ${addr.cep}</p>
                    </div>
                </label>
            `).join('') + `<a href="../../perfil/HTML/perfil.html" style="color:var(--primary); font-size:0.9rem; margin-top:10px; display:block;">Gerenciar Endereços</a>`;

            const radios = addressSelectionContainer.querySelectorAll('input[name="selectedAddress"]');
            selectedAddressId = radios[0].value;
            radios.forEach(r => r.addEventListener('change', e => selectedAddressId = e.target.value));

        } catch (err) {
            console.error(err);
            addressSelectionContainer.innerHTML = '<p style="color:red">Erro ao carregar dados.</p>';
        }
    };

    // === PROCESSAMENTO DO CHECKOUT (ATUALIZADO COM CUPOM) ===
    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (!selectedAddressId) return alert('Selecione um endereço.');
        
        const telLimpo = telefoneEl.value.replace(/\D/g, '');
        const confTelLimpo = confirmTelEl.value.replace(/\D/g, '');
        const cpfLimpo = cpfEl.value.replace(/\D/g, '');

        // 1. Validação de Telefones
        if (telLimpo !== confTelLimpo) return alert('Os telefones não conferem.');
        if (telLimpo.length < 10) return alert('Telefone inválido.');

        // 2. Validação Rigorosa de CPF
        if (!validarCPF(cpfLimpo)) {
            cpfEl.style.borderColor = '#dc3545';
            cpfEl.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
            cpfEl.focus();
            return alert('O CPF informado é inválido. Verifique os números.');
        }

        // 3. Validação da Declaração de Maioridade
        if (confirmaMaioridadeCheckbox && !confirmaMaioridadeCheckbox.checked) {
            return alert('Você deve declarar que é maior de 18 anos para continuar.');
        }
        
        // 4. Validação da Confirmação de Endereço
        if (!confirmaEnderecoCheckbox.checked) {
            return alert('Por favor, confirme se o endereço está correto.');
        }

        const cart = getCart();
        const checkoutData = {
            itens: cart.map(i => ({ produtoId: i.id, quantidade: i.quantity, tamanho: i.size })),
            enderecoEntregaId: parseInt(selectedAddressId),
            nomeDestinatario: nomeEl.value,
            cpfDestinatario: cpfLimpo, 
            telefoneDestinatario: telLimpo, 
            observacoes: obsEl.value,
            comCaixa: document.querySelector('input[name="opcaoCaixa"]:checked')?.value === 'true',
            entregaPrioritaria: document.querySelector('input[name="opcaoPrioritaria"]:checked')?.value === 'true',
<<<<<<< HEAD
            metodoPagamento: selectedPaymentMethod,
            // --- CÓDIGO DO CUPOM (ADICIONADO) ---
            codigoCupom: cupomAtivo ? cupomAtivo.codigo : null
=======
            metodoPagamento: "PIX"
>>>>>>> 406e9ffd7cbab16cf4fd694d0ec5ede54454179a
        };

        try {
            checkoutButton.disabled = true;
            checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';

            const res = await apiClient.post('/pedidos', checkoutData);
            
            localStorage.removeItem('japaUniverseCart');
            if(window.updateCartCounter) window.updateCartCounter();

            sessionStorage.setItem('ultimoPedidoId', res.data.id);
            window.location.href = `../../pagamento/HTML/pagamento.html?id=${res.data.id}`;

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Erro ao processar pedido.');
            checkoutButton.disabled = false;
            checkoutButton.innerHTML = 'Finalizar Compra <i class="fas fa-arrow-right"></i>';
        }
    };

    document.querySelectorAll('input[name="opcaoCaixa"], input[name="opcaoPrioritaria"]').forEach(el => {
        el.addEventListener('change', updateSummary);
    });

    // --- LISTENER DO BOTÃO DE CUPOM (ADICIONADO) ---
    applyCouponBtn.addEventListener('click', handleApplyCoupon);

    checkoutButton.addEventListener('click', handleCheckout);
    
    const validatePhone = () => {
        const msg = document.getElementById('phone-match-message');
        const t1 = telefoneEl.value.replace(/\D/g, '');
        const t2 = confirmTelEl.value.replace(/\D/g, '');

        if(t1 && t2) {
            if(t1 === t2) {
                msg.textContent = "Ok!";
                msg.style.color = "var(--success)"; 
            } else {
                msg.textContent = "Números não conferem";
                msg.style.color = "#ff4444"; 
            }
        } else {
            msg.textContent = "";
        }
    };

    loadAddresses();
    renderCart();
<<<<<<< HEAD
    
    // Pre-carregar SDK do MP (mas não inicializar campos até selecionar cartão)
    console.log('🛒 Checkout Japa Universe carregado');
=======
>>>>>>> 406e9ffd7cbab16cf4fd694d0ec5ede54454179a
});