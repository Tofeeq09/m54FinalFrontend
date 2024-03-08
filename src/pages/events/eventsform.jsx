import React, { useState } from "react";
import axios from "axios";
import "./events.scss";

const EventsForm = ({ handleClose }) => {
  const [eventsName, setEventsName] = useState("");
  const [eventsDescription, setEventsDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/events/create",
        {
          eventsName,
          eventsDescription,
        }
      );
      console.log("Events created successfully:", response.data);
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating events:", error);
      setError("Failed to create events. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Create Events</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Events Name:</label>
            <input
              type="text"
              value={eventsName}
              onChange={(e) => setEventsName(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={eventsDescription}
              onChange={(e) => setEventsDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Create Events</button>
        </form>
      </div>
    </div>
  );
};

export default EventsForm;
