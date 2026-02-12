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
    
    // Elementos de Taxas
    const taxaCaixaEl = document.getElementById('taxaCaixa');
    const taxaPrioritariaEl = document.getElementById('taxaPrioritaria');
    const rowTaxaCaixa = document.getElementById('row-taxa-caixa');
    const rowTaxaPrioridade = document.getElementById('row-taxa-prioridade');
    
    // Elementos de Cupom (NOVOS)
    const cupomInput = document.getElementById('cupomInput');
    const btnAplicarCupom = document.getElementById('btnAplicarCupom');
    const msgCupom = document.getElementById('msgCupom');
    const rowDesconto = document.getElementById('row-desconto');
    const valorDescontoEl = document.getElementById('valorDesconto');

    // Prazos
    const prazoCorreiosEl = document.getElementById('prazoCorreios');
    const prazoResidenciaEl = document.getElementById('prazoResidencia');

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
    let cupomAplicado = null; // Armazena o objeto do cupom se válido

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

    const getCart = () => JSON.parse(localStorage.getItem('japaUniverseCart')) || [];
    
    const PRAZO = {
        PRIORITARIA: { BR: '10-15 dias', CASA: '18-23 dias' },
        PADRAO: { BR: '15-20 dias', CASA: '23-28 dias' }
    };

    // === LÓGICA DE CUPOM ===
    const handleAplicarCupom = async () => {
        const codigo = cupomInput.value.trim();
        
        if (!codigo) {
            msgCupom.textContent = "Digite um código.";
            msgCupom.className = "coupon-msg error";
            return;
        }

        // Feedback visual de carregamento
        btnAplicarCupom.disabled = true;
        btnAplicarCupom.textContent = "...";

        try {
            // Chama a API para validar
            const res = await apiClient.get(`/cupons/validar/${codigo}`);
            const cupom = res.data;

            // Sucesso
            cupomAplicado = cupom;
            msgCupom.textContent = `Cupom "${cupom.codigo}" aplicado!`;
            msgCupom.className = "coupon-msg success";
            
            // Atualiza os valores
            updateSummary();

        } catch (error) {
            console.error(error);
            cupomAplicado = null;
            msgCupom.textContent = "Cupom inválido ou expirado.";
            msgCupom.className = "coupon-msg error";
            updateSummary(); // Recalcula sem desconto
        } finally {
            btnAplicarCupom.disabled = false;
            btnAplicarCupom.textContent = "Aplicar";
        }
    };

    if(btnAplicarCupom) {
        btnAplicarCupom.addEventListener('click', handleAplicarCupom);
    }

    // === VALIDAÇÃO DE CPF (MÓDULO 11) ===
    const validarCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); 
        if (cpf == '') return false;
        if (cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
        
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;
        return true;
    };

    // === ATUALIZAÇÃO DE RESUMO DE VALORES ===
    const updateSummary = () => {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        let total = subtotal;
        let valorDesconto = 0;

        // 1. Aplica Taxas (Caixa / Prioridade)
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

        // 2. Aplica Desconto do Cupom (Se houver)
        if (cupomAplicado) {
            // Recalcula o total parcial com as taxas antes de aplicar desconto?
            // Geralmente cupom aplica sobre o valor total acumulado ou subtotal.
            // Aqui vamos aplicar sobre o valor acumulado até agora (Subtotal + Taxas).
            
            if (cupomAplicado.tipoDesconto === 'PERCENTUAL') {
                valorDesconto = total * (cupomAplicado.desconto / 100);
            } else {
                valorDesconto = cupomAplicado.desconto;
            }

            // Exibe o desconto
            valorDescontoEl.textContent = `- R$ ${valorDesconto.toFixed(2).replace('.', ',')}`;
            rowDesconto.classList.remove('hidden');
            
            // Subtrai do total
            total -= valorDesconto;
            if (total < 0) total = 0; // Proteção
            
        } else {
            rowDesconto.classList.add('hidden');
        }

        // 3. Atualiza Totais na Tela
        summarySubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        summaryTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        
        const p = prioritaria ? PRAZO.PRIORITARIA : PRAZO.PADRAO;
        prazoCorreiosEl.textContent = `Brasil: ${p.BR}`;
        prazoResidenciaEl.textContent = `Sua Casa: ${p.CASA}`;
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
        return value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1'); 
    };

    const mascaraTelefone = (value) => {
        return value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1'); 
    };

    if (cpfEl) {
        cpfEl.addEventListener('input', (e) => { e.target.value = mascaraCPF(e.target.value); });
        cpfEl.addEventListener('blur', (e) => {
            const valorLimpo = e.target.value.replace(/\D/g, '');
            if (valorLimpo.length === 11) {
                if (validarCPF(valorLimpo)) {
                    cpfEl.style.borderColor = '#28a745';
                    cpfEl.style.backgroundColor = 'rgba(40, 167, 69, 0.1)'; 
                } else {
                    cpfEl.style.borderColor = '#dc3545';
                    cpfEl.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                }
            } else {
                cpfEl.style.borderColor = '';
                cpfEl.style.backgroundColor = '';
            }
        });
    }

    if (telefoneEl) telefoneEl.addEventListener('input', (e) => { e.target.value = mascaraTelefone(e.target.value); validatePhone(); });
    if (confirmTelEl) confirmTelEl.addEventListener('input', (e) => { e.target.value = mascaraTelefone(e.target.value); validatePhone(); });

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
            selectedAddressId = radios[0]?.value;
            radios.forEach(r => r.addEventListener('change', e => selectedAddressId = e.target.value));

        } catch (err) {
            console.error(err);
            addressSelectionContainer.innerHTML = '<p style="color:red">Erro ao carregar dados.</p>';
        }
    };

    // === PROCESSAMENTO DO CHECKOUT ===
    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (!selectedAddressId) return alert('Selecione um endereço.');
        
        const telLimpo = telefoneEl.value.replace(/\D/g, '');
        const confTelLimpo = confirmTelEl.value.replace(/\D/g, '');
        const cpfLimpo = cpfEl.value.replace(/\D/g, '');

        if (telLimpo !== confTelLimpo) return alert('Os telefones não conferem.');
        if (telLimpo.length < 10) return alert('Telefone inválido.');

        if (!validarCPF(cpfLimpo)) {
            cpfEl.style.borderColor = '#dc3545';
            cpfEl.focus();
            return alert('O CPF informado é inválido. Verifique os números.');
        }

        if (confirmaMaioridadeCheckbox && !confirmaMaioridadeCheckbox.checked) {
            return alert('Você deve declarar que é maior de 18 anos para continuar.');
        }
        
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
            metodoPagamento: "PIX",
            // ENVIA O CUPOM SE TIVER SIDO APLICADO
            cupomCodigo: cupomAplicado ? cupomAplicado.codigo : null 
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

    checkoutButton.addEventListener('click', handleCheckout);
    
    loadAddresses();
    renderCart();
});