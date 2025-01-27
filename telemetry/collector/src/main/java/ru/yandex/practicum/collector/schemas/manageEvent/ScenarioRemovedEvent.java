package ru.yandex.practicum.collector.schemas.manageEvent;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class ScenarioRemovedEvent extends BaseManageEvent {

    @NotBlank
    @Size(min = 3, max = 2147483647)
    private String name;

    @Override
    public AddRemovedEventType getType() {
        return AddRemovedEventType.SCENARIO_REMOVED;
    }
}
