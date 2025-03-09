package ru.yandex.practicum.analyzer.builders;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Component
public class HubBuilders {

    private final Map<String, HubEventBuilder> builders;

    public HubBuilders(Set<HubEventBuilder> builders) {
        this.builders = builders.stream()
                .collect(Collectors.toMap(HubEventBuilder::getMessageType, b -> b));
    }
}
