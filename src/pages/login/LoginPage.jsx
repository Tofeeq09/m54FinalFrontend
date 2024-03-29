// Path: src/pages/login/LoginPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import PropTypes from "prop-types";
import { login } from "../../utils/fetch";

const LoginPage = ({ user, setUser }) => {
  const [userData, setUserData] = useState({
    emailOrUsername: "",
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
      const response = await login({
        email: userData.emailOrUsername.includes("@") ? userData.emailOrUsername : undefined,
        username: !userData.emailOrUsername.includes("@") ? userData.emailOrUsername : undefined,
        password: userData.password,
      });

      setUser(response.user);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="emailOrUsername"
          placeholder="Email or Username"
          value={userData.emailOrUsername}
          onChange={handleChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          className="login-input"
        />
        <button className="form-button login-button" type="submit">
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default LoginPage;
