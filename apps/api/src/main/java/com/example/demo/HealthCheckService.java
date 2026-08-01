package com.example.demo;

import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;


@Service
public class HealthCheckService {

    private final RestTemplate restTemplate =
            new RestTemplate();

    private volatile boolean authHealthy = false;
    private volatile boolean appointmentHealthy = false;

    @Scheduled(fixedRate = 10000)
    public void checkServices() {

        authHealthy =
                check("http://localhost:1337/health");

        appointmentHealthy =
                check("http://localhost:1339/health");
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