import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    setEmail(value);
    if (!value) {
      setEmailError("⚠ Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("⚠ Invalid email format! Example: user@example.com");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    if (!value) {
      setPasswordError("⚠ Password is required");
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "⚠ Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setEmailError("⚠ Email is required");
    }
    if (!password) {
      setPasswordError("⚠ Password is required");
    }

    if (emailError || passwordError || !email || !password) {
      setError("Please fix the validation errors before submitting.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Show SweetAlert2 success message
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Redirect after alert is closed
      });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger text-center fw-bold">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => validateEmail(e.target.value)}
            />
            {emailError && <div className="text-danger fw-bold">{emailError}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
            />
            {passwordError && <div className="text-danger fw-bold">{passwordError}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
