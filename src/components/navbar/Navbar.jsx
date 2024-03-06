import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
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
