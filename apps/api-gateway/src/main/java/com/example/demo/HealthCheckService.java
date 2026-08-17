package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;


@Service
public class HealthCheckService {

    private final RestTemplate restTemplate =
            new RestTemplate();

    // Same env vars (and same localhost defaults for native/non-Docker dev)
    // as the gateway routes in application.yaml, so both point at the same
    // place. Previously hardcoded to localhost, which only works when every
    // service runs on the host directly; inside docker-compose "localhost"
    // means this container, so the checks always failed and
    // ServiceAvailabilityInterceptor 503'd every request, permanently.
    @Value("${AUTH_SERVICE_URI:http://localhost:1337}")
    private String authServiceUri;

    @Value("${APPOINTMENT_SERVICE_URI:http://localhost:1339}")
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