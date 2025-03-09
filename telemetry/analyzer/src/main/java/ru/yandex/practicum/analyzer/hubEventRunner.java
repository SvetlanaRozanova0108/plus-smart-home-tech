package ru.yandex.practicum.analyzer;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import ru.yandex.practicum.analyzer.processors.HubEventProcessor;
import ru.yandex.practicum.analyzer.processors.SnapshotProcessor;

import java.util.concurrent.*;

@Component
@RequiredArgsConstructor
public class hubEventRunner implements CommandLineRunner {

    private final HubEventProcessor hubEventProcessor;

    public void run(String... args) {
        hubEventProcessor.run();
    }
}

