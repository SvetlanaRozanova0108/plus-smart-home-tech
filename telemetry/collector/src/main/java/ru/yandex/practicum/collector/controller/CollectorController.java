package ru.yandex.practicum.collector.controller;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.yandex.practicum.collector.schemas.hubEvent.BaseHubEvent;
import ru.yandex.practicum.collector.schemas.sensorEvent.BaseSensorEvent;
import ru.yandex.practicum.collector.service.CollectorService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
@Slf4j
public class CollectorController {

    private final CollectorService collectorService;

    @PostMapping("/sensors")
    public void collectSensorEvent(@Valid @RequestBody BaseSensorEvent sensor) {
        try {
            log.info("Создание обработчика событий датчиков.");
            collectorService.collectSensorEvent(sensor);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping("/hubs")
    public void collectHubEvent(@Valid @RequestBody BaseHubEvent hub) {
        try {
            log.info("Создание обработчика событий хабов.");
            collectorService.collectHubEvent(hub);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

