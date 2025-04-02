package ru.yandex.practicum.payment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.yandex.practicum.interactionapi.dto.OrderDto;
import ru.yandex.practicum.interactionapi.dto.PaymentDto;
import ru.yandex.practicum.interactionapi.dto.ProductDto;
import ru.yandex.practicum.interactionapi.enums.PaymentState;
import ru.yandex.practicum.interactionapi.feign.OrderClient;
import ru.yandex.practicum.interactionapi.feign.ShoppingStoreClient;
import ru.yandex.practicum.payment.exception.NoPaymentFoundException;
import ru.yandex.practicum.payment.exception.NotEnoughInfoInOrderToCalculateException;
import ru.yandex.practicum.payment.mapper.PaymentMapper;
import ru.yandex.practicum.payment.model.Payment;
import ru.yandex.practicum.payment.repository.PaymentRepository;

import java.util.Map;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentMapper paymentMapper;
    private final PaymentRepository paymentRepository;
    private final ShoppingStoreClient shoppingStoreClient;
    private final OrderClient orderClient;

    @Override
    public PaymentDto createPayment(OrderDto orderDto) {
        checkOrder(orderDto);
        Payment payment = Payment.builder()
                .orderId(orderDto.getOrderId())
                .totalPayment(orderDto.getTotalPrice())
                .deliveryTotal(orderDto.getDeliveryPrice())
                .productsTotal(orderDto.getProductPrice())
                .feeTotal(getTax(orderDto.getTotalPrice()))
                .status(PaymentState.PENDING)
                .build();
        return paymentMapper.toPaymentDto(paymentRepository.save(payment));
    }

    @Override
    @Transactional(readOnly = true)
    public Double getTotalCost(OrderDto orderDto) {
        if (orderDto.getDeliveryPrice() == null) {
            throw new NotEnoughInfoInOrderToCalculateException("Недостаточно информации в заказе для расчёта.");
        }
        return orderDto.getProductPrice() + getTax(orderDto.getProductPrice()) + orderDto.getDeliveryPrice();
    }

    @Override
    public void paymentSuccess(UUID uuid) {
        Payment payment = paymentRepository.findById(uuid).orElseThrow(
                () -> new NoPaymentFoundException("Указанная оплата не найдена."));
        payment.setStatus(PaymentState.SUCCESS);
        orderClient.payment(payment.getOrderId());
    }

    @Override
    @Transactional(readOnly = true)
    public Double productCost(OrderDto orderDto) {
        double productCost = 0.0;
        Map<UUID, Long> products = orderDto.getProducts();
        if (products == null) {
            throw new NotEnoughInfoInOrderToCalculateException("Недостаточно информации в заказе для расчёта.");
        }
        for (Map.Entry<UUID, Long> entry : products.entrySet()) {
            ProductDto product = shoppingStoreClient.getProduct(entry.getKey());
            productCost += product.getPrice() * entry.getValue();
        }
        return productCost;
    }

    @Override
    public void paymentFailed(UUID uuid) {
        Payment payment = paymentRepository.findById(uuid).orElseThrow(
                () -> new NoPaymentFoundException("Указанная оплата не найдена."));
        payment.setStatus(PaymentState.FAILED);
        orderClient.paymentFailed(payment.getOrderId());
    }

    private void checkOrder(OrderDto orderDto) {
        if (orderDto.getDeliveryPrice() == null) {
            throw new NotEnoughInfoInOrderToCalculateException("Недостаточно информации в заказе для расчёта.");
        } else if (orderDto.getProductPrice() == null) {
            throw new NotEnoughInfoInOrderToCalculateException("Недостаточно информации в заказе для расчёта.");
        } else if (orderDto.getTotalPrice() == null) {
            throw new NotEnoughInfoInOrderToCalculateException("Недостаточно информации в заказе для расчёта.");
        }
    }

    private double getTax(double totalPrice) {
        return totalPrice * 0.1;
    }
}
