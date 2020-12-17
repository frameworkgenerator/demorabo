#docker build -t app_backend .
#docker run -p 9009:80 -d --name app_backend app_backend
#docker logs $id
FROM maven:3.6.0-jdk-11-slim AS build
COPY . /app
WORKDIR /app
RUN mvn clean install

FROM openjdk:11-jre-slim
RUN apt-get update && apt-get install -y curl
COPY --from=build ./app/target/schema-based-multi-tenancy-1.0-SNAPSHOT.jar app.jar
EXPOSE 80
CMD ["java","-Xms32M","-Xmx64M","-jar","app.jar"]