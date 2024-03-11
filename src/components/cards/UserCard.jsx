// src/components/cards/UserCard.jsx

import PropTypes from "prop-types";
import "./UserCard.scss";

const UserCard = ({ user, role, onKick }) => {
  return (
    <div className="user-card">
      <img src={user?.avatar} alt={user?.username} />
      <h2>{user?.username}</h2>
      <p>{user?.online ? "Online" : "Offline"}</p>
      <p>Role: {role}</p>
      {onKick && <button onClick={() => onKick(user.id)}>Kick</button>}
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    online: PropTypes.bool,
  }).isRequired,
  role: PropTypes.string,
  onKick: PropTypes.func,
};

export default UserCard;
