package ru.yandex.practicum.collector.gRPC.builders.sensor;

import lombok.RequiredArgsConstructor;
import org.apache.avro.specific.SpecificRecordBase;
import org.springframework.beans.factory.annotation.Value;
import ru.yandex.practicum.collector.gRPC.producer.KafkaProducer;
import ru.yandex.practicum.grpc.telemetry.event.SensorEventProto;

import java.time.Instant;

@RequiredArgsConstructor
public abstract class BaseSensorBuilder implements SensorEventBuilder {

    private final KafkaProducer producer;

    @Value("${topic.telemetry-sensors}")
    private String topic;

    @Override
    public void builder(SensorEventProto event) {
        producer.send(toAvro(event), event.getHubId(), mapTimestampToInstant(event), topic);
    }

    public Instant mapTimestampToInstant(SensorEventProto event) {
        return Instant.ofEpochSecond(event.getTimestamp().getSeconds(), event.getTimestamp().getNanos());
    }

    public abstract SpecificRecordBase toAvro(SensorEventProto sensorEvent);

    public abstract SensorEventProto.PayloadCase getMessageType();
}
