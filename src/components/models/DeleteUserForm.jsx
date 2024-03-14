// src/components/models/DeleteUserForm.jsx

import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "../../utils/fetch";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserForm = ({ isOpen, onClose, token, setUser, username }) => {
  // add token as a prop
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await deleteUser(password, token);
      onClose();
      toast(`User ${username} was deleted`);
      setUser(null);
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <form onSubmit={handleSubmit} className="delete-user-form">
        <h2>Delete Your Account</h2>
        <p>Please enter your password to confirm:</p>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>
        <button type="submit">Delete Account</button>
        <button onClick={onClose}>Cancel</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </Modal>
  );
};

DeleteUserForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  token: PropTypes.string,
  setUser: PropTypes.func,
  username: PropTypes.string,
};

export default DeleteUserForm;
