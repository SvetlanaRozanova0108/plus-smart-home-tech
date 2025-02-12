package ru.yandex.practicum.collector.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.yandex.practicum.collector.builders.hub.HubEventBuilder;
import ru.yandex.practicum.collector.builders.sensor.SensorEventBuilder;
import ru.yandex.practicum.collector.enums.HubEventType;
import ru.yandex.practicum.collector.enums.SensorEventType;
import ru.yandex.practicum.collector.schemas.hubEvent.BaseHubEvent;
import ru.yandex.practicum.collector.schemas.sensorEvent.BaseSensorEvent;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class collectorServiceImpl implements CollectorService {

    private final Map<SensorEventType, SensorEventBuilder> sensorEventBuilders;
    private final Map<HubEventType, HubEventBuilder> hubEventBuilders;

    @Override
    public void collectSensorEvent(BaseSensorEvent sensor) {
        log.info("Start collect sensor event" + sensor.toString());
        sensorEventBuilders.get(sensor.getType()).builder(sensor);
    }

    @Override
    public void collectHubEvent(BaseHubEvent hub) {
        log.info("Start collect hub event" + hub.toString());
        hubEventBuilders.get(hub.getType()).builder(hub);
    }
}
