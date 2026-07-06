package com.server.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "Hello! Backend is running successfully!";
    }

    @GetMapping("/test")
    public String test() {
        return "Test endpoint is working!";
    }
}