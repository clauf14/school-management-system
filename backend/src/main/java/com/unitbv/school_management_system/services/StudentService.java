package com.unitbv.school_management_system.services;

import com.unitbv.school_management_system.entities.Student;
import com.unitbv.school_management_system.repositories.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student getStudent(Integer studentId) {
        return studentRepository.findById(studentId).orElseThrow(() -> new IllegalArgumentException(String.format("Student with ID %s doesn't exist", studentId)));
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student updateStudent(Integer studentId, Student student) {
        Student studentToUpdate = studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException(String.format("Student with ID %s doesn't exist", studentId)));

        studentToUpdate.setUserId(student.getUserId());
        studentToUpdate.setFirstName(student.getFirstName());
        studentToUpdate.setLastName(student.getLastName());
        studentToUpdate.setDob(student.getDob());
        studentToUpdate.setUpdatedAt(student.getUpdatedAt());

        return studentRepository.save(studentToUpdate);
    }

    public void deleteStudent(Integer studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new IllegalStateException(String.format("Student with ID %s doesn't exist", studentId));
        }
        studentRepository.deleteById(studentId);
    }
}
