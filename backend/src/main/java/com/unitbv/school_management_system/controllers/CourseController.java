package com.unitbv.school_management_system.controllers;

import com.unitbv.school_management_system.entities.Course;
import com.unitbv.school_management_system.services.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/course")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    @GetMapping("/{courseId}")
    public Course getCourse(@PathVariable Integer courseId) {
        return courseService.getCourse(courseId);
    }

    @GetMapping
    public List<Course> getCourses() {
        return courseService.getAllCourses();
    }

    @PutMapping("/{courseId}")
    public Course updateCourse(@PathVariable Integer courseId, @RequestBody Course course) {
        return courseService.updateCourse(courseId, course);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable Integer courseId) {
        courseService.deleteCourse(courseId);
    }
}
