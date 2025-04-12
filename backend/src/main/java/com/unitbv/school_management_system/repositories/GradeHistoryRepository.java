package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.GradeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  java.util.List;


public interface GradeHistoryRepository extends JpaRepository<GradeHistory, Integer> {
    List<GradeHistory> getGradeHistoryByCourseIdAndStudentId(Integer courseId, Integer studentId);
}
