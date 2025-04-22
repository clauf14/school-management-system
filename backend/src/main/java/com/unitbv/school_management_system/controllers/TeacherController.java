package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Teacher;
import com.unitbv.school_management_system.services.TeacherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/teacher")
public class TeacherController {

    private final TeacherService teacherService;


    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/{userId}")
    public Teacher addTeacher(@RequestBody Teacher teacher, @PathVariable Integer userId) {
        return teacherService.createTeacher(teacher, userId);
    }

    @GetMapping("/by-id/{teacherId}")
    public Teacher findTeacher(@PathVariable Integer teacherId) {
        return teacherService.findTeacher(teacherId);
    }

    @GetMapping("/{teacherId}")
    public Teacher getTeacher(@PathVariable Integer teacherId) {
        return teacherService.getTeacher(teacherId);
    }

    @GetMapping
    public List<Teacher> getTeachers() {
        return teacherService.getAllTeachers();
    }

    @PutMapping("/{teacherId}")
    public Teacher updateTeacher(@PathVariable Integer teacherId, @RequestBody Teacher teacher) {
        return teacherService.updateTeacher(teacherId, teacher);
    }

    @DeleteMapping("/{teacherId}")
    public void deleteTeacher(@PathVariable Integer teacherId) {
        teacherService.deleteTeacher(teacherId);
    }
}
