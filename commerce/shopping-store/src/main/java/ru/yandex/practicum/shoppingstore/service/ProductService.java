package ru.yandex.practicum.shoppingstore.service;

import ru.yandex.practicum.interactionapi.shoppingStore.dto.PageableDto;
import ru.yandex.practicum.interactionapi.shoppingStore.dto.SetProductQuantityStateRequest;
import ru.yandex.practicum.interactionapi.shoppingStore.dto.ProductDto;
import ru.yandex.practicum.interactionapi.shoppingStore.enums.ProductCategory;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    List<ProductDto> getProducts(ProductCategory productCategory, PageableDto pageableDto);

    ProductDto createNewProduct(ProductDto productDto);

    ProductDto updateProduct(ProductDto productDto);

    boolean removeProductFromStore(UUID productId);

    boolean setProductQuantityState(SetProductQuantityStateRequest setProductQuantityStateRequest);

    ProductDto getProduct(UUID productId);
}
