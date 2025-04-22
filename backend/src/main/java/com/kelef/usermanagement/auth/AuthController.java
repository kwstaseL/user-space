package com.kelef.usermanagement.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * REST controller responsible for authentication-related endpoints.
 * Provides JWT tokens to clients for securing API requests.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    /**
     * Generates and returns a JWT token to the client.
     *
     * @return A ResponseEntity containing the generated JWT token
     */
    @PostMapping("/token")
    public ResponseEntity<Map<String, String>> getToken() {
        String token = authService.generateToken();

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

}
