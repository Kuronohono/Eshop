package com.deloitte.eshop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.deloitte.eshop.entity.CartProduct;
import com.deloitte.eshop.entity.Order;
import com.deloitte.eshop.entity.OrderStatus;
import com.deloitte.eshop.entity.OrderedItem;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.repo.OrderRepository;
import com.deloitte.eshop.repo.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Transactional
    public Order placeOrder(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartProduct> cartItems = user.getProducts_cart();
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Build order
        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.ORDER_RECEIVED)
                .build();

        // Convert each cart item → OrderedItem
        List<OrderedItem> orderedItems = cartItems.stream()
                .map(cartItem -> OrderedItem.builder()
                        .order(order)
                        .product(cartItem.getProduct())
                        .quantity(cartItem.getQuantity())
                        .priceAtPurchase(cartItem.getProduct().getPrice())
                        .build())
                .collect(Collectors.toList());

        order.setOrderedItems(orderedItems);

        // Clear the cart
        user.getProducts_cart().clear();
        userRepository.save(user);

        return orderRepository.save(order);
    }
}