package com.deloitte.eshop.service;

import com.deloitte.eshop.dto.ProductFilter;
import com.deloitte.eshop.dto.ProductSpecification;
import com.deloitte.eshop.entity.Brands;
import com.deloitte.eshop.entity.Gender;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductStatus;
import com.deloitte.eshop.entity.ProductType;
import com.deloitte.eshop.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    public Product getProductById(String product_id) {
        return productRepository.findById(product_id).get();
    }

    @Override
    public Product addProduct(Product product) {
        product.getVariants().forEach(variant -> variant.setProduct(product));
        return productRepository.save(product);
    }

    @Override
    public List<Product> addProducts(List<Product> products) {
        products.forEach(product -> product.getVariants().forEach(variant -> variant.setProduct(product)));
        return (List<Product>) productRepository.saveAll(products);
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public String deleteProduct(Product product) {
        productRepository.delete(product);
        return "Product Deleted Successfully for productId: " + product.getId();
    }

    @Override
    public List<Product> getFilteredProducts(ProductFilter filter) {
        Specification<Product> spec = ProductSpecification.withFilters(filter);
        return productRepository.findAll(spec);
    }

    @Override
    public List<Product> getProductsByStatus(ProductStatus status, int limit) {
        List<Product> products = productRepository.findByStatusesContaining(status);
        if (limit > 0) {
            return products.stream().limit(limit).toList();
        }
        return products;
    }

    @Override
    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query)
                .stream().limit(5).toList();
    }

    @Override
    public List<Product> getProductsByProductType(ProductType productType) {
        return productRepository.findByProductType(productType);
    }

    @Override
    public List<Product> getProductsByBrand(Brands brand) {
        return productRepository.findByProductBrand(brand);
    }

    @Override
    public List<Product> getRandomProducts(int limit) {
        long count = productRepository.count();
        int randomOffset = (int) (Math.random() * Math.max(1, count - limit));
        return productRepository.findAll(PageRequest.of(randomOffset / limit, limit)).getContent();
    }

    @Override
    public List<Product> getByMenuCategory(ProductType productType, Gender gender) {
        return productRepository.findByProductTypeAndGender(productType, gender);
    }
}
