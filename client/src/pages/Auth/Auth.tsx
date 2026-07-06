import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { login, register} from "../../services/authService";
import "./Auth.css";

const Auth = () => {const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      try {
          setLoading(true);

          if (isLogin) {

              // Login
              const response = await login({
                  email,
                  password,
              });

              console.log("Login Response:", response);

              localStorage.setItem("token", response.token);
              localStorage.setItem("name", response.name);
              localStorage.setItem("email", response.email);

              alert("Login Successful");

              window.location.href = "/dashboard";

          } else {

              // Validation
              if (password !== confirmPassword) {
                  alert("Passwords do not match");
                  return;
              }

              const response = await register({
                  name,
                  email,
                  password,
              });

              alert("Account created successfully!");
              console.log("Registration successful", response);

              // Save JWT
              localStorage.setItem("token", response.token);
              localStorage.setItem("name", response.name);
              localStorage.setItem("email", response.email);
              
              window.location.href = "/dashboard";

          }

      } catch (error: any) {

          alert(
              error.response?.data?.message ||
              "Something went wrong."
          );

      } finally {

          setLoading(false);

      }
  };
  
  return (
    <div className="auth-page">

      <div className="container-fluid">

        <div className="row ">

          {/* Left Side */}

          <div className="col-lg-6 auth-left d-none d-lg-flex">

            <div className="auth-left-content">

              <FaRobot size={90} className="mb-4 text-info" />

              <h1>InterviewAce AI</h1>

              <h4 className="mt-3">
                Your AI Career Preparation Platform
              </h4>

              <p className="mt-4">

                Upload your resume, analyze ATS score,
                prepare for interviews with AI,
                practice coding,
                and get a personalized learning roadmap.

              </p>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 auth-right">

            <div className="auth-card shadow">

              <h2 className="text-center mb-4">

                {isLogin ? "Welcome Back" : "Create Account"}

              </h2>

              <form onSubmit={handleSubmit}>

                {!isLogin && (

                  <div className="mb-3">

                    <label className="form-label">
                      Full Name
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        <FaUser />
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                      />

                    </div>

                  </div>

                )}

                <div className="mb-3">

                  <label className="form-label">
                    Email Address
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>                    

                  </div>

                </div>

                {!isLogin && (

                  <div className="mb-3">

                    <label className="form-label">
                      Confirm Password
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        <FaLock />
                      </span>

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value) }
                      />
                      <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                          }
                      >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>

                    </div>

                  </div>

                )}

                {isLogin && (

                  <div className="d-flex justify-content-between mb-3">

                    <div className="form-check">

                      <input
                        type="checkbox"
                        className="form-check-input"
                      />

                      <label className="form-check-label">
                        Remember Me
                      </label>

                    </div>

                    <Link to="#">
                      Forgot Password?
                    </Link>

                  </div>

                )}

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                  >

                  {loading ?
                  <>
                  <span
                  className="spinner-border spinner-border-sm me-2"
                  />
                  Logging In...
                  </>
                  :
                  (isLogin ? "Login" : "Create Account")
                  }

                </button>

              </form>

              <div className="text-center mt-4">

                <p className="text-muted">
                  OR
                </p>

                <button className="btn btn-outline-dark w-100">

                  <FaGoogle className="me-2" />

                  Continue with Google

                </button>

              </div>

              <div className="text-center mt-4">

                {isLogin ? (

                  <p>

                    Don't have an account?{" "}

                    <button
                      className="btn btn-link"
                      onClick={() => {

                          setIsLogin(false);

                          setName("");

                          setEmail("");

                          setPassword("");

                          setConfirmPassword("");

                      }}
                    >
                      Sign Up
                    </button>

                  </p>

                ) : (

                  <p>

                    Already have an account?{" "}

                    <button
                      className="btn btn-link"
                      onClick={() => {

                          setIsLogin(true);

                          setName("");

                          setEmail("");

                          setPassword("");

                          setConfirmPassword("");

                      }}
                    >
                      Login
                    </button>

                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Auth;