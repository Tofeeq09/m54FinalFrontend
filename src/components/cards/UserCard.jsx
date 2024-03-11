// src/components/cards/UserCard.jsx

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ id, profileImage, groups, events }) => {
  return (
    <div className="user-card-container">
      <Link to={`/user/${id}`}>
        <div className="user-profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
      </Link>
      <div className="user-details">
        <h3>User ID: {id}</h3>
        <div className="user-groups">
          <h4>Groups:</h4>
          <ul>
            {groups.map((group, index) => (
              <li key={index}>{group}</li>
            ))}
          </ul>
        </div>
        <div className="user-events">
          <h4>Events:</h4>
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  events: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserCard;
