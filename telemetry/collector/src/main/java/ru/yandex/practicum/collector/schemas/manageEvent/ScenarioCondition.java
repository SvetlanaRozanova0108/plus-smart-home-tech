package ru.yandex.practicum.collector.schemas.manageEvent;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public abstract class ScenarioCondition {

    @NotBlank
    private String sensorId;
    @NotBlank
    private ScenarioConditionType type;
    private ScenarioConditionOperationType operation;
    private int value;

    @NonNull
    public abstract ScenarioConditionType getType();
}
