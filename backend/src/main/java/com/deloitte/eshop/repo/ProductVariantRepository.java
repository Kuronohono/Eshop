package com.deloitte.eshop.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.deloitte.eshop.entity.ProductVariant;

@Repository
public interface ProductVariantRepository extends CrudRepository<ProductVariant, String> {
}
