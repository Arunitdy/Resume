import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import UploadCard from "./components/UploadCard";
import useAuth from "../../hooks/useAuth";
import { analyzeResume } from "../../services/resumeService";
import "./ResumeAnalyzer.css";

const ResumeAnalyzer = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useAuth();

     

  const handleAnalyze = async () => {

      if (!resume) {
          alert("Upload Resume");
          return;
      }

      if (!jobDescription.trim()) {
          alert("Paste Job Description");
          return;
      }

      try {

          setLoading(true);

          const result = await analyzeResume(
              resume,
              jobDescription
          );

          console.log(result);

          // Later we'll navigate to Result page

      } catch (error) {

          console.error(error);

          alert("Analysis Failed");

      } finally {

          setLoading(false);

      }

  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">

        <h1 className="fw-bold">
          AI Resume ATS Analyzer
        </h1>

        <p className="text-muted">
          Upload your resume and paste the Job Description to
          receive an AI-powered ATS score, missing skills,
          keyword matching, and resume improvement suggestions.
        </p>

      </div>

      {/* Upload Section */}
      <div className="row g-4">

        {/* Resume Upload */}
        <div className="col-lg-6">

          <UploadCard onFileSelect={setResume} />

        </div>

        {/* Job Description */}
        <div className="col-lg-6">

          <div className="upload-card h-100">

            <h3 className="mb-3">
              Job Description
            </h3>

            <p className="text-muted">
              Copy and paste the complete Job Description below.
            </p>

            <textarea
              className="form-control jd-textarea"
              rows={16}
              placeholder="Paste the complete Job Description here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
            />

            <div className="d-flex justify-content-between mt-3">

              <small className="text-muted">
                Words:{" "}
                {
                  jobDescription
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length
                }
              </small>

              <small className="text-muted">
                Characters: {jobDescription.length}
              </small>

            </div>

          </div>

        </div>

      </div>

      {/* Analyze Button */}
      <div className="text-center mt-5">

        <button
          className="btn btn-success btn-lg px-5"
          disabled={!resume || jobDescription.trim() === ""}
          onClick={handleAnalyze}
        >
          Analyze ATS Score
        </button>

      </div>

      {/* Information Section */}
      <div className="row mt-5">

        <div className="col-12">

          <div className="card shadow-sm border-0">

            <div className="card-body">

              <h4 className="mb-3">
                What You'll Get
              </h4>

              <div className="row">

                <div className="col-md-6">

                  <ul>
                    <li>
                        <FaCheckCircle className="me-2" /> ATS Compatibility Score</li>
                    <li>
                        <FaCheckCircle className="me-2" /> Resume Keyword Matching</li>
                    <li>
                        <FaCheckCircle className="me-2" /> Missing Technical Skills</li>
                    <li>
                        <FaCheckCircle className="me-2" /> Resume Formatting Review</li>
                  </ul>

                </div>

                <div className="col-md-6">

                  <ul>
                    <li>
                        <FaCheckCircle className="me-2" /> AI Resume Suggestions</li>
                    <li>
                        <FaCheckCircle className="me-2" /> Project Improvement Tips</li>
                    <li>
                        <FaCheckCircle className="me-2" /> Resume Optimization Report</li>
                    <li>
                        <FaCheckCircle className="me-2" /> Personalized Learning Roadmap</li>
                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumeAnalyzer;