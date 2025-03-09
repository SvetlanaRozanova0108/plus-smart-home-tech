package ru.yandex.practicum.analyzer;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.yandex.practicum.analyzer.processors.SnapshotProcessor;

@Component
@RequiredArgsConstructor
public class SnapshotRunner implements CommandLineRunner {

    private final SnapshotProcessor snapshotProcessor;

    public void run(String... args) {
        snapshotProcessor.run();
    }
}
