Smart Home Technologies — микросервисная платформа включающая:

- Управление умным домом
- Интернет-магазин устройств
- Автоматизация сценариев домашней техники

Архитектура:
- модуль infra - Центр управления сервисами (Spring Cloud)
- модуль telemetry	- Автоматизация сценариев умного дома
- модуль commerce	- Интернет-магазин устройств

Технологии:
Docker
Apache Kafka (межсервисная коммуникация)
gRPC + Protobuf (высокопроизводительный RPC)
Spring Cloud (микросервисы)
PostgreSQL (хранилище)

Доступность:
API Gateway: http://localhost:8080
Документация API: [specifical.json](https://code.s3.yandex.net/Java/project19/http-api-spec.json?etag=636f8795094ed0aee7b6adf854eb6fc8)
