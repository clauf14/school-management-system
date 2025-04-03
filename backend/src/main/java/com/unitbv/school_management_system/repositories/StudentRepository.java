package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Student;
import com.unitbv.school_management_system.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
