// Path: src/pages/profile/Profile.jsx

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetailsByUsername } from "../../utils/fetch";

import "./Profile.scss";
import PostCard from "../../components/cards/PostCard";
import GroupCard from "../../components/cards/GroupCard";
import EventCard from "../../components/cards/EventCard";

const Profile = ({ user }) => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && user.username !== username) {
    return (
      <div>
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
};

export default Profile;
