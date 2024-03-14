// Path: src/pages/components/cards/UserCard.scss

import PropTypes from "prop-types";
import "./UserCard.scss";

const UserCard = ({ user, role, onKick, onClick }) => {
  return (
    <div className="user-card-positioning" onClick={onClick}>
      <div className="user-card">
        <img
          src={user?.avatar}
          alt={user?.username}
          className="profile-picture"
        />
        <div className="user-card-text-block">
          <div className="kick-button-positioning">
            <h2>{user?.username}</h2>{" "}
            {onKick && (
              <button
                className="kick-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onKick(user.id);
                }}
              >
                Kick
              </button>
            )}
          </div>
          <p>{user?.online ? "Online" : "Offline"}</p>
          {role && <p>Role: {role}</p>}
        </div>
      </div>
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
  onClick: PropTypes.func,
};

export default UserCard;
