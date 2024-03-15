// Path: src/pages/dashboard/Dashboard.jsx
 
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
 
import "./Dashboard.scss";
import { getUserGroups, getUserEvents, getFollowData } from "../../utils/fetch";
import { validTopics } from "../../utils/staticData";
import GroupCard from "../../components/cards/GroupCard";
import GroupForm from "../../components/models/GroupForm";
import EventCard from "../../components/cards/EventCard";
import TopicCard from "../../components/cards/TopicCard";
import UserCard from "../../components/cards/UserCard";
 
const Dashboard = ({ user, token, followData, setFollowData }) => {
  const [groups, setGroups] = useState([]);
  const [groupErr, setGroupErr] = useState(null);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [events, setEvents] = useState({ pastEvents: [], upcomingEvents: [] });
  const [eventErr, setEventErr] = useState(null);
  const [topics, setTopics] = useState([]);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    if (user) {
      const fetchGroups = async () => {
        try {
          const data = await getUserGroups(user?.id);
          setGroups(data?.groups ?? []);
        } catch (error) {
          setGroupErr(error.message);
        }
      };
 
      const fetchEvents = async () => {
        try {
          const data = await getUserEvents(user?.id);
          setEvents(data ?? { pastEvents: [], upcomingEvents: [] });
        } catch (error) {
          setEventErr(error.message);
        }
      };
 
      const fetchTopics = async () => {
        try {
          const data = await validTopics();
          setTopics(data ?? []);
        } catch (error) {
          console.error(error);
        }
      };
 
      const fetchFollowData = async () => {
        try {
          const data = await getFollowData(user?.id, token);
          setFollowData(data);
        } catch (error) {
          console.error(error);
        }
      };
 
      fetchGroups();
      fetchEvents();
      fetchTopics();
      fetchFollowData();
    } else {
      navigate("/");
    }
  }, [user, navigate, token, setFollowData]);
 
  const handleGroupCreated = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };
 
  return (
    <div className="dashboard">
      {user && <h1>Hello, {user?.username}!</h1>}
      <div className="dashboard-content">
        <div className="lists">
          <div>
            <h2 className="title">Topics</h2>
            <div className="topics">
              {topics.map((topic, index) => (
                <TopicCard key={index} topic={topic} />
              ))}
            </div>
 
            <details>
              <summary className="title">
                Your Groups ({groups.length}){" "}
                <FiPlus
                  className="plus-icon"
                  onClick={() => setIsAddGroupModalOpen(true)}
                />
              </summary>
              {groupErr && <p>{groupErr}</p>}
              <div className="members-positioning">
                {groups.map((group) => (
                  <GroupCard
                    key={group?.id}
                    user={user}
                    group={group}
                    onClick={() => navigate(`/group/${group?.id}`)}
                  />
                ))}
              </div>
            </details>
          </div>
        </div>
 
        <div className="events">
          <details>
            <summary className="title">
              Upcoming Events ({events?.upcomingEvents.length || 0})
            </summary>
            <div className="events-positioning">
              {eventErr && <p>{eventErr}</p>}
              {events?.upcomingEvents.map((event) => (
                <EventCard
                  className="event-card-width"
                  key={event?.id}
                  event={event}
                  onClick={() => navigate(`/event/${event?.id}`)}
                />
              ))}
            </div>
          </details>
 
          <details>
            <summary className="title">
              Past Events ({events?.pastEvents.length || 0})
            </summary>
            {eventErr && <p>{eventErr}</p>}
            {events?.pastEvents.map((event) => (
              <EventCard
                key={event?.id}
                event={event}
                onClick={() => navigate(`/event/${event?.id}`)}
              />
            ))}
          </details>
        </div>
      </div>
 
      <div className="followers">
        <details>
          <summary className="title">
            Followers ({followData.followers.length})
          </summary>
          <div className="members-positioning">
            {followData.followers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={() => navigate(`/profile/${user.username}`)}
              />
            ))}
          </div>
        </details>
 
        <details>
          <summary className="title">
            Following ({followData.following.length})
          </summary>
          <div className="members-positioning">
            {followData.following.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={() => navigate(`/profile/${user.username}`)}
              />
            ))}
          </div>
        </details>
      </div>
 
      <GroupForm
        isOpen={isAddGroupModalOpen}
        onClose={() => setIsAddGroupModalOpen(false)}
        token={token}
        onGroupCreated={handleGroupCreated}
      />
    </div>
  );
};
 
Dashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  followData: PropTypes.object,
  setFollowData: PropTypes.func,
};
 
export default Dashboard;
