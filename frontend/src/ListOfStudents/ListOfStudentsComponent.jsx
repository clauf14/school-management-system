import DataTable from "react-data-table-component";


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../axios_helper";

const ListOfStudentsComponent = () => {

    // course id
    const { id } = useParams();

    const [students, setStudents] = useState([]);
    const [studentEmail, setStudentEmail] = useState('');

    const [assignments, setAssignments] = useState([]);
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentMaxScore, setAssignmentMaxScore] = useState('');

    const [grade, setGrade] = useState('');
    const [oldGrade, setOldGrade] = useState(null);

    const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
    const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] = useState(false);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    console.log(getAuthenticationToken());

    useEffect(() => {
        if (id) {
            fetchTableData(id);
            getAssignments(id);
        }
    }, [id]);

    useEffect(() => {
        if (students) {
            console.log(assignmentMaxScore);
        }
    }, [students]);

    useEffect(() => {
        if (grade) {
            console.log(students);
        }
    }, [students]);

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('en-US', options).format(formattedDate);
    }

    const handleAddStudent = () => {
        setIsAddStudentDialogOpen(true);
    };

    const handleAddAssignment = () => {
        setIsAddAssignmentDialogOpen(true);
    };

    const handleCloseDialogs = () => {
        setIsAddStudentDialogOpen(false);
        setIsAddAssignmentDialogOpen(false);
        setStudentEmail('');
        setAssignmentName('');
        setAssignmentMaxScore('');
    };

    const getStudent = async (studentEmail) => {
        try {
            const response = await request("GET", `/api/student/by/${studentEmail}`);

            return response.data.studentId
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const getAssignments = async (id) => {
        try {
            const response = await request("GET", `/api/assignment/all/${id}`);

            setAssignments(response.data)
            console.log("Assignments:")
            console.log(response.data)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const updateGrade = async (gradeId, newScore) => {
        try {
            const response = await request("PUT", `/api/grade/${gradeId}`, {
                score: newScore,
                updatedAt: new Date().toISOString(), 
            });
    
            setStudents(prevStudents => 
                prevStudents.map(student => 
                    student.grades[gradeId] 
                        ? { 
                            ...student, 
                            grades: { 
                                ...student.grades, 
                                [gradeId]: response.data 
                            }
                        } 
                        : student
                )
            );
    
            console.log("Assignments updated:", response.data);
        } catch (error) {
            console.error("Error updating grade:", error);
        }
    };

    const addToHistoryGrade = async(gradeId, oldScore, newScore) => {
        try {
            const response = await request("POST", `/api/grade-history`, {
                gradeId: gradeId,
                oldScore: oldScore,
                newScore: newScore,
                changedAt: new Date().toISOString(), 
            });
    
            console.log("Grade history:", response.data);
        } catch (error) {
            console.error("Error updating grade:", error);
        }
    }
    

    const handleGradeSubmit = async (studentId, assignmentId, score) => {
        try {
            if (score !== '' && score !== null) {
                const parsedScore = parseFloat(score);
    
                const existingGrade = students.find(student => student.studentId === studentId)?.grades?.[assignmentId];
    
                if (existingGrade) {
                    await updateGrade(existingGrade.gradeId, parsedScore);  

                    await addToHistoryGrade(existingGrade.gradeId, existingGrade.score, parsedScore)

                    existingGrade.score = parsedScore;
                } else {
                    console.log("Creating new grade for student:", studentId, "and assignment:", assignmentId);
    
                    const response = await request("POST", '/api/grade', {
                        studentId: studentId,
                        assignmentId: assignmentId,
                        score: parsedScore,
                        gradedAt: new Date().toISOString(),
                    });
    
                    console.log("Grade created:", response.data);
                }
            }
        } catch (error) {
            console.error("Error submitting grade:", error);
        }
    };
    

    const fetchGradesForStudents = async (studentsList, assignmentsList) => {
        const updatedStudents = await Promise.all(
            studentsList.map(async (student) => {
                const grades = {};

                await Promise.all(assignmentsList.map(async (assignment) => {
                    try {
                        const response = await request("GET", `/api/grade/${assignment.assignmentId}/${student.studentId}`);
                        grades[assignment.assignmentId] = response.data;
                    } catch (error) {
                        console.error(`No grade found for student ${student.studentId} and assignment ${assignment.assignmentId}`);
                        grades[assignment.assignmentId] = null;
                    }
                }));

                return {
                    ...student,
                    grades: grades,
                };
            })
        );

        setStudents(updatedStudents);
    };

    const handleAddAssignmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request("POST", `/api/assignment`, {
                courseId: id,
                assignmentName: assignmentName,
                maxScore: assignmentMaxScore,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setIsAddAssignmentDialogOpen(false);
            await getAssignments(id);

            setAssignmentMaxScore('');
            setAssignmentName('');
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleAddStudentSubmit = async (e) => {
        e.preventDefault();

        const studentId = await getStudent(studentEmail);

        try {
            const response = await request('POST', 'api/enrollment', {
                studentId: studentId,
                courseId: id,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setIsAddStudentDialogOpen(false);
            fetchTableData(id);
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    const fetchTableData = async (id) => {
        setLoading(true);
    
        try {
            const enrollmentRes = await request("GET", `/api/enrollment/all/${id}`);
            const studentList = enrollmentRes.data.map((enrollment) => enrollment.student);
    
            const assignmentRes = await request("GET", `/api/assignment/all/${id}`);
            const assignmentList = assignmentRes.data;
    
            setAssignments(assignmentList);
    
            await fetchGradesForStudents(studentList, assignmentList);
    
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.studentId,
        },
        {
            name: "Student name",
            selector: (row) => `${row.firstName} ${row.lastName}\n${formatDate(row.createdAt)}`,
            cell: (row) => (
                <div style={{ textAlign: "center" }}>
                    <div><strong>{row.firstName} {row.lastName}</strong></div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{"Added: " + formatDate(row.createdAt)}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{"Updated: " + formatDate(row.updatedAt)}</div>
                </div>
            )
        },
        ...(Array.isArray(assignments) && assignments.length > 0 ? assignments.map((assignment) => ({
            name: (
                <div style={{ textAlign: "center" }}>
                    <strong>{assignment.assignmentName}</strong>
                    <div style={{ fontSize: "12px", color: "#888" }}>🎯 {assignment.maxScore}</div>
                </div>
            ),
            cell: (row) => (
                <input
                    type="number"
                    min="0"
                    max={assignment.maxScore}
                    defaultValue={row.grades?.[assignment.assignmentId]?.score || ''}
                    onBlur={(e) =>
                        handleGradeSubmit(row.studentId, assignment.assignmentId, e.target.value)
                    }
                    style={{ width: '75px' }}
                />
            ),
            ignoreRowClick: true,
        })) : []),
    ];
    

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>List of students</h2>
                        <button onClick={handleAddStudent}>Add students</button>
                        <button onClick={handleAddAssignment}>Add assignment</button>
                    </div>

                    <DataTable
                        columns={columns}
                        data={students}
                        progressPending={loading}
                        pagination
                        paginationPerPage={5}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                </div>

                {/* Dialog for adding students */}
                <dialog open={isAddStudentDialogOpen}>
                    <form onSubmit={handleAddStudentSubmit}>
                        <h3>Add new student</h3>
                        <label htmlFor="studentEmail">Student email:</label>
                        <input
                            type="text"
                            id="studentEmail"
                            name="studentEmail"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            required
                        />
                        <div>
                            <button type="button" onClick={handleCloseDialogs}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </dialog>

                {/* Dialog for adding assignments */}
                <dialog open={isAddAssignmentDialogOpen}>
                    <form onSubmit={handleAddAssignmentSubmit}>
                        <h3>Create new assignment</h3>
                        <label htmlFor="assignmentName">Assignment name:</label>
                        <input
                            type="text"
                            id="assignmentName"
                            name="assignmentName"
                            value={assignmentName}
                            onChange={(e) => setAssignmentName(e.target.value)}
                            required
                        />
                        <label htmlFor="assignmentScore">Assignment max score:</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            step="1"
                            id="assignmentScore"
                            name="assignmentScore"
                            value={assignmentMaxScore}
                            onChange={(e) => setAssignmentMaxScore(e.target.value)}
                            required
                        />
                        <div>
                            <button type="button" onClick={handleCloseDialogs}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </dialog>

            </div>
        </div>
    );
}

export default ListOfStudentsComponent;