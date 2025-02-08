package ru.yandex.practicum.collector.schemas.sensorEvent;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import ru.yandex.practicum.collector.enums.SensorEventType;

@Getter
public class LightSensorEvent extends BaseSensorEvent {

    @NotNull
    private int linkQuality;
    @NotNull
    private int luminosity;

    @Override
    public SensorEventType getType() {
        return SensorEventType.LIGHT_SENSOR_EVENT;
    }
}
