import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {request} from "../axios_helper";
import "./profile.css";
import { useAuth } from "../service/AuthContext.jsx";

const ProfileComponent = () => {
    const auth = useAuth();

    //const userInfo = localStorage.getItem("loginInfo");
    /*
    const [student, setStudent] = useState({
        studentId: null,
        userId: null,
        firstName: "",
        lastName: "",
        createdAt: null,
        updatedAt: null
    });
    const [teacher, setTeacher] = useState({
        teacherId: null,
        userId: null,
        firstName: "",
        lastName: "",
        createdAt: null,
        updatedAt: null
    });

     */
    const [student, setStudent] = useState(null);
    const [teacher, setTeacher] = useState(null);

    const id = auth.user.userId;

    useEffect(() => {
        fetchProfile(id);
    }, [id]);

    const fetchProfile = async (id) => {
        try {
            let url = ``;
            if (auth.user.role === "STUDENT") {
                url = `/api/student/${id}`;
            } else if (auth.user.role === "TEACHER") {
                url = `/api/teacher/${id}`;
            }

            const response = await request("GET", url);

            if (auth.user.role === "STUDENT") {
                setStudent(response.data);
            } else if (auth.user.role === "TEACHER") {
                setTeacher(response.data);
            }

        } catch (error) {
            console.error("Eroare:", error);
        }
    };

    return (
        <div>
            {student && (
                <div>
                    <label>Id: {student.studentId}</label>
                    <label>First name: {student.firstName}</label>
                    <label>Last name: {student.lastName}</label>
                    <label>Added on {new Date(student.createdAt).toDateString()}</label>
                </div>
            )}
            {teacher && (
                <div>
                    <label>Id: {teacher.studentId}</label>
                    <label>First name: {teacher.firstName}</label>
                    <label>Last name: {teacher.lastName}</label>
                    <label>Added on {new Date(teacher.createdAt).toDateString()}</label>
                </div>
            )}
        </div>
    );




}

export default ProfileComponent;

