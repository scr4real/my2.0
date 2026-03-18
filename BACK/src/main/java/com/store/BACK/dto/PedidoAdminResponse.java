package com.store.BACK.dto;

import com.store.BACK.model.Pedido;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoAdminResponse {
    private Long id;
    private String nomeCliente;
    private LocalDateTime dataPedido;
    private BigDecimal valorTotal;
    private String status;
    
    // --- NOVOS CAMPOS ADICIONADOS ---
    private String cupomAplicado;
    private BigDecimal valorDesconto;

    public static PedidoAdminResponse fromPedido(Pedido pedido) {
        String nome = (pedido.getUsuario() != null) ? pedido.getUsuario().getNome() : "Usuário Desconhecido";
        return new PedidoAdminResponse(
                pedido.getId(),
                nome,
                pedido.getDataPedido(),
                pedido.getValorTotal(),
                pedido.getStatus(),
                pedido.getCupomAplicado(), // <-- PEGANDO O CUPOM DO BANCO
                pedido.getValorDesconto()  // <-- PEGANDO O DESCONTO DO BANCO
        );
    }
}