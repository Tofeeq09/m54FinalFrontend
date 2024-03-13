// Path: src/pages/group/GroupPage.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import "./GroupPage.scss";
import {
  getGroup,
  getGroupUsers,
  getGroupEvents,
  getGroupPosts,
  leaveGroup,
  deleteGroup,
  joinGroup,
  createGroupPost,
  removeUserFromGroup,
} from "../../utils/fetch";
import UserCard from "../../components/cards/UserCard";
import EventCard from "../../components/cards/EventCard";
import PostCard from "../../components/cards/PostCard";
import EventForm from "../../components/models/EventForm";

const GroupPage = ({ user, token }) => {
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

        if (user && token) {
          const postsData = await getGroupPosts(groupId, token);
          setPosts(postsData.posts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupAndUsersAndEventsAndPosts();
  }, [groupId, user, token]);

  const currentUser = user && users.find((u) => u.id === user.id);
  const currentUserRole = currentUser?.GroupUser?.role;

  const handleEventCreated = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent.event]);
  };

  const handleLeaveGroup = async () => {
    try {
      const data = await leaveGroup(groupId, token);
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
          <button onClick={() => navigate("/login")}>
            Click here to log in.
          </button>
        </div>
      );
      return;
    }

    try {
      const data = await joinGroup(groupId, token);
      if (data) {
        setUsers((prevUsers) => [
          ...prevUsers,
          { ...user, GroupUser: { role: "member" } },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const data = await deleteGroup(groupId, token);
      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKickUser = async (userId) => {
    try {
      await removeUserFromGroup(groupId, userId, token);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPostSubmit = async (event) => {
    event.preventDefault();

    if (!newPost.trim()) {
      return;
    }

    try {
      const newPostData = await createGroupPost(newPost, groupId, token);

      const newPostWithUser = {
        ...newPostData.post,
        User: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
      };

      setPosts((prevPosts) => [...prevPosts, newPostWithUser]);
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
      <div className="header-disband-positioning">
        <h1>{group?.name ?? "N/A"}</h1>
        {currentUserRole === "admin" && (
          <button className="disband-button" onClick={handleDeleteGroup}>
            Disband Group
          </button>
        )}
        {currentUserRole === "member" && (
          <button className="disband-button" onClick={handleLeaveGroup}>
            Leave Group
          </button>
        )}
      </div>
      <p>{group?.description ?? "N/A"}</p>
      <p>Topics: {group?.topics?.join(", ") ?? "N/A"}</p>
      <p>Privacy: {group?.privacy_settings ?? "N/A"}</p>
      <p>
        Created at:{" "}
        {group?.createdAt ? new Date(group.createdAt).toLocaleString() : "N/A"}
      </p>
      {!currentUser && <button onClick={handleJoinGroup}>Join Group</button>}
      {currentUserRole === "member" && (
        <button onClick={handleLeaveGroup}>Leave Group</button>
      )}
      {currentUserRole === "admin" && (
        <button onClick={handleDeleteGroup}>Disband Group</button>
      )}
      <h2>Members</h2>
      <div className="members-positioning">
        {users?.map(
          (user) =>
            user && (
              <UserCard
                key={user.id}
                user={user}
                role={user.GroupUser.role}
                onKick={
                  currentUserRole === "admin" && user.id !== currentUser.id
                    ? handleKickUser
                    : null
                }
                onClick={() => navigate(`/profile/${user.id}`)}
              />
            )
        )}
      </div>
      <h2>
        Events{" "}
        <FiPlus
          className="plus-icon"
          onClick={() => setIsAddEventModalOpen(true)}
        />
      </h2>
      {events?.map(
        (event) =>
          event && (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => navigate(`/event/${event.id}`)}
            />
          )
      )}
      {currentUser ? (
        <>
          <h2>
            Posts <span>({posts.length})</span>
          </h2>
          {posts.length === 0 ? (
            <p>No posts</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
          <form className="group-post-container" onSubmit={handleNewPostSubmit}>
            <input
              type="text"
              value={newPost}
              onChange={handleNewPostChange}
              placeholder={`Write a post for your fellow ${
                group?.name ?? "group member"
              } peeps`}
            />
            <button type="submit">Post</button>
          </form>
        </>
      ) : null}
      <EventForm
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        token={token}
        groupId={group?.id}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

GroupPage.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default GroupPage;
