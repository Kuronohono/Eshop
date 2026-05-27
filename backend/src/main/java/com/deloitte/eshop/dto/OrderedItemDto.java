package com.deloitte.eshop.dto;

import com.deloitte.eshop.entity.OrderedItem;
import com.deloitte.eshop.entity.Product;

public record OrderedItemDto(
        String productId,
        String productName,
        String imageUrl, // first image is enough
        double priceAtPurchase,
        int quantity) {
    public static OrderedItemDto from(OrderedItem item) {
        Product p = item.getProduct();
        return new OrderedItemDto(
                p.getId(),
                p.getName(),
                p.getImageUrls() != null && !p.getImageUrls().isEmpty()
                        ? p.getImageUrls().get(0)
                        : null,
                p.getPrice(),
                item.getQuantity());
    }
}