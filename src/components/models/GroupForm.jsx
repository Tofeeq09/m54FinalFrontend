// Path: src/components/models/GroupForm.jsx

import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import "./GroupForm.scss";
import { createGroup } from "../../utils/fetch";

const GroupForm = ({ isOpen, onClose, token, onGroupCreated }) => {
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
    topics: [],
    privacy_settings: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createGroup(groupData, token);
      if (response?.success) {
        setErrorMessage(null);
        onClose?.();
        onGroupCreated?.(response.group);
      } else {
        setErrorMessage(response?.message);
      }
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setGroupData((prevState) => ({
          ...prevState,
          topics: [...prevState.topics, e.target.value],
        }));
      } else {
        setGroupData((prevState) => ({
          ...prevState,
          topics: prevState.topics.filter((topic) => topic !== e.target.value),
        }));
      }
    } else {
      setGroupData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <form onSubmit={handleSubmit} className="group-form">
        <h2>Create a New Group</h2>
        <div className="group-inputs">
          <label className="group-title">
            Group Name:
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label className="group-title">
            Group Description:
            <input
              type="text"
              name="description"
              onChange={handleChange}
              className="input-field"
            />
          </label>
        </div>
        <fieldset onChange={handleChange}>
          <legend className="group-title">Select Topics:</legend>
          <div className="group-checkboxes">
            <label>
              <input type="checkbox" name="topics" value="Gaming" />
              Gaming
            </label>
            <label>
              <input type="checkbox" name="topics" value="Comics/Manga" />
              Comics/Manga
            </label>
            <label>
              <input type="checkbox" name="topics" value="Movies & TV" />
              Movies & TV
            </label>
            <label>
              <input type="checkbox" name="topics" value="Coding" />
              Coding
            </label>
            <label>
              <input type="checkbox" name="topics" value="Sports" />
              Sports
            </label>
          </div>
        </fieldset>
        <fieldset onChange={handleChange}>
          <legend className="group-title">Privacy Settings:</legend>
          <label>
            <input type="radio" name="privacy_settings" value="public" />
            Public
          </label>
          <label>
            <input type="radio" name="privacy_settings" value="private" />
            Private
          </label>
        </fieldset>
        <div className="button-positioning">
          <button type="submit" className="positive-button">
            Create Group
          </button>
          <button onClick={onClose} className="negative-button">
            Cancel
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </Modal>
  );
};

GroupForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  token: PropTypes.string,
  onGroupCreated: PropTypes.func,
};

export default GroupForm;
