package com.deloitte.eshop.service;

import com.deloitte.eshop.dto.UserProfileDto;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.repo.UserRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof User user) {
            return userRepository.findById(user.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        String name = authentication.getName();
        return userRepository.findByEmail(name)
                .or(() -> userRepository.findByUsername(name))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional(readOnly = true)
    public UserProfileDto getCurrentUserProfile() {
        User user = getCurrentUser();
        user.getProducts_cart().size();
        user.getUserWishList().size();
        user.getUser_orders().forEach(order -> {
            order.getOrderedItems().forEach(item -> item.getProduct().getId());
        });
        return UserProfileDto.from(user);
    }

}
