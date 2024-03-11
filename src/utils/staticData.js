// src/utils/staticData.js

const url = import.meta.env.VITE_APP_BASE_URL;

export const validTopics = async () => {
  const response = await fetch(`${url}/api/validTopics`, {
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
