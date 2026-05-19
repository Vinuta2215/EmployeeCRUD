package com.palle.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.palle.entity.Bank;
import com.palle.entity.User;
import com.palle.repository.BankRepository;
import com.palle.repository.UserRepository;

@Service
public class BankService {

    @Autowired
    private BankRepository bankRepo;

    @Autowired
    private UserRepository userRepo;

    //ADMIN - ADD ACCOUNT
    public Bank add(Bank bank, Long userId) {

        if (userId == null) {
            throw new RuntimeException("UserId is required");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        bank.setUser(user); 

        return bankRepo.save(bank);
    }

    // VIEW ALL
    public List<Bank> getAll() {
        return bankRepo.findAll();
    }

    //EMPLOYEE - VIEW OWN
    public List<Bank> getMy(Long userId) {

        if (userId == null) {
            throw new RuntimeException("UserId is null");
        }

        return userRepo.findById(userId)
                .map(user -> bankRepo.findByUser(user))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    //UPDATE
    public Bank update(Long id, Bank bank) {

        Bank existing = bankRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        existing.setAccnum(bank.getAccnum());
        existing.setName(bank.getName());
        existing.setContact(bank.getContact());
        existing.setAddress(bank.getAddress());
        existing.setBalance(bank.getBalance());

        return bankRepo.save(existing);
    }

    //ADMIN - DELETE
    public void delete(Long id) {

        if (!bankRepo.existsById(id)) {
            throw new RuntimeException("Account not found");
        }

        bankRepo.deleteById(id);
    }
}