package com.deloitte.eshop.entity;

public enum ProductType {
    T_SHIRT("T-Shirts"),
    SHORT("Shorts"),
    SHIRT("Shirts"),
    HOODIE("Hoodie"),
    JEAN("Jeans");

    private final String displayType;

    ProductType(String displayType) {
        this.displayType = displayType;
    }

    public String getDisplayType() {
        return displayType;
    }
}
