package com.deloitte.eshop.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.deloitte.eshop.dto.ProductVariantDto;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.repo.ProductVariantRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductVariantServiceImpl {

    @Autowired
    private ProductVariantRepository productVariantRepository;

    public List<ProductVariant> getProductVariants() {
        return (List<ProductVariant>) productVariantRepository.findAll();
    }

    public ProductVariant addProductVariant(ProductVariant variant) {
        return productVariantRepository.save(variant);
    }

    public ProductVariant updateProductVariant(ProductVariant variant) {
        return productVariantRepository.save(variant);
    }

    public String deleteProductVariant(ProductVariant variant) {
        productVariantRepository.delete(variant);
        return "Product Variant Deleted";
    }

    public List<ProductVariant> getProductVariantsByProductId(String product_id) {
        return productVariantRepository.findByProductId(product_id);
    }

    public List<String> getProductVariantColors(String product_id) {
        return productVariantRepository.findByProductId(product_id)
                .stream()
                .map(ProductVariant::getColor)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<Sizes> getProductVariantsSizes(String product_id, String color) {
        return productVariantRepository.findByProductId(product_id)
                .stream()
                .filter(v -> v.getColor().equalsIgnoreCase(color))
                .flatMap(v -> v.getSizes().stream())
                .distinct()
                .collect(Collectors.toList());
    }

    public int getVariantStock(String productId, String color, String size) {
        Sizes sizeEnum = Sizes.valueOf(size); // converts the string param to your enum
        return productVariantRepository
                .findByProductIdAndColor(productId, color)
                .filter(v -> v.getSizes().contains(sizeEnum))
                .map(ProductVariant::getStock)
                .orElse(0);
    }

    @Transactional
    public void decreaseStock(String productId, String color, int quantity) {
        ProductVariant variant = productVariantRepository
                .findByProductIdAndColor(productId, color)
                .orElseThrow(() -> new RuntimeException("Variant not found"));

        if (variant.getStock() < quantity) {
            throw new IllegalStateException("Not enough stock available");
        }

        variant.setStock(variant.getStock() - quantity);
        productVariantRepository.save(variant);
    }

    @Transactional
    public void increaseStock(String productId, String color, int quantity) {
        ProductVariant variant = productVariantRepository
                .findByProductIdAndColor(productId, color)
                .orElseThrow(() -> new RuntimeException("Variant not found"));

        variant.setStock(variant.getStock() + quantity);
        productVariantRepository.save(variant);
    }

    public ResponseEntity<ProductVariantDto> getVariantByProductIdAndColor(String productId, String color) {
        return productVariantRepository.findByProductIdAndColor(productId, color)
                .map(ProductVariantDto::from)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
