package ru.yandex.practicum.collector.schemas.manageEvent;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public abstract class DeviceAction {

    @NotBlank
    private String sensorId;
    @NotBlank
    private DeviceActionType type;
    private int value;

    @NonNull
    public abstract DeviceActionType getType();
}
