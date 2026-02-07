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
import java.util.Optional; // IMPORTANTE: Faltava este import

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

        // 1. Validar Endereço
        Long enderecoEntregaId = checkoutRequest.getEnderecoEntregaId();
        Endereco endereco = enderecoRepository.findById(enderecoEntregaId)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        pedido.setEnderecoDeEntrega(endereco);

        pedido.setNomeDestinatario(checkoutRequest.getNomeDestinatario());
        pedido.setTelefoneDestinatario(checkoutRequest.getTelefoneDestinatario());
        pedido.setCpfDestinatario(checkoutRequest.getCpfDestinatario());
        pedido.setObservacoes(checkoutRequest.getObservacoes());
        pedido.setComCaixa(checkoutRequest.isComCaixa());
        pedido.setEntregaPrioritaria(checkoutRequest.isEntregaPrioritaria());

        // 2. Calcular Subtotal dos Itens (Essencial para o cupom funcionar)
        List<ItemPedido> itensPedido = new ArrayList<>();
        BigDecimal subtotalCalculado = BigDecimal.ZERO;

        for (ItemPedidoDTO itemDto : checkoutRequest.getItens()) {
            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setTamanho(itemDto.getTamanho());
            item.setPrecoNoMomento(produto.getPreco()); // Agora o build aceita este método

            BigDecimal itemTotal = produto.getPreco().multiply(new BigDecimal(itemDto.getQuantidade()));
            subtotalCalculado = subtotalCalculado.add(itemTotal);
            itensPedido.add(item);
        }
        pedido.setItens(itensPedido);

        // 3. Aplicar Lógica de Cupom (Usando a variável subtotalCalculado)
        BigDecimal valorFinal = subtotalCalculado;

        if (checkoutRequest.getCodigoCupom() != null && !checkoutRequest.getCodigoCupom().isBlank()) {
            Optional<Cupom> cupomOpt = cupomRepository.findByCodigo(checkoutRequest.getCodigoCupom().toUpperCase());
            
            if (cupomOpt.isPresent()) {
                Cupom cupom = cupomOpt.get();
                if (cupom.getDataValidade().isBefore(LocalDate.now())) {
                    throw new RuntimeException("Cupom expirado");
                }

                BigDecimal desconto;
                if ("PERCENTUAL".equals(cupom.getTipoDesconto())) {
                    desconto = subtotalCalculado.multiply(cupom.getDesconto().divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP));
                } else {
                    desconto = cupom.getDesconto();
                }
                valorFinal = valorFinal.subtract(desconto);
                pedido.setCupom(cupom);
            } else {
                throw new RuntimeException("Cupom inválido");
            }
        }

        // 4. Adicionar Taxas (5% do subtotal original)
        if (checkoutRequest.isComCaixa()) {
            valorFinal = valorFinal.add(subtotalCalculado.multiply(new BigDecimal("0.05")));
        }
        if (checkoutRequest.isEntregaPrioritaria()) {
            valorFinal = valorFinal.add(subtotalCalculado.multiply(new BigDecimal("0.05")));
        }

        pedido.setValorTotal(valorFinal.setScale(2, RoundingMode.HALF_UP));

        // 5. Salvar e Gerar Pagamento
        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        String pixCode = pixPayloadService.generatePayload(pedidoSalvo);
        
        if (pixCode != null) {
            pedidoSalvo.setPixCopiaECola(pixCode);
            pedidoSalvo = pedidoRepository.save(pedidoSalvo);
        }

        emailService.enviarPedidoRecebido(pedidoSalvo);
        return pedidoSalvo;
    }

    // Mantém os outros métodos abaixo (getPedidoById, excluirPedido, etc...)
    public Pedido getPedidoById(Long id) { return pedidoRepository.findById(id).orElse(null); }
    public List<Pedido> getPedidosByUsuarioId(Long usuarioId){ return pedidoRepository.findByUsuarioId(usuarioId); }
}