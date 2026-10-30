package ru.yandex.practicum.shoppingcart.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.yandex.practicum.interactionapi.dto.BookedProductsDto;
import ru.yandex.practicum.interactionapi.feign.WarehouseClient;
import ru.yandex.practicum.interactionapi.request.ChangeProductQuantityRequest;
import ru.yandex.practicum.interactionapi.dto.ShoppingCartDto;
import ru.yandex.practicum.shoppingcart.exception.NoProductsInShoppingCartException;
import ru.yandex.practicum.interactionapi.exception.NotAuthorizedUserException;
import ru.yandex.practicum.shoppingcart.mapper.ShoppingCartMapper;
import ru.yandex.practicum.shoppingcart.model.ShoppingCart;
import ru.yandex.practicum.shoppingcart.repository.ShoppingCartRepository;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final ShoppingCartMapper shoppingCartMapper;
    private final WarehouseClient warehouseClient;

    @Override
    @Transactional(readOnly = true)
    public ShoppingCartDto getShoppingCart(String username) {
        checkUsername(username);
        ShoppingCart shoppingCart = shoppingCartRepository.findByUsername(username);
        if (shoppingCart == null) {
            return ShoppingCartDto.builder()
                    .products(new java.util.HashMap<>())
                    .build();
        }
        return shoppingCartMapper.toShoppingCartDto(shoppingCart);
    }

    @Override
    public ShoppingCartDto addProductToShoppingCart(String username, Map<UUID, Long> request) {
        checkUsername(username);
        ShoppingCart foundCart = shoppingCartRepository.findByUsername(username);
        ShoppingCart shoppingCart = foundCart != null
                ? foundCart
                : ShoppingCart.builder()
                        .username(username)
                        .products(new java.util.HashMap<>())
                        .active(true)
                        .build();
        if (shoppingCart.getProducts() == null) {
            shoppingCart.setProducts(new java.util.HashMap<>());
        }
        request.forEach((productId, quantity) ->
                shoppingCart.getProducts().merge(productId, quantity, Long::sum));
        return shoppingCartMapper.toShoppingCartDto(shoppingCartRepository.save(shoppingCart));
    }

    @Override
    public void deactivateCurrentShoppingCart(String username) {
        checkUsername(username);
        ShoppingCart shoppingCart = shoppingCartRepository.findByUsername(username);
        shoppingCart.setActive(false);
    }

    @Override
    public ShoppingCartDto removeFromShoppingCart(String username, Map<UUID, Long> request) {
        checkUsername(username);
        ShoppingCart shoppingCart = shoppingCartRepository.findByUsername(username);
        if (shoppingCart == null) {
            throw new NoProductsInShoppingCartException("Пользователь " + username + " не имеет корзину покупок.");
        }
        if (shoppingCart.getProducts() == null) {
            shoppingCart.setProducts(new java.util.HashMap<>());
        }
        request.keySet().forEach(shoppingCart.getProducts()::remove);
        return shoppingCartMapper.toShoppingCartDto(shoppingCartRepository.save(shoppingCart));
    }

    @Override
    public ShoppingCartDto changeProductQuantity(String username, ChangeProductQuantityRequest requestDto) {
        checkUsername(username);
        ShoppingCart shoppingCart = shoppingCartRepository.findByUsername(username);
        if (shoppingCart == null || shoppingCart.getProducts() == null
                || !shoppingCart.getProducts().containsKey(requestDto.getProductId())) {
            throw new NoProductsInShoppingCartException("Пользователь " + username + " не имеет корзину покупок.");
        }
        shoppingCart.getProducts().put(requestDto.getProductId(), requestDto.getNewQuantity());
        shoppingCartRepository.save(shoppingCart);
        return shoppingCartMapper.toShoppingCartDto(shoppingCart);
    }

    @Override
    public BookedProductsDto bookingProductsForUser(String username) {
        checkUsername(username);
        ShoppingCart shoppingCart = shoppingCartRepository.findByUsername(username);
        return warehouseClient.bookingProducts(shoppingCartMapper.toShoppingCartDto(shoppingCart));
    }

    private void checkUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new NotAuthorizedUserException("Имя пользователя не должно быть пустым.");
        }
    }
}
