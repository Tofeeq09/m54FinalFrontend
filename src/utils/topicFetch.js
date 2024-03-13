// Path: src/utils/topicFetch.jsx

export const fetchGameData = async (gameName) => {
  const response = await fetch(`/api/games?key=${import.meta.env.VITE_APP_RAWG_KEY}&search=${gameName}`);
  const data = await response.json();
  return data.results.map((game) => game.background_image);
};
