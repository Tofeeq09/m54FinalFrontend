// Path: src/components/models/EventForm.jsx

import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import "./EventForm.scss";
import { createEvent } from "../../utils/fetch";

const EventForm = ({ isOpen, onClose, token, groupId, onEventCreated }) => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createEvent(eventData, groupId, token);
      if (response?.success) {
        setErrorMessage(null);
        onClose?.();
        onEventCreated?.(response.event);
      } else {
        setErrorMessage(response?.message);
      }
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  const handleChange = (e) => {
    setEventData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <form onSubmit={handleSubmit} className="event-form">
        <div className="header-disband-positioning">
          <h2>Create a New Event</h2>
        </div>
        <div>
          <label>
            Event Name:
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div>
          <label>
            Event Description:
            <input
              type="text"
              name="description"
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              name="location"
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div>
          <label className="event-apart">
            Date:
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div>
          <label className="event-apart">
            Time:
            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <div>
          <button type="submit" className="positive-button">
            Create Event
          </button>
          <button onClick={onClose} className="negative-button">
            Close
          </button>
        </div>
        {errorMessage ===
        "Cannot read properties of undefined (reading 'authToken')" ? (
          <p className="error-message">User does not exist.</p>
        ) : (
          errorMessage && <p className="error-message">{errorMessage}</p>
        )}
      </form>
    </Modal>
  );
};

EventForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  token: PropTypes.string,
  groupId: PropTypes.number,
  onEventCreated: PropTypes.func,
};

export default EventForm;
