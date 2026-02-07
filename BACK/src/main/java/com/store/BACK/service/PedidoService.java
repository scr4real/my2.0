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
import java.util.Optional; // Importação necessária para o Cupom

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

        // 1. Configurar Endereço
        Long enderecoEntregaId = checkoutRequest.getEnderecoEntregaId();
        Endereco endereco = enderecoRepository.findById(enderecoEntregaId)
                .orElseThrow(() -> new RuntimeException("Endereço de entrega não encontrado: " + enderecoEntregaId));
        pedido.setEnderecoDeEntrega(endereco);

        pedido.setNomeDestinatario(checkoutRequest.getNomeDestinatario());
        pedido.setTelefoneDestinatario(checkoutRequest.getTelefoneDestinatario());
        pedido.setCpfDestinatario(checkoutRequest.getCpfDestinatario());
        pedido.setObservacoes(checkoutRequest.getObservacoes());

        pedido.setComCaixa(checkoutRequest.isComCaixa());
        pedido.setEntregaPrioritaria(checkoutRequest.isEntregaPrioritaria());

        // 2. Processar Itens e Calcular Subtotal
        List<ItemPedido> itensPedido = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (ItemPedidoDTO itemDto : checkoutRequest.getItens()) {
            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + itemDto.getProdutoId()));

            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setTamanho(itemDto.getTamanho());
            item.setPrecoNoMomento(produto.getPreco());

            BigDecimal itemTotal = produto.getPreco().multiply(new BigDecimal(itemDto.getQuantidade()));
            subtotal = subtotal.add(itemTotal);
            itensPedido.add(item);
        }
        pedido.setItens(itensPedido);

        // 3. Lógica de Cupom (O que você adicionou, agora organizado)
        BigDecimal valorFinal = subtotal;

        if (checkoutRequest.getCodigoCupom() != null && !checkoutRequest.getCodigoCupom().isBlank()) {
            Optional<Cupom> cupomOpt = cupomRepository.findByCodigo(checkoutRequest.getCodigoCupom().toUpperCase());
            
            if (cupomOpt.isPresent()) {
                Cupom cupom = cupomOpt.get();
                
                if (cupom.getDataValidade().isBefore(LocalDate.now())) {
                    throw new RuntimeException("O cupom inserido já expirou.");
                }

                BigDecimal desconto;
                if ("PERCENTUAL".equals(cupom.getTipoDesconto())) {
                    // Ex: 10% -> subtotal * 0.10
                    desconto = subtotal.multiply(cupom.getDesconto().divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP));
                } else {
                    desconto = cupom.getDesconto();
                }
                
                valorFinal = valorFinal.subtract(desconto);
                pedido.setCupom(cupom); 
            } else {
                throw new RuntimeException("Cupom não encontrado.");
            }
        }

        // 4. Adicionar taxas extras (5% sobre o subtotal original)
        if (checkoutRequest.isComCaixa()) {
            valorFinal = valorFinal.add(subtotal.multiply(new BigDecimal("0.05")));
        }
        if (checkoutRequest.isEntregaPrioritaria()) {
            valorFinal = valorFinal.add(subtotal.multiply(new BigDecimal("0.05")));
        }

        // Garante que o total nunca seja negativo
        if (valorFinal.compareTo(BigDecimal.ZERO) < 0) valorFinal = BigDecimal.ZERO;
        
        pedido.setValorTotal(valorFinal.setScale(2, RoundingMode.HALF_UP));

        // 5. Salvar e Gerar Pagamento
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        String pixCode = pixPayloadService.generatePayload(pedidoSalvo);
        if (pixCode != null) {
            pedidoSalvo.setPixCopiaECola(pixCode);
            pedidoSalvo = pedidoRepository.save(pedidoSalvo);
        } else {
            throw new RuntimeException("Falha ao gerar o código PIX.");
        }

        emailService.enviarPedidoRecebido(pedidoSalvo);
        return pedidoSalvo;
    }

    @Transactional(readOnly = true)
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
            throw new RuntimeException("Permissão negada.");
        }

        if (!"PENDENTE".equalsIgnoreCase(pedido.getStatus())) {
            throw new RuntimeException("Apenas pedidos pendentes podem ser cancelados.");
        }

        pedidoRepository.delete(pedido);
    }
}