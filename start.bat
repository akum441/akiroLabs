@echo off

REM Start GeneratorService
cd generator && mvnw spring-boot:run

REM Start ValidatorService
cd ..\validator && mvnw spring-boot:run

REM Start React frontend
cd ..\frontend && npm start

REM Return to root
cd ..
