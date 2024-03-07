import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
}

const GroupForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };
  return (
    <div>
      <button onClick={openModal}>Open Group Form</button>
      <Modal isOpen={openModal} onRequestClose={closeModal}>
        <button onClick={closeModal}>Close</button>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your username:
            <input
              type="text"
              name="username"
              value={inputs.username || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Enter a Group:
            <input
              type="text"
              name="groupname"
              value={inputs.groupname || ""}
              onChange={handleChange}
            />
          </label>
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
};
