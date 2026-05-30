package com.deloitte.eshop.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;

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
            if (filter.getColor() != null || filter.getSizes() != null) {
                // LEFT so products without variants aren't excluded
                Join<Product, ProductVariant> variantJoin = root.join("variants", JoinType.LEFT);

                if (filter.getColor() != null && !filter.getColor().isBlank()) {
                    predicates.add(cb.equal(
                            cb.lower(variantJoin.get("color")),
                            filter.getColor().toLowerCase()));
                }

                if (filter.getSizes() != null) {
                    // sizes is a Set<Sizes> collection, needs its own join
                    Join<ProductVariant, Sizes> sizesJoin = variantJoin.join("sizes", JoinType.LEFT);
                    predicates.add(cb.equal(sizesJoin, filter.getSizes()));
                }

                query.distinct(true);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
