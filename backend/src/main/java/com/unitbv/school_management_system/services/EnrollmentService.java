package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Course;
import com.unitbv.school_management_system.entities.Enrollment;
import com.unitbv.school_management_system.entities.Student;
import com.unitbv.school_management_system.repositories.CourseRepository;
import com.unitbv.school_management_system.repositories.EnrollmentRepository;
import com.unitbv.school_management_system.repositories.StudentRepository;
import com.unitbv.school_management_system.request.EnrollmentRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    private final CourseRepository courseRepository;

    private final StudentRepository studentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             CourseRepository courseRepository,
                             StudentRepository studentRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    public Enrollment createEnrollment(EnrollmentRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("This course doesn't exist"));

        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("This student doesn't exist"));

        Enrollment enrollment = new Enrollment();
        enrollment.setCourse(course);
        enrollment.setStudent(student);
        enrollment.setCreatedAt(request.getCreatedAt());

        return enrollmentRepository.save(enrollment);
    }

    public Enrollment getEnrollment(Integer enrollmentId) {
        return enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new IllegalArgumentException(String.format("Enrollment with ID %s doesn't exist", enrollmentId)));
    }

    public List<Enrollment> getEnrollmetns(Integer courseId) {
        return enrollmentRepository.findAllByCourse_CourseId(courseId);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

//    public Enrollment updateEnrollment(Integer enrollmentId, Enrollment enrollment) {
//        Enrollment enrollmentToUpdate = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new IllegalStateException(String.format("Enrollment with ID %s doesn't exist", enrollmentId)));
//
//        enrollmentToUpdate.setStudentId(enrollment.getStudentId());
//        enrollmentToUpdate.setCourseId(enrollment.getCourseId());
//        enrollmentToUpdate.setUpdatedAt(enrollment.getUpdatedAt());
//
//
//        return enrollmentRepository.save(enrollmentToUpdate);
//    }

    public void deleteEnrollment(Integer enrollmentId) {
        if (!enrollmentRepository.existsById(enrollmentId)) {
            throw new IllegalStateException(String.format("Enrollment with ID %s doesn't exist", enrollmentId));
        }
        enrollmentRepository.deleteById(enrollmentId);
    }
}
