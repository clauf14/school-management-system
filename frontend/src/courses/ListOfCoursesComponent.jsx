import DataTable from "react-data-table-component";
import './listOfCourses.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ListOfCoursesComponent = () => {
    const { id } = useParams();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTableData(id);
    }, [id]);

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

    const fetchTableData = async (id) => {
        setLoading(true);

        const teacherId = id;
        console.log("teacher: " + teacherId);

        try {
            const response = await fetch(`http://localhost:8080/api/course/all/${teacherId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCourses(data);
            } else {
                console.error('Error:', response.status);
            }
        } catch (err) {
            console.error("Eroare:", err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.courseId,
        },
        {
            name: "Name",
            selector: (row) => row.courseName,
        },
        {
            name: "CreatedAt",
            selector: (row) => formatDate(row.createdAt),
        },
        {
            name: "UpdatedAt",
            selector: (row) => formatDate(row.updatedAt),
        },
        {
            name: "See course",
            cell: (row) => (
                <button onClick={() => handleUserProfile(row.courseId)}>
                    See Course
                </button>
            ),
        },
    ];

    return (
        <div className="data-table">
            <div className="container">
                <div className="data-table-wrapper">
                    <DataTable
                        title="List of Courses"
                        columns={columns}
                        data={courses}
                        progressPending={loading}
                        pagination
                        paginationPerPage={5}
                        highlightOnHover
                        pointerOnHover
                        responsive
                    />
                </div>
            </div>
        </div>
    )
}

export default ListOfCoursesComponent;
