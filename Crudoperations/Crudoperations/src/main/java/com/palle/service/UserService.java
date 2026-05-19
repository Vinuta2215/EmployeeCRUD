package com.palle.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.palle.entity.User;
import com.palle.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    //REGISTER
    public User register(User user) {

        Optional<User> existing = repo.findByUsername(user.getUsername());

        if (existing.isPresent()) {
            throw new RuntimeException("Username already exist");
        }

        return repo.save(user);
    }

    //LOGIN
    public User login(String username, String password) {

        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    //GET EMPLOYEES
    public List<User> getEmployees() {
        return repo.findByRole("EMPLOYEE");
    }
}