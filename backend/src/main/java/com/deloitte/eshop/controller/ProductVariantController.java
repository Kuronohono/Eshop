package com.deloitte.eshop.controller;

import com.deloitte.eshop.service.ProductVariantServiceImpl;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
