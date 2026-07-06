package com.server.server.dto.response;

public class AuthResponse {
    private String message;
    private boolean success;
    private String email;
    private String name;
    private String token;  // NEW: JWT token

    // Default constructor
    public AuthResponse() {}

    // Constructor with all fields (including token)
    public AuthResponse(String message, boolean success, String email, String name, String token) {
        this.message = message;
        this.success = success;
        this.email = email;
        this.name = name;
        this.token = token;
    }

    // Overloaded constructor without token (for error responses)
    public AuthResponse(String message, boolean success, String email, String name) {
        this.message = message;
        this.success = success;
        this.email = email;
        this.name = name;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}