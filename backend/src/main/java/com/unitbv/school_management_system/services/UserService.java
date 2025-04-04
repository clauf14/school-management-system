package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.User;
import com.unitbv.school_management_system.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUser(Integer userId) {
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(String.format("User with ID %s doesn't exist", userId)));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Integer userId, User user) {
        User userToUpdate = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException(String.format("User with ID %s doesn't exist", userId)));

        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPasswordHash(user.getPasswordHash());
        userToUpdate.setRole(user.getRole());
        userToUpdate.setUpdatedAt(user.getUpdatedAt());


        return userRepository.save(userToUpdate);
    }

    public void deleteUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalStateException(String.format("User with ID %s doesn't exist", userId));
        }
        userRepository.deleteById(userId);
    }
}
