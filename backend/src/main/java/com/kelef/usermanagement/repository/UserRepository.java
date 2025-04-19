package com.kelef.usermanagement.repository;

import com.kelef.usermanagement.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
