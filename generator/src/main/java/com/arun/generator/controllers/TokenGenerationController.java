package com.arun.generator.controllers;

import com.arun.generator.dto.TokenOptions;
import com.arun.generator.utils.TokenConstants;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;


@RestController
public class TokenGenerationController {
    private final Random random = new Random();


    @PostMapping("/generateToken")
    public String generateToken(@RequestBody TokenOptions tokenOptions) {

        List<Integer> allowedDigits = tokenOptions.getOptions();

        if (allowedDigits == null || allowedDigits.isEmpty()) {
            return "Options are empty please provide it";
        }

        StringBuilder token = new StringBuilder();
        for (int i = 0; i < TokenConstants.TOKEN_LENGTH; i++) {

            int randomIndex = random.nextInt(allowedDigits.size());
            token.append(allowedDigits.get(randomIndex));

            if ((i + 1) % 4 == 0 && i != TokenConstants.TOKEN_LENGTH - 1) {
                token.append('-');
            }
        }
        return token.toString();
    }
}
