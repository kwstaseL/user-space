FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN if [ -f "./mvnw" ]; then \
        chmod +x ./mvnw && ./mvnw clean package -DskipTests; \
    else \
        apt-get update && apt-get install -y maven && \
        mvn clean package -DskipTests; \
    fi

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/usermanagement-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]