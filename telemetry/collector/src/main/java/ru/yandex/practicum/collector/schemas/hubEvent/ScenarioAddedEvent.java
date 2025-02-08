package ru.yandex.practicum.collector.schemas.hubEvent;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.ToString;
import ru.yandex.practicum.collector.enums.HubEventType;

import java.util.ArrayList;

@Getter
@ToString(callSuper = true)
public class ScenarioAddedEvent extends BaseHubEvent {

    @NotBlank
    @Size(min = 3)
    private String name;
    @NotEmpty
    private ArrayList<ScenarioCondition> conditions;
    @NotEmpty
    private ArrayList<DeviceAction> actions;

    @Override
    public HubEventType getType() {
        return HubEventType.SCENARIO_ADDED;
    }
}
