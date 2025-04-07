package com.unitbv.school_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {

    @Id
    @GeneratedValue
    private Integer enrollmentId;

    @Column(name = "student_id", nullable = false)
    private Integer studentId;

    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @Column(nullable = false, updatable = false)
    private java.sql.Timestamp createdAt;

    private java.sql.Timestamp updatedAt;
}

