package com.store.BACK.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vendas_manuais")
@Getter
@Setter
public class VendaManual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeProduto;

    @Column(nullable = false)
    private BigDecimal valorVenda;

    @Column(nullable = false)
    private BigDecimal custoFornecedor;

    @Column(nullable = false)
    private BigDecimal custoFrete;

    @Column(nullable = false)
    private BigDecimal lucroLivre;

    @Column(nullable = false)
    private LocalDateTime dataVenda;

    // Controle de dívidas
    @Column(nullable = false)
    private boolean fornecedorPago = false;

    @Column(nullable = false)
    private boolean fretePago = false;

    // Método que calcula o lucro automaticamente antes de salvar
    @PrePersist
    @PreUpdate
    public void calcularLucro() {
        if (valorVenda != null && custoFornecedor != null && custoFrete != null) {
            this.lucroLivre = valorVenda.subtract(custoFornecedor).subtract(custoFrete);
        }
        if (dataVenda == null) {
            this.dataVenda = LocalDateTime.now();
        }
    }
}