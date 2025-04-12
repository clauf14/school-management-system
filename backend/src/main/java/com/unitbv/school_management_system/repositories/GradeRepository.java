package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
    List<Grade> getGradesByCourseIdAndStudentId(Integer courseId, Integer studentId);
    Grade updateGradeByCourseIdAndStudentId(Integer gradeId, Integer courseId, Integer studentId, Grade grade);
    Grade addGradeByCourseIdAndStudentId(Integer courseId, Integer studentId, Grade grade);
}
