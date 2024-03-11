// src/components/cards/GroupCard.jsx

import PropTypes from "prop-types";

import "./GroupCard.scss";

const GroupCard = ({ group, onClick }) => {
  return (
    <div onClick={onClick} className="group-card">
      <h2>{group?.name}</h2>
      <p>{group?.description}</p>
      <p>Topics: {group?.topics?.join(", ")}</p>
      <p>Privacy: {group?.privacy_settings}</p>
    </div>
  );
};

GroupCard.propTypes = {
  group: PropTypes.object,
  onClick: PropTypes.func,
};

export default GroupCard;
