package com.unitbv.school_management_system.repositories;

import com.unitbv.school_management_system.entities.GradeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeHistoryRepository extends JpaRepository<GradeHistory, Integer> {
}
