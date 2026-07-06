package com.server.server.controller;

import org.springframework.web.bind.annotation.*;

import com.server.server.dto.request.LoginRequest;
import com.server.server.dto.request.RegisterRequest;
import com.server.server.dto.response.AuthResponse;
import com.server.server.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    // Temporary storage for testing (will be replaced with database later)
    private static final String TEST_EMAIL = "csitkm@tkmce.ac.in";
    private static final String TEST_PASSWORD = "csicsi";
    private static final String TEST_NAME = "CSIT Student";
    private static final String TEST_REGISTER_EMAIL = "admintkm@tkmce.ac.in";
    private static final String TEST_REGISTER_NAME = "arun";
    private static final String TEST_REGISTER_PASSWORD = "admin0000";

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login attempt: " + loginRequest.getEmail());
        
        // Check if credentials match our test data
        if (TEST_EMAIL.equals(loginRequest.getEmail()) && 
            TEST_PASSWORD.equals(loginRequest.getPassword())) {
            
            // Generate JWT token
            String token = jwtUtil.generateToken(loginRequest.getEmail(), TEST_NAME);
            
            AuthResponse response = new AuthResponse(
                "Login successful!",
                true,
                loginRequest.getEmail(),
                TEST_NAME,
                token
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
        
        // Check if email already exists (for testing)
        if (TEST_EMAIL.equals(registerRequest.getEmail()) || 
            TEST_REGISTER_EMAIL.equals(registerRequest.getEmail())) {
            AuthResponse response = new AuthResponse(
                "Email already registered",
                false,
                null,
                null
            );
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        
        // Generate JWT token for new user
        String token = jwtUtil.generateToken(registerRequest.getEmail(), registerRequest.getName());
        
        AuthResponse response = new AuthResponse(
            "Registration successful for: " + registerRequest.getName(),
            true,
            registerRequest.getEmail(),
            registerRequest.getName(),
            token
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}