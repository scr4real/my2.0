/**
 * JAPA UNIVERSE - CHECKOUT JS (INTEGRADO MERCADO PAGO V2)
 */

// Atualiza visual dos cards de seleção (Frete/Caixa)
window.updatePreferenceUI = function(input) {
    const name = input.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
        radio.closest('.radio-card').classList.remove('selected');
    });
    input.closest('.radio-card').classList.add('selected');
    input.dispatchEvent(new Event('change', { bubbles: true }));
}

// Troca interface entre PIX e Cartão
window.togglePaymentUI = function(input) {
    const cardFormEl = document.getElementById('card-payment-form');
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
    input.closest('.payment-option').classList.add('selected');
    
    if(input.value === 'card') {
        cardFormEl.style.display = 'block';
    } else {
        cardFormEl.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTOS ===
    const cartItemsContainer = document.getElementById('cart-items-container');
    const checkoutButton = document.getElementById('checkout-button');
    const token = localStorage.getItem('jwtToken');
    const checkoutForm = document.getElementById('form-checkout');

    // Inicialização Mercado Pago
    // ATENÇÃO: Substitua pela sua PUBLIC_KEY real do painel do Mercado Pago
    const mp = new MercadoPago('SUA_PUBLIC_KEY_AQUI'); 

    // Totais e Resumo
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTotal = document.getElementById('summary-total');
    const taxaCaixaEl = document.getElementById('taxaCaixa');
    const taxaPrioritariaEl = document.getElementById('taxaPrioritaria');
    const rowTaxaCaixa = document.getElementById('row-taxa-caixa');
    const rowTaxaPrioridade = document.getElementById('row-taxa-prioridade');
    const prazoCorreiosEl = document.getElementById('prazoCorreios');
    const prazoResidenciaEl = document.getElementById('prazoResidencia');

    // Formulário
    const addressSelectionContainer = document.getElementById('address-selection');
    const nomeEl = document.getElementById('nomeCompleto');
    const cpfEl = document.getElementById('cpfDestinatario');
    const emailEl = document.getElementById('email');
    const telefoneEl = document.getElementById('telefone');
    const confirmTelEl = document.getElementById('confirmTel');
    const obsEl = document.getElementById('observacoes');
    const confirmaEnderecoCheckbox = document.getElementById('confirmaEndereco');
    const confirmaMaioridadeCheckbox = document.getElementById('confirmaMaioridade');

    let totalGeral = 0;
    let selectedAddressId = null;

    const BASE_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
        ? 'http://localhost:8080/api'
        : 'https://back-production-e565.up.railway.app/api';

    if (!token) {
        window.location.href = '../../login/HTML/login.html';
        return;
    }

    const apiClient = axios.create({
        baseURL: BASE_URL,
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const getCart = () => JSON.parse(localStorage.getItem('japaUniverseCart')) || [];
    
    const PRAZO = {
        PRIORITARIA: { BR: '10-15 dias', CASA: '18-23 dias' },
        PADRAO: { BR: '15-20 dias', CASA: '23-28 dias' }
    };

    // === INICIALIZAÇÃO DO CARD FORM MERCADO PAGO ===
    const cardForm = mp.cardForm({
        amount: "0",
        iframe: true,
        form: {
            id: "form-checkout",
            cardNumber: { id: "form-checkout__cardNumber", placeholder: "Número do cartão" },
            expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/AA" },
            securityCode: { id: "form-checkout__securityCode", placeholder: "CVV" },
            cardholderName: { id: "form-checkout__cardholderName" },
            cardholderEmail: { id: "form-checkout__cardholderEmail" },
            installments: { id: "form-checkout__installments" },
            identificationNumber: { id: "form-checkout__identificationNumber" },
        },
        callbacks: {
            onFormMounted: error => {
                if (error) return console.warn("Erro ao montar formulário: ", error);
            }
        },
    });

    // === VALIDAÇÃO E MÁSCARAS (SUA LÓGICA ANTERIOR) ===
    const validarCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '' || cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        return rev == parseInt(cpf.charAt(10));
    };

    const mascaraCPF = (v) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1');
    const mascaraTelefone = (v) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{4})\d+?$/, '$1');

    cpfEl?.addEventListener('input', (e) => e.target.value = mascaraCPF(e.target.value));
    telefoneEl?.addEventListener('input', (e) => { e.target.value = mascaraTelefone(e.target.value); validatePhone(); });
    confirmTelEl?.addEventListener('input', (e) => { e.target.value = mascaraTelefone(e.target.value); validatePhone(); });

    // === ATUALIZAÇÃO DE RESUMO ===
    const updateSummary = () => {
        const cart = getCart();
        const subtotal = cart.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        let extra = 0;

        const comCaixa = document.querySelector('input[name="opcaoCaixa"]:checked')?.value === 'com' || document.querySelector('input[name="opcaoCaixa"]:checked')?.value === 'true';
        const isPrioritaria = document.querySelector('input[name="opcaoPrioritaria"]:checked')?.value === 'prioritaria' || document.querySelector('input[name="opcaoPrioritaria"]:checked')?.value === 'true';

        if (comCaixa) {
            const val = subtotal * 0.05;
            taxaCaixaEl.textContent = `R$ ${val.toFixed(2).replace('.', ',')}`;
            rowTaxaCaixa.classList.remove('hidden');
            extra += val;
        } else { rowTaxaCaixa.classList.add('hidden'); }

        if (isPrioritaria) {
            const val = subtotal * 0.05;
            taxaPrioritariaEl.textContent = `R$ ${val.toFixed(2).replace('.', ',')}`;
            rowTaxaPrioridade.classList.remove('hidden');
            extra += val;
        } else { rowTaxaPrioridade.classList.add('hidden'); }

        totalGeral = subtotal + extra;
        summarySubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        summaryTotal.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
        
        const p = isPrioritaria ? PRAZO.PRIORITARIA : PRAZO.PADRAO;
        prazoCorreiosEl.textContent = `Brasil: ${p.BR}`;
        prazoResidenciaEl.textContent = `Sua Casa: ${p.CASA}`;

        if(cardForm) cardForm.update({ amount: totalGeral.toString() });
    };

    const loadData = async () => {
        const cart = getCart();
        if (cart.length === 0) { window.location.href = "/index.html"; return; }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="summary-item">
                <img src="${item.imagemUrl || item.image}" alt="${item.nome || item.name}">
                <div class="info">
                    <h4>${item.nome || item.name}</h4>
                    <p>Tam: ${item.tamanho || item.size} | Qtd: ${item.quantidade || item.quantity}</p>
                    <p>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        `).join('');

        updateSummary();

        try {
            const res = await apiClient.get('/usuario/meus-dados');
            const addresses = res.data.enderecos || [];
            if (res.data.nome) nomeEl.value = res.data.nome;
            if (res.data.cpf) cpfEl.value = mascaraCPF(res.data.cpf);
            if (res.data.telefone) telefoneEl.value = mascaraTelefone(res.data.telefone);

            addressSelectionContainer.innerHTML = addresses.map((addr, idx) => `
                <label class="address-card ${idx === 0 ? 'selected' : ''}">
                    <input type="radio" name="addressId" value="${addr.id}" ${idx === 0 ? 'checked' : ''} 
                           onchange="document.querySelectorAll('.address-card').forEach(c => c.classList.remove('selected')); this.closest('.address-card').classList.add('selected'); window.selectedAddressId = this.value">
                    <div class="address-info">
                        <strong>${addr.rua || addr.logradouro}, ${addr.numero}</strong>
                        <span>${addr.bairro} - ${addr.cidade}/${addr.estado || addr.uf}</span>
                    </div>
                </label>
            `).join('');
            window.selectedAddressId = addresses[0]?.id;
        } catch (error) { console.error(error); }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
        const cpfLimpo = cpfEl.value.replace(/\D/g, '');

        if (!window.selectedAddressId) return alert("Selecione um endereço.");
        if (!validarCPF(cpfLimpo)) return alert("CPF inválido.");
        if (confirmaMaioridadeCheckbox && !confirmaMaioridadeCheckbox.checked) return alert("Declare maioridade.");

        checkoutButton.disabled = true;
        checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';

        const cart = getCart();
        const checkoutData = {
            itens: cart.map(i => ({ produtoId: i.id, quantidade: i.quantidade || i.quantity, tamanho: i.tamanho || i.size })),
            enderecoEntregaId: window.selectedAddressId,
            nomeDestinatario: nomeEl.value,
            cpfDestinatario: cpfLimpo,
            telefoneDestinatario: telefoneEl.value.replace(/\D/g, ''),
            observacoes: obsEl.value,
            comCaixa: document.querySelector('input[name="opcaoCaixa"]:checked').value === 'com' || document.querySelector('input[name="opcaoCaixa"]:checked').value === 'true',
            entregaPrioritaria: document.querySelector('input[name="opcaoPrioritaria"]:checked').value === 'prioritaria' || document.querySelector('input[name="opcaoPrioritaria"]:checked').value === 'true',
            metodoPagamento: paymentType.toUpperCase()
        };

        if(paymentType === 'card') {
            try {
                const cardData = await cardForm.createCardToken();
                checkoutData.token = cardData.token;
                checkoutData.installments = document.getElementById('form-checkout__installments').value;
            } catch (err) {
                alert("Erro no cartão. Verifique os dados.");
                checkoutButton.disabled = false;
                checkoutButton.innerHTML = 'Finalizar Compra';
                return;
            }
        }

        try {
            const res = await apiClient.post('/pedidos', checkoutData);
            localStorage.removeItem('japaUniverseCart');
            sessionStorage.setItem('ultimoPedidoId', res.data.id);
            window.location.href = `../../pagamento/HTML/pagamento.html?id=${res.data.id}`;
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao processar pedido.');
            checkoutButton.disabled = false;
            checkoutButton.innerHTML = 'Finalizar Compra';
        }
    };

    const validatePhone = () => {
        const msg = document.getElementById('phone-match-message');
        if(!msg) return;
        const t1 = telefoneEl.value.replace(/\D/g, '');
        const t2 = confirmTelEl.value.replace(/\D/g, '');
        if(t1 && t2) {
            msg.textContent = t1 === t2 ? "Ok!" : "Números não conferem";
            msg.style.color = t1 === t2 ? "var(--success)" : "#ff4444";
        }
    };

    document.querySelectorAll('input[name="opcaoCaixa"], input[name="opcaoPrioritaria"]').forEach(el => el.addEventListener('change', updateSummary));
    checkoutButton.addEventListener('click', handleCheckout);
    loadData();
});