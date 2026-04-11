package com.deloitte.eshop.controller;
import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("UserId") String UserId){
        return ResponseEntity.ok(userService.getUserById(UserId));
    }

    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody User User){
        return ResponseEntity.ok(userService.addUser(User));
    }

    @PatchMapping("/users/{userId}")
    public ResponseEntity<User> updateUser(@RequestBody User User, @PathVariable("UserId") String UserId){
        return ResponseEntity.ok(userService.updateUser(User));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("UserId") String UserId){
        User User = userService.getUserById(UserId);
        String delete_message = null;
        if(User!=null)
            delete_message = userService.deleteUser(User);
        return ResponseEntity.ok(delete_message);
    }
}
