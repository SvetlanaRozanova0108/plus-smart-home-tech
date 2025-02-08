package ru.yandex.practicum.collector.schemas.sensorEvent;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import ru.yandex.practicum.collector.enums.SensorEventType;

@Getter
@ToString(callSuper = true)
public class TemperatureSensorEvent extends BaseSensorEvent {

    @NotNull
    private Integer temperatureC;
    @NotNull
    private Integer temperatureF;

    @Override
    public SensorEventType getType() {
        return SensorEventType.TEMPERATURE_SENSOR_EVENT;
    }
}
