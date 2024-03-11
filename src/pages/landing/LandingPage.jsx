// src/pages/landing/LandingPage.jsx

import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./LandingPage.scss";
import SignupPage from "../signup/SignupPage";

const LandingPage = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="landing-page">
      <div className="container">
        <div className="slides slide1">
          <h1>SQUADS</h1>
        </div>
        <div className="slides slide2">
          <p>
            🚀 Join Squads Now! 🚀 <br />
            Connect with fellow coders, collaborate on projects, and discover coding events in your area. Don&apos;t
            miss out—join Squads today!
          </p>
        </div>
        <div className="slides slide3">
          <SignupPage setUser={setUser} />
        </div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default LandingPage;
