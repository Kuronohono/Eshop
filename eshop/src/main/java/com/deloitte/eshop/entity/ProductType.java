package com.deloitte.eshop.entity;

public enum ProductType {
    T_SHIRTS("T-Shirts"),
    SHORTS("Shorts"),
    SHIRTS("Shirts"),
    HOODIE("Hoodie"),
    JEANS("Jeans");

    private final String displayType;

    ProductType(String displayType){
        this.displayType = displayType;
    }

    public String getDisplayType(){
        return displayType;
    }
}
