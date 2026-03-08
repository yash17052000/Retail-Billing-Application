package com.yashSharma.BillingSoftware.service;



import com.yashSharma.BillingSoftware.io.UserRequest;
import com.yashSharma.BillingSoftware.io.UserResponse;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers(Optional<String> name);

    void deleteUser(String id);

}