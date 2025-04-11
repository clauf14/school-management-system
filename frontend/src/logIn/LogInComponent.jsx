import "./login.css"

import { useState, useEffect, useRef } from "react"
// import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import { request } from "../axios_helper"

const LogInComponent = () => {
  const userRef = useRef()
  //   const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    if (email || password) {
      console.log("Debug - Email: " + email)
      console.log("Debug - Password: " + password)
    }
  }, [email, password])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      console.log("Sending login request...")
      const response = await request("POST", "/login", {
        email: email,
        password: password,
      })
      console.log("Login response:", response.data)
      // optionally navigate after login
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h3>Log In</h3>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="text" name="email" ref={userRef} placeholder="Enter your email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <button type="submit">Login</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
        <p>
          Forgot your password?
          <br />
          <span className="line">
            <Link to="/verify-email">Forgot password</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default LogInComponent
