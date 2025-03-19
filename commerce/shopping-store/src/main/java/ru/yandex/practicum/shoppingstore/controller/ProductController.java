package ru.yandex.practicum.shoppingstore.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.yandex.practicum.interactionapi.shoppingStore.dto.PageableDto;
import ru.yandex.practicum.interactionapi.shoppingStore.dto.SetProductQuantityStateRequest;
import ru.yandex.practicum.interactionapi.shoppingStore.dto.ProductDto;
import ru.yandex.practicum.interactionapi.shoppingStore.enums.ProductCategory;
import ru.yandex.practicum.shoppingstore.service.ProductService;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/shopping-store")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDto> getProducts(@RequestParam ProductCategory productCategory,
                                        @Valid PageableDto pageableDto) {
        log.info("Получение списка товаров по типу в пагинированном виде.");
        return productService.getProducts(productCategory, pageableDto);
    }

    @PutMapping
    public ProductDto createNewProduct(@RequestBody @Valid ProductDto productDto) {
        log.info("Создание нового товара в ассортименте {}", productDto);
        return productService.createNewProduct(productDto);
    }

    @PostMapping
    public ProductDto updateProduct(@RequestBody @Valid ProductDto productDto) {
        log.info("Обновление товара в ассортименте {}", productDto);
        return productService.updateProduct(productDto);
    }

    @PostMapping("/removeProductFromStore")
    public Boolean removeProductFromStore(@RequestBody @NotNull UUID productId) {
        log.info("Удаление товара из ассортимента магазина. Функция для менеджерского состава. {}", productId);
        return productService.removeProductFromStore(productId);
    }

    @PostMapping("/quantityState")
    public Boolean setProductQuantityState(@Valid SetProductQuantityStateRequest setProductQuantityStateRequest) {
        log.info("Установка статуса по товару {}", setProductQuantityStateRequest);
        return productService.setProductQuantityState(setProductQuantityStateRequest);
    }

    @GetMapping("/{productId}")
    public ProductDto getProduct(@PathVariable @NotNull UUID productId) {
        log.info("Получение сведений по товару из БД: {}", productId);
        return productService.getProduct(productId);
    }
}
