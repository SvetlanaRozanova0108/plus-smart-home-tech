package ru.yandex.practicum.hub_router_client.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemperatureSensorConfig {

    private String id;

    private MinMaxConfig temperature;
}
