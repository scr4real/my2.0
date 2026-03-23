package com.store.BACK.controller;

import com.store.BACK.model.VendaManual;
import com.store.BACK.service.VendaManualService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/vendas-manuais")
@RequiredArgsConstructor
public class VendaManualController {

    private final VendaManualService service;

    @GetMapping
    public ResponseEntity<List<VendaManual>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @PostMapping
    public ResponseEntity<VendaManual> criar(@RequestBody VendaManual venda) {
        return ResponseEntity.ok(service.salvar(venda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/fornecedor")
    public ResponseEntity<VendaManual> atualizarFornecedor(@PathVariable Long id, @RequestBody Map<String, Boolean> payload) {
        return ResponseEntity.ok(service.atualizarStatusFornecedor(id, payload.get("pago")));
    }

    @PatchMapping("/{id}/frete")
    public ResponseEntity<VendaManual> atualizarFrete(@PathVariable Long id, @RequestBody Map<String, Boolean> payload) {
        return ResponseEntity.ok(service.atualizarStatusFrete(id, payload.get("pago")));
    }
}
