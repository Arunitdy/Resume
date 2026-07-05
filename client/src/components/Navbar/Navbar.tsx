import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          InterviewAce AI
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Left Links */}
          <ul className="navbar-nav me-auto ms-4">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/roadmap">
                Roadmap
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Tasks
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/mock">
                Mock Interview
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center">

            <button className="btn btn-outline-light position-relative me-3">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                2
              </span>
            </button>

            <button className="btn btn-outline-info d-flex align-items-center">
              Profile
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;