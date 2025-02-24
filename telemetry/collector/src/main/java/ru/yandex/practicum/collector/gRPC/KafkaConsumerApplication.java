//package ru.yandex.practicum.collector.gRPC;
//import org.apache.kafka.clients.consumer.*;
//import org.apache.kafka.common.TopicPartition;
//import org.apache.kafka.common.errors.WakeupException;
//import org.apache.kafka.common.serialization.StringDeserializer;
//import org.apache.kafka.common.serialization.VoidDeserializer;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.time.Duration;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Properties;
//
//public class KafkaConsumerApplication {
//    private static final Logger log = LoggerFactory.getLogger(KafkaConsumerApplication.class);
//
//    private static final Duration CONSUME_ATTEMPT_TIMEOUT = Duration.ofMillis(1000);
//    private static final List<String> TOPICS = List.of("topic.name");
//
//    private static final Map<TopicPartition, OffsetAndMetadata> currentOffsets = new HashMap<>();
//
//    public static void main(String[] args) {
//        Properties config = getConsumerProperties();
//
//        // создаём потребителя
//        KafkaConsumer<Void, String> consumer = new KafkaConsumer<>(config);
//
//        // регистрируем хук, в котором вызываем метод wakeup.
//        Runtime.getRuntime().addShutdownHook(new Thread(consumer::wakeup));
//
//        try {
//
//            // подписываемся на топики
//            consumer.subscribe(TOPICS);
//
//            // начинаем Poll Loop
//            while (true) {
//                ConsumerRecords<Void, String> records =    consumer.poll(CONSUME_ATTEMPT_TIMEOUT);
//
//                int count = 0;
//                for (ConsumerRecord<Void, String> record : records) {
//                    // обрабатываем очередную запись
//                    handleRecord(record);
//                    // фиксируем оффсеты обработанных записей, если нужно
//                    manageOffsets(record, count, consumer);
//                    count++;
//                }
//                // фиксируем максимальный оффсет обработанных записей
//                consumer.commitAsync();
//            }
//        } catch (WakeupException | InterruptedException ignores) {
//            // Ничего здесь не делаем.
//            // Закрываем консьюмер в finally блоке.
//        } finally {
//            // Перед закрытием консьюмера убеждаемся, что оффсеты обработанных сообщений
//            // точно зафиксированы, вызываем для этого метод синхронной фиксации
//            try {
//                consumer.commitSync(currentOffsets);
//            } finally {
//                log.info("Закрываем консьюмер");
//                consumer.close();
//            }
//        }
//    }
//
//    private static void manageOffsets(ConsumerRecord<Void, String> record, int count, KafkaConsumer<Void, String> consumer) {
//        // обновляем текущий оффсет для топика-партиции
//        currentOffsets.put(
//                new TopicPartition(record.topic(), record.partition()),
//                new OffsetAndMetadata(record.offset() + 1)
//        );
//
//        if(count % 10 == 0) {
//            consumer.commitAsync(currentOffsets, (offsets, exception) -> {
//                if(exception != null) {
//                    log.warn("Ошибка во время фиксации оффсетов: {}", offsets, exception);
//                }
//            });
//        }
//    }
//
//    private static void handleRecord(ConsumerRecord<Void, String> record) throws InterruptedException {
//        // симулируем обработку данных
//        log.info("топик = {}, партиция = {}, смещение = {}, значение: {}\n",
//                record.topic(), record.partition(), record.offset(), record.value());
//        int seconds = getRandomNumber(1, 3);
//        Thread.sleep(Duration.ofSeconds(seconds));
//    }
//

//
//    private static int getRandomNumber(int min, int max) {
//        return (int) ((Math.random() * (max - min)) + min);
//    }
//}
