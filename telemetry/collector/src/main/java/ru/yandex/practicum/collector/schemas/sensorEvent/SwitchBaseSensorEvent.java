package ru.yandex.practicum.collector.schemas.sensorEvent;

import lombok.*;

@Getter
@Setter
@ToString(callSuper = true)
public class SwitchBaseSensorEvent extends BaseSensorEvent {

    private boolean state;

    @Override
    public SensorEventType getType() {
        return SensorEventType.SWITCH_SENSOR_EVENT;
    }
}
