package com.deloitte.eshop.service;

import com.deloitte.eshop.entity.User;

import java.util.List;

public interface UserService {

    List<User> getUsers();
    User getUserById(String user_id);
    User addUser(User user);
    User updateUser(User user);
    String deleteUser(User user);

}
