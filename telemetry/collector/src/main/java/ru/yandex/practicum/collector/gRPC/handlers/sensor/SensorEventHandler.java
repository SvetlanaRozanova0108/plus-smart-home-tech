package ru.yandex.practicum.collector.gRPC.handlers.sensor;

import ru.yandex.practicum.grpc.telemetry.event.SensorEventProto;

public interface SensorEventHandler {

    void handle(SensorEventProto sensorEvent);

    SensorEventProto.PayloadCase getMessageType();
}
