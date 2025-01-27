package ru.yandex.practicum.collector.schemas.manageEvent;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class DeviceRemovedEvent extends BaseManageEvent {

    @NotBlank
    private String id;

    @Override
    public AddRemovedEventType getType() {
        return AddRemovedEventType.DEVICE_REMOVED;
    }
}
