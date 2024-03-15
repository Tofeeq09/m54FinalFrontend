// src/components/models/DeleteUserForm.jsx

import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import axios from "axios";
import { sendUpdatedUser } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";

const UpdateUserForm = ({ isOpen, onClose, token, setUser }) => {
  const [userData, setUserData] = useState({
    username: null,
    email: null,
    avatar: null,
    password: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = await sendUpdatedUser(userData, token);
      setUser(updatedUser, () => {
        setUser(null);
        navigate("/");
        document.cookie =
          "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        onClose();
      });
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      formData
    );

    setUserData((prevState) => ({
      ...prevState,
      avatar: res.data.secure_url,
    }));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <form onSubmit={handleSubmit} className="update-user-form">
        <h2>Update Your Information</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label>
          Avatar:
          <input
            type="file"
            onChange={handleAvatarChange}
            className="input-field"
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <button type="submit">Update</button>
        <button onClick={onClose}>Cancel</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </Modal>
  );
};

UpdateUserForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default UpdateUserForm;
