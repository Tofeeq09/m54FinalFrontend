// Path: src/pages/profile/Profile.jsx

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

import "./Profile.scss";
import {
  getUserDetailsByUsername,
  followUser,
  unfollowUser,
  isFollowing,
} from "../../utils/fetch";
import PostCard from "../../components/cards/PostCard";
import GroupCard from "../../components/cards/GroupCard";
import EventCard from "../../components/cards/EventCard";
import UpdateUserForm from "../../components/models/UpdateUserForm";
import DeleteUserForm from "../../components/models/DeleteUserForm";

const Profile = ({ user, setUser, token }) => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetailsByUsername(username);
        setUserDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [username]);

  useEffect(() => {
    const checkIsFollowing = async () => {
      if (!userDetails || user.id === userDetails.id) {
        return;
      }
      try {
        const data = await isFollowing(userDetails.id, token);
        setFollowing(data.isFollowing);
      } catch (error) {
        console.error(error);
      }
    };

    if (userDetails) {
      checkIsFollowing();
    }
  }, [user, userDetails, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleFollowClick = async () => {
    try {
      if (following) {
        await unfollowUser(userDetails.id, token);
      } else {
        await followUser(userDetails.id, token);
      }
      setFollowing(!following);
    } catch (error) {
      console.error(error);
    }
  };

  if (user && user.username !== username) {
    return (
      <div className="profile-container">
        <button className="follow-button" onClick={handleFollowClick}>
          {following ? "Unfollow" : "Follow"}
        </button>
        <h1 className="profile-title">{userDetails.username}&apos;s Profile</h1>
        {userDetails && (
          <>
            <h2 className="username">{userDetails.username}</h2>
            <img
              className="avatar"
              src={userDetails.avatar}
              alt="User avatar"
            />

            <div className="posts">
              <h3 className="section-title">
                {userDetails.username}&apos;s Posts
              </h3>
              {userDetails.Posts &&
                userDetails.Posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div className="groups">
              <h3 className="section-title">
                {userDetails.username}&apos;s Groups
              </h3>
              {userDetails.Groups &&
                userDetails.Groups.map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    onClick={() => navigate(`/group/${group.id}`)}
                  />
                ))}
            </div>
            <div className="events">
              <h3 className="section-title">
                {userDetails.username}&apos;s Events
              </h3>
              {userDetails.Events &&
                userDetails.Events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => navigate(`/event/${event.id}`)}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">{userDetails.username}&apos;s Profile</h1>
      <button onClick={() => setUpdateModalOpen(true)}>
        Update Information
      </button>
      <button onClick={() => setDeleteModalOpen(true)}>Delete Account</button>
      <UpdateUserForm
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        token={token}
        setUser={setUser}
      />
      <DeleteUserForm
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        token={token}
        username={user.username}
        setUser={setUser}
      />
      {userDetails && (
        <>
          <h2 className="username">{userDetails.username}</h2>
          <img className="avatar" src={userDetails.avatar} alt="User avatar" />
          <div className="posts">
            <h3 className="section-title">Your Posts</h3>
            {userDetails.Posts &&
              userDetails.Posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  setFollowData: PropTypes.func,
  token: PropTypes.string,
  setUser: PropTypes.func,
};

export default Profile;
