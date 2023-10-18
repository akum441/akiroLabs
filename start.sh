#!/bin/bash

# Start GeneratorService
cd generator && ./mvnw spring-boot:run &

# Start ValidatorService
cd ../validator && ./mvnw spring-boot:run &

# Start React frontend
cd ../frontend && npm start &

# Return to root
cd ..
