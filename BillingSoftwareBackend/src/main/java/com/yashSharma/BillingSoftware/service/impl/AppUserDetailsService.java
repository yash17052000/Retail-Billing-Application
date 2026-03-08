package com.yashSharma.BillingSoftware.service.impl;

import com.yashSharma.BillingSoftware.Entity.UserEntity;
import com.yashSharma.BillingSoftware.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity existingUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new User(
                existingUser.getEmail(),
                existingUser.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(existingUser.getRole()))
        );
    }
}