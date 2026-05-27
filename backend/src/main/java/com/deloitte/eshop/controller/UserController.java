package com.deloitte.eshop.controller;

import com.deloitte.eshop.dto.UserProfileDto;
import com.deloitte.eshop.entity.Product;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.service.UserService;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @GetMapping("/me/wishlist")
    public ResponseEntity<List<Product>> getWishlist() {
        return ResponseEntity.ok(userService.getCurrentUser().getUserWishList());
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }

}
