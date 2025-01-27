package ru.yandex.practicum.collector.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.yandex.practicum.collector.schemas.manageEvent.BaseManageEvent;
import ru.yandex.practicum.collector.schemas.sensorEvent.BaseSensorEvent;

@Slf4j
@Service
@RequiredArgsConstructor
public class collectorServiceImpl implements CollectorService {

    @Override
    public void collectSensorEvent(BaseSensorEvent sensor) {
        log.info("Start collect sensor event" + sensor.toString());
    }

    @Override
    public void collectHubEvent(BaseManageEvent hub) {
        log.info("Start collect hub event" + hub.toString());
    }
}
