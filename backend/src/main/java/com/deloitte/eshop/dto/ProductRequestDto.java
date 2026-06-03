package com.deloitte.eshop.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDto {
    private String name;
    private String description;
    private Double price;
    private Integer discount;
    private String gender;
    private String productType;
    private String dressStyle;
    private String productBrand;
    private List<String> imageUrls;
    private List<ProductVariantRequestDto> variants;
}
