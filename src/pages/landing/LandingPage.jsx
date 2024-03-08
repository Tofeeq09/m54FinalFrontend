import React, { useState } from "react";
import EventsForm from "../events/eventsform";
import GroupForm from "../../components/groups/GroupForm";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="landing-page">
      <h1>Welcome Squads</h1>
      <p>LandingPage</p>
      <GroupForm user={user} />
      <p>The place where tech connects people</p>
      <button onClick={openModal}>Open Events Modal</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <EventsForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
