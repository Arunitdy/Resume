package com.server.server;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Temporary storage for testing (will be replaced with database later)
    private static final String TEST_EMAIL = "csitkm@tkmce.ac.in";
    private static final String TEST_PASSWORD = "csicsi";
    private static final String TEST_NAME = "CSIT Student";

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login attempt: " + loginRequest.getEmail());
        
        // Check if credentials match our test data
        if (TEST_EMAIL.equals(loginRequest.getEmail()) && 
            TEST_PASSWORD.equals(loginRequest.getPassword())) {
            
            AuthResponse response = new AuthResponse(
                "Login successful!",
                true,
                loginRequest.getEmail(),
                TEST_NAME
            );
            return ResponseEntity.ok(response);
        } else {
            AuthResponse response = new AuthResponse(
                "Invalid email or password",
                false,
                null,
                null
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Register attempt: " + registerRequest.getEmail());
        System.out.println("Name: " + registerRequest.getName());
        System.out.println("Password: " + registerRequest.getPassword());
        
        // Simple validation
        if (registerRequest.getName() == null || registerRequest.getName().trim().isEmpty()) {
            AuthResponse response = new AuthResponse(
                "Name is required",
                false,
                null,
                null
            );
            return ResponseEntity.badRequest().body(response);
        }
        
        if (registerRequest.getEmail() == null || registerRequest.getEmail().trim().isEmpty()) {
            AuthResponse response = new AuthResponse(
                "Email is required",
                false,
                null,
                null
            );
            return ResponseEntity.badRequest().body(response);
        }
        
        if (registerRequest.getPassword() == null || registerRequest.getPassword().length() < 6) {
            AuthResponse response = new AuthResponse(
                "Password must be at least 6 characters",
                false,
                null,
                null
            );
            return ResponseEntity.badRequest().body(response);
        }
        
        // For testing, just return success
        AuthResponse response = new AuthResponse(
            "Registration successful for: " + registerRequest.getName(),
            true,
            registerRequest.getEmail(),
            registerRequest.getName()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}