package com.yashSharma.BillingSoftware.service.impl;

import com.yashSharma.BillingSoftware.Entity.UserEntity;
import com.yashSharma.BillingSoftware.io.UserRequest;
import com.yashSharma.BillingSoftware.io.UserResponse;
import com.yashSharma.BillingSoftware.repository.UserRepository;
import com.yashSharma.BillingSoftware.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .name(newUser.getName())
                .email(newUser.getEmail())
                .userId(newUser.getUserId())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .role(newUser.getRole())
                .build();
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole().toUpperCase())
                .name(request.getName())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email: " + email));
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers(Optional<String> name) {
        return userRepository.getUsers(name.orElse(null))
                .stream()
                .map(category->convertToResponse(category))
                .collect(Collectors.toList());
    }



    @Override
    public void deleteUser(String id) {
        UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found "));

        userRepository.delete(existingUser);
    }
}
