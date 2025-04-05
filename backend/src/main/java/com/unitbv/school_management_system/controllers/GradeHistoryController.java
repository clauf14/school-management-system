package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.GradeHistory;
import com.unitbv.school_management_system.services.GradeHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/grade-history")
public class GradeHistoryController {

    private final GradeHistoryService gradeHistoryService;

    public GradeHistoryController(GradeHistoryService gradeHistoryService) {
        this.gradeHistoryService = gradeHistoryService;
    }

    @PostMapping
    public GradeHistory addGradeHistory(@RequestBody GradeHistory gradeHistory) {
        return gradeHistoryService.createGradeHistory(gradeHistory);
    }

    @GetMapping("/{gradeHistoryId}")
    public GradeHistory getGradeHistory(@PathVariable Integer gradeHistoryId) {
        return gradeHistoryService.getGradeHistory(gradeHistoryId);
    }

    @GetMapping
    public List<GradeHistory> getGradeHistories() {
        return gradeHistoryService.getAllGradeHistories();
    }

    @PutMapping("/{gradeHistoryId}")
    public GradeHistory updateGradeHistory(@PathVariable Integer gradeHistoryId, @RequestBody GradeHistory gradeHistory) {
        return gradeHistoryService.updateGradeHistory(gradeHistoryId, gradeHistory);
    }

    @DeleteMapping("/{gradeHistoryId}")
    public void deleteGradeHistory(@PathVariable Integer gradeHistoryId) {
        gradeHistoryService.deleteGradeHistory(gradeHistoryId);
    }
}
