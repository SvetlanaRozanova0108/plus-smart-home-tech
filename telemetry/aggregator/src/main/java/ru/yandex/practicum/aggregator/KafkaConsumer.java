package ru.yandex.practicum.aggregator;

import lombok.RequiredArgsConstructor;
import org.apache.avro.specific.SpecificRecordBase;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.Properties;

@Configuration
@RequiredArgsConstructor
public class KafkaConsumer {
    private final Environment env;

    @Bean
    public org.apache.kafka.clients.consumer.KafkaConsumer<String, SpecificRecordBase> getConsumerProperties() {
        Properties properties = new Properties();
        properties.put(ConsumerConfig.CLIENT_ID_CONFIG, env.getProperty("spring.kafka.consumer.client-id"));
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, env.getProperty("spring.kafka.consumer.group-id"));
        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, env.getProperty("spring.kafka.bootstrap-servers"));
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                env.getProperty("spring.kafka.consumer.key-deserializer"));
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                env.getProperty("spring.kafka.consumer.value-deserializer"));
        properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG,
                env.getProperty("spring.kafka.consumer.enable-auto-commit"));

        return new org.apache.kafka.clients.consumer.KafkaConsumer<>(properties);
    }
}

//    private static Properties getConsumerProperties() {
//        Properties properties = new Properties();
//        // Общие настройки
//        properties.put(ConsumerConfig.CLIENT_ID_CONFIG, "SomeConsumer");
//        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "some.group.id");
//        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, VoidDeserializer.class.getCanonicalName());
//        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getCanonicalName());
//
//        // Настройки, выбранные по условиям задачи
//        properties.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 100);
//        properties.put(ConsumerConfig.FETCH_MAX_BYTES_CONFIG, 3072000);
//        properties.put(ConsumerConfig.MAX_PARTITION_FETCH_BYTES_CONFIG, 307200);
//        return properties;
//    }
