package com.deloitte.eshop.controller;

import com.deloitte.eshop.dto.ProductFilter;
import com.deloitte.eshop.entity.Brands;
import com.deloitte.eshop.entity.DressStyle;
import com.deloitte.eshop.entity.Gender;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductStatus;
import com.deloitte.eshop.entity.ProductType;
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
@CrossOrigin(originPatterns = { "http://localhost:*", "http://127.0.0.1:*" })
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @PostMapping("")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Product>> addProducts(@RequestBody List<Product> products) {
        return ResponseEntity.ok(productService.addProducts(products));
    }

    @PostMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(@RequestBody ProductFilter filter) {
        return ResponseEntity.ok(productService.getFilteredProducts(filter));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProduct(@RequestParam String query) {
        return ResponseEntity.ok(productService.searchProducts(query));
    }

    @GetMapping("/getByCategoryAndGender")
    public ResponseEntity<List<Product>> getByCategoryAndGender(@RequestParam ProductType productType,
            @RequestParam Gender gender) {
        return ResponseEntity.ok(productService.getByMenuCategory(productType, gender));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Product>> getByStatus(@PathVariable ProductStatus status,
            @RequestParam(defaultValue = "0") int limit) {
        return ResponseEntity.ok(productService.getProductsByStatus(status, limit));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Product>> getByType(@PathVariable ProductType type) {
        return ResponseEntity.ok(productService.getProductsByProductType(type));
    }

    @GetMapping("/brands/{brand}")
    public ResponseEntity<List<Product>> getByBrand(@PathVariable Brands brand) {
        return ResponseEntity.ok(productService.getProductsByBrand(brand));
    }

    @GetMapping("/you_might_also_like")
    public ResponseEntity<List<Product>> youMightAlsoLikeProducts(@RequestParam(defaultValue = "4") int limit) {
        return ResponseEntity.ok(productService.getRandomProducts(limit));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product,
            @PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.updateProduct(productId, product));
    }

    @GetMapping("/dress-style/{style}")
    public List<Product> getByDressStyle(@PathVariable DressStyle style) {
        return productService.findByDressStyle(style);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") String productId) {
        Product product = productService.getProductById(productId);
        String delete_message = null;
        if (product != null)
            delete_message = productService.deleteProduct(product);
        return ResponseEntity.ok(delete_message);
    }

}
