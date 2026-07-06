package com.server.server;

public class AuthResponse {
    private String message;
    private boolean success;
    private String email;
    private String name;

    // Default constructor
    public AuthResponse() {}

    // Constructor with parameters
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
}