package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
}
