package com.unitbv.school_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grade_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeHistory {

    @Id
    @GeneratedValue
    private Integer historyId;

    @Column(name = "grade_id", nullable = false)
    private Integer gradeId;

    @Column(nullable = false)
    private Double oldScore;

    @Column(nullable = false)
    private Double newScore;

    @Column(name = "changed_by", nullable = false)
    private Integer changedBy;

    @Column(nullable = false)
    private java.sql.Timestamp changedAt;
}

