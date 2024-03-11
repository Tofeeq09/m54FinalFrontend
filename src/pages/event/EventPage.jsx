// EventPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./EventPage.scss";
import UserCard from "../../components/cards/UserCard";
import { getEvent, attendEvent, cancelEventAttendance, deleteEvent } from "../../utils/fetch";

const EventPage = ({ user1 }) => {
  // user1 is the logged in user
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEvent(eventId);
        setEvent(eventData.event);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleAttendEvent = async () => {
    try {
      const data = await attendEvent(eventId, user1.authToken);
      if (data) {
        setEvent((prevEvent) => ({ ...prevEvent, Users: [...prevEvent.Users, user1] }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEvent = async () => {
    try {
      const data = await cancelEventAttendance(eventId, user1.authToken);
      if (data) {
        setEvent((prevEvent) => ({ ...prevEvent, Users: prevEvent.Users.filter((u) => u.id !== user1.id) }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const data = await deleteEvent(eventId, user1.authToken);
      if (data) {
        navigate(`/group/${event.GroupId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const getActionButton = () => {
    const currentUserInEvent = event.Users.find((u) => u.id === user1.id);
    const currentUserRoleInEvent = currentUserInEvent?.EventUser?.role;

    if (currentUserRoleInEvent === "organizer") {
      return <button onClick={handleDeleteEvent}>Cancel Event</button>;
    } else if (currentUserRoleInEvent === "attendee") {
      return <button onClick={handleCancelEvent}>Cancel Attendance</button>;
    } else {
      return <button onClick={handleAttendEvent}>Attend Event</button>;
    }
  };

  return (
    <div>
      <h1>{event.name}</h1>
      {getActionButton()}
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <h2>Group: {event.Group.name}</h2>
      <p>Group topics: {event.Group.topics.join(", ")}</p>
      <h2>Attendees ({event.attendeeCount})</h2>
      {event.Users.map((user) => (
        <UserCard key={user.id} user={user} role={user.EventUser.role} />
      ))}
      <h2>Posts</h2>
      {event.Posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

EventPage.propTypes = {
  user1: PropTypes.object,
};

export default EventPage;
