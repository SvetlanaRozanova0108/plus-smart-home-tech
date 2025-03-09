package ru.yandex.practicum.analyzer.builders;

import ru.yandex.practicum.kafka.telemetry.event.HubEventAvro;

public interface HubEventBuilder {

    void build(HubEventAvro event);

    String getMessageType();
}
