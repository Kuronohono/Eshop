package com.deloitte.eshop.entity;

public enum Sizes {
    XXSMALL("XX-Small"),
    XSMALL("X-Small"),
    SMALL("Small"),
    MEDIUM("Medium"),
    LARGE("Large"),
    XLARGE("X-Large"),
    XXLARGE("XX-Large"),
    TXLARGE("3X-Large"),
    FXLARGE("4X-Large");

    private final String size;

    Sizes(String size) {
        this.size = size;
    }

    public String getSize() {
        return size;
    }
}
