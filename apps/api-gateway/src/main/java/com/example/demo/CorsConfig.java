package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Note: application.yaml also declares a CORS policy for the gateway routes
// (spring.cloud.gateway.server.webmvc.globalcors) — this is a second,
// separate mechanism (plain Spring MVC) layered on top of it. Left both in
// place rather than removing one blind, but they should probably be
// consolidated into just the gateway one.
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${NGINX_URL:http://localhost:8000}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontendUrl)
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}