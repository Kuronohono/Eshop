package com.deloitte.eshop.service;

import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

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
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public String deleteProduct(Product product) {
        productRepository.delete(product);
        return "Product Deleted Successfully for productId: "+product.getId();
    }
}
