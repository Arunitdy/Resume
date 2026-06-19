

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
    groupId = "com.example"
    artifactId = "server"
    name = "server"
    packageName = "com.example.server"
    packaging = "jar"
    javaVersion = "17"
    dependencies = "web,data-jpa,postgresql,security,lombok"
  } `
  -OutFile "server.zip"

Expand-Archive -Path "server.zip" -DestinationPath "."
Remove-Item "server.zip"