package com.deloitte.eshop.entity;

public enum DressStyle {
    CASUAL("Casual"),
    FORMAL("Formal"),
    PARTY("Party"),
    GYM("Gym");

    private final String dressStyle;

     DressStyle(String dressStyle){
        this.dressStyle = dressStyle;
    }

    public String getDressStyle() {
        return dressStyle;
    }


}
