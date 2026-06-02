package com.deloitte.eshop.dto;

import java.time.LocalDateTime;

public record ReviewDto(
                Long id,
                String description,
                double rating,
                String username,
                LocalDateTime createdAt) {
}
