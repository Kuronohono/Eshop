package com.deloitte.eshop.dto;

import com.deloitte.eshop.entity.Brands;
import com.deloitte.eshop.entity.DressStyle;
import com.deloitte.eshop.entity.Gender;
import com.deloitte.eshop.entity.ProductType;
import com.deloitte.eshop.entity.Sizes;
import lombok.Data;

@Data
public class ProductFilter {
    private String name;
    private Gender gender;
    private ProductType productType;
    private DressStyle dressStyle;
    private Brands productBrand;
    private Double minPrice;
    private Double maxPrice;
    private Integer minDiscount;
    private String color;
    private Sizes sizes;

}