package ru.yandex.practicum.collector.schemas.manageEvent;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@Getter
@Setter
@ToString(callSuper = true)
public class ScenarioAddedEvent extends BaseManageEvent {

    @NotBlank
    @Size(min = 3, max = 2147483647)
    private String name;
    @NotBlank
    private ArrayList<ScenarioCondition> conditions;
    @NotBlank
    private ArrayList<DeviceAction> actions;

    @Override
    public AddRemovedEventType getType() {
        return AddRemovedEventType.SCENARIO_ADDED;
    }
}
