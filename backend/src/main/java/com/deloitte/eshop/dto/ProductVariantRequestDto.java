package com.deloitte.eshop.dto;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductVariantRequestDto {
    private String color;
    private Set<String> size; // matches your JSON field name
    private Integer stock;
}