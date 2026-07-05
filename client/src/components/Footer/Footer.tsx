import "./Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container">

        <div className="row">

          {/* Brand */}
          <div className="col-lg-4 mb-4">
            <h4 className="footer-logo">InterviewAce AI</h4>

            <p className="footer-text">
              AI-powered interview preparation platform that helps
              candidates prepare smarter with personalized roadmaps,
              resume optimization, coding practice, and mock interviews.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Platform</h5>

            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Roadmap</a></li>
              <li><a href="#">Tasks</a></li>
              <li><a href="#">Mock Interview</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5>Resources</h5>

            <ul>
              <li><a href="#">Resume Builder</a></li>
              <li><a href="#">Coding Practice</a></li>
              <li><a href="#">Company Preparation</a></li>
              <li><a href="#">Analytics</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3">
            <h5>Connect</h5>

            <div className="social-icons">

              <a href="#">
                <FaGithub />
              </a>

              <a href="#">
                <FaLinkedin />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaEnvelope />
              </a>

            </div>

          </div>

        </div>

        <hr />

        <div className="footer-bottom">
          © {new Date().getFullYear()} InterviewAce AI. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;