// Path: src/pages/components/cards/EventCard.jsx

import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import "./EventCard.scss";
import UserCard from "./UserCard";

const EventCard = ({ event, currentUserRole, onDelete, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!event) {
    return null;
  }

  const {
    id,
    name,
    description,
    location,
    date,
    time,
    createdAt,
    Group,
    attendeeCount,
    Users,
  } = event;
  const createdDate = new Date(createdAt);

  const eventDate = new Date(date);
  const today = new Date();
  const isUpcoming = eventDate >= today;

  const toggleModal = (event) => {
    event.stopPropagation();
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`event-card ${isUpcoming ? "upcoming" : "past"}`}
      onClick={onClick}
    >
      <div className="header-disband-positioning">
        <div className="event-card-header">
          <h2>
            #{id} {name}
          </h2>
          <p>Group: {Group?.name}</p>
        </div>

        <div className="button-group">
          <button onClick={toggleModal}>
            View Attendees ({attendeeCount})
          </button>
          {currentUserRole === "admin" && onDelete && (
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              Delete
            </button>
          )}
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Attendees"
        >
          <div className="header-disband-positioning">
            <h2>
              <span>{attendeeCount}</span>Attendees
            </h2>
            <button className="negative-button" onClick={toggleModal}>
              Close
            </button>
          </div>
          <div className="members-positioning">
            {Users &&
              Users.map(
                (user) =>
                  user?.id && (
                    <UserCard
                      key={user.id}
                      user={user}
                      onClick={() => navigate(`/profile/${user.username}`)}
                    />
                  )
              )}
          </div>
        </Modal>
      </div>
      <p>{description}</p>
      <p>Location: {location}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>
        Created At: {createdDate?.toLocaleDateString()}{" "}
        {createdDate?.toLocaleTimeString()}
      </p>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object,
  onClick: PropTypes.func,
  currentUserRole: PropTypes.string,
  onDelete: PropTypes.func,
};

export default EventCard;
