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

const Profile = ({ user, token }) => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [following, setFollowing] = useState(null);

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
      <div>
        <button onClick={handleFollowClick}>
          {following ? "Unfollow" : "Follow"}
        </button>
        <h1>{userDetails.username}&apos;s Profile</h1>
        {userDetails && (
          <>
            <h2>{userDetails.username}</h2>
            <img src={userDetails.avatar} alt="User avatar" />

            <div>
              <h3>{userDetails.username}&apos;s Posts</h3>
              {userDetails.Posts &&
                userDetails.Posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div>
              <h3>{userDetails.username}&apos;s Groups</h3>
              {userDetails.Groups &&
                userDetails.Groups.map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    onClick={() => navigate(`/group/${group.id}`)}
                  />
                ))}
            </div>
            <div>
              <h3>{userDetails.username}&apos;s Events</h3>
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
    <div>
      <h1>{userDetails.username}&apos;s Profile</h1>
      {userDetails && (
        <>
          <h2>{userDetails.username}</h2>
          <img src={userDetails.avatar} alt="User avatar" />
          <div>
            <h3>Your Posts</h3>
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
  followData: PropTypes.shape({
    followers: PropTypes.arrayOf(PropTypes.object),
    following: PropTypes.arrayOf(PropTypes.object),
  }),
  setFollowData: PropTypes.func,
  token: PropTypes.string,
};

export default Profile;
