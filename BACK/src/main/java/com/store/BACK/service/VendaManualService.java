package com.store.BACK.service;

import com.store.BACK.model.VendaManual;
import com.store.BACK.repository.VendaManualRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendaManualService {

    private final VendaManualRepository repository;

    // Lista todas as vendas da mais recente para a mais antiga
    public List<VendaManual> listarTodas() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "dataVenda"));
    }

    @Transactional
    public VendaManual salvar(VendaManual venda) {
        return repository.save(venda);
    }

    @Transactional
    public void deletar(Long id) {
        repository.deleteById(id);
    }

    // Atualiza se já pagaste ao fornecedor
    @Transactional
    public VendaManual atualizarStatusFornecedor(Long id, boolean pago) {
        VendaManual venda = repository.findById(id).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        venda.setFornecedorPago(pago);
        return repository.save(venda);
    }

    // Atualiza se já pagaste o frete/transportadora
    @Transactional
    public VendaManual atualizarStatusFrete(Long id, boolean pago) {
        VendaManual venda = repository.findById(id).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        venda.setFretePago(pago);
        return repository.save(venda);
    }
}