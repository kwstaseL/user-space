package com.kelef.usermanagement.service;

import com.kelef.usermanagement.entity.Address;
import com.kelef.usermanagement.entity.User;
import com.kelef.usermanagement.exceptions.UserNotFoundException;
import com.kelef.usermanagement.repository.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(User user) {
        logger.debug("Creating new user with name: {} {}", user.getName(), user.getSurname());
        if (user.getAddresses() != null) {
            for (Address address : user.getAddresses()) {
                address.setUser(user);
            }
        }
        User savedUser =  userRepository.save(user);
        logger.info("User created successfully with ID: {}", savedUser.getId());
        return savedUser;
    }

    @Transactional
    public User updateUser(User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(updatedUser.getId());
        if (existingUserOptional.isEmpty()) {
            logger.warn("Update failed, user with ID: {} not found", updatedUser.getId());
            throw new UserNotFoundException("User not found with id: " + updatedUser.getId());
        }
        logger.info("Updating user with id {}", updatedUser.getId());
        User existingUser = existingUserOptional.get();
        existingUser.setName(updatedUser.getName());
        existingUser.setSurname(updatedUser.getSurname());
        existingUser.setGender(updatedUser.getGender());
        existingUser.setBirthDate(updatedUser.getBirthDate());

        existingUser.getAddresses().clear();
        if (updatedUser.getAddresses() != null) {
            for (Address address : updatedUser.getAddresses()) {
                address.setUser(existingUser); // link address with user
                existingUser.getAddresses().add(address);
            }
        }

        return userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUserById(Long id) {
        boolean exists = userRepository.existsById(id);
        if (!exists) {
            logger.warn("Delete failed, user with ID: {} not found", id);
            throw new UserNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        logger.info("User with ID: {} deleted successfully", id);
    }

    public Page<User> findAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User findUserById(Long id) {
        logger.info("Fetching user with ID: {}", id);
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            logger.debug("No user found with ID: {}", id);
            throw new UserNotFoundException("User not found with id: " + id);
        }

        logger.debug("User found: {}", user.get());
        return user.get();
    }

}
