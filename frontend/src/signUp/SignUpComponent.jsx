import "./signup.css"

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../service/AuthService.jsx";

const SignUpComponent = () => {

    const userRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /*
    useEffect(() => {
        userRef.current.focus();
    }, [])

     */

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if (!username || !email || !password || !confirmPassword) {
                alert("Please complete all fields");
                return;
            }
            if (!validateEmail(email)) {
                alert("Please enter valid email");
            }
            if (password !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }
            const response = await AuthService.register(username, email, password);
            if (response.status === 200) {
                navigate('/login');
            } else {
                console.log(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <div className="register-page">
            <div className="login-container">
                <h3>Sign up</h3>
                <form>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <label>Confirm password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    <button type="submit" onClick={handleSignUp}>Sign up</button>
                </form>
                <p>
                    Already have an account?<br />
                    <span className="line">
                        <Link to="/login">Log in</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignUpComponent;