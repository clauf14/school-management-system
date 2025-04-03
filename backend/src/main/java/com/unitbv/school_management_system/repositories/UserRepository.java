package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
