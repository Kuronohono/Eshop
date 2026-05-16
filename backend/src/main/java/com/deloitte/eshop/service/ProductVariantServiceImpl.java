package com.deloitte.eshop.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.repo.ProductVariantRepository;

@Service
public class ProductVariantServiceImpl implements ProductVariantService {

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Override
    public List<ProductVariant> getProductVariants() {
        return (List<ProductVariant>) productVariantRepository.findAll();
    }

    @Override
    public ProductVariant addProductVariant(ProductVariant variant) {
        return productVariantRepository.save(variant);
    }

    @Override
    public ProductVariant updateProductVariant(ProductVariant variant) {
        return productVariantRepository.save(variant);
    }

    @Override
    public String deleteProductVariant(ProductVariant variant) {
        productVariantRepository.delete(variant);
        return "Product Variant Deleted";
    }

    @Override
    public List<ProductVariant> getProductVariantsByProductId(String product_id) {
        return productVariantRepository.findByProductId(product_id);
    }

    @Override
    public List<String> getProductVariantColors(String product_id) {
        return productVariantRepository.findByProductId(product_id)
                .stream()
                .map(ProductVariant::getColor)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<Integer> getProductVariantsStock(String product_id) {
        return productVariantRepository.findByProductId(product_id)
                .stream()
                .map(ProductVariant::getStock)
                .collect(Collectors.toList());

    }

    @Override
    public List<Sizes> getProductVariantsSizes(String product_id, String color) {
        return productVariantRepository.findByProductId(product_id)
                .stream()
                .filter(v -> v.getColor().equalsIgnoreCase(color))
                .flatMap(v -> v.getSizes().stream())
                .distinct()
                .collect(Collectors.toList());
    }

}
