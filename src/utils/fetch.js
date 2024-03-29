// Path: src/utils/fetch.js

import { writeCookie } from "../common";

const url = import.meta.env.VITE_APP_BASE_URL;

export const login = async (userData) => {
  const response = await fetch(`${url}/api/users/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }),
  });

  const data = await response.json();
  // console.log("JWT token received from server:", data.user.authToken);
  writeCookie("jwt_token", data.user.authToken);

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const signup = async (userData) => {
  const response = await fetch(`${url}/api/users`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  // console.log("JWT token received from server:", data.user.authToken);
  writeCookie("jwt_token", data.user.authToken);

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const tokenCheck = async (token) => {
  const response = await fetch(`${url}/api/users/verify`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("JWT token sent for verification:", token);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.user;
};

export const getAllUsers = async (username = "") => {
  const response = await fetch(`${url}/api/users?username=${username}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.users;
};

export const getUserEmail = async (token) => {
  const response = await fetch(`${url}/api/users/private`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const logout = async (token) => {
  const response = await fetch(`${url}/api/users/logout`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const sendUpdatedUser = async (userData, token) => {
  const updatedFields = Object.keys(userData).reduce((acc, key) => {
    if (userData[key] !== null) {
      acc[key] = userData[key];
    }
    return acc;
  }, {});

  const response = await fetch(`${url}/api/users`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFields),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const deleteUser = async (password, token) => {
  const response = await fetch(`${url}/api/users`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    if (response.status !== 204) {
      const data = await response.json();
      throw new Error(data.error);
    }
    throw new Error("Delete operation failed");
  }

  return null;
};

export const getUserGroups = async (userId) => {
  const response = await fetch(`${url}/api/users/${userId}/groups`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const joinGroup = async (groupId, token) => {
  const response = await fetch(`${url}/api/users/group/${groupId}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const leaveGroup = async (groupId, token) => {
  const response = await fetch(`${url}/api/users/group/${groupId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getUserEvents = async (userId) => {
  const response = await fetch(`${url}/api/users/${userId}/events`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const attendEvent = async (eventId, token) => {
  const response = await fetch(`${url}/api/users/event/${eventId}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const cancelEventAttendance = async (eventId, token) => {
  const response = await fetch(`${url}/api/users/event/${eventId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const createGroup = async (groupData, token) => {
  const response = await fetch(`${url}/api/groups`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getAllGroups = async (name = "", topics = []) => {
  const topicsQuery = topics.length > 0 ? `topics=${topics.join(",")}` : "";
  const nameQuery = name ? `name=${name}` : "";
  const query = [topicsQuery, nameQuery].filter(Boolean).join("&");

  const response = await fetch(`${url}/api/groups?${query}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getGroup = async (groupId) => {
  const response = await fetch(`${url}/api/groups/${groupId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getGroupUsers = async (groupId) => {
  const response = await fetch(`${url}/api/groups/${groupId}/users`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getGroupEvents = async (groupId) => {
  const response = await fetch(`${url}/api/groups/${groupId}/events`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const updateGroup = async (groupData, groupId, token) => {
  const response = await fetch(`${url}/api/groups/${groupId}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const deleteGroup = async (groupId, token) => {
  const response = await fetch(`${url}/api/groups/${groupId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const removeUserFromGroup = async (groupId, userId, token) => {
  const response = await fetch(`${url}/api/groups/${groupId}/kick/${userId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const createEvent = async (eventData, groupId, token) => {
  const response = await fetch(`${url}/api/events/group/${groupId}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getAllEvents = async () => {
  const response = await fetch(`${url}/api/events`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getEvent = async (eventId) => {
  const response = await fetch(`${url}/api/events/${eventId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const updateEvent = async (eventData, eventId, token) => {
  const response = await fetch(`${url}/api/events/${eventId}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const deleteEvent = async (eventId, token) => {
  const response = await fetch(`${url}/api/events/${eventId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const adminDeleteEvent = async (eventId, groupId, token) => {
  const response = await fetch(
    `${url}/api/events/group/${groupId}/event/${eventId}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const createGroupPost = async (newPost, groupId, authToken) => {
  const response = await fetch(`${url}/api/posts/group/${groupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ content: newPost }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  const data = await response.json();
  return data;
};

export const createEventPost = async (newPost, groupId, eventId, authToken) => {
  const response = await fetch(`${url}/api/posts/group/${groupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ content: newPost, eventId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  const data = await response.json();
  return data;
};

export const getGroupPosts = async (groupId, token) => {
  const response = await fetch(`${url}/api/posts/group/${groupId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getEventPosts = async (groupId, eventId) => {
  const response = await fetch(
    `${url}/api/posts/group/${groupId}/event/${eventId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const deletePost = async (postId, token) => {
  const response = await fetch(`${url}/api/posts/${postId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const followUser = async (userId, token) => {
  const response = await fetch(`${url}/api/follow/${userId}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const unfollowUser = async (userId, token) => {
  const response = await fetch(`${url}/api/follow/${userId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getFollowData = async (eventId, token) => {
  const response = await fetch(`${url}/api/follow/${eventId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const checkGroupMembershipFromEvent = async (eventId, token) => {
  const response = await fetch(`${url}/api/events/member/${eventId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getUserDetailsByUsername = async (username) => {
  const response = await fetch(`${url}/api/users/username/${username}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const isFollowing = async (userId, token) => {
  const response = await fetch(`${url}/api/follow/isFollowing/${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};
