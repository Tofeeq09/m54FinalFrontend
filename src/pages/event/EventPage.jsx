// Path: src/pages/event/EventPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./EventPage.scss";
import UserCard from "../../components/cards/UserCard";
import PostCard from "../../components/cards/PostCard";
import { getEvent, attendEvent, cancelEventAttendance, deleteEvent, createEventPost } from "../../utils/fetch";

const EventPage = ({ user1, token }) => {
  // user1 is the logged in user
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEvent(eventId);
        setEvent(eventData.event);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleAttendEvent = async () => {
    try {
      const data = await attendEvent(eventId, token);
      if (data) {
        const userWithRole = { ...user1, EventUser: { role: "attendee" } };
        setEvent((prevEvent) => ({ ...prevEvent, Users: [...prevEvent.Users, userWithRole] }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEvent = async () => {
    try {
      const data = await cancelEventAttendance(eventId, token);
      if (data) {
        setEvent((prevEvent) => ({ ...prevEvent, Users: prevEvent.Users.filter((u) => u.id !== user1.id) }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const data = await deleteEvent(eventId, token);
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

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();

    if (!newPost.trim()) {
      return;
    }

    try {
      const newPostData = await createEventPost(newPost, event.GroupId, eventId, token);

      const newPostWithUser = {
        ...newPostData.post,
        User: {
          id: user1.id,
          username: user1.username,
          avatar: user1.avatar,
        },
      };

      setEvent((prevEvent) => ({ ...prevEvent, Posts: [...prevEvent.Posts, newPostWithUser] }));
      setNewPost("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  const currentUserInEvent = event?.Users?.find((u) => user1 && u.id === user1.id);
  const currentUserRoleInEvent =
    currentUserInEvent && currentUserInEvent.EventUser ? currentUserInEvent.EventUser.role : null;

  return (
    <div className="group-page">
      <div className="header-disband-positioning">
        <h1>{event.name}</h1>
        {!currentUserInEvent && (
          <button onClick={handleAttendEvent}>Attend Event</button>
        )}
        {currentUserInEvent && currentUserRoleInEvent === "attendee" && (
          <button className="negative-button" onClick={handleCancelEvent}>
            Cancel Attendance
          </button>
        )}
        {currentUserInEvent && currentUserRoleInEvent === "organizer" && (
          <button className="negative-button" onClick={handleDeleteEvent}>
            Delete Event
          </button>
        )}
      </div>
      <p>{event.description}</p>
      <p>
        Date:{" "}
        {new Date(event.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p>
        Time:{" "}
        {new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString("en-GB", {
          timeZone: "GMT",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p>Location: {event.location}</p>
      {event.Group && (
        <>
          <h2>Group: {event.Group.name}</h2>
          <p>Group topics: {event.Group.topics.join(", ")}</p>
        </>
      )}
      <h2>Attendees ({event.attendeeCount})</h2>
      <div className="members-positioning">
        {event?.Users?.map((user) => (
          <UserCard key={user.id} user={user} role={user.EventUser.role} />
        ))}
      </div>
      <h2>
        Posts <span>({event?.Posts?.length})</span>
      </h2>

      {event?.Posts?.length === 0 ? (
        <p>No posts</p>
      ) : (
        event?.Posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
      <form className="post-container" onSubmit={handleNewPostSubmit} placeholder="comment">
        <input type="text" value={newPost} onChange={handleNewPostChange} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

EventPage.propTypes = {
  user1: PropTypes.object,
  token: PropTypes.string,
};

export default EventPage;
