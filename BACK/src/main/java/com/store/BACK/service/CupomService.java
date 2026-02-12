package com.store.BACK.service;

import com.store.BACK.model.Cupom;
import com.store.BACK.repository.CupomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class CupomService {

    @Autowired
    private CupomRepository cupomRepository;

    public Cupom validarCupom(String codigo) {
        // 1. Verifica se o código veio vazio
        if (codigo == null || codigo.trim().isEmpty()) {
            return null;
        }

        // 2. Busca no banco
        Optional<Cupom> cupomOpt = cupomRepository.findByCodigo(codigo.toUpperCase()); // Força maiúsculo

        if (cupomOpt.isEmpty()) {
            throw new RuntimeException("Cupom inválido: " + codigo);
        }

        Cupom cupom = cupomOpt.get();

        // 3. Verifica a validade (data)
        if (cupom.getDataValidade().isBefore(LocalDate.now())) {
            throw new RuntimeException("Este cupom expirou em: " + cupom.getDataValidade());
        }

        return cupom;
    }

    // Método auxiliar para calcular o valor do desconto
    public BigDecimal calcularDesconto(Cupom cupom, BigDecimal valorTotalPedido) {
        if (cupom == null) return BigDecimal.ZERO;

        BigDecimal desconto = BigDecimal.ZERO;

        if ("PERCENTUAL".equalsIgnoreCase(cupom.getTipoDesconto())) {
            // Ex: 10% de 200 = 20
            BigDecimal porcentagem = cupom.getDesconto().divide(new BigDecimal("100"));
            desconto = valorTotalPedido.multiply(porcentagem);
        } else {
            // "FIXO" - Ex: R$ 50,00 de desconto
            desconto = cupom.getDesconto();
        }

        return desconto;
    }
}