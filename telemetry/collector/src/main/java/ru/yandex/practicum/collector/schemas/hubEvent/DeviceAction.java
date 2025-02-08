package ru.yandex.practicum.collector.schemas.hubEvent;

import lombok.Getter;
import lombok.ToString;
import ru.yandex.practicum.collector.enums.DeviceActionType;

@Getter
@ToString(callSuper = true)
public class DeviceAction {

    private String sensorId;
    private DeviceActionType type;
    private int value;
}
