package ru.yandex.practicum.collector.schemas.sensorEvent;

import lombok.*;

@Getter
@Setter
@ToString(callSuper = true)
public class MotionBaseSensorEvent extends BaseSensorEvent {

    private int linkQuality;
    private boolean motion;
    private int voltage;

    @Override
    public SensorEventType getType() {
        return SensorEventType.MOTION_SENSOR_EVENT;
    }
}
