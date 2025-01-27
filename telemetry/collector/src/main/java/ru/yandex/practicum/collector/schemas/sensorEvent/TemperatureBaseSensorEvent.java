package ru.yandex.practicum.collector.schemas.sensorEvent;

import lombok.*;

@Getter
@Setter
@ToString(callSuper = true)
public class TemperatureBaseSensorEvent extends BaseSensorEvent {

    private int temperatureC;
    private int temperatureF;

    @Override
    public SensorEventType getType() {
        return SensorEventType.TEMPERATURE_SENSOR_EVENT;
    }
}
