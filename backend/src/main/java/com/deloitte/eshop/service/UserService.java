package com.deloitte.eshop.service;

import com.deloitte.eshop.dto.UpdateUserDto;
import com.deloitte.eshop.dto.UserProfileDto;
import com.deloitte.eshop.entity.CartProduct;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.repo.CartProductRepository;
import com.deloitte.eshop.repo.ProductRepository;
import com.deloitte.eshop.repo.ProductVariantRepository;
import com.deloitte.eshop.repo.UserRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final CartProductRepository cartProductRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductVariantServiceImpl productVariantService;

    public UserService(UserRepository userRepository, EmailService emailService, ProductRepository productRepository,
            CartProductRepository cartProductRepository,
            ProductVariantRepository productVariantRepository,
            ProductVariantServiceImpl productVariantService) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartProductRepository = cartProductRepository;
        this.productVariantRepository = productVariantRepository;
        this.productVariantService = new ProductVariantServiceImpl();
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

    @Transactional
    public UserProfileDto updateCurrentUser(UpdateUserDto input) {
        User user = getCurrentUser();

        String nextUsername = input.username() != null ? input.username().trim() : null;
        String nextEmail = input.email() != null ? input.email().trim() : null;

        if (nextUsername == null || nextUsername.isBlank()) {
            throw new RuntimeException("Username cannot be empty");
        }
        if (nextEmail == null || nextEmail.isBlank()) {
            throw new RuntimeException("Email cannot be empty");
        }

        userRepository.findByUsername(nextUsername)
                .filter(u -> !u.getId().equals(user.getId()))
                .ifPresent(u -> {
                    throw new RuntimeException("Username already taken");
                });

        userRepository.findByEmail(nextEmail)
                .filter(u -> !u.getId().equals(user.getId()))
                .ifPresent(u -> {
                    throw new RuntimeException("Email already taken");
                });

        user.setUsername(nextUsername);
        user.setEmail(nextEmail);
        userRepository.save(user);

        return getCurrentUserProfile();
    }

    @Transactional
    public void addToCart(String productId, Sizes size, String color, int quantity) {
        User user = getCurrentUser();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        int quantityToAdd = Math.max(1, quantity);

        // If same product, size and color already in cart, just increment quantity
        cartProductRepository.findByUserAndProductAndSizeAndColor(user, product, size, color)
                .ifPresentOrElse(
                        item -> item.setQuantity(item.getQuantity() + quantityToAdd),
                        () -> cartProductRepository.save(CartProduct.builder()
                                .user(user)
                                .product(product)
                                .size(size)
                                .color(color)
                                .quantity(quantityToAdd)
                                .build()));
    }

    @Transactional
    public void removeFromCart(String cartItemId) {
        User user = getCurrentUser();
        cartProductRepository.deleteByUserAndId(user, cartItemId);
    }

    public List<CartProduct> getCart() {
        return cartProductRepository.findByUser(getCurrentUser());
    }

    @Transactional
    public void addToWishlist(String productId) {
        User user = getCurrentUser();
        ProductVariant productVariant = productVariantRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (!user.getUserWishList().contains(productVariant)) {
            user.getUserWishList().add(productVariant);
            userRepository.save(user);
        }
    }

    @Transactional
    public void removeFromWishlist(String productId) {
        User user = getCurrentUser();
        user.getUserWishList().removeIf(p -> p.getId().equals(productId));
        userRepository.save(user);
    }

}
