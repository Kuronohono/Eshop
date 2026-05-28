package com.deloitte.eshop.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.deloitte.eshop.entity.CartProduct;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.entity.User;

@Repository
public interface CartProductRepository extends CrudRepository<CartProduct, String> {
    List<CartProduct> findByUser(User user);

    Optional<CartProduct> findByUserAndProductAndSizeAndColor(User user, Product product, Sizes size, String color);

    void deleteByUserAndId(User user, String id);
}
