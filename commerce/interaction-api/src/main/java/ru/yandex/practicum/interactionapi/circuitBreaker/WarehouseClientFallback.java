package ru.yandex.practicum.interactionapi.circuitBreaker;

import org.springframework.stereotype.Component;
import ru.yandex.practicum.interactionapi.dto.AddressDto;
import ru.yandex.practicum.interactionapi.dto.BookedProductsDto;
import ru.yandex.practicum.interactionapi.dto.ShoppingCartDto;
import ru.yandex.practicum.interactionapi.feign.WarehouseClient;
import ru.yandex.practicum.interactionapi.request.AddProductToWarehouseRequest;
import ru.yandex.practicum.interactionapi.request.AssemblyProductsForOrderRequest;
import ru.yandex.practicum.interactionapi.request.NewProductInWarehouseRequest;
import ru.yandex.practicum.interactionapi.request.ShippedToDeliveryRequest;

import java.util.Map;
import java.util.UUID;

@Component
public class WarehouseClientFallback implements WarehouseClient {

    @Override
    public void newProductInWarehouse(NewProductInWarehouseRequest requestDto) {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }

    @Override
    public void shippedToDelivery(ShippedToDeliveryRequest deliveryRequest) {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }

    @Override
    public void acceptReturn(Map<UUID, Long> products) {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }

    @Override
    public BookedProductsDto checkProductQuantityEnoughForShoppingCart(ShoppingCartDto shoppingCartDto) {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }

    @Override
    public BookedProductsDto assemblyProductForOrder(AssemblyProductsForOrderRequest assemblyProductsForOrder) {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }

    @Override
    public void addProductToWarehouse(AddProductToWarehouseRequest requestDto) {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }

    @Override
    public AddressDto getWarehouseAddress() {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }

    @Override
    public BookedProductsDto bookingProducts(ShoppingCartDto shoppingCartDto) {
        throw new WarehouseServerUnavailable("Fallback response: сервис временно недоступен.");
    }
}
