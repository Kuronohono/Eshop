package com.deloitte.eshop.service;

import com.deloitte.eshop.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts();
    Product getProductById(String product_id);
    Product addProduct(Product product);
    Product updateProduct(Product product);
    String deleteProduct(Product product);

}
