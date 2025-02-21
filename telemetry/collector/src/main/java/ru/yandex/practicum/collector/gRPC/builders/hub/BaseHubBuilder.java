package ru.yandex.practicum.collector.gRPC.builders.hub;

import lombok.RequiredArgsConstructor;
import org.apache.avro.specific.SpecificRecordBase;
import org.springframework.beans.factory.annotation.Value;

import ru.yandex.practicum.collector.gRPC.producer.KafkaProducer;
import ru.yandex.practicum.grpc.telemetry.event.HubEventProto;

import java.time.Instant;

@RequiredArgsConstructor
public abstract class BaseHubBuilder implements HubEventBuilder {

    private final KafkaProducer producer;

    @Value("${topic.telemetry-hubs}")
    private String topic;

    @Override
    public void builder(HubEventProto event) {
        producer.send(toAvro(event), event.getHubId(), mapTimestampToInstant(event), topic);
    }

    public Instant mapTimestampToInstant(HubEventProto event) {
        return Instant.ofEpochSecond(event.getTimestamp().getSeconds(), event.getTimestamp().getNanos());
    }

    public abstract SpecificRecordBase toAvro(HubEventProto hubEvent);

    public abstract HubEventProto.PayloadCase getMessageType();
}
