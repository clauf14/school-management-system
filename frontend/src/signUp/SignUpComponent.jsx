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

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
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
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className="login-container">
            <h3>Sign up</h3>
            <form>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    ref={userRef}
                    placeholder="Username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    ref={userRef}
                    placeholder="Enter your email"
                    autoComplete="off"
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
    );
}

export default SignUpComponent;