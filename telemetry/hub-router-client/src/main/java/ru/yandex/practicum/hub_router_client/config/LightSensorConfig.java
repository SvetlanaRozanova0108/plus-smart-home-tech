package ru.yandex.practicum.hub_router_client.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LightSensorConfig {

    private String id;

    private MinMaxConfig luminosity;

    private MinMaxConfig linkQuality;
}
