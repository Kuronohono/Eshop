package com.deloitte.eshop.controller;

import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @PostMapping("/products/bulk")
    public ResponseEntity<List<Product>> addProducts(@RequestBody List<Product> products) {
        return ResponseEntity.ok(productService.addProducts(products));
    }

    @PatchMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product,
            @PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.updateProduct(product));
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") String productId) {
        Product product = productService.getProductById(productId);
        String delete_message = null;
        if (product != null)
            delete_message = productService.deleteProduct(product);
        return ResponseEntity.ok(delete_message);
    }

}
