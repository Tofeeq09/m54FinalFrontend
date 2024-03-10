import { useState } from "react";
import Modal from "react-modal";

const GroupForm = ({ user }) => {
  const [groupName, setGroupName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };
  return (
    <div>
      <button onClick={openModal}>Open Group Form</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>Close</button>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your username:
            <input type="text" name="username" onChange={handleChange} />
          </label>
          <label>
            Enter a Group:
            <input type="text" name="groupname" onChange={handleChange} />
          </label>
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
};

export default GroupForm;
