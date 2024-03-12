// src/components/cards/EventCard.jsx

import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import "./EventCard.scss";

const EventCard = ({ event, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!event) {
    return null;
  }

  const { id, name, description, location, date, time, createdAt, Group, attendeeCount, Users } = event;
  const createdDate = new Date(createdAt);

  const eventDate = new Date(date);
  const today = new Date();
  const isUpcoming = eventDate >= today;

  const toggleModal = (event) => {
    event.stopPropagation();
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div className={`event-card ${isUpcoming ? "upcoming" : "past"}`} onClick={onClick}>
      <h2>
        #{id} {name}
      </h2>
      <p>{description}</p>
      <p>Location: {location}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>
        Created At: {createdDate?.toLocaleDateString()} {createdDate?.toLocaleTimeString()}
      </p>
      <p>Group: {Group?.name}</p>
      <p>Attendee Count: {attendeeCount}</p>
      <button onClick={toggleModal}>View Attendees</button>

      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel="Attendees">
        <h2>Attendees</h2>
        {Users &&
          Users.map(
            (user) =>
              user?.id && (
                <div key={user.id}>
                  <p>{user.username}</p>
                  <img src={user.avatar} alt={user.username} />
                </div>
              )
          )}
        <button onClick={toggleModal}>Close</button>
      </Modal>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object,
  onClick: PropTypes.func,
};

export default EventCard;
