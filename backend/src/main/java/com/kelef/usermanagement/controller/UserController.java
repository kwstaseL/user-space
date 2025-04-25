package com.kelef.usermanagement.controller;

import com.kelef.usermanagement.entity.User;
import com.kelef.usermanagement.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Creates a new user
     * @param user The user information to create
     * @return The created user with 201 status
     */
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    /**
     * Updates an existing user
     * @param id The ID of the user to update
     * @param user The updated user information
     * @return The updated user with 200 status or 400 if the provided ID doesn't match the provided user.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @Valid @RequestBody User user) {
        if (id != user.getId()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        User updatedUser = userService.updateUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }


    /**
     * Deletes a user by ID
     * @param id The ID of the user to delete
     * @return 204 No Content on successful deletion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Retrieves a paginated list of users
     * Supports pagination and sorting through query parameters.
     *
     * @param pageable pagination and sorting information
     * @return Page of users with HTTP 200 status
     */
    @GetMapping()
    public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
        return new ResponseEntity<>(userService.findAllUsers(pageable), HttpStatus.OK);
    }


    /**
     * Retrieves a specific user by ID
     * @param id The ID of the user to retrieve
     * @return The user with 200 status
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
