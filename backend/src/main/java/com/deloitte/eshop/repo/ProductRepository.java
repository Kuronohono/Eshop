package com.deloitte.eshop.repo;

import com.deloitte.eshop.entity.Brands;
import com.deloitte.eshop.entity.Gender;
import com.deloitte.eshop.entity.Product;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Set;
import com.deloitte.eshop.entity.ProductStatus;
import com.deloitte.eshop.entity.ProductType;

@Repository
public interface ProductRepository extends JpaRepository<Product, String>, JpaSpecificationExecutor<Product> {

    List<Product> findByStatusesContaining(ProductStatus status);

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByProductType(ProductType productType);

    List<Product> findByGender(Gender gender);

    List<Product> findByProductBrand(Brands productBrand);

}
