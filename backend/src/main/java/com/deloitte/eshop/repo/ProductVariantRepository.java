package com.deloitte.eshop.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.deloitte.eshop.entity.ProductVariant;

@Repository
public interface ProductVariantRepository extends CrudRepository<ProductVariant, String> {
    List<ProductVariant> findByProductId(String productId);

    Optional<ProductVariant> findByProductIdAndColor(String productId, String color);
}
