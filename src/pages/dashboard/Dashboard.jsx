import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./Dashboard.scss";
import { getUserGroups, getUserEvents } from "../../utils/fetch";
import { validTopics } from "../../utils/staticData";
import GroupCard from "../../components/cards/GroupCard";
import GroupForm from "../../components/models/GroupForm";
import EventCard from "../../components/cards/EventCard";
import TopicCard from "../../components/cards/TopicCard";

const Dashboard = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [groupErr, setGroupErr] = useState(null);
  const [events, setEvents] = useState({ pastEvents: [], upcomingEvents: [] });
  const [eventErr, setEventErr] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  // const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchGroups = async () => {
        try {
          const data = await getUserGroups(user.id);
          setGroups(data.groups);
        } catch (error) {
          setGroupErr(error.message);
        }
      };

      const fetchEvents = async () => {
        try {
          const data = await getUserEvents(user.id);
          setEvents(data);
        } catch (error) {
          setEventErr(error.message);
        }
      };

      const fetchTopics = async () => {
        try {
          const data = await validTopics();
          setTopics(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchGroups();
      fetchEvents();
      fetchTopics();
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      {user && <h1>Hello, {user.username}!</h1>}
      <h1>{user && <h1>Hello, {user.username}!</h1>}</h1>
      <div className="dashboard-content">
        <div className="lists">
          <div className="friend-list">
            <details>
              <summary className="title">
                Your Friends <FiPlus />
              </summary>
              {/* Content goes here */}
            </details>
          </div>

          <div>
            <h2>
              <details>
                <summary className="title">
                  Your Groups <FiPlus onClick={() => setIsAddGroupModalOpen(true)} />
                </summary>
                {groupErr && <p>{groupErr}</p>}
                <div className="group-content">
                  {groups.map((group) => (
                    <GroupCard key={group.id} group={group} onClick={() => navigate(`/group/${group.id}`)} />
                  ))}
                </div>
              </details>
            </h2>
          </div>
        </div>
        <h2 className="title">Topics</h2>
        <div className="topics">
          {topics.map((topic, index) => (
            <TopicCard key={index} topic={topic} />
          ))}
        </div>

        <div className="events">
          <details>
            <summary className="title">Upcoming Events</summary>
            {eventErr && <p>{eventErr}</p>}
            {events &&
              events.upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
              ))}
          </details>

          <details>
            <summary className="title">Past Events</summary>
            {eventErr && <p>{eventErr}</p>}
            {events &&
              events.pastEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
              ))}
          </details>
        </div>
      </div>
      <GroupForm isOpen={isAddGroupModalOpen} onClose={() => setIsAddGroupModalOpen(false)} token={user?.authToken} />
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
};

export default Dashboard;
