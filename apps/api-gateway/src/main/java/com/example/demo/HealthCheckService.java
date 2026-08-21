package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;


@Service
public class HealthCheckService {

    private final RestTemplate restTemplate =
            new RestTemplate();

    @Value("${AUTH_SERVICE_URI:http://localhost:8081}")
    private String authServiceUri;

    @Value("${APPOINTMENT_SERVICE_URI:http://localhost:8083}")
    private String appointmentServiceUri;

    private volatile boolean authHealthy = false;
    private volatile boolean appointmentHealthy = false;

    @Scheduled(fixedRate = 10000)
    public void checkServices() {

        authHealthy =
                check(authServiceUri + "/health");

        appointmentHealthy =
                check(appointmentServiceUri + "/health");
    }

    private boolean check(String url) {
        try {
            restTemplate.getForObject(
                    url,
                    String.class
            );
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAuthHealthy() {
        return authHealthy;
    }

    public boolean isAppointmentHealthy() {
        return appointmentHealthy;
    }
}