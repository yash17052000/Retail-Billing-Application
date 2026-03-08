package com.yashSharma.BillingSoftware.Controller;

import com.yashSharma.BillingSoftware.io.AuthRequest;
import com.yashSharma.BillingSoftware.io.AuthResponse;
import com.yashSharma.BillingSoftware.service.UserService;
import com.yashSharma.BillingSoftware.service.impl.AppUserDetailsService;
import com.yashSharma.BillingSoftware.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;
    @Autowired
    private AppUserDetailsService userDetailsService;

    @Autowired
    public PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest user) {
        try {

            authenticationManager
                    .authenticate
                            (new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

            String jwt  = jwtUtil.generateToken(user.getEmail());
            // fetch role
            String role=userService.getUserRole(user.getEmail());
            return new AuthResponse(user.getEmail(),role,jwt);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> request) {
        return passwordEncoder.encode(request.get("password"));
    }
}
