import React, { useState } from "react";
import EventForm from "./EventForm";
import OldEventsList from "./OldEventsList";

const EventsModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Sample event data
  const sampleEvents = [
    {
      id: 1,
      name: "Online Events",
      description: "Terminator Screening",
      date: "2024-03-12",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "In person Events",
      description: "Country walk meetup",
      date: "2024-03-15",
      time: "2:00 PM",
    },
  ];

  return (
    <div>
      <button onClick={openModal}>Add New Event</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add New Event</h2>
            <EventForm />
            <h2>Old Events</h2>
            <OldEventsList events={sampleEvents} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsModal;
