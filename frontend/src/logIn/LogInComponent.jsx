import "./login.css"

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const LogInComponent = () => {

    const userRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        if (email || password) {
            console.log("parola: " + password);
            console.log("email: " + email);
        }
    }, [email, password])

    return (
        <div className="login-page">
            <div className="login-container">
                <h3>Log In</h3>
                <form>
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
                    <button type="submit">Login</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
                <p>
                    Forgot your password?<br />
                    <span className="line">
                        <Link to="/verify-email">Forgot password</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LogInComponent;