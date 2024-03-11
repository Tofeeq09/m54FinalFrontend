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
        console.log(response.event);
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
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <form onSubmit={handleSubmit} className="event-form">
        <h2>Create a New Event</h2>
        <label>
          Event Name:
          <input type="text" name="name" onChange={handleChange} className="input-field" />
        </label>
        <label>
          Event Description:
          <input type="text" name="description" onChange={handleChange} className="input-field" />
        </label>
        <label>
          Location:
          <input type="text" name="location" onChange={handleChange} className="input-field" />
        </label>
        <label>
          Date:
          <input type="date" name="date" onChange={handleChange} className="input-field" />
        </label>
        <label>
          Time:
          <input type="time" name="time" onChange={handleChange} className="input-field" />
        </label>
        <button type="submit" className="submit-button">
          Create Event
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
