package com.palle.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.palle.entity.Bank;
import com.palle.service.BankService;

@RestController
@RequestMapping("/bank")
@CrossOrigin
public class BankController {

    @Autowired
    private BankService service;

    // ADMIN - ADD ACCOUNT FOR EMPLOYEE
    @PostMapping("/add")
    public Bank add(@RequestBody Bank bank, @RequestParam Long userId) {

        if (userId == null) {
            throw new RuntimeException("UserId is required");
        }

        return service.add(bank, userId);
    }

    //ADMIN - VIEW ALL ACCOUNTS
    @GetMapping("/all")
    public List<Bank> getAll() {
        return service.getAll();
    }

    //EMPLOYEE - VIEW OWN ACCOUNT
    @GetMapping("/my")
    public List<Bank> my(@RequestParam Long userId) {

        if (userId == null) {
            throw new RuntimeException("UserId is required");
        }

        return service.getMy(userId);
    }

    // ADMIN - UPDATE ACCOUNT
    @PutMapping("/update/{id}")
    public Bank update(@PathVariable Long id, @RequestBody Bank bank) {
        return service.update(id, bank);
    }

    //ADMIN - DELETE ACCOUNT
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Deleted Successfully";
    }
    
}