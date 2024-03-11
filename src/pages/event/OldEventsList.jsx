// OldEventsList.jsx

import React from "react";
import PropTypes from "prop-types";

const OldEventsList = ({ events }) => {
  return (
    <div>
      <h3>Old Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p>Event Name: {event.name}</p>
            <p>Description: {event.description}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

OldEventsList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OldEventsList;
