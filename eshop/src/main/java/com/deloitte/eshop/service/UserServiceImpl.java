package com.deloitte.eshop.service;

import com.deloitte.eshop.entity.User;
import com.deloitte.eshop.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User getUserById(String user_id) {
       return userRepository.findById(user_id).get();
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public String deleteUser(User user) {
        userRepository.delete(user);
        return "User Deleted Successfully for userId: "+user.getId();
    }
}
