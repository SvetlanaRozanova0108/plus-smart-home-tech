package ru.yandex.practicum.collector.schemas.sensorEvent;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import ru.yandex.practicum.collector.enums.SensorEventType;

@Getter
public class SwitchSensorEvent extends BaseSensorEvent {

    @NotNull
    private Boolean state;

    @Override
    public SensorEventType getType() {
        return SensorEventType.SWITCH_SENSOR_EVENT;
    }
}
