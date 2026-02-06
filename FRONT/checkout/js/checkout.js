/**
 * JAPA UNIVERSE - CHECKOUT JS
 * Integração completa com Mercado Pago (PIX + Cartão de Crédito)
 * Fase 1: Frontend com Tokenização Segura
 */

// Import axios and MercadoPago
import axios from 'axios';
import MercadoPago from 'mercadopago';

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
    // === CONFIGURAÇÃO DO MERCADO PAGO ===
    // IMPORTANTE: Substitua pela sua PUBLIC_KEY de produção/sandbox
    const MP_PUBLIC_KEY = 'YOUR_MERCADO_PAGO_PUBLIC_KEY'; // Ex: 'APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    
    let mp = null;
    let cardForm = null;
    let cardNumberElement = null;
    let expirationDateElement = null;
    let securityCodeElement = null;

    // === ELEMENTOS DO DOM ===
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

    // Elementos de Pagamento
    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    const creditCardForm = document.getElementById('credit-card-form');
    const installmentsSelect = document.getElementById('installments');
    const cardholderNameInput = document.getElementById('cardholderName');
    const identificationNumberInput = document.getElementById('identificationNumber');
    const identificationTypeSelect = document.getElementById('identificationType');

    let selectedAddressId = null;
    let currentSubtotal = 0;
    let currentTotal = 0;
    let selectedPaymentMethod = 'PIX';
    let cardToken = null;
    let selectedInstallments = 1;

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

    // === INICIALIZAÇÃO DO MERCADO PAGO ===
    const initMercadoPago = () => {
        if (MP_PUBLIC_KEY === 'YOUR_MERCADO_PAGO_PUBLIC_KEY') {
            console.warn('⚠️ Configure sua PUBLIC_KEY do Mercado Pago no arquivo checkout.js');
            return;
        }

        try {
            mp = new MercadoPago(MP_PUBLIC_KEY, {
                locale: 'pt-BR'
            });

            // Criar Secure Fields
            createSecureFields();
            
            console.log('✅ Mercado Pago SDK inicializado com sucesso');
        } catch (error) {
            console.error('❌ Erro ao inicializar Mercado Pago:', error);
        }
    };

    // === CRIAR CAMPOS SEGUROS (SECURE FIELDS) ===
    const createSecureFields = () => {
        if (!mp) return;

        const style = {
            height: '48px',
            padding: '14px 16px',
            fontFamily: '"Inter", sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            backgroundColor: '#2a2a2a',
            border: '1px solid #333333',
            borderRadius: '8px'
        };

        // Card Number Field
        cardNumberElement = mp.fields.create('cardNumber', {
            placeholder: '0000 0000 0000 0000',
            style: style
        }).mount('cardNumber');

        // Expiration Date Field
        expirationDateElement = mp.fields.create('expirationDate', {
            placeholder: 'MM/AA',
            style: style
        }).mount('expirationDate');

        // Security Code (CVV) Field
        securityCodeElement = mp.fields.create('securityCode', {
            placeholder: '123',
            style: style
        }).mount('securityCode');

        // Event listeners para validação visual
        cardNumberElement.on('focus', () => highlightField('cardNumber', true));
        cardNumberElement.on('blur', () => highlightField('cardNumber', false));
        cardNumberElement.on('validityChange', (event) => handleValidityChange('cardNumber', event));
        cardNumberElement.on('binChange', handleBinChange);

        expirationDateElement.on('focus', () => highlightField('expirationDate', true));
        expirationDateElement.on('blur', () => highlightField('expirationDate', false));
        expirationDateElement.on('validityChange', (event) => handleValidityChange('expirationDate', event));

        securityCodeElement.on('focus', () => highlightField('securityCode', true));
        securityCodeElement.on('blur', () => highlightField('securityCode', false));
        securityCodeElement.on('validityChange', (event) => handleValidityChange('securityCode', event));
    };

    // === HIGHLIGHT DE CAMPOS SEGUROS ===
    const highlightField = (fieldId, focused) => {
        const container = document.getElementById(fieldId);
        if (container) {
            if (focused) {
                container.style.borderColor = 'var(--primary)';
                container.style.boxShadow = '0 0 0 3px rgba(255, 122, 0, 0.1)';
            } else {
                container.style.borderColor = '#333333';
                container.style.boxShadow = 'none';
            }
        }
    };

    // === VALIDAÇÃO DE CAMPOS SEGUROS ===
    const handleValidityChange = (fieldId, event) => {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const container = document.getElementById(fieldId);
        
        if (event.errorMessages && event.errorMessages.length > 0) {
            if (errorElement) errorElement.textContent = event.errorMessages[0];
            if (container) container.style.borderColor = 'var(--error)';
        } else {
            if (errorElement) errorElement.textContent = '';
            if (container) container.style.borderColor = event.valid ? 'var(--success)' : '#333333';
        }
    };

    // === DETECTAR BANDEIRA DO CARTÃO E CARREGAR PARCELAS ===
    const handleBinChange = async (event) => {
        const bin = event.bin;
        
        if (bin && bin.length >= 6) {
            try {
                // Buscar informações do cartão (bandeira, etc)
                const paymentMethods = await mp.getPaymentMethods({ bin });
                
                if (paymentMethods.results && paymentMethods.results.length > 0) {
                    const paymentMethod = paymentMethods.results[0];
                    console.log('🎴 Bandeira detectada:', paymentMethod.name);
                    
                    // Carregar parcelas disponíveis
                    await loadInstallments(paymentMethod.id, bin);
                }
            } catch (error) {
                console.error('Erro ao detectar bandeira:', error);
            }
        } else {
            // Limpar parcelas se BIN incompleto
            installmentsSelect.innerHTML = '<option value="">Preencha o número do cartão</option>';
        }
    };

    // === CARREGAR OPÇÕES DE PARCELAMENTO ===
    const loadInstallments = async (paymentMethodId, bin) => {
        try {
            const installmentsResponse = await mp.getInstallments({
                amount: String(currentTotal),
                bin: bin,
                paymentTypeId: 'credit_card'
            });

            if (installmentsResponse && installmentsResponse.length > 0) {
                const installmentOptions = installmentsResponse[0].payer_costs;
                
                installmentsSelect.innerHTML = installmentOptions.map(option => {
                    const installmentValue = (currentTotal / option.installments).toFixed(2).replace('.', ',');
                    const totalValue = (option.installments * parseFloat((currentTotal / option.installments).toFixed(2))).toFixed(2).replace('.', ',');
                    
                    let label = `${option.installments}x de R$ ${installmentValue}`;
                    
                    if (option.installments === 1) {
                        label = `1x de R$ ${totalValue} (à vista)`;
                    } else if (option.installment_rate > 0) {
                        label += ` (Total: R$ ${totalValue} - ${option.installment_rate}% juros)`;
                    } else {
                        label += ' sem juros';
                    }
                    
                    return `<option value="${option.installments}" data-rate="${option.installment_rate}">${label}</option>`;
                }).join('');

                console.log('✅ Parcelas carregadas:', installmentOptions.length, 'opções');
            }
        } catch (error) {
            console.error('Erro ao carregar parcelas:', error);
            installmentsSelect.innerHTML = '<option value="1">1x (à vista)</option>';
        }
    };

    // === GERAR TOKEN DO CARTÃO ===
    const generateCardToken = async () => {
        if (!mp) {
            throw new Error('Mercado Pago não inicializado');
        }

        try {
            const cardholderName = cardholderNameInput.value.trim().toUpperCase();
            const identificationType = identificationTypeSelect.value;
            const identificationNumber = identificationNumberInput.value.replace(/\D/g, '');

            if (!cardholderName) {
                throw new Error('Preencha o nome no cartão');
            }

            if (!identificationNumber || identificationNumber.length < 11) {
                throw new Error('Preencha o documento corretamente');
            }

            // Criar token usando os Secure Fields
            const token = await mp.fields.createCardToken({
                cardholderName: cardholderName,
                identificationType: identificationType,
                identificationNumber: identificationNumber
            });

            console.log('✅ Token gerado com sucesso:', token.id);
            return token.id;

        } catch (error) {
            console.error('❌ Erro ao gerar token:', error);
            throw error;
        }
    };

    // === FUNÇÃO DE VALIDAÇÃO FORTE DE CPF (MÓDULO 11) ===
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
        currentTotal = total;
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

    const mascaraCNPJ = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const mascaraTelefone = (value) => {
        return value
            .replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, '($1) $2') 
            .replace(/(\d{5})(\d)/, '$1-$2') 
            .replace(/(-\d{4})\d+?$/, '$1'); 
    };

    // === EVENTOS DE INPUT ===
    if (cpfEl) {
        cpfEl.addEventListener('input', (e) => {
            e.target.value = mascaraCPF(e.target.value);
            // Sincronizar com campo de documento do cartão
            if (identificationTypeSelect.value === 'CPF') {
                identificationNumberInput.value = e.target.value;
            }
        });

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

    // === EVENTOS DO DOCUMENTO DE IDENTIFICAÇÃO (CARTÃO) ===
    if (identificationTypeSelect) {
        identificationTypeSelect.addEventListener('change', () => {
            const tipo = identificationTypeSelect.value;
            if (tipo === 'CPF') {
                identificationNumberInput.placeholder = '000.000.000-00';
                identificationNumberInput.maxLength = 14;
                identificationNumberInput.value = cpfEl.value; // Sincroniza com CPF principal
            } else {
                identificationNumberInput.placeholder = '00.000.000/0000-00';
                identificationNumberInput.maxLength = 18;
                identificationNumberInput.value = '';
            }
        });
    }

    if (identificationNumberInput) {
        identificationNumberInput.addEventListener('input', (e) => {
            const tipo = identificationTypeSelect.value;
            if (tipo === 'CPF') {
                e.target.value = mascaraCPF(e.target.value);
            } else {
                e.target.value = mascaraCNPJ(e.target.value);
            }
        });
    }

    // === SELEÇÃO DE MÉTODO DE PAGAMENTO ===
    paymentMethodCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover seleção anterior
            paymentMethodCards.forEach(c => c.classList.remove('selected'));
            
            // Adicionar seleção atual
            card.classList.add('selected');
            
            // Atualizar radio button
            const radio = card.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Atualizar método selecionado
            selectedPaymentMethod = radio.value;
            
            // Mostrar/esconder formulário de cartão
            if (selectedPaymentMethod === 'CREDIT_CARD') {
                creditCardForm.classList.remove('hidden');
                
                // Inicializar MP se ainda não foi
                if (!mp) {
                    initMercadoPago();
                }
            } else {
                creditCardForm.classList.add('hidden');
            }

            console.log('💳 Método de pagamento selecionado:', selectedPaymentMethod);
        });
    });

    // === CARREGAR ENDEREÇOS ===
    const loadAddresses = async () => {
        try {
            const res = await apiClient.get('/usuario/meus-dados');
            const addresses = res.data.enderecos || [];
            
            if (res.data.nome) nomeEl.value = res.data.nome;
            if (res.data.cpf) {
                cpfEl.value = mascaraCPF(res.data.cpf);
                identificationNumberInput.value = mascaraCPF(res.data.cpf);
            }
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

        // 5. Se for cartão de crédito, gerar token
        if (selectedPaymentMethod === 'CREDIT_CARD') {
            // Validar campos do cartão
            if (!cardholderNameInput.value.trim()) {
                return alert('Preencha o nome no cartão.');
            }

            const docLimpo = identificationNumberInput.value.replace(/\D/g, '');
            const docTipo = identificationTypeSelect.value;
            
            if (docTipo === 'CPF' && !validarCPF(docLimpo)) {
                return alert('CPF do titular do cartão é inválido.');
            }
            
            if (docTipo === 'CNPJ' && !validarCNPJ(docLimpo)) {
                return alert('CNPJ do titular do cartão é inválido.');
            }

            if (!installmentsSelect.value) {
                return alert('Selecione o número de parcelas.');
            }

            try {
                checkoutButton.disabled = true;
                checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando token seguro...';
                
                cardToken = await generateCardToken();
                selectedInstallments = parseInt(installmentsSelect.value);
                
            } catch (error) {
                checkoutButton.disabled = false;
                checkoutButton.innerHTML = 'Finalizar Compra <i class="fas fa-arrow-right"></i>';
                return alert(error.message || 'Erro ao processar dados do cartão. Verifique as informações.');
            }
        }

        // Preparar dados do checkout
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
            metodoPagamento: selectedPaymentMethod,
            // --- CÓDIGO DO CUPOM (ADICIONADO) ---
            codigoCupom: cupomAtivo ? cupomAtivo.codigo : null
        };

        // Adicionar dados do cartão se aplicável
        if (selectedPaymentMethod === 'CREDIT_CARD') {
            checkoutData.cardToken = cardToken;
            checkoutData.installments = selectedInstallments;
            checkoutData.payerEmail = emailEl.value;
        }

        try {
            checkoutButton.disabled = true;
            checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando pedido...';

            const res = await apiClient.post('/pedidos', checkoutData);
            
            localStorage.removeItem('japaUniverseCart');
            if(window.updateCartCounter) window.updateCartCounter();

            sessionStorage.setItem('ultimoPedidoId', res.data.id);
            
            // Redirecionar baseado no método de pagamento
            if (selectedPaymentMethod === 'PIX') {
                window.location.href = `../../pagamento/HTML/pagamento.html?id=${res.data.id}`;
            } else {
                // Para cartão, redirecionar para página de confirmação
                window.location.href = `../../pagamento/HTML/confirmacao.html?id=${res.data.id}`;
            }

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Erro ao processar pedido.');
            checkoutButton.disabled = false;
            checkoutButton.innerHTML = 'Finalizar Compra <i class="fas fa-arrow-right"></i>';
        }
    };

    // === EVENT LISTENERS ===
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

    // === INICIALIZAÇÃO ===
    loadAddresses();
    renderCart();
    
    // Pre-carregar SDK do MP (mas não inicializar campos até selecionar cartão)
    console.log('🛒 Checkout Japa Universe carregado');
});