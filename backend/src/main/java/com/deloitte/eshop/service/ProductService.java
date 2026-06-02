package com.deloitte.eshop.service;

import com.deloitte.eshop.dto.ProductFilter;
import com.deloitte.eshop.entity.Brands;
import com.deloitte.eshop.entity.Gender;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductStatus;
import com.deloitte.eshop.entity.ProductType;

import java.util.List;
import org.springframework.data.domain.Page;

public interface ProductService {

    List<Product> getProducts();

    Product getProductById(String product_id);

    Product addProduct(Product product);

    List<Product> addProducts(List<Product> products);

    Product updateProduct(String productId, Product product);

    String deleteProduct(Product product);

    List<Product> getFilteredProducts(ProductFilter filter);

    List<Product> getProductsByStatus(ProductStatus status, int limit);

    List<Product> getProductsByProductType(ProductType productType);

    List<Product> getProductsByBrand(Brands brand);

    List<Product> searchProducts(String query);

    List<Product> getRandomProducts(int limit);

    List<Product> getByMenuCategory(ProductType productType, Gender gender);
}
