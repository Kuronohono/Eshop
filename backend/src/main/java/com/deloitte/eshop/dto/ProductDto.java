package com.deloitte.eshop.dto;

import java.util.List;

import com.deloitte.eshop.entity.Product;

public record ProductDto(
        String id,
        String name,
        double price,
        int discount,
        List<String> imageUrls,
        String productType,
        String gender,
        double productRating,
        int reviewCount) {
    public static ProductDto from(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDiscount(),
                product.getImageUrls(),
                product.getProductType().name(),
                product.getGender() != null ? product.getGender().name() : null,
                product.getProductRating(),
                product.getReviewCount());
    }
}