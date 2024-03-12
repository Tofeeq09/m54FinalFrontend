// src/pages/Explorer.jsx
import { useEffect, useState } from "react";
import { getAllGroups } from "../../utils/fetch";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import GroupCard from "../../components/cards/GroupCard";

const Explorer = ({ user }) => {
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getAllGroups();
        setGroups(data.groups);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h1>Explorer Page</h1>
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
