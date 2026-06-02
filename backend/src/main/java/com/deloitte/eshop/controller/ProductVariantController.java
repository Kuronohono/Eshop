package com.deloitte.eshop.controller;

import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.service.ProductVariantServiceImpl;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/product-variants")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductVariantController {

    private final ProductVariantServiceImpl productVariantServiceImpl;

    ProductVariantController(ProductVariantServiceImpl productVariantServiceImpl) {
        this.productVariantServiceImpl = productVariantServiceImpl;
    }

    @GetMapping("/colors/{productId}")
    public ResponseEntity<List<String>> getProductVariantColors(@PathVariable String productId) {
        return ResponseEntity.ok(productVariantServiceImpl.getProductVariantColors(productId));
    }

    @GetMapping("/sizes/{product_id}/{color}")
    public List<Sizes> getSizes(@PathVariable String product_id, @PathVariable String color) {
        return productVariantServiceImpl.getProductVariantsSizes(product_id, color);
    }

    @GetMapping("/stock/{productId}")
    public ResponseEntity<Integer> getVariantStock(
            @PathVariable String productId,
            @RequestParam String color,
            @RequestParam String size) {
        return ResponseEntity.ok(productVariantServiceImpl.getVariantStock(productId, color, size));
    }

}
