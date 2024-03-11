// src/components/cards/EventCard.jsx

import PropTypes from "prop-types";

import "./EventCard.scss";

const EventCard = ({ event, onClick }) => {
  const createdAt = new Date(event.createdAt);

  return (
    <div className="event-card" onClick={onClick}>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>
        Created At: {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
      </p>
      <p>Group: {event.Group.name}</p>
      <p>Attendee Count: {event.attendeeCount}</p>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object,
  onClick: PropTypes.func,
};

export default EventCard;
