package com.store.BACK.controller;

import com.store.BACK.model.Contato;
import com.store.BACK.model.Newsletter;
import com.store.BACK.model.Cupom;
import com.store.BACK.repository.ContatoRepository;
import com.store.BACK.repository.NewsletterRepository;
import com.store.BACK.repository.CupomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private NewsletterRepository newsletterRepository;

    @Autowired
    private CupomRepository cupomRepository; // Injetado para permitir a validação

    @PostMapping("/contato")
    public ResponseEntity<Contato> enviarContato(@RequestBody Contato contato) {
        return ResponseEntity.ok(contatoRepository.save(contato));
    }

    @PostMapping("/newsletter")
    public ResponseEntity<Newsletter> inscreverNewsletter(@RequestBody Newsletter newsletter) {
        return ResponseEntity.ok(newsletterRepository.save(newsletter));
    }

    // --- NOVO ENDPOINT: VALIDAÇÃO DE CUPOM PARA O CHECKOUT ---
    @GetMapping("/validar-cupom")
    public ResponseEntity<?> validarCupom(@RequestParam String codigo) {
        return cupomRepository.findByCodigo(codigo)
                .map(cupom -> {
                    // Verifica se o cupom ainda é válido hoje
                    if (cupom.getDataValidade().isBefore(LocalDate.now())) {
                        return ResponseEntity.badRequest().body("Este cupom de desconto expirou.");
                    }
                    // Se estiver tudo ok, devolve os dados do cupom para o frontend (valor e tipo)
                    return ResponseEntity.ok(cupom);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}