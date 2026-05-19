package com.palle.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.palle.entity.Bank;
import com.palle.entity.User;

public interface BankRepository extends JpaRepository<Bank, Long> {
    List<Bank> findByUser(User user);
}