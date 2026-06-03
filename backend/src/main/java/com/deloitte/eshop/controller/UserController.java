package com.deloitte.eshop.controller;

import com.deloitte.eshop.dto.UserProfileDto;
import com.deloitte.eshop.dto.UpdateUserDto;
import com.deloitte.eshop.entity.CartProduct;
import com.deloitte.eshop.entity.ProductVariant;
import com.deloitte.eshop.entity.Sizes;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> authenticatedUser() {
        return ResponseEntity.ok(userService.getCurrentUserProfile());
    }

    @PatchMapping("/me")
    public ResponseEntity<UserProfileDto> updateMe(@RequestBody UpdateUserDto input) {
        return ResponseEntity.ok(userService.updateCurrentUser(input));
    }

    @GetMapping("/me/wishlist")
    public ResponseEntity<List<ProductVariant>> getWishlist() {
        return ResponseEntity.ok(userService.getCurrentUser().getUserWishList());
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/me/cart")
    public ResponseEntity<List<CartProduct>> getCart() {
        return ResponseEntity.ok(userService.getCart());
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleStockError(IllegalStateException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @PostMapping("/me/cart/{productId}")
    public ResponseEntity<Void> addToCart(@PathVariable String productId,
            @RequestParam Sizes size,
            @RequestParam String color,
            @RequestParam(defaultValue = "1") int quantity) {
        userService.addToCart(productId, size, color, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me/cart/{cartProductId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable String cartProductId) {
        userService.removeFromCart(cartProductId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/me/wishlist/{productId}")
    public ResponseEntity<Void> addToWishlist(@PathVariable String productId) {
        userService.addToWishlist(productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/me/wishlist/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable String productId) {
        userService.removeFromWishlist(productId);
        return ResponseEntity.ok().build();
    }

}
