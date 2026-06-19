from pathlib import Path

BASE = Path("server")

files_to_write = {
    BASE / "pom.xml": """<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<project xmlns=\"http://maven.apache.org/POM/4.0.0\"
         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.15</version>
        <relativePath/>
    </parent>

    <groupId>com.server</groupId>
    <artifactId>server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>server</name>
    <description>Spring Boot backend</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
""",

    BASE / "src/main/java/com/server/ServerApplication.java": """package com.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
""",

    BASE / "src/main/java/com/server/auth/controller/AuthController.java": """package com.server.auth.controller;

import com.server.auth.dto.AuthResponse;
import com.server.auth.dto.LoginRequest;
import com.server.auth.dto.RegisterRequest;
import com.server.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(\"/api/auth\")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(\"/register\")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping(\"/login\")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
""",

    BASE / "src/main/java/com/server/auth/dto/LoginRequest.java": """package com.server.auth.dto;

public record LoginRequest(String email, String password) {
}
""",

    BASE / "src/main/java/com/server/auth/dto/RegisterRequest.java": """package com.server.auth.dto;

public record RegisterRequest(String name, String email, String password) {
}
""",

    BASE / "src/main/java/com/server/auth/dto/AuthResponse.java": """package com.server.auth.dto;

public record AuthResponse(String token, String message) {
}
""",

    BASE / "src/main/java/com/server/auth/service/AuthService.java": """package com.server.auth.service;

import com.server.auth.dto.AuthResponse;
import com.server.auth.dto.LoginRequest;
import com.server.auth.dto.RegisterRequest;
import com.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        return new AuthResponse(null, \"User registered successfully\");
    }

    public AuthResponse login(LoginRequest request) {
        return new AuthResponse(null, \"Login successful\");
    }
}
""",

    BASE / "src/main/java/com/server/user/entity/User.java": """package com.server.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = \"users\")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
}
""",

    BASE / "src/main/java/com/server/user/repository/UserRepository.java": """package com.server.user.repository;

import com.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
""",

    BASE / "src/main/java/com/server/user/service/UserService.java": """package com.server.user.service;

import com.server.user.entity.User;
import com.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
""",

    BASE / "src/main/java/com/server/security/config/SecurityConfig.java": """package com.server.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );
        return http.build();
    }
}
""",

    BASE / "src/main/java/com/server/security/jwt/JwtService.java": """package com.server.security.jwt;

import org.springframework.stereotype.Service;

@Service
public class JwtService {
    public String generateToken(String email) {
        return \"dummy-token-for-\" + email;
    }

    public String extractUsername(String token) {
        return token.replace(\"dummy-token-for-\", \"\");
    }
}
""",

    BASE / "src/main/java/com/server/security/filter/JwtAuthenticationFilter.java": """package com.server.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        filterChain.doFilter(request, response);
    }
}
""",

    BASE / "src/main/java/com/server/common/exception/.gitkeep": "",
    BASE / "src/main/java/com/server/common/response/.gitkeep": "",

    BASE / "src/main/resources/application.properties": """spring.application.name=server
server.port=8080

# Database config
spring.datasource.url=jdbc:postgresql://localhost:5432/server_db
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
""",

    BASE / "src/main/resources/data.sql": """-- Optional seed data
-- INSERT INTO users (name, email, password) VALUES ('Admin', 'admin@example.com', 'password');
""",
}

for path in files_to_write:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix == ".gitkeep" or files_to_write[path] != "":
        path.write_text(files_to_write[path], encoding="utf-8")

print(f"Created backend structure under {BASE.resolve()}")
