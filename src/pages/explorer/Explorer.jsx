import { useEffect, useState } from "react";
import { getAllGroups, getAllUsers } from "../../utils/fetch";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./Explorer.scss";
import GroupCard from "../../components/cards/GroupCard";
import UserCard from "../../components/cards/UserCard";

const Explorer = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchMode, setSearchMode] = useState("groups");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getAllGroups(searchTerm, selectedTopics);
        setGroups(data.groups);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(searchTerm);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchMode === "groups") {
      fetchGroups();
    } else {
      fetchUsers();
    }
  }, [searchTerm, selectedTopics, searchMode]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTopicChange = (event) => {
    if (event.target.checked) {
      setSelectedTopics((prevTopics) => [...prevTopics, event.target.value]);
    } else {
      setSelectedTopics((prevTopics) =>
        prevTopics.filter((topic) => topic !== event.target.value)
      );
    }
  };

  const handleSearchModeChange = (event) => {
    setSearchMode(event.target.value);
  };

  return (
    <div className="explorer">
      <h1>Explorer Page</h1>
      <div>
        <label>
          <input
            type="radio"
            value="groups"
            checked={searchMode === "groups"}
            onChange={handleSearchModeChange}
          />
          Groups
        </label>
        <label>
          <input
            type="radio"
            value="users"
            checked={searchMode === "users"}
            onChange={handleSearchModeChange}
          />
          Users
        </label>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={`Search ${searchMode}`}
        className="search-input"
      />
      {searchMode === "groups" && (
        <div className="topics">
          <label>
            <input
              type="checkbox"
              value="Gaming"
              onChange={handleTopicChange}
            />
            Gaming
          </label>
          <label>
            <input
              type="checkbox"
              value="Comics/Manga"
              onChange={handleTopicChange}
            />
            Comics/Manga
          </label>
          <label>
            <input
              type="checkbox"
              value="Movies & TV"
              onChange={handleTopicChange}
            />
            Movies & TV
          </label>
          <label>
            <input
              type="checkbox"
              value="Coding"
              onChange={handleTopicChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              value="Sports"
              onChange={handleTopicChange}
            />
            Sports
          </label>
        </div>
      )}

      <div className="members-positioning">
        {searchMode === "groups"
          ? groups.map((group) => (
              <GroupCard
                key={group.id}
                user={user}
                group={group}
                onClick={() => navigate(`/group/${group.id}`)}
              />
            ))
          : users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={() => navigate(`/profile/${user.username}`)}
              />
            ))}
      </div>
    </div>
  );
};

Explorer.propTypes = {
  user: PropTypes.object,
};

export default Explorer;
