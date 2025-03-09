package ru.yandex.practicum.analyzer.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.yandex.practicum.analyzer.processors.HubEventProcessor;

@Component
@RequiredArgsConstructor
public class hubEventRunner implements CommandLineRunner {

    private final HubEventProcessor hubEventProcessor;

    public void run(String... args) {
        hubEventProcessor.run();
    }
}

