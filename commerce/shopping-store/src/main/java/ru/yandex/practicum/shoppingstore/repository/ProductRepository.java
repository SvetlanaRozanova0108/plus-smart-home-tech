package ru.yandex.practicum.shoppingstore.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.yandex.practicum.interactionapi.shoppingStore.enums.ProductCategory;
import ru.yandex.practicum.shoppingstore.model.Product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findAllByProductCategory(ProductCategory productCategory, Pageable pageable);

    Optional<Product> findByProductId(UUID productId);
}
