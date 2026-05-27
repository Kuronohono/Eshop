package com.deloitte.eshop.dto;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

import com.deloitte.eshop.entity.Order;

import lombok.Getter;

public record OrderDto(
        String id,
        LocalDateTime createdAt,
        String status,
        double totalPrice,
        List<OrderedItemDto> items) {
    public static OrderDto from(Order order) {
        return new OrderDto(
                order.getId(),
                order.getCreatedAt(),
                order.getStatus().name(),
                order.getTotalPrice(),
                order.getOrderedItems().stream()
                        .map(OrderedItemDto::from)
                        .toList());
    }
}
