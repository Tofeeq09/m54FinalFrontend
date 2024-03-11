import React, { useState } from "react";
import Modal from "react-modal";
import EventForm from "../../components/models/EventForm";
import OldEventsList from "../../components/models/OldEventsList";

import "./../../components/models/EventForm.scss";

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
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Add New Event</h2>
          <EventForm onClose={closeModal} /> <h2>Old Events</h2>
          <OldEventsList events={sampleEvents} />
        </div>
      </Modal>
    </div>
  );
};

export default EventsModal;
