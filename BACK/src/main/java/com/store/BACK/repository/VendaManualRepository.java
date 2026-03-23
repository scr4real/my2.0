package com.store.BACK.repository;

import com.store.BACK.model.VendaManual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaManualRepository extends JpaRepository<VendaManual, Long> {
}