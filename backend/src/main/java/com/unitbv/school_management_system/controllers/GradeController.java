package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Grade;
import com.unitbv.school_management_system.services.GradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/grade")
public class GradeController {

    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PostMapping
    public Grade addGrade(@RequestBody Grade grade) {
        return gradeService.createGrade(grade);
    }


    @GetMapping("/{gradeId}")
    public Grade getGrade(@PathVariable Integer gradeId) {
        return gradeService.getGrade(gradeId);
    }

    @GetMapping
    public List<Grade> getGrades() {
        return gradeService.getAllGrades();
    }

    @PutMapping("/{gradeId}")
    public Grade updateGrade(@PathVariable Integer gradeId, @RequestBody Grade grade) {
        return gradeService.updateGrade(gradeId, grade);
    }

    @DeleteMapping("/{gradeId}")
    public void deleteGrade(@PathVariable Integer gradeId) {
        gradeService.deleteGrade(gradeId);
    }

    @GetMapping("/course/{courseId}/student/{studentId}")
    public List<Grade> getGradesByCourseAndStudent(@PathVariable Integer courseId, @PathVariable Integer studentId) {
        return gradeService.getAllGradesByCourseAndStudent(courseId, studentId);
    }

    @PostMapping("/course/{courseId}/student/{studentId}")
    public Grade createGrade(@PathVariable Integer studentId, @PathVariable Integer courseId, @RequestBody Grade grade) {

        grade.setStudentId(studentId);
        grade.setCourseId(courseId);

        return gradeService.createGrade(grade);
    }


}
