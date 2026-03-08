package com.yashSharma.BillingSoftware.Controller;

import com.yashSharma.BillingSoftware.io.UserRequest;
import com.yashSharma.BillingSoftware.io.UserResponse;
import com.yashSharma.BillingSoftware.service.UserService;
import com.yashSharma.BillingSoftware.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class UserController {


    @Autowired
    public UserServiceImpl userService;
    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest request) {
        try {


            return userService.createUser(request);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Unable to create user: " + e.getMessage()
            );
        }
    }
    @GetMapping("/users")
    public List<UserResponse> readUsers(@RequestParam Optional<String> name) {
        return userService.readUsers(name);
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User not found"
            );
        }
    }
}
