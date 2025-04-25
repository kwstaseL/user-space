package com.kelef.usermanagement.entity;

import com.kelef.usermanagement.utils.enums.AddressType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotNull;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "addresses")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Address type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "address_type", nullable = false)
    private AddressType addressType;

    @Column(name = "address_text")
    private String addressText;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
