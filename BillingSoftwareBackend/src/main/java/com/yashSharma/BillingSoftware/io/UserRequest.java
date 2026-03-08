package com.yashSharma.BillingSoftware.io;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String email;
    private String password;
    private String role;
    private String name;
}
