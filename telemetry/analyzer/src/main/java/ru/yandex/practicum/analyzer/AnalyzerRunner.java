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
public class AnalyzerRunner implements CommandLineRunner {

    private final HubEventProcessor hubEventProcessor;
    private final SnapshotProcessor snapshotProcessor;

    public void run(String... args) {

        ExecutorService executorservice = getExecutorService();
        executorservice.submit(hubEventProcessor);
        executorservice.submit(snapshotProcessor);
    }

    private ExecutorService getExecutorService() {
        BlockingQueue<Runnable> queue = new ArrayBlockingQueue<>(1000);
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(1000, 1000, 60L, TimeUnit.SECONDS, queue, new ThreadPoolExecutor.AbortPolicy());
        threadPoolExecutor.allowCoreThreadTimeOut(true);
        return threadPoolExecutor;
    }

}
