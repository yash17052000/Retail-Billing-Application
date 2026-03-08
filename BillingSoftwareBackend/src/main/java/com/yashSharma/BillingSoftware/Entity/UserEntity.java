package com.yashSharma.BillingSoftware.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tbl_users")
@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userId;
    @Column(unique = true)
    private String email;
    private String password;
    private String role;
    private String name;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    private Timestamp updatedAt;
}