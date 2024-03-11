import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import "./GroupForm.scss";

const GroupForm = ({ isOpen, onClose }) => {
  const [groupData, setGroupData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setGroupData(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <form onSubmit={handleSubmit} className="group-form">
        <h2>Create a New Group</h2>
        <label>
          Group Name:
          <input type="text" name="name" onChange={handleChange} className="input-field" />
        </label>
        <label>
          Group Description:
          <input type="text" name="description" onChange={handleChange} className="input-field" />
        </label>
        <fieldset onChange={handleChange}>
          <legend>Select Topics:</legend>
          <label>
            <input type="checkbox" name="topics" value="topic1" />
            Topic 1
          </label>
          <label>
            <input type="checkbox" name="topics" value="topic2" />
            Topic 2
          </label>
          <label>
            <input type="checkbox" name="topics" value="topic3" />
            Topic 3
          </label>
          <label>
            <input type="checkbox" name="topics" value="topic4" />
            Topic 4
          </label>
          <label>
            <input type="checkbox" name="topics" value="topic5" />
            Topic 5
          </label>
        </fieldset>
        <fieldset onChange={handleChange}>
          <legend>Privacy Settings:</legend>
          <label>
            <input type="radio" name="privacy_settings" value="public" />
            Public
          </label>
          <label>
            <input type="radio" name="privacy_settings" value="private" />
            Private
          </label>
        </fieldset>
        <button type="submit" className="submit-button">
          Create Group
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </Modal>
  );
};

GroupForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default GroupForm;
