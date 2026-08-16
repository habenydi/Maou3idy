package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DemoApplication {

	public static void main(String[] args) {
		// Loads .env (if present) before Spring reads any config — see
		// DotenvLoader for why this exists at all.
		DotenvLoader.load();
		SpringApplication.run(DemoApplication.class, args);
	}
}
