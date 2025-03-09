package ru.yandex.practicum.collector.gRPC.handlers.hub;

import ru.yandex.practicum.grpc.telemetry.event.HubEventProto;

public interface HubEventHandler {

    void handle(HubEventProto hubEvent);

    HubEventProto.PayloadCase getMessageType();
}
