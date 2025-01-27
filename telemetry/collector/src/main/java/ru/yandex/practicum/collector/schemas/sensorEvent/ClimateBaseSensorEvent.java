package ru.yandex.practicum.collector.schemas.sensorEvent;

import lombok.*;

@Getter
@Setter
@ToString(callSuper = true)
public class ClimateBaseSensorEvent extends BaseSensorEvent {

    private int temperatureC;
    private int humidity;
    private int co2Level;

    @Override
    public SensorEventType getType() {
        return SensorEventType.CLIMATE_SENSOR_EVENT;
    }
}
