package ru.yandex.practicum.analyzer.handlers;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Component
public class HubHandlers {

    private final Map<String, HubEventHandler> handlers;

    public HubHandlers(Set<HubEventHandler> handlers) {
        this.handlers = handlers.stream()
                .collect(Collectors.toMap(HubEventHandler::getMessageType, h -> h));
    }
}
