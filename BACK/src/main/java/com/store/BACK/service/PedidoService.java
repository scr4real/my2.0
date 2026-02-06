package com.store.BACK.service;

import com.store.BACK.dto.CheckoutRequestDTO;
import com.store.BACK.dto.ItemPedidoDTO;
import com.store.BACK.model.ItemPedido;
import com.store.BACK.model.Pedido;
import com.store.BACK.model.Produto;
import com.store.BACK.model.Usuario;
import com.store.BACK.model.Endereco;
import com.store.BACK.model.Cupom;
import com.store.BACK.repository.PedidoRepository;
import com.store.BACK.repository.ProdutoRepository;
import com.store.BACK.repository.EnderecoRepository;
import com.store.BACK.repository.CupomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private PixPayloadService pixPayloadService;

    @Autowired
    private CupomRepository cupomRepository;

    @Transactional
    public Pedido criarPedido(CheckoutRequestDTO checkoutRequest, Usuario usuario) {

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setDataPedido(LocalDateTime.now());
        pedido.setStatus("PENDENTE");

        Long enderecoEntregaId = checkoutRequest.getEnderecoEntregaId();
        Endereco endereco = enderecoRepository.findById(enderecoEntregaId)
                .orElseThrow(() -> new RuntimeException("Endereço de entrega não encontrado: " + enderecoEntregaId));
        pedido.setEnderecoDeEntrega(endereco);

        pedido.setNomeDestinatario(checkoutRequest.getNomeDestinatario());
        pedido.setTelefoneDestinatario(checkoutRequest.getTelefoneDestinatario());
        pedido.setCpfDestinatario(checkoutRequest.getCpfDestinatario());
        pedido.setObservacoes(checkoutRequest.getObservacoes());

        // --- NOVAS OPÇÕES SALVAS NO PEDIDO ---
        pedido.setComCaixa(checkoutRequest.isComCaixa());
        pedido.setEntregaPrioritaria(checkoutRequest.isEntregaPrioritaria());

        List<ItemPedido> itensPedido = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        List<ItemPedidoDTO> itensDTO = checkoutRequest.getItens();
        for (ItemPedidoDTO itemDTO : itensDTO) {
            Produto produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + itemDTO.getProdutoId()));

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemDTO.getQuantidade());
            itemPedido.setTamanho(itemDTO.getTamanho());
            itemPedido.setPrecoUnitario(produto.getPreco());

            itensPedido.add(itemPedido);
            subtotal = subtotal.add(produto.getPreco().multiply(BigDecimal.valueOf(itemDTO.getQuantidade())));
        }

        pedido.setItens(itensPedido);

        // --- INÍCIO DA LÓGICA DE CUPOM (ETAPA 2) ---
        BigDecimal valorBaseParaCalculo = subtotal;
        
        if (checkoutRequest.getCodigoCupom() != null && !checkoutRequest.getCodigoCupom().isBlank()) {
            Cupom cupom = cupomRepository.findByCodigo(checkoutRequest.getCodigoCupom())
                    .orElseThrow(() -> new RuntimeException("Cupom inválido ou não encontrado."));

            // Validação de validade
            if (cupom.getDataValidade().isBefore(LocalDate.now())) {
                throw new RuntimeException("Este cupom de desconto expirou.");
            }

            BigDecimal valorDesconto;
            if ("PERCENTUAL".equalsIgnoreCase(cupom.getTipoDesconto())) {
                // Cálculo de porcentagem: (Subtotal * Desconto) / 100
                valorDesconto = subtotal.multiply(cupom.getDesconto())
                        .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
            } else {
                // Valor fixo
                valorDesconto = cupom.getDesconto();
            }

            // Garante que o desconto não seja maior que o subtotal
            valorBaseParaCalculo = subtotal.subtract(valorDesconto);
            if (valorBaseParaCalculo.compareTo(BigDecimal.ZERO) < 0) {
                valorBaseParaCalculo = BigDecimal.ZERO;
            }
            
            pedido.setCupom(cupom); // Associa o cupom ao pedido para histórico
        }
        // --- FIM DA LÓGICA DE CUPOM ---

        // --- CÁLCULO DAS TAXAS E VALOR FINAL ---
        BigDecimal valorTotal = valorBaseParaCalculo;
        final BigDecimal TAXA_ADICIONAL = new BigDecimal("0.05");

        if (pedido.isComCaixa()) {
            BigDecimal taxaCaixa = subtotal.multiply(TAXA_ADICIONAL);
            valorTotal = valorTotal.add(taxaCaixa);
        }

        if (pedido.isEntregaPrioritaria()) {
            BigDecimal taxaPrioritaria = subtotal.multiply(TAXA_ADICIONAL);
            valorTotal = valorTotal.add(taxaPrioritaria);
        }

        pedido.setValorTotal(valorTotal.setScale(2, RoundingMode.HALF_UP));

        // Salva o pedido inicial
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        // Gera o PIX
        String pixCode = pixPayloadService.generatePayload(pedidoSalvo);

        if (pixCode != null) {
            pedidoSalvo.setPixCopiaECola(pixCode);
            pedidoSalvo = pedidoRepository.save(pedidoSalvo);
        } else {
            throw new RuntimeException("Falha crítica ao gerar o código PIX para o pedido. Pedido ID: " + pedidoSalvo.getId());
        }

        emailService.enviarPedidoRecebido(pedidoSalvo);

        return pedidoSalvo;
    }

    @Transactional
    public List<Pedido> getPedidosByUsuarioId(Long usuarioId){
        return pedidoRepository.findByUsuarioId(usuarioId);
    }

    public Pedido getPedidoById(Long id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public boolean isOwner(Long pedidoId, Long usuarioId) {
        return pedidoRepository.findById(pedidoId)
                .map(pedido -> pedido.getUsuario().getId().equals(usuarioId))
                .orElse(false);
    }

    public void excluirPedido(Long id, String emailUsuario) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (!pedido.getUsuario().getEmail().equals(emailUsuario)) {
            throw new RuntimeException("Você não tem permissão para excluir este pedido.");
        }

        if (!"PENDENTE".equalsIgnoreCase(pedido.getStatus())) {
            throw new RuntimeException("Apenas pedidos pendentes podem ser cancelados.");
        }

        pedidoRepository.delete(pedido);
    }
}