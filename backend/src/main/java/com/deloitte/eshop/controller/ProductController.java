package com.deloitte.eshop.controller;

import com.deloitte.eshop.dto.ProductFilter;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @PostMapping("")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Product>> addProducts(@RequestBody List<Product> products) {
        return ResponseEntity.ok(productService.addProducts(products));
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product,
            @PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.updateProduct(product));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") String productId) {
        Product product = productService.getProductById(productId);
        String delete_message = null;
        if (product != null)
            delete_message = productService.deleteProduct(product);
        return ResponseEntity.ok(delete_message);
    }

    @GetMapping("/filter")
    public Page<Product> filterProducts(
            @ModelAttribute ProductFilter filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return productService.getFilteredProducts(filter, pageable);
    }

}
