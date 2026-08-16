package com.example.demo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * Minimal .env loader.
 *
 * Spring Boot doesn't read .env files on its own — every other service in
 * this project uses one (Node's dotenv, loaded automatically), so this
 * gateway was the odd one out: its own .env.example just sat there unused,
 * and every config value fell back to whatever was hardcoded in
 * application.yaml unless a real OS environment variable happened to be
 * set already (e.g. by docker-compose).
 *
 * Loads key=value pairs from a .env file in the working directory into JVM
 * system properties before Spring starts, so ${VAR} placeholders in
 * application.yaml (and @Value("${VAR}") anywhere) resolve from it exactly
 * like they do for the Node services. A real environment variable (or a
 * -D flag) always wins over the file — this only fills in what's missing,
 * same precedence dotenv-style loaders normally use.
 */
final class DotenvLoader {

    private DotenvLoader() {}

    static void load() {
        load(Path.of(".env"));
    }

    static void load(Path path) {
        if (!Files.isReadable(path)) {
            return;
        }

        List<String> lines;
        try {
            lines = Files.readAllLines(path);
        } catch (IOException e) {
            System.err.println("Failed to read " + path + ": " + e.getMessage());
            return;
        }

        for (String rawLine : lines) {
            String line = rawLine.strip();
            if (line.isEmpty() || line.startsWith("#")) {
                continue;
            }

            int eq = line.indexOf('=');
            if (eq <= 0) {
                continue;
            }

            String key = line.substring(0, eq).strip();
            String value = line.substring(eq + 1).strip();

            if (value.length() >= 2
                    && ((value.startsWith("\"") && value.endsWith("\""))
                    || (value.startsWith("'") && value.endsWith("'")))) {
                value = value.substring(1, value.length() - 1);
            }

            if (System.getenv(key) != null || System.getProperty(key) != null) {
                continue; // a real env var or -D flag already set this — don't override it
            }

            System.setProperty(key, value);
        }
    }
}
