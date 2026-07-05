import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = (): React.ReactElement =>
  React.createElement(
    "nav",
    { className: "navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4" },
    React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        Link,
        { className: "navbar-brand fw-bold d-flex align-items-center", to: "/" },
        React.createElement(FaRobot, { className: "me-2 text-info", size: 24 }),
        "InterviewAce AI"
      ),
      React.createElement(
        "button",
        {
          className: "navbar-toggler",
          type: "button",
          "data-bs-toggle": "collapse",
          "data-bs-target": "#navbarContent",
        },
        React.createElement("span", { className: "navbar-toggler-icon" })
      ),
      React.createElement(
        "div",
        { className: "collapse navbar-collapse", id: "navbarContent" },
        React.createElement(
          "ul",
          { className: "navbar-nav me-auto ms-4" },
          React.createElement(
            "li",
            { className: "nav-item" },
            React.createElement(
              Link,
              { className: "nav-link", to: "/" },
              "Dashboard"
            )
          ),
          React.createElement(
            "li",
            { className: "nav-item" },
            React.createElement(
              Link,
              { className: "nav-link", to: "/roadmap" },
              "Roadmap"
            )
          ),
          React.createElement(
            "li",
            { className: "nav-item" },
            React.createElement(
              Link,
              { className: "nav-link", to: "/tasks" },
              "Tasks"
            )
          ),
          React.createElement(
            "li",
            { className: "nav-item" },
            React.createElement(
              Link,
              { className: "nav-link", to: "/mock" },
              "Mock Interview"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "d-flex align-items-center" },
          React.createElement(
            "button",
            { className: "btn btn-outline-light position-relative me-3" },
            React.createElement(FaBell, null),
            React.createElement(
              "span",
              { className: "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" },
              "2"
            )
          ),
          React.createElement(
            "button",
            { className: "btn btn-outline-info d-flex align-items-center" },
            React.createElement(FaUserCircle, { className: "me-2" }),
            "Profile"
          )
        )
      )
    )
  );

export default Navbar;