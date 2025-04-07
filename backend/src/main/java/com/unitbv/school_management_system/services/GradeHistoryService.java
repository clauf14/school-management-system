package com.unitbv.school_management_system.services;


import com.unitbv.school_management_system.entities.GradeHistory;
import com.unitbv.school_management_system.repositories.GradeHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeHistoryService {

    private final GradeHistoryRepository gradeHistoryRepository;

    public GradeHistoryService(GradeHistoryRepository gradeHistoryRepository) {
        this.gradeHistoryRepository = gradeHistoryRepository;
    }

    public GradeHistory createGradeHistory(GradeHistory gradeHistory) {
        return gradeHistoryRepository.save(gradeHistory);
    }

    public GradeHistory getGradeHistory(Integer gradeHistoryId) {
        return gradeHistoryRepository.findById(gradeHistoryId).orElseThrow(() -> new IllegalArgumentException(String.format("GradeHistory with ID %s doesn't exist", gradeHistoryId)));
    }

    public List<GradeHistory> getAllGradeHistories() {
        return gradeHistoryRepository.findAll();
    }

    public GradeHistory updateGradeHistory(Integer gradeHistoryId, GradeHistory gradeHistory) {
        GradeHistory gradeHistoryToUpdate = gradeHistoryRepository.findById(gradeHistoryId).orElseThrow(() -> new IllegalStateException(String.format("GradeHistory with ID %s doesn't exist", gradeHistoryId)));

        gradeHistoryToUpdate.setGradeId(gradeHistory.getGradeId());
        gradeHistoryToUpdate.setOldScore(gradeHistory.getOldScore());
        gradeHistoryToUpdate.setNewScore(gradeHistory.getNewScore());
        gradeHistoryToUpdate.setChangedBy(gradeHistory.getChangedBy());
        gradeHistoryToUpdate.setChangedAt(gradeHistory.getChangedAt());


        return gradeHistoryRepository.save(gradeHistoryToUpdate);
    }

    public void deleteGradeHistory(Integer gradeHistoryId) {
        if (!gradeHistoryRepository.existsById(gradeHistoryId)) {
            throw new IllegalStateException(String.format("GradeHistory with ID %s doesn't exist", gradeHistoryId));
        }
        gradeHistoryRepository.deleteById(gradeHistoryId);
    }
}
