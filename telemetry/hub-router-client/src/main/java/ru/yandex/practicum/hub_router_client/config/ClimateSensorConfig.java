package ru.yandex.practicum.hub_router_client.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClimateSensorConfig {

    private String id;

    private MinMaxConfig temperature;

    private MinMaxConfig humidity;

    private MinMaxConfig co2Level;
}
