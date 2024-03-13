// Path: src/pages/profile/Profile.jsx

import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import "./Profile.scss";

const Profile = ({ user }) => {
  const { userId } = useParams();

  if ((user.id = userId)) {
    return (
      <div>
        <h1>Your Profile</h1>
      </div>
    );
  }

  return <div>Profile</div>;
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;
