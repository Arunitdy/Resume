package com.server.server.service;

import com.server.server.dto.request.LoginRequest;
import com.server.server.dto.request.RegisterRequest;
import com.server.server.dto.response.AuthResponse;
import com.server.server.entity.User;
import com.server.server.repository.UserRepository;
import com.server.server.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest registerRequest) {
        // Validate inputs
        if (registerRequest.getName() == null || registerRequest.getName().trim().isEmpty()) {
            return new AuthResponse("Name is required", false, null, null);
        }

        if (registerRequest.getEmail() == null || registerRequest.getEmail().trim().isEmpty()) {
            return new AuthResponse("Email is required", false, null, null);
        }

        if (registerRequest.getPassword() == null || registerRequest.getPassword().length() < 6) {
            return new AuthResponse("Password must be at least 6 characters", false, null, null);
        }

        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new AuthResponse("Email already registered", false, null, null);
        }

        // Encrypt password and save user
        String encryptedPassword = passwordEncoder.encode(registerRequest.getPassword());
        
        User user = new User(
            registerRequest.getName(),
            registerRequest.getEmail(),
            encryptedPassword
        );

        userRepository.save(user);
        System.out.println("User registered successfully: " + user.getEmail());

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getName());

        return new AuthResponse(
            "Registration successful for: " + user.getName(),
            true,
            user.getEmail(),
            user.getName(),
            token
        );
    }

    public AuthResponse login(LoginRequest loginRequest) {
        // Validate inputs
        if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
            return new AuthResponse("Email is required", false, null, null);
        }

        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return new AuthResponse("Password is required", false, null, null);
        }

        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        
        if (user == null) {
            return new AuthResponse("Invalid email or password", false, null, null);
        }

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return new AuthResponse("Invalid email or password", false, null, null);
        }

        System.out.println("User logged in: " + user.getEmail());

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getName());

        return new AuthResponse(
            "Login successful!",
            true,
            user.getEmail(),
            user.getName(),
            token
        );
    }
}