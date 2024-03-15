// Path: src/pages/signup/SignupPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.scss";
import PropTypes from "prop-types";
import { signup } from "../../utils/fetch";

const SignupPage = ({ user, setUser }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(userData);
      setUser(response.user);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          className="signup-input"
        />
        <button className="form-button signup-button" type="submit">
          Signup
        </button>
        {errorMessage ===
        "Cannot read properties of undefined (reading 'authToken')" ? (
          <p className="error-message">User does not exist.</p>
        ) : (
          errorMessage && <p className="error-message">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

SignupPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default SignupPage;
