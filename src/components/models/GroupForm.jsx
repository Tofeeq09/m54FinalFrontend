import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import "./GroupForm.scss";
import { createGroup } from "../../utils/fetch";

const GroupForm = ({ isOpen, onClose, token }) => {
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
      if (response.success) {
        console.log(response.group);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
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
  token: PropTypes.string,
};

export default GroupForm;
