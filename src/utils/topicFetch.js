// Path: src/utils/topicFetch.jsx

export const getRandomScreenshot = async (gameId) => {
  const response = await fetch("https://api.igdb.com/v4/games/", {
    method: "POST",
    headers: {
      "Client-ID": "your-client-id",
      Authorization: "Bearer your-access-token",
      "Content-Type": "application/json",
    },
    body: `fields screenshots.*; where id = ${gameId};`,
  });

  const data = await response.json();
  const screenshots = data[0]?.screenshots || [];

  if (screenshots.length === 0) {
    throw new Error("No screenshots found for this game.");
  }

  const randomIndex = Math.floor(Math.random() * screenshots.length);
  const screenshot = screenshots[randomIndex];
  const imageUrl = `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`;

  return imageUrl;
};
