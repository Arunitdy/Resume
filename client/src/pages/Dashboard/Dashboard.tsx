import { Link, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaFileAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const name = localStorage.getItem("name") || "User";
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="dashboard">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="container">

          <FaRobot className="hero-icon" />

          <h1>
            Welcome, <span>{name}</span> 
          </h1>

          <p className="hero-text">
            Welcome to <strong>InterviewAce AI</strong>, your personal
            AI-powered interview preparation platform.
            Analyze your resume against any Job Description and
            receive detailed ATS insights, missing skills,
            keyword analysis, and personalized recommendations
            to improve your chances of getting shortlisted.
          </p>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() => {

                const token = localStorage.getItem("token");

                if (!token) {
                    setShowLoginModal(true);
                    return;
                }

                navigate("/resume-analyzer");

            }}
        >

            Analyze My Resume

        </button>
        <Modal
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            centered
        >

            <Modal.Header closeButton>

                    <Modal.Title>

                        Login Required

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    Please log in to access the Resume Analyzer.

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setShowLoginModal(false)}
                    >

                        Cancel

                    </Button>

                    <Button
                        variant="primary"
                        onClick={() => navigate("/login")}
                    >

                        Login

                    </Button>

                </Modal.Footer>

        </Modal>

        </div>

      </section>

      {/* About */}
      <section className="container mt-5">

        <div className="info-card">

          <h2>What is InterviewAce AI?</h2>

          <p>
            InterviewAce AI is designed to help students and
            professionals prepare stronger resumes before
            applying for jobs.

            Simply upload your resume and paste the Job
            Description. Our AI compares both documents and
            provides detailed insights to improve your resume.
          </p>

        </div>

      </section>

      {/* Features */}
      <section className="container mt-4">

        <div className="info-card">

          <h2>What You'll Get</h2>

          <div className="row mt-4">

            <div className="col-md-6">

              <p>
                <FaCheckCircle className="text-success me-2" />
                ATS Compatibility Score
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                Resume Keyword Matching
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                Missing Skills Detection
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <FaCheckCircle className="text-success me-2" />
                AI Resume Suggestions
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                Resume Improvement Tips
              </p>

              <p>
                <FaCheckCircle className="text-success me-2" />
                Better ATS Ranking
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* How it works */}
      <section className="container mt-4 mb-5">

        <div className="info-card">

          <h2>How It Works</h2>

          <div className="steps">

            <div className="step">
              <div className="circle">1</div>
              <h5>Upload Resume</h5>
            </div>

            <div className="line"></div>

            <div className="step">
              <div className="circle">2</div>
              <h5>Paste Job Description</h5>
            </div>

            <div className="line"></div>

            <div className="step">
              <div className="circle">3</div>
              <h5>AI Analysis</h5>
            </div>

            <div className="line"></div>

            <div className="step">
              <div className="circle">4</div>
              <h5>View ATS Report</h5>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;