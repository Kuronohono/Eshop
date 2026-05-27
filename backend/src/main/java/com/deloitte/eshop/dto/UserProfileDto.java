package com.deloitte.eshop.dto;

import java.util.List;

import com.deloitte.eshop.entity.User;

public record UserProfileDto(
        String id,
        String username,
        String email,
        List<ProductDto> cart,
        List<ProductDto> wishlist,
        List<OrderDto> orders) {

    public static UserProfileDto from(User user) {
        return new UserProfileDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getProducts_cart().stream().map(ProductDto::from).toList(),
                user.getUserWishList().stream().map(ProductDto::from).toList(),
                user.getUser_orders().stream().map(OrderDto::from).toList());
    }

}
