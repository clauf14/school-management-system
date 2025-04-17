package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Enrollment;
import com.unitbv.school_management_system.entities.GradeHistory;
import com.unitbv.school_management_system.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    List<Enrollment> findAllByCourse_CourseId(Integer courseId);
}
