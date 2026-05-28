package com.deloitte.eshop.dto;

import com.deloitte.eshop.entity.CartProduct;
import com.deloitte.eshop.entity.Sizes;

public record CartProductDto(
        String id,
        String color,
        Sizes size,
        int quantity) {
    public static CartProductDto from(CartProduct cartProduct) {
        return new CartProductDto(
                cartProduct.getId(),
                cartProduct.getColor(),
                cartProduct.getSize(),
                cartProduct.getQuantity());
    }
}