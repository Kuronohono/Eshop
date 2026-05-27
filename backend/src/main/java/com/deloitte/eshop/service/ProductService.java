package com.deloitte.eshop.service;

import com.deloitte.eshop.dto.ProductFilter;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductStatus;
import com.deloitte.eshop.entity.ProductType;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    List<Product> getProducts();

    Product getProductById(String product_id);

    Product addProduct(Product product);

    List<Product> addProducts(List<Product> products);

    Product updateProduct(Product product);

    String deleteProduct(Product product);

    Page<Product> getFilteredProducts(ProductFilter filter, Pageable pageable);

    List<Product> getProductsByStatus(ProductStatus status, int limit);

    List<Product> getProductsByProductType(ProductType productType);

    List<Product> searchProducts(String query);

}
