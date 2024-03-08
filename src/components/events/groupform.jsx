import React, { useState } from "react";
import axios from "axios";

const GroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  // Other state variables for events, posts, users, etc.

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/signup",
        {
          groupName,
          groupDescription,
          // Include other group data in the request body
        }
      );
      console.log("Group created successfully:", response.data);
      // Reset form fields
      setGroupName("");
      setGroupDescription("");
      // Reset other state variables as needed
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Group Name:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          ></textarea>
        </div>
        {/* Add input fields for events, posts, users, etc. */}
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};

export default GroupForm;
