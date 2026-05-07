package com.deloitte.eshop.entity;

public enum Sizes {
    XXSMALL("XX-Small"),
    XSMALL("X-Small"),
    SMALL("Small"),
    MEDIUM("Medium"),
    LARGE("LARGE"),
    XLARGE("X-LARGE"),
    XXLARGE("XX-LARGE"),
    TXLARGE("3X-LARGE"),
    FXLARGE("4X-LARGE");

    private final String size;

    Sizes(String size) {
        this.size = size;
    }

    public String getSize() {
        return size;
    }
}
