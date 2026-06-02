package com.deloitte.eshop.dto;

public record ReviewUpsertRequest(
        String description,
        double rating) {
}
