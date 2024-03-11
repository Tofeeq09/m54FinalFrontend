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
            The loneliness epidemic is a pressing societal issue characterized
            by feelings of isolation and a lack of meaningful social
            interactions. Squads provides a platform for individuals to combat
            loneliness by connecting with like-minded peers, fostering
            friendships, and supporting each other through life's challenges.
            Join Squads today to prioritize your mental health and build lasting
            relationships in a supportive community.
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