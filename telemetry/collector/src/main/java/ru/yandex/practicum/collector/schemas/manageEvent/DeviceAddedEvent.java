package ru.yandex.practicum.collector.schemas.manageEvent;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ru.yandex.practicum.collector.schemas.sensorEvent.SensorEventType;

@Getter
@Setter
@ToString(callSuper = true)
public class DeviceAddedEvent extends BaseManageEvent {

    @NotBlank
    private String id;
    private DeviceType deviceType;

    @Override
    public AddRemovedEventType getType() {
        return AddRemovedEventType.DEVICE_ADDED;
    }
}
