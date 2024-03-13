// Path: src/pages/explorer.Explorer.jsx

import { useEffect, useState } from "react";
import { getAllGroups } from "../../utils/fetch";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import GroupCard from "../../components/cards/GroupCard";

const Explorer = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);

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

    fetchGroups();
  }, [searchTerm, selectedTopics]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTopicChange = (event) => {
    if (event.target.checked) {
      setSelectedTopics((prevTopics) => [...prevTopics, event.target.value]);
    } else {
      setSelectedTopics((prevTopics) => prevTopics.filter((topic) => topic !== event.target.value));
    }
  };

  return (
    <div>
      <h1>Explorer Page</h1>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search groups" />
      <div>
        <label>
          <input type="checkbox" value="Gaming" onChange={handleTopicChange} />
          Gaming
        </label>
        <label>
          <input type="checkbox" value="Comics/Manga" onChange={handleTopicChange} />
          Comics/Manga
        </label>
        <label>
          <input type="checkbox" value="Movies & TV" onChange={handleTopicChange} />
          Movies & TV
        </label>
        <label>
          <input type="checkbox" value="Coding" onChange={handleTopicChange} />
          Coding
        </label>
        <label>
          <input type="checkbox" value="TTRPG" onChange={handleTopicChange} />
          TTRPG
        </label>
      </div>
      <div className="group-content">
        {groups.map((group) => (
          <GroupCard key={group.id} user={user} group={group} onClick={() => navigate(`/group/${group.id}`)} />
        ))}
      </div>
    </div>
  );
};

Explorer.propTypes = {
  user: PropTypes.object,
};

export default Explorer;
