package com.palle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.palle.entity.User;
import com.palle.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    //REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    //LOGIN
    @PostMapping("/login")
    public User login(@RequestParam String username,
                      @RequestParam String password) {
        return service.login(username, password);
    }

    //GET EMPLOYEES)
    @GetMapping("/employees")
    public List<User> getEmployees() {
        return service.getEmployees();
    }
}