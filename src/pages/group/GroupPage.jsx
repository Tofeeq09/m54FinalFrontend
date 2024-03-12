// src/pages/group/GroupPage.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import PropTypes from "prop-types";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import "./GroupPage.scss";
import {
  getGroup,
  getGroupUsers,
  getGroupEvents,
  getGroupPosts,
  leaveGroup,
  deleteGroup,
  joinGroup,
  createPost,
  removeUserFromGroup,
} from "../../utils/fetch";
import UserCard from "../../components/cards/UserCard";
import EventCard from "../../components/cards/EventCard";
import PostCard from "../../components/cards/PostCard";
import EventForm from "../../components/models/EventForm";

const GroupPage = ({ user }) => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupAndUsersAndEventsAndPosts = async () => {
      try {
        const groupData = await getGroup(groupId);
        setGroup(groupData);

        const usersData = await getGroupUsers(groupId);
        setUsers(usersData.users);

        const eventsData = await getGroupEvents(groupId);
        setEvents(eventsData.events);

        if (user && user.authToken) {
          const postsData = await getGroupPosts(groupId, user.authToken);
          setPosts(postsData.posts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupAndUsersAndEventsAndPosts();
  }, [groupId, user]);

  const currentUser = user && users.find((u) => u.id === user.id);
  const currentUserRole = currentUser?.GroupUser?.role;

  const handleEventCreated = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleLeaveGroup = async () => {
    try {
      const data = await leaveGroup(groupId, user.authToken);
      if (data) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinGroup = async () => {
    if (!user) {
      toast.error(
        <div>
          You need to log in to join the group.
          <button onClick={() => navigate("/login")}>Click here to log in.</button>
        </div>
      );
      return;
    }

    try {
      const data = await joinGroup(groupId, user.authToken);
      if (data) {
        setUsers((prevUsers) => [...prevUsers, { ...user, GroupUser: { role: "member" } }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const data = await deleteGroup(groupId, user.authToken);
      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKickUser = async (userId) => {
    try {
      await removeUserFromGroup(groupId, userId, user.authToken);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPostSubmit = async (event) => {
    event.preventDefault();

    if (!newPost.trim()) {
      console.error("The content field is empty.");
      return;
    }

    try {
      console.log(`New post content: ${newPost}`);
      const newPostData = await createPost(newPost, groupId, user.authToken);

      setPosts((prevPosts) => [...prevPosts, newPostData]);
      setNewPost("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  return (
    <div className="group-page"> 
      <h1>{group?.name ?? "N/A"}</h1>
      <p>{group?.description ?? "N/A"}</p>
      <p>Topics: {group?.topics?.join(", ") ?? "N/A"}</p>
      <p>Privacy: {group?.privacy_settings ?? "N/A"}</p>
      <p>Created at: {group?.createdAt ? new Date(group.createdAt).toLocaleString() : "N/A"}</p>
      {!currentUser && <button onClick={handleJoinGroup}>Join Group</button>}
      {currentUserRole === "member" && <button onClick={handleLeaveGroup}>Leave Group</button>}
      {currentUserRole === "admin" && <button onClick={handleDeleteGroup}>Disband Group</button>}
      <h2>Members</h2>
      {users?.map(
        (user) =>
          user && (
            <UserCard
              key={user.id}
              user={user}
              role={user.GroupUser.role}
              onKick={currentUserRole === "admin" && user.id !== currentUser.id ? handleKickUser : null}
              onClick={() => navigate(`/profile/${user.id}`)}
            />
          )
      )}
      <h2>
        Events <FiPlus onClick={() => setIsAddEventModalOpen(true)} />
      </h2>
      {events?.map(
        (event) => event && <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
      )}
      {currentUser ? (
        <>
          <h2>Posts</h2>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <form onSubmit={handleNewPostSubmit}>
            <input type="text" value={newPost} onChange={handleNewPostChange} />
            <button type="submit">Post</button>
          </form>
        </>
      ) : null}
      <EventForm
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        token={user?.authToken}
        groupId={group?.id}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

GroupPage.propTypes = {
  user: PropTypes.object,
};

export default GroupPage;
