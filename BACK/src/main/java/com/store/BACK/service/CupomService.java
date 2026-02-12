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
        // 1. Se não digitou nada, retorna nulo (sem erro, apenas não aplica cupom)
        if (codigo == null || codigo.trim().isEmpty()) {
            return null;
        }

        // 2. Busca no banco transformando em maiúsculo (ex: "japa10" vira "JAPA10")
        Optional<Cupom> cupomOpt = cupomRepository.findByCodigo(codigo.toUpperCase());

        if (cupomOpt.isEmpty()) {
            throw new RuntimeException("Cupom inválido: " + codigo);
        }

        Cupom cupom = cupomOpt.get();

        // 3. Verifica se já venceu
        if (cupom.getDataValidade().isBefore(LocalDate.now())) {
            throw new RuntimeException("Este cupom expirou em: " + cupom.getDataValidade());
        }

        return cupom;
    }

    public BigDecimal calcularDesconto(Cupom cupom, BigDecimal valorTotalPedido) {
        if (cupom == null) return BigDecimal.ZERO;

        BigDecimal desconto;

        if ("PERCENTUAL".equalsIgnoreCase(cupom.getTipoDesconto())) {
            // Ex: 10% de 200 = 20.00
            BigDecimal porcentagem = cupom.getDesconto().divide(new BigDecimal("100"));
            desconto = valorTotalPedido.multiply(porcentagem);
        } else {
            // "FIXO" - Ex: R$ 50,00 de desconto
            desconto = cupom.getDesconto();
        }

        return desconto;
    }
}