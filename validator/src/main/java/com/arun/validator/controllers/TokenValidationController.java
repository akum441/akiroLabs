package com.arun.validator.controllers;

import com.arun.validator.dto.TokenValidationRequest;
import com.arun.validator.utils.LuhnUtil;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenValidationController {

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/validate")
    public boolean validateToken(@RequestBody TokenValidationRequest request) {
        String token = request.getToken().replaceAll("-", ""); // Remove dashes
        return LuhnUtil.isValid(token);
    }
}
