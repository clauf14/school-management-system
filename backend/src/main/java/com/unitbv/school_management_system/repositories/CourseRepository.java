package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
}
