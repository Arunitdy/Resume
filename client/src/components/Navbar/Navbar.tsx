import { Link } from "react-router-dom";
import { FaRobot, FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
        >
          <FaRobot className="me-2 text-info" size={24} />
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

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          {/* Left Side */}
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

            {isLoggedIn && (
              <>
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
              </>
            )}

          </ul>

          {/* Right Side */}

          <div className="d-flex align-items-center">

            {!isLoggedIn ? (

              <>
                <Link
                  to="/login"
                  className="btn btn-outline-info me-2"
                >
                  Login
                </Link>

                <Link
                  to="/login"
                  className="btn btn-info"
                >
                  Sign Up
                </Link>
              </>

            ) : (

              <>

                <button
                  className="btn btn-outline-light position-relative me-3"
                >
                  <FaBell />

                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    2
                  </span>

                </button>

                <Link
                  to="/profile"
                  className="btn btn-outline-info d-flex align-items-center"
                >
                  <FaUserCircle className="me-2" />
                  Profile
                </Link>

              </>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;