package com.deloitte.eshop.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductVariant;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;

public class ProductSpecification {
    public static Specification<Product> withFilters(ProductFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // ---- Product-level filters ----
            if (filter.getName() != null && !filter.getName().isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("name")),
                        "%" + filter.getName().toLowerCase() + "%"));
            }
            if (filter.getGender() != null) {
                predicates.add(cb.equal(root.get("gender"), filter.getGender()));
            }
            if (filter.getProductType() != null) {
                predicates.add(cb.equal(root.get("productType"), filter.getProductType()));
            }
            if (filter.getDressStyle() != null) {
                predicates.add(cb.equal(root.get("dressStyle"), filter.getDressStyle()));
            }
            if (filter.getProductBrand() != null) {
                predicates.add(cb.equal(root.get("productBrand"), filter.getProductBrand()));
            }
            if (filter.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
            }
            if (filter.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
            }
            if (filter.getMinDiscount() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("discount"), filter.getMinDiscount()));
            }

            // ---- Variant-level filters (color, size) ----
            if (filter.getColor() != null || filter.getSize() != null) {
                Join<Product, ProductVariant> variantJoin = root.join("variants", JoinType.INNER);

                if (filter.getColor() != null) {
                    predicates.add(cb.equal(
                            cb.lower(variantJoin.get("color")),
                            filter.getColor().toLowerCase()));
                }
                if (filter.getSize() != null) {
                    predicates.add(cb.equal(variantJoin.get("size"), filter.getSize()));
                }
                query.distinct(true); // avoid duplicate products from the join
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
