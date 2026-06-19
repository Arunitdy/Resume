

React start:

    npm create vite@latest client -- --template react-ts
    cd client
    npm install
    npm run dev


spring boot

cd C:\Users\binsh\Desktop\Resume
mkdir server
cd server

Invoke-RestMethod `
  -Uri "https://start.spring.io/starter.zip" `
  -Method Post `
  -ContentType "application/x-www-form-urlencoded" `
  -Body @{
    type = "maven-project"
    language = "java"
    bootVersion = "3.3.3"
    groupId = "com.server"
    artifactId = "server"
    name = "server"
    packageName = "com.server"
    packaging = "jar"
    javaVersion = "17"
    dependencies = "web,data-jpa,postgresql,security,lombok"
  } `
  -OutFile "server.zip"

Expand-Archive -Path "server.zip" -DestinationPath "."
Remove-Item "server.zip"


server
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── server
│   │   │
│   │   │           ├── ServerApplication.java
│   │   │
│   │   │           ├── auth
│   │   │           │   ├── controller
│   │   │           │   │   └── AuthController.java
│   │   │           │   │
│   │   │           │   ├── dto
│   │   │           │   │   ├── LoginRequest.java
│   │   │           │   │   ├── RegisterRequest.java
│   │   │           │   │   └── AuthResponse.java
│   │   │           │   │
│   │   │           │   └── service
│   │   │           │       └── AuthService.java
│   │   │
│   │   │           ├── user
│   │   │           │   ├── entity
│   │   │           │   │   └── User.java
│   │   │           │   │
│   │   │           │   ├── repository
│   │   │           │   │   └── UserRepository.java
│   │   │           │   │
│   │   │           │   └── service
│   │   │           │       └── UserService.java
│   │   │
│   │   │           ├── security
│   │   │           │   ├── config
│   │   │           │   │   └── SecurityConfig.java
│   │   │           │   │
│   │   │           │   ├── jwt
│   │   │           │   │   └── JwtService.java
│   │   │           │   │
│   │   │           │   └── filter
│   │   │           │       └── JwtAuthenticationFilter.java
│   │   │
│   │   │           └── common
│   │   │               ├── exception
│   │   │               └── response
│   │   │
│   │   └── resources
│   │       ├── application.properties
│   │       └── data.sql (optional)
│   │
│   └── test
│
└── pom.xml