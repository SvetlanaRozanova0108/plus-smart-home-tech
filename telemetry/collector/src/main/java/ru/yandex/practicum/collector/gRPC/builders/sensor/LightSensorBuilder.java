package ru.yandex.practicum.collector.gRPC.builders.sensor;

import org.apache.avro.specific.SpecificRecordBase;
import org.springframework.stereotype.Component;
import ru.yandex.practicum.collector.gRPC.producer.KafkaProducer;
import ru.yandex.practicum.grpc.telemetry.event.LightSensorProto;
import ru.yandex.practicum.grpc.telemetry.event.SensorEventProto;
import ru.yandex.practicum.kafka.telemetry.event.LightSensorAvro;
import ru.yandex.practicum.kafka.telemetry.event.SensorEventAvro;

@Component
public class LightSensorBuilder extends BaseSensorBuilder {
    public LightSensorBuilder(KafkaProducer producer) {
        super(producer);
    }

    @Override
    public SensorEventAvro toAvro(SensorEventProto sensorEvent) {
        LightSensorProto lightSensor = sensorEvent.getLightSensorEvent();

        return SensorEventAvro.newBuilder()
                .setId(sensorEvent.getId())
                .setHubId(sensorEvent.getHubId())
                .setTimestamp(mapTimestampToInstant(sensorEvent))
                .setPayload(new LightSensorAvro(lightSensor.getLinkQuality(), lightSensor.getLuminosity()))
                .build();
    }

    @Override
    public SensorEventProto.PayloadCase getMessageType() {
        return SensorEventProto.PayloadCase.LIGHT_SENSOR_EVENT;
    }
}
