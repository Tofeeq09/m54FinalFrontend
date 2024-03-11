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
    <div className="signup-page">
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <button onClick={onClose}>Close</button>

        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="name" placeholder="Group Name" onChange={handleChange} className="signup-input" />
          <input
            type="text"
            name="description"
            placeholder="Group Description"
            onChange={handleChange}
            className="signup-input"
          />
          <div onChange={handleChange}>
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
          </div>
          <div>
            <label>
              <input type="radio" name="privacy_settings" value="public" onChange={handleChange} />
              Public
            </label>
            <label>
              <input type="radio" name="privacy_settings" value="private" onChange={handleChange} />
              Private
            </label>
          </div>
          <button className="form-button signup-button" type="submit">
            Create Group
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </Modal>
    </div>
  );
};

GroupForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default GroupForm;
