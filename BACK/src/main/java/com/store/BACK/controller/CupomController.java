package com.store.BACK.controller;

import com.store.BACK.model.Cupom;
import com.store.BACK.repository.CupomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cupons")
@RequiredArgsConstructor
public class CupomController {

    private final CupomRepository cupomRepository;

    // Criar Cupom (Apenas ADMIN pode criar)
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Cupom> criarCupom(@RequestBody Cupom cupom) {
        // Força o código a ficar em MAIÚSCULO (ex: "japa10" vira "JAPA10")
        cupom.setCodigo(cupom.getCodigo().toUpperCase());
        return ResponseEntity.ok(cupomRepository.save(cupom));
    }

    // Listar todos os cupons (Apenas ADMIN)
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Cupom>> listarCupons() {
        return ResponseEntity.ok(cupomRepository.findAll());
    }
    
    // Validar Cupom (Qualquer usuário logado pode consultar para ver se existe)
    @GetMapping("/validar/{codigo}")
    public ResponseEntity<Cupom> checarCupom(@PathVariable String codigo) {
        return cupomRepository.findByCodigo(codigo.toUpperCase())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}