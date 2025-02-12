package ru.yandex.practicum.collector.schemas.hubEvent;

import lombok.Getter;
import lombok.ToString;
import ru.yandex.practicum.collector.enums.ScenarioConditionOperationType;
import ru.yandex.practicum.collector.enums.ScenarioConditionType;

@Getter
@ToString(callSuper = true)
public class ScenarioCondition {

    private String sensorId;
    private ScenarioConditionType type;
    private ScenarioConditionOperationType operation;
    private int value;
}
