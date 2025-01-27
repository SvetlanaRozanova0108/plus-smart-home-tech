package ru.yandex.practicum.collector.schemas.sensorEvent;

import lombok.*;

@Getter
@Setter
@ToString(callSuper = true)
public class LightBaseSensorEvent extends BaseSensorEvent {

    private int linkQuality;
    private int luminosity;

    @Override
    public SensorEventType getType() {
        return SensorEventType.LIGHT_SENSOR_EVENT;
    }
}
