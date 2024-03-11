<<<<<<< HEAD
import React, { useState } from "react";
import GroupForm from "../../components/groups/GroupForm";
import EventsForm from "../events/eventsform";

const LandingPage = () => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  const openGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setIsGroupModalOpen(false);
  };

  const openEventsModal = () => {
    setIsEventsModalOpen(true);
  };

  const closeEventsModal = () => {
    setIsEventsModalOpen(false);
  };
=======
// src/pages/landing/LandingPage.jsx

import "./LandingPage.scss";
>>>>>>> a2d24caf0aaea391546bd79dab949204ddab5dce

const LandingPage = () => {
  return (
    <div className="landing-page">
<<<<<<< HEAD
      <h1>Welcome to Squads</h1>
      <h2>The place where technology connects people</h2>
      <button onClick={openGroupModal}>Join a Group</button>
      <button onClick={openEventsModal}>Create Or Join Events</button>

      {/* Group modal */}
      {isGroupModalOpen && <GroupForm closeModal={closeGroupModal} />}

      {/* Events modal */}
      {isEventsModalOpen && <EventsForm closeModal={closeEventsModal} />}
=======
      <p>LandingPage</p>
>>>>>>> a2d24caf0aaea391546bd79dab949204ddab5dce
    </div>
  );
};

export default LandingPage;
