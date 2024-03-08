import { Link } from "react-router-dom";
import React from "react";
import logo from "./logo.jpeg"; // Adjust the path to match the location of logo.jpeg

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <Link to="/" className="homepage">
        Homepage
      </Link>
      <Link to="/Login" className="nav-link">
        Login
      </Link>
      <Link to="/Signup" className="nav-link">
        Signup
      </Link>
    </nav>
  );
};

export default Navbar;
