package ru.yandex.practicum.collector.gRPC.builders.sensor;

import org.apache.avro.specific.SpecificRecordBase;
import org.springframework.stereotype.Component;
import ru.yandex.practicum.collector.gRPC.producer.KafkaProducer;
import ru.yandex.practicum.grpc.telemetry.event.MotionSensorProto;
import ru.yandex.practicum.grpc.telemetry.event.SensorEventProto;
import ru.yandex.practicum.kafka.telemetry.event.MotionSensorAvro;
import ru.yandex.practicum.kafka.telemetry.event.SensorEventAvro;

@Component
public class MotionSensorBuilder extends BaseSensorBuilder {
    public MotionSensorBuilder(KafkaProducer producer) {
        super(producer);
    }

    @Override
    public SpecificRecordBase toAvro(SensorEventProto sensorEvent) {
        MotionSensorProto motionSensor = sensorEvent.getMotionSensorEvent();

        return SensorEventAvro.newBuilder()
                .setId(sensorEvent.getId())
                .setHubId(sensorEvent.getHubId())
                .setTimestamp(mapTimestampToInstant(sensorEvent))
                .setPayload(new MotionSensorAvro(motionSensor.getLinkQuality(), motionSensor.getMotion(), motionSensor.getVoltage()))
                .build();
    }

    @Override
    public SensorEventProto.PayloadCase getMessageType() {
        return SensorEventProto.PayloadCase.MOTION_SENSOR_EVENT;
    }
}
