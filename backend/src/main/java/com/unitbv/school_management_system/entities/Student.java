package com.unitbv.school_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue
    private Integer studentId;

    @Column(name = "user_id", nullable = false, unique = true)
    private Integer userId;

    @Column(name = "teacher_id")
    private String teacherId;

    @Column(name = "course_id")
    private String courseId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private java.sql.Date dob;

    @Column(nullable = false, updatable = false)
    private java.sql.Timestamp createdAt;

    private java.sql.Timestamp updatedAt;
}

