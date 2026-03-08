package com.yashSharma.BillingSoftware.io;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {

    String email;
    String password;

}
