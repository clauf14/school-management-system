import DataTable from "react-data-table-component";


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { request, getAuthenticationToken } from "../axios_helper";

const ListOfStudentsComponent = () => {

    // course id
    const { id } = useParams();

    const [enrollment, setEnrollment] = useState([]);
    const [students, setStudents] = useState([]);

    const [studentEmail, setStudentEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    console.log(getAuthenticationToken());

    useEffect(() => {
        if (id) {
            fetchTableData(id);
        }
    }, [id]);

    useEffect(() => {
        if (students) {
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
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setName('')
    };

    const getStudent = async (studentEmail) => {

        try {
            const response = await request("GET", `/api/student/by/${studentEmail}`);

            return response.data.studentId
        } catch (error) {
            console.error("Eroare:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentId = await getStudent(studentEmail);

        try {
            const response = await request('POST', 'api/enrollment', {
                studentId: studentId,
                courseId: id,
                createdAt: new Date().toISOString()
            });

            console.log(response.data);
            setIsDialogOpen(false);
            fetchTableData(id);
        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    const fetchTableData = async (id) => {
        setLoading(true);

        try {
            const response = await request("GET", `/api/enrollment/all/${id}`);

            setStudents(response.data.map((enrollment) => enrollment.student));
            console.log(response);
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
            selector: (row) => row.firstName + " " + row.lastName,
        },
        {
            name: "CreatedAt",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "UpdatedAt",
            selector: (row) => formatDate(row.updatedAt),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <div className="header">
                        <h2>List of students</h2>
                        <button onClick={handleAddStudent}>Add students</button>
                        <button>Add assignment</button>
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

                <dialog open={isDialogOpen}>
                    <form onSubmit={handleSubmit}>
                        <h3>Create New Course</h3>
                        <label htmlFor="courseName">Student email:</label>
                        <input
                            type="text"
                            id="courseName"
                            name="courseName"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            required
                        />
                        <div>
                            <button type="button" onClick={handleCloseDialog}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
}

export default ListOfStudentsComponent;