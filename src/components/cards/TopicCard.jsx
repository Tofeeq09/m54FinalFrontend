// src/components/cards/TopicCard.jsx

import PropTypes from "prop-types";

const TopicCard = ({ topic }) => {
  return (
    <div className="topic-card">
      <h3>{topic}</h3>
    </div>
  );
};

TopicCard.propTypes = {
  topic: PropTypes.string,
};

export default TopicCard;
