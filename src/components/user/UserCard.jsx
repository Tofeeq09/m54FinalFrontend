import React from "react";
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img
        src={user.profilePicture}
        alt="Profile"
        className="profile-picture"
      />
      <div className="user-info">
        <h3>{user.username}</h3>
        <p>ID: {user.id}</p>
      </div>
    </div>
  );
};

export default UserCard;
