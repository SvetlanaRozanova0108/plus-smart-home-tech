package ru.yandex.practicum.collector;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.shell.command.annotation.CommandScan;

@SpringBootApplication
@CommandScan(basePackages = "ru.practicum.collector")
@EnableScheduling
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }
}
