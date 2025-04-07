package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Enrollment;
import com.unitbv.school_management_system.repositories.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public Enrollment createEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public Enrollment getEnrollment(Integer enrollmentId) {
        return enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new IllegalArgumentException(String.format("Enrollment with ID %s doesn't exist", enrollmentId)));
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Enrollment updateEnrollment(Integer enrollmentId, Enrollment enrollment) {
        Enrollment enrollmentToUpdate = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new IllegalStateException(String.format("Enrollment with ID %s doesn't exist", enrollmentId)));

        enrollmentToUpdate.setStudentId(enrollment.getStudentId());
        enrollmentToUpdate.setCourseId(enrollment.getCourseId());
        enrollmentToUpdate.setUpdatedAt(enrollment.getUpdatedAt());


        return enrollmentRepository.save(enrollmentToUpdate);
    }

    public void deleteEnrollment(Integer enrollmentId) {
        if (!enrollmentRepository.existsById(enrollmentId)) {
            throw new IllegalStateException(String.format("Enrollment with ID %s doesn't exist", enrollmentId));
        }
        enrollmentRepository.deleteById(enrollmentId);
    }
}
