package com.deloitte.eshop.dto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;

public record ProductVariantDto(
        String id,
        String product_id,
        String color,
        Set<String> sizes,
        int stock) {

    public static ProductVariantDto from(ProductVariant variant) {
        return new ProductVariantDto(
                variant.getId(),
                variant.getProduct().getId(),
                variant.getColor(),
                variant.getSizes().stream()
                        .map(Sizes::name)
                        .collect(Collectors.toSet()),
                variant.getStock());
    }
}
